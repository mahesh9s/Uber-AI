#!/usr/bin/env python3
"""Capture each screen of the Uber Scout prototype via Chrome headless,
then combine all screenshots into a single PDF.

Run from the repo root with the Python http server already serving on :4321:

    python3 "Uber One/build_pdf.py"

Output: "Uber One/uber-scout-prototype.pdf"
"""
import os
import shutil
import subprocess
import time
from pathlib import Path
from urllib.parse import quote

from PIL import Image

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE_URL = "http://localhost:4321/Uber%20One/Uber%20One%20Door-to-Door.html"

# Mirror SEQUENCES from the HTML — used for filenames + cover page
SCREENS = [
    "1-Phone",
    "2-Welcome-back",
    "3-Calendar",
    "3a-Permission",
    "3b-Connect",
    "4-Home",
    "5-New-Trip-Detected",
    "6-Building",
    "7-Plan",
    "8-Confirmed",
    "9-Morning-Of",
]

WIDTH = 500
HEIGHT = 1050

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = REPO_ROOT / "Uber One" / "screenshots"
PDF_PATH = REPO_ROOT / "Uber One" / "uber-scout-prototype.pdf"

if OUT_DIR.exists():
    shutil.rmtree(OUT_DIR)
OUT_DIR.mkdir(parents=True)


def capture(step: int, label: str) -> Path:
    out = OUT_DIR / f"{step:02d}-{label}.png"
    # Force AI=on for the Home screen so the Trip Detected hero card shows
    ai = "on" if "Home" in label else "on"  # AI on everywhere for clean demo
    url = f"{BASE_URL}?step={step}&ai={ai}"
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        f"--window-size={WIDTH},{HEIGHT}",
        "--virtual-time-budget=4500",
        f"--screenshot={out}",
        url,
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    return out


def main():
    print(f"Capturing {len(SCREENS)} screens...")
    images = []
    for i, label in enumerate(SCREENS):
        path = capture(i, label)
        print(f"  ✓ Step {i:>2}: {label}  →  {path.name}")
        img = Image.open(path).convert("RGB")
        images.append(img)
        time.sleep(0.2)

    if not images:
        raise RuntimeError("no screenshots captured")

    print(f"\nWriting PDF → {PDF_PATH}")
    images[0].save(
        PDF_PATH,
        save_all=True,
        append_images=images[1:],
        resolution=144,
    )
    print(f"Done. {len(images)} pages.")


if __name__ == "__main__":
    main()
