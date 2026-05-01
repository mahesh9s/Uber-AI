#!/usr/bin/env python3
"""Bundle Uber Scout into a single self-contained HTML file.

- Inlines the JSX as a Babel-compiled <script> tag
- Embeds referenced assets as base64 data URIs
- Output opens with file:// — no server needed

Run from repo root:
    python3 "Uber One/build_standalone.py"

Output: "Uber One/Uber-Scout-Standalone.html"
"""
import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent  # /Uber One/
HTML_IN = ROOT / "Uber One Door-to-Door.html"
JSX_IN = ROOT / "components" / "screens-uberone.jsx"
ASSETS_DIR = ROOT / "assets"
HTML_OUT = ROOT / "Uber-Scout-Standalone.html"

# Assets actually referenced in the code
ASSETS = ["Image -23.png", "Lonben.jpeg", "uber-for-business-hero.jpg"]


def to_data_uri(path: Path) -> str:
    mime, _ = mimetypes.guess_type(path.name)
    if mime is None:
        mime = "application/octet-stream"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def main():
    html = HTML_IN.read_text(encoding="utf-8")
    jsx = JSX_IN.read_text(encoding="utf-8")

    # Replace `assets/<file>` references in the JSX with base64 data URIs
    for name in ASSETS:
        path = ASSETS_DIR / name
        if not path.exists():
            print(f"  ! missing asset: {name} (skipping)")
            continue
        uri = to_data_uri(path)
        before_count = jsx.count(f"assets/{name}")
        jsx = jsx.replace(f"assets/{name}", uri)
        print(f"  ✓ inlined {name} ({len(uri):,} chars · {before_count} refs)")

    # Replace the external <script src="components/screens-uberone.jsx" ...>
    # with an inline script containing the (modified) JSX
    pattern = re.compile(
        r'<script\s+type="text/babel"\s+src="components/screens-uberone\.jsx"[^>]*></script>',
        re.IGNORECASE,
    )
    inline_tag = (
        '<script type="text/babel" data-plugins="transform-react-jsx-source">\n'
        + jsx
        + "\n</script>"
    )
    new_html, n = pattern.subn(inline_tag, html)
    if n == 0:
        raise RuntimeError("could not find external JSX <script> tag to replace")
    print(f"  ✓ inlined JSX ({len(jsx):,} chars)")

    HTML_OUT.write_text(new_html, encoding="utf-8")
    size_kb = HTML_OUT.stat().st_size / 1024
    print(f"\n✓ Standalone HTML → {HTML_OUT}  ({size_kb:,.0f} KB)")
    print("  Double-click to open — no server required.")


if __name__ == "__main__":
    main()
