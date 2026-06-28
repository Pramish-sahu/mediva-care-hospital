#!/usr/bin/env python3
"""Dependency-free structural validation for the Mediva static website."""

from __future__ import annotations

import re
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []


class DocumentAudit(HTMLParser):
    def __init__(self, source: Path) -> None:
        super().__init__(convert_charrefs=True)
        self.source = source
        self.ids: set[str] = set()
        self.labels_for: set[str] = set()
        self.form_controls: list[tuple[str, str | None, bool]] = []
        self.aria_controls: list[str] = []
        self.in_script = False
        self.in_title = False
        self.in_label = 0
        self.inline_script_has_content = False
        self.has_doctype = False
        self.has_lang = False
        self.has_description = False
        self.has_production_css = False
        self.title_text = ''
        self.h1_count = 0

    def handle_decl(self, decl: str) -> None:
        if decl.lower().strip() == 'doctype html':
            self.has_doctype = True

    def handle_starttag(self, tag: str, attrs_list: list[tuple[str, str | None]]) -> None:
        attrs = dict(attrs_list)

        if tag == 'html' and attrs.get('lang'):
            self.has_lang = True
        if tag == 'title':
            self.in_title = True
        if tag == 'h1':
            self.h1_count += 1
        if tag == 'label':
            self.in_label += 1
            if attrs.get('for'):
                self.labels_for.add(attrs['for'])
        if tag == 'meta' and attrs.get('name', '').lower() == 'description' and attrs.get('content', '').strip():
            self.has_description = True
        if tag == 'link' and attrs.get('href', '').endswith('/assets/css/production.css') or (
            tag == 'link' and attrs.get('href', '').endswith('assets/css/production.css')
        ):
            self.has_production_css = True

        element_id = attrs.get('id')
        if element_id:
            if element_id in self.ids:
                ERRORS.append(f'{self.source}: duplicate id #{element_id}')
            self.ids.add(element_id)

        if attrs.get('aria-controls'):
            self.aria_controls.extend(attrs['aria-controls'].split())

        if 'style' in attrs:
            ERRORS.append(f'{self.source}: inline style on <{tag}>')
        if any(name.lower().startswith('on') for name in attrs):
            ERRORS.append(f'{self.source}: inline event handler on <{tag}>')

        if tag == 'img':
            if 'alt' not in attrs:
                ERRORS.append(f'{self.source}: image missing alt text: {attrs.get("src", "") or "dynamic image"}')
            if not attrs.get('width') or not attrs.get('height'):
                ERRORS.append(f'{self.source}: image missing dimensions: {attrs.get("src", "") or "dynamic image"}')

        if tag == 'iframe':
            if not attrs.get('title'):
                ERRORS.append(f'{self.source}: iframe missing title')
            if attrs.get('loading') != 'lazy':
                ERRORS.append(f'{self.source}: iframe should be lazy loaded')

        if tag in {'input', 'select', 'textarea'}:
            input_type = (attrs.get('type') or '').lower()
            if input_type not in {'hidden', 'submit', 'button', 'reset'}:
                is_named = bool(attrs.get('aria-label') or attrs.get('aria-labelledby') or self.in_label)
                self.form_controls.append((tag, attrs.get('id'), is_named))

        if tag == 'script':
            src = attrs.get('src')
            self.in_script = not bool(src)
            if src and not ('defer' in attrs or 'async' in attrs or attrs.get('type') == 'module'):
                ERRORS.append(f'{self.source}: blocking script without defer/async: {src}')

        for attr in ('href', 'src'):
            value = attrs.get(attr)
            if not value or value.startswith(('#', 'http://', 'https://', 'mailto:', 'tel:', 'data:', 'javascript:')):
                continue
            clean = unquote(value.split('#', 1)[0].split('?', 1)[0])
            if not clean:
                continue
            target = (self.source.parent / clean).resolve()
            try:
                target.relative_to(ROOT)
            except ValueError:
                ERRORS.append(f'{self.source}: reference escapes project root: {value}')
                continue
            if not target.exists():
                ERRORS.append(f'{self.source}: missing local reference: {value}')

    def handle_endtag(self, tag: str) -> None:
        if tag == 'script':
            self.in_script = False
        elif tag == 'title':
            self.in_title = False
        elif tag == 'label':
            self.in_label = max(0, self.in_label - 1)

    def handle_data(self, data: str) -> None:
        if self.in_script and data.strip():
            self.inline_script_has_content = True
        if self.in_title:
            self.title_text += data


