"""One-off helper: copies / derives image assets used by the HTML deck.
Sources: the Midnight-Cyan reference deck media, the generated cube/assessment artwork and the report screenshots."""
import os, random, shutil
import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
A = os.path.join(os.path.dirname(__file__), 'assets')
BG = os.path.join(A, 'bg')
os.makedirs(BG, exist_ok=True)
X = os.path.join(ROOT, '_ppt_work', 'x')

# reference gradients
for src, dst in [('image-2-2', 'teal-top'), ('image-4-2', 'teal-mid'), ('image-6-1', 'glow-1'), ('image-7-1', 'glow-2'),
                 ('image-8-1', 'glow-3'), ('image-5-1', 'glow-4'), ('image-2-3', 'light')]:
    Image.open(os.path.join(X, src + '.png')).convert('RGB').resize((1920, 1080), Image.LANCZOS).save(
        os.path.join(BG, dst + '.jpg'), quality=92)

# iso block art from the reference (used inside image cards)
Image.open(os.path.join(X, 'image-4-1.png')).convert('RGB').save(os.path.join(BG, 'blocks.jpg'), quality=92)

# pixel-mosaic gradient (reference cover look)
W, H, cell = 1920, 1080, 40
t = np.linspace(0, 1, H)[:, None, None]
base = np.array((6, 16, 24), float) * (1 - t) + np.array((70, 112, 134), float) * t
base = np.repeat(base, W, axis=1)
rng = random.Random(11)
for gy in range(0, H, cell):
    for gx in range(0, W, cell):
        d = (gy / H) * 0.95 + (gx / W) * 0.3 - 0.3
        if rng.random() < max(0, d) * 0.85:
            base[gy:gy + cell, gx:gx + cell] += rng.uniform(-26, 30)
im = Image.fromarray(np.clip(base, 0, 255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.7))
im.save(os.path.join(BG, 'mosaic.jpg'), quality=92)

# generated artwork + screenshots
for f in ['agent-infrastructure-cube.png', 'authorized-website-assessment.png']:
    shutil.copy(os.path.join(ROOT, 'assets', 'presentation', f), os.path.join(A, f))
os.makedirs(os.path.join(A, 'shots'), exist_ok=True)
for n in ['login', 'signup', 'dashboard', 'phase', 'report']:
    shutil.copy(os.path.join(ROOT, '_ppt_work', 'shots', n + '.png'), os.path.join(A, 'shots', n + '.png'))
print('assets ready')
