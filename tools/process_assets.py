from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC1 = Path(r"C:\Users\Bogdy\.cursor\projects\c-Users-Bogdy-Documents-GitHub-lemnycase\assets\WhatsApp_Image_2026-11-10_at_17.21.11-282ac193-59fb-4ccb-81ae-ece1300bd096.jpg")
SRC2 = Path(r"C:\Users\Bogdy\.cursor\projects\c-Users-Bogdy-Documents-GitHub-lemnycase\assets\WhatsApp_Image_2026-11-10_at_17.21.30-c68a26f4-ad0a-4a68-919c-4d444f0b32b0.jpg")
LOGO_SRC = Path(r"C:\Users\Bogdy\.cursor\projects\c-Users-Bogdy-Documents-GitHub-lemnycase\assets\image-8a42a493-3b72-4e71-bae3-195d0f99cc97.png")

OUT = ROOT / "assets" / "images"
BRAND = ROOT / "assets" / "brand"
OUT.mkdir(parents=True, exist_ok=True)
BRAND.mkdir(parents=True, exist_ok=True)


def upscale(img: Image.Image, width: int) -> Image.Image:
    h = int(width * img.height / img.width)
    return img.resize((width, h), Image.Resampling.LANCZOS)


p1 = Image.open(SRC1)
p2 = Image.open(SRC2)
print("src", p1.size, p2.size)

# Crop only the large house photo (left card), not the UI chrome
house1 = p1.crop((58, 44, 585, 428)).convert("RGB")
house1 = upscale(house1, 1600)
house1.save(OUT / "project-1.jpg", quality=92, optimize=True)
print("project-1", house1.size)

house2 = p2.crop((50, 40, 598, 430)).convert("RGB")
house2 = upscale(house2, 1600)
house2.save(OUT / "project-2.jpg", quality=92, optimize=True)
print("project-2", house2.size)

# Construction thumb from second screenshot (right-side small image)
build = p2.crop((670, 245, 930, 405)).convert("RGB")
build = upscale(build, 1000)
build.save(OUT / "project-build.jpg", quality=90, optimize=True)
print("project-build", build.size)

# Also copy as hero
house1.save(OUT / "hero.jpg", quality=92, optimize=True)

# Logo: black -> transparent
logo = Image.open(LOGO_SRC).convert("RGBA")
pixels = logo.load()
w, h = logo.size
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if r < 30 and g < 30 and b < 30:
            pixels[x, y] = (0, 0, 0, 0)

bbox = logo.getbbox()
if bbox:
    logo = logo.crop(bbox)
    pad = 16
    canvas = Image.new("RGBA", (logo.width + pad * 2, logo.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(logo, (pad, pad), logo)
    logo = canvas

logo.save(BRAND / "logo.png")
print("logo", logo.size)

# Light variant for dark hero backgrounds
light = logo.copy()
px = light.load()
for y in range(light.height):
    for x in range(light.width):
        r, g, b, a = px[x, y]
        if a < 12:
            continue
        # keep copper/orange accent
        if r > 145 and 70 < g < 165 and b < 125:
            continue
        # teal / dark green text & icon -> light
        px[x, y] = (245, 248, 247, a)

light.save(BRAND / "logo-light.png")
print("logo-light", light.size)
print("done")