def validate_html(path: Path) -> None:
    parser = DocumentAudit(path)
    try:
        parser.feed(path.read_text(encoding='utf-8'))
    except Exception as exc:
        ERRORS.append(f'{path}: HTML parse failed: {exc}')
        return

    if not parser.has_doctype:
        ERRORS.append(f'{path}: missing HTML5 doctype')
    if not parser.has_lang:
        ERRORS.append(f'{path}: missing html lang attribute')
    if not parser.title_text.strip():
        ERRORS.append(f'{path}: missing document title')
    if not parser.has_description:
        ERRORS.append(f'{path}: missing meta description')
    if parser.h1_count != 1:
        ERRORS.append(f'{path}: expected exactly one h1, found {parser.h1_count}')
    if not parser.has_production_css:
        ERRORS.append(f'{path}: production.css is not loaded')
    if parser.inline_script_has_content:
        ERRORS.append(f'{path}: inline JavaScript found')

    for control_tag, control_id, is_named in parser.form_controls:
        if is_named:
            continue
        if control_id and control_id in parser.labels_for:
            continue
        ERRORS.append(f'{path}: unlabeled {control_tag}#{control_id or "(no id)"}')

    for controlled_id in parser.aria_controls:
        if controlled_id not in parser.ids:
            ERRORS.append(f'{path}: aria-controls points to missing #{controlled_id}')


def validate_css(path: Path) -> None:
    text = re.sub(r'/\*.*?\*/', '', path.read_text(encoding='utf-8'), flags=re.S)
    if text.count('{') != text.count('}'):
        ERRORS.append(f'{path}: unbalanced CSS braces')


def validate_js(path: Path) -> None:
    if not shutil.which('node'):
        ERRORS.append('Node.js is required for JavaScript syntax validation')
        return
    result = subprocess.run(['node', '--check', str(path)], capture_output=True, text=True)
    if result.returncode:
        ERRORS.append(f'{path}: JavaScript syntax error: {result.stderr.strip()}')


def main() -> int:
    html_files = sorted(ROOT.rglob('*.html'))
    css_files = sorted((ROOT / 'assets/css').glob('*.css'))
    js_files = sorted((ROOT / 'assets/js').glob('*.js'))
    svg_files = sorted((ROOT / 'assets').rglob('*.svg'))

    for path in html_files:
        validate_html(path)
    for path in css_files:
        validate_css(path)
    for path in js_files:
        validate_js(path)
    for path in svg_files:
        try:
            ET.parse(path)
        except ET.ParseError as exc:
            ERRORS.append(f'{path}: invalid SVG XML: {exc}')

    for xml_path in (ROOT / 'sitemap.xml', ROOT / 'assets/favicon/site.webmanifest'):
        if xml_path.suffix == '.xml':
            try:
                ET.parse(xml_path)
            except ET.ParseError as exc:
                ERRORS.append(f'{xml_path}: invalid XML: {exc}')

    robots = (ROOT / 'robots.txt').read_text(encoding='utf-8') if (ROOT / 'robots.txt').exists() else ''
    if 'Sitemap:' not in robots:
        ERRORS.append(f'{ROOT / "robots.txt"}: missing Sitemap declaration')

    print(f'HTML documents: {len(html_files)}')
    print(f'Stylesheets: {len(css_files)}')
    print(f'JavaScript files: {len(js_files)}')
    print(f'SVG assets: {len(svg_files)}')
    print(f'Total files: {sum(1 for path in ROOT.rglob("*") if path.is_file())}')

    if ERRORS:
        print('\nVALIDATION FAILED')
        for error in ERRORS:
            print(f'- {error.replace(str(ROOT) + "/", "")}')
        return 1

    print('\nVALIDATION PASSED')
    return 0


if __name__ == '__main__':
    sys.exit(main())
