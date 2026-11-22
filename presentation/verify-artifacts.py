import pathlib,sys,zipfile,xml.etree.ElementTree as ET
B=pathlib.Path(__file__).resolve().parent
sys.path.insert(0,str(B.parent/'tmp/presentation/python-packages'))
import pymupdf
from PIL import Image,ImageDraw
root=B.parent
for name in ['RomanKnows_HTML_Deck.pdf','RomanKnows_HTML_Print.pdf']:
 d=pymupdf.open(root/'public'/name)
 print(name,'pages:',len(d),'page size:',d[0].rect,'text characters:',sum(len(p.get_text()) for p in d))
 assert len(d)==15
 d[0].get_pixmap(matrix=pymupdf.Matrix(1.5,1.5)).save(str(B/'qa'/name.replace('.pdf','-cover.png')))
 for i,p in enumerate(d):
  assert len(p.get_images())>0 or len(p.get_text())>0,f'Blank page {i+1}'
with zipfile.ZipFile(root/'public/RomanKnows_HTML_Deck.pptx') as z:
 slides=[n for n in z.namelist() if __import__('re').fullmatch(r'ppt/slides/slide\d+\.xml',n)]
 print('PowerPoint slide count:',len(slides));assert len(slides)==15
 for n in slides:
  t=ET.fromstring(z.read(n));assert t.findall('.//{http://schemas.openxmlformats.org/presentationml/2006/main}pic'),n
sheet=Image.new('RGB',(1600,1630),'#dce3e9');draw=ImageDraw.Draw(sheet)
for i in range(1,16):
 im=Image.open(B/'qa'/f'slide-{i:02}.png').convert('RGB');im.thumbnail((520,293));x=((i-1)%3)*533;y=((i-1)//3)*326
 sheet.paste(im,(x,y+24));draw.text((x+8,y+5),f'{i:02}',fill='#132b3c')
sheet.save(root/'public/RomanKnows_HTML_Preview.jpg',quality=90)
print('Preview saved.')
