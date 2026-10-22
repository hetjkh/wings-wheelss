from pathlib import Path
import sys, re, json
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'peb-libs'))
import pymupdf as fitz
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parent
pdf = fitz.open(r'D:\1000016606.pdf')
print('PDF pages:', len(pdf))
texts=[]
for i,p in enumerate(pdf):
    text=p.get_text()
    texts.append(f'\n--- PDF PAGE {i+1} ---\n{text}')
    print(i+1, str(p.rect), len(text), text[:250].replace('\n',' | '))
    p.get_pixmap(matrix=fitz.Matrix(2,2), clip=fitz.Rect(44,285,551,572)).save(ROOT / f'slide-{i+1:02}.png')
(ROOT/'pdf-extracted.txt').write_text(''.join(texts), encoding='utf-8')

anl=Path(r'C:\Users\Admin\Downloads\R1_PEB.ANL').read_text(errors='replace')
commands={int(m[1]):m[2].strip() for m in re.finditer(r'^\s+(\d+)\. (.+)$',anl,re.M)}
(ROOT/'commands.json').write_text(json.dumps(commands,indent=2))
nodes={}
for n in range(8,46):
    for entry in commands[n].split(';'):
        x=entry.split(); nodes[int(x[0])]=list(map(float,x[1:]))
members={}
for n in range(47,95):
    for entry in commands[n].split(';'):
        x=list(map(int,entry.split())); members[x[0]]=x[1:]
blocks=re.split(r'(?=\|[ *]+Member Number:)',anl)
checks=[]
for b in blocks:
    m=re.search(r'Member Number:\s+(\d+).*?Status:\s+(\w+)\s+Ratio:\s+([\d.]+)\s+Critical Load Case:\s+(\d+)\s+Location:\s+([\d.]+)',b,re.S)
    if not m: continue
    num,status,ratio,lc,loc=m.groups()
    row=dict(member=int(num),status=status,ratio=float(ratio),lc=int(lc),location=float(loc))
    for axis in ['FX','FY','FZ','MX','MY','MZ']:
        f=re.search(r'\b'+axis+r':\s+([-\d.E+]+)',b)
        row[axis]=float(f[1]) if f else None
    pre=anl[:anl.find(b[:100])]
    pgs=re.findall(r'PAGE NO\.\s+(\d+)',pre)
    row['page']=int(pgs[-1]) if pgs else None
    checks.append(row)
warnings=re.findall(r'\*\*\*WARNING:.*?(?=\f|STAAD.PRO CODE CHECKING)',anl,re.S)
disps=[]
for m in re.finditer(r'MAXIMUM DISPLACEMENTS.*?LOADING\s+(\d+)\)(.*?)(?:EXTERNAL|\f)',anl,re.S):
    row={'load':int(m[1])}
    for axis in ['X','Y','Z']:
        f=re.search(r'\b'+axis+r'\s*=\s*([-\d.E+]+)\s+(\d+)',m[2])
        if f: row[axis]={'mm':float(f[1])*10,'node':int(f[2])}
    disps.append(row)
summary={'nodes':nodes,'members':members,'checks':checks,'displacements':disps,'warnings':warnings}
(ROOT/'analysis-data.json').write_text(json.dumps(summary,indent=2))
print('Checks:',len(checks),'status:',{s:sum(c['status']==s for c in checks) for s in {c['status'] for c in checks}})
print('Top ratios:',sorted(checks,key=lambda r:r['ratio'],reverse=True)[:15])
print('Warnings:',len(warnings),'unique members:',sorted(set(map(int,re.findall(r'FOR MEMBER #\s+(\d+)',anl)))))
print('Displacements:',disps)
for batch in range(5):
    start=batch*16
    montage=Image.new('RGB',(1600,4*252),'#e5e7eb'); draw=ImageDraw.Draw(montage)
    for j in range(16):
        idx=start+j
        if idx>=len(pdf): break
        img=Image.open(ROOT / f'slide-{idx+1:02}.png'); img.thumbnail((395,224))
        x=(j%4)*400; y=(j//4)*252
        montage.paste(img,(x,y+22)); draw.text((x+5,y+4),f'PDF PAGE {idx+1}',fill='black')
    montage.save(ROOT/f'contact-{batch+1}.jpg')
