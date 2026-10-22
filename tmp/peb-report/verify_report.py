from pathlib import Path
import sys,json,re,math,zipfile
BASE=Path(__file__).resolve().parent
sys.path.insert(0,str(BASE.parent/'peb-libs'))
import pymupdf as fitz
from docx import Document
OUT=Path(r'D:\my-wings\output\peb-training-report')
doc=fitz.open(OUT/'PEB_Structural_Engineering_Training_Report.pdf')
assert len(doc)==20
texts=[p.get_text() for p in doc]
assert all(f'{i:02} / 20' in t for i,t in enumerate(texts,1))
assert '12.25' in texts[13]
assert '11.5EX' in texts[5]
assert '1.039' in texts[8] and '1.038' in texts[8]
data=json.loads((BASE/'analysis-data.json').read_text())
assert len(data['nodes'])==180 and len(data['members'])==314
assert len(data['checks'])==251
assert {r['member'] for r in data['checks'] if r['status']=='FAIL'}=={154,161}
assert sum(r['status']=='PASS' for r in data['checks'])==249
assert math.isclose(36*72.2,2599.2)
assert math.isclose(.06*2181.48,130.8888)
assert math.isclose(6.075*6**2/8,27.3375)
assert math.isclose(8.405*3**2/2,37.8225)
assert round(5*1.5127*8100**4/(384*205000*33.75)/1e6,2)==12.25
assert round(math.pi*25**2/4*250/1.1/1000,2)==111.56
with zipfile.ZipFile(OUT/'PEB_Structural_Engineering_Training_Report.docx') as z:
    assert z.testzip() is None
    xml=z.read('word/document.xml').decode()
    assert xml.count('w:type="page"')==19
word=Document(OUT/'PEB_Structural_Engineering_Training_Report.docx')
assert len(word.tables)>15
low=[]
for i,p in enumerate(doc,1):
    for block in p.get_text('blocks'):
        if block[1]<18 or block[3]>825:low.append((i,block[:4]))
assert not low,low
report={'pdf_pages':len(doc),'pdf_words':sum(len(t.split()) for t in texts),'word_manual_page_breaks':19,'member_checks':251,'recorded_passes':249,'recorded_failures':[154,161],'checks':'Page count, extracted content, arithmetic, source counts, text bounds and DOCX package integrity passed. Word desktop pagination was not verified; PDF is the fixed 20-page version.'}
(OUT/'validation.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
