"""Draws the Preahchan moon app icons into pb_public/icons (run once; the PNGs are committed)."""
from PIL import Image, ImageDraw
import os
NAVY, CREAM, GOLD = (20, 33, 61), (247, 241, 222), (242, 182, 50)
OUT = os.path.join(os.path.dirname(__file__), "..", "pb_public", "icons")
os.makedirs(OUT, exist_ok=True)

def moon(size, scale=1.0, rounded=True):
    S = size * 4  # draw large, then shrink for smooth edges
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    if rounded: d.rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.22), fill=NAVY)
    else: d.rectangle([0, 0, S, S], fill=NAVY)
    c, r = S / 2, S * 0.36 * scale
    d.ellipse([c - r, c - r, c + r, c + r], fill=CREAM)                       # outer moon
    g = r * 0.86; gx = c + r * 0.08
    d.ellipse([gx - g, c - g, gx + g, c + g], fill=GOLD)                       # golden crescent
    n = r * 0.78; nx = c + r * 0.42; ny = c - r * 0.12
    d.ellipse([nx - n, ny - n, nx + n, ny + n], fill=NAVY)                     # night sky bite
    return im.resize((size, size), Image.LANCZOS)

moon(192).save(os.path.join(OUT, "icon-192.png"))
moon(512).save(os.path.join(OUT, "icon-512.png"))
moon(512, scale=0.78, rounded=False).save(os.path.join(OUT, "maskable-512.png"))   # content inside the safe zone
moon(180, rounded=False).save(os.path.join(OUT, "apple-touch-icon.png"))          # iOS rounds the corners itself
moon(32).save(os.path.join(OUT, "favicon-32.png"))
print("icons written to", os.path.abspath(OUT))
