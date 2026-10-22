from pathlib import Path
import sys, io, json, copy, re, html, shutil
BASE=Path(__file__).resolve().parent
sys.path.insert(0,str(BASE.parent/'peb-libs'))
import pymupdf as fitz
from PIL import Image, ImageDraw
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as Picture, Flowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from report_content import PAGES as ORIGINAL

OUT=Path(r'D:\my-wings\output\peb-training-report')
FIG=OUT/'figures'; REVIEW=BASE/'academic-review'; REVIEW.mkdir(exist_ok=True)
for name,file in [('TNR','times.ttf'),('TNR-Bold','timesbd.ttf'),('TNR-Italic','timesi.ttf')]:
    pdfmetrics.registerFont(TTFont(name,'C:/Windows/Fonts/'+file))
pdfmetrics.registerFontFamily('TNR',normal='TNR',bold='TNR-Bold',italic='TNR-Italic',boldItalic='TNR-Bold')
W,H=A4; M=53; CW=W-2*M; BLUE='#4668ac'
def block(kind,text='',**kw):return dict(kind=kind,text=text,**kw)
def section(title,blocks,chapter=None):return dict(title=title,blocks=blocks,chapter=chapter)

abstract=section('ABSTRACT',[
block('p','Structural engineering training connects classroom principles with the practical interpretation of project drawings, loading assumptions, analysis models and design output. In a pre-engineered steel building, the geometry of the primary frames, the restraint provided by secondary steel and the behaviour of the connections must be considered together. This report presents a four-week study of these aspects using the project records supplied for a proposed PEB industrial building in Chennai.'),
block('p','The building has a plan dimension of 36 m × 72.2 m, a roof slope of 1:12, an analytical eave height of 10 m and a ridge height of 11.5 m. Ridge columns divide the roof into two 18 m horizontal spans. The structural system comprises tapered built-up steel columns and rafters, longitudinal hollow-section members, tension-only rod bracing, cold-formed secondary members and profiled roof and wall cladding. The supplied STAAD.Pro model contains 180 joints, 314 members and 38 pinned supports.'),
block('p','The first week covers preliminary project information, types of structures, design-load calculations and load cases. The second week explains the structural model, the analysis of members, shear force and bending moment diagrams, member forces and displacement checks. The third week addresses proportioning, member dimensions, strength and stability checks for columns, rafters, secondary steel and bracing, together with connection-design requirements. The fourth week covers general detailing notes, dimensioned arrangement drawings, member profiles and connection concepts.'),
block('p','The study is based on the supplied 68-page training PDF and R1_PEB.ANL analysis output. Calculations and recorded results are distinguished from illustrative teaching examples. Review of the analysis identified a load-combination discrepancy, two failed member checks and unresolved analysis/design warnings; these are documented in the technical chapters. No revised STAAD run or final connection/foundation design is claimed. The report provides a structured academic account of the design process, with demonstration personal details and drawings intended for training use.')])

intro1=section('CHAPTER 1: INTRODUCTION',[
block('h','1.1 General'),
block('p','Structural engineering deals with the analysis and design of systems that transfer loads safely to the ground while providing suitable stiffness, stability and durability. For steel buildings, member resistance must be considered together with local buckling, overall stability, connection behaviour and the restraint available during construction and service. The design process therefore extends from understanding the project requirements to coordinating the analytical model with the drawings.'),
block('p','A pre-engineered building uses an engineered combination of primary frames, secondary members and cladding. Tapered built-up sections allow the distribution of steel to follow the structural demand. Repeated framing arrangements support efficient fabrication and erection, but the benefits depend on correctly defined loads, reliable connections and adequate bracing. This training report follows that process through the supplied PEB case study.'),
block('h','1.2 About the Project'),
block('p','The case study is a proposed industrial PEB with a 36 m transverse width and 72.2 m longitudinal length, giving a plan area of 2,599.2 m². Ten transverse frame lines form nine longitudinal bays. The two end bays are 8.1 m long and the seven intermediate bays are 8.0 m long. The analytical eaves are at 10.0 m and the ridge is at 11.5 m, consistent with a roof rise of 1.5 m and a slope of 1:12.'),
block('p','The model includes interior ridge columns and gable-end posts. Accordingly, the 36 m building width is not an unobstructed clear span: the roof is supported over two 18 m horizontal spans. The source input sheet states 9.5 m clear height, 0.47 mm Galvalume roof and wall sheeting, a 3 m brick-wall height and three canopy zones. The project particulars and member families are summarized in Chapter 2.'),
block('h','1.3 Location and Site Details'),
block('p','The supplied project input sheet identifies Chennai as the location. The wind and earthquake inputs adopted in the training records are reproduced in Chapter 3. A precise site address, site survey and geotechnical report were not supplied; soil bearing capacity, foundation dimensions and other site-specific information are therefore not assumed.'),
block('h','1.4 Type of Structure'),
block('p','The primary system consists of steel columns and rafters forming moment-resisting transverse frames. Longitudinal hollow-section members and roof/wall bracing provide the longitudinal load path. Purlins, girts and eave struts transfer cladding loads to the primary steel and provide restraint where designed. Column bases are modelled as pinned; they still transfer vertical force, horizontal shear and possible uplift.'),
block('source','[S1] project inputs and geometry, pp.1–4; [S2] joint coordinates, member incidences and support definitions. References are listed on page 24.')],chapter=1)

intro2=section('CHAPTER 1: INTRODUCTION (CONTINUED)',[
block('h','1.5 Objectives and Scope of the Training'),
block('p','The objectives are to understand the structural arrangement of a PEB; trace gravity and lateral load paths; calculate the design loads adopted in the source records; interpret analysis forces and displacements; explain proportioning and design checks for the main structural members; and prepare coherent design notes and study drawings. The scope covers the four weekly topics requested for the training report.'),
block('p','The study addresses columns, rafters, canopy beams, longitudinal struts, purlins, girts, rods and their connection requirements. Member checks available in the ANL are reported with their limitations. Components for which complete design information is unavailable are discussed through design procedures or clearly identified examples, rather than assigned unsupported sizes or pass results.'),
block('h','1.6 Methodology'),
block('p','The work follows six stages: (i) review the supplied training PDF and analysis output; (ii) extract project geometry, materials, member sizes and loading assumptions; (iii) reproduce representative load calculations; (iv) examine the model, forces, displacement summaries, code checks and warnings; (v) explain the design of primary and secondary members using source results and worked examples; and (vi) prepare a member schedule, arrangement drawings and connection concepts.'),
block('p','The numerical checks in this report are documentary and arithmetic checks of the supplied records. They are not a new structural analysis. In particular, an input correction requires a revised analysis before its effects on forces, member utilization or foundation reactions can be established.'),
block('h','1.7 Organization of the Report'),
block('p','Chapter 2 describes the project information and structural systems. Chapter 3 presents the first-week load calculations and combination register. Chapter 4 covers the second-week structural analysis and results. Chapter 5 explains third-week member proportioning and design. Chapter 6 presents fourth-week detailing notes and drawings. Chapter 7 concludes the study and provides the source register. The table of contents gives the page locations of individual sections.'),
block('h','1.8 Documentation and Evidence Basis'),
block('p','[S1] denotes the supplied file 1000016606.pdf, with references to its physical PDF pages. [S2] denotes R1_PEB.ANL, with references to numbered input commands or printed STAAD pages. [R1–R4] denote the external technical references listed in Chapter 7. “Calculated” identifies arithmetic from stated inputs; “illustrative” identifies a teaching example; and “recorded” identifies a result transcribed from the supplied analysis.'),
block('p','The cover uses demonstration student, institution, company and supervisor details, as requested. These entries do not certify attendance or site visits. The report retains the source’s design findings, including the failed checks and unresolved warnings, and the drawing sheets are marked for training use.')])

# Preserve all original technical pages; four additional pages precede them.
pages=[copy.deepcopy(ORIGINAL[0]),abstract,section('TABLE OF CONTENTS',[]),section('TABLE OF CONTENTS (CONTINUED)',[]),intro1,intro2]
specs=[
(2,'CHAPTER 2: DETAILED PROJECT DESCRIPTION','2.1 Preliminary Information and Structural Systems'),
(3,'CHAPTER 3: STRUCTURAL ENGINEERING TRAINING – 1st WEEK','3.1 Dead Load and Imposed Load Calculations'),
(None,None,'3.2 Wind and Earthquake Load Calculations'),
(None,None,'3.3 Load Cases and Combination Register'),
(4,'CHAPTER 4: STRUCTURAL ENGINEERING TRAINING – 2nd WEEK','4.1 Structural Model and Analysis Procedure'),
(None,None,'4.2 Shear Force and Bending Moment Diagrams'),
(None,None,'4.3 Recorded Forces in Representative Members'),
(None,None,'4.4 Displacements, Equilibrium and Model Review'),
(5,'CHAPTER 5: STRUCTURAL ENGINEERING TRAINING – 3rd WEEK','5.1 Proportioning and Member-Size Schedule'),
(None,None,'5.2 Design of Columns and Gable Posts'),
(None,None,'5.3 Design of Rafters and Canopy Beams'),
(None,None,'5.4 Secondary Steel and Bracing Design'),
(None,None,'5.5 Design Coverage, Connections and Quantities'),
(6,'CHAPTER 6: STRUCTURAL ENGINEERING TRAINING – 4th WEEK','6.1 General Notes for Design and Detailing'),
(None,None,'6.2 General Arrangement and Frame Elevation'),
(None,None,'6.3 Member Profiles and Section Details'),
(None,None,'6.4 Connection Details and Drawing Completion'),
(7,'CHAPTER 7: CONCLUSION','7.1 Learning Outcomes, Conclusions and References')]

for old,(chapter,title,sub) in zip(ORIGINAL[2:],specs):
    pg=copy.deepcopy(old);pg['chapter']=chapter;pg['section']=sub;pg['title']=title or sub.upper()
    if chapter:pg['blocks'].insert(0,block('h',sub))
    prefix=sub.split()[0];count=0
    for b in pg['blocks']:
        if b['kind']=='h' and b['text']!=sub:
            count+=1;b['text']=f'{prefix}.{count} '+b['text']
        # Update report-internal pointers only; source-file page citations stay intact.
        if 'text' in b:
            b['text']=b['text'].replace('Actual canopy results appear on p.9.','Actual canopy results appear on p.13.')
            b['text']=b['text'].replace('described on p.14.','described on p.18.')
            b['text']=b['text'].replace('Pages 17–19','Pages 21–23')
        if b['kind']=='fig':
            b['caption']=b['caption'].replace('on p.14','on p.18')
        if b['kind']=='table':
            for row in b['rows']:
                for i,v in enumerate(row):
                    row[i]=v.replace('are on p.14.','are on p.18.') if isinstance(v,str) else v
            if b['headers']==['Sheet','Report page','Contents / issue status']:
                for row in b['rows']:row[1]=str(int(row[1])+4)
    pages.append(pg)

# Keep the figure caption synchronized with the updated secondary-member schedule.
for pg in pages:
    for b in pg['blocks']:
        if b['kind']=='fig' and b['name']=='sections':
            b['caption'] += ' Secondary-member sizes are listed on page 18.'

assert len(pages)==24
toc=[(0,'ABSTRACT',2)]
for i,pg in enumerate(pages,1):
    if i<5:continue
    if pg.get('chapter'):toc.append((0,pg['title'],i))
    if pg.get('section'):toc.append((1,pg['section'],i))
    for b in pg['blocks']:
        if b['kind']=='h' and b['text']!=pg.get('section'):
            toc.append((1 if i in [5,6] else 2,b['text'],i))
# Divide at a chapter boundary, balancing the two contents pages.
split=next(j for j,e in enumerate(toc) if e[1].startswith('CHAPTER 5:'))
pages[2]['toc']=toc[:split];pages[3]['toc']=toc[split:]

def sty(size=11.4,leading=15.1,bold=False,align=TA_LEFT,**kw):
    return ParagraphStyle('s',fontName='TNR-Bold' if bold else 'TNR',fontSize=size,leading=leading,textColor=black,alignment=align,spaceAfter=kw.pop('spaceAfter',7),**kw)
def para(text,style):return Paragraph(str(text).replace('\n','<br/>'),style)
def pic(name,height):
    im=Image.open(FIG/(name+'.png'));ratio=im.width/im.height;width=min(CW,height*ratio)
    return Picture(str(FIG/(name+'.png')),width=width,height=width/ratio,hAlign='CENTER')
def band(title):
    t=Table([[para(title,sty(15,18,bold=True,align=TA_CENTER,spaceAfter=0))]],colWidths=[CW])
    t.setStyle(TableStyle([('LINEABOVE',(0,0),(-1,-1),.65,HexColor(BLUE)),('LINEBELOW',(0,0),(-1,-1),.65,HexColor(BLUE)),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9)]))
    return t
class TocEntry(Flowable):
    def __init__(self,level,label,page):
        super().__init__();self.level=level;self.label=label;self.page=page;self.width=CW
        self.font='TNR-Bold' if level==0 else 'TNR';self.size=10.6 if level==0 else 10.8
        self.indent=0 if level==0 else 12 if level==1 else 23
        maxw=CW-self.indent-25;words=label.split();lines=[];s=''
        for word in words:
            new=(s+' '+word).strip()
            if pdfmetrics.stringWidth(new,self.font,self.size)>maxw and s:lines.append(s);s=word
            else:s=new
        lines.append(s);self.lines=lines;self.height=15.1*len(lines)+(5 if level==0 else 0)
    def draw(self):
        c=self.canv;c.setFillColor(black);c.setFont(self.font,self.size)
        for i,s in enumerate(self.lines):
            y=self.height-12-15.1*i;c.drawString(self.indent,y,s)
            if i==len(self.lines)-1:
                a=self.indent+pdfmetrics.stringWidth(s,self.font,self.size)+4
                c.drawRightString(CW,y,str(self.page));end=CW-17
                if end>a:
                    c.setFont('TNR',9);dots='.'*int((end-a)/pdfmetrics.stringWidth('.','TNR',9));c.drawString(a,y,dots)
                c.setFont(self.font,self.size)

def decorate(c,d,num):
    c.saveState();c.setFillColor(HexColor('#555555'));c.setFont('TNR',8)
    c.drawString(M,25,'Demo academic report • PEB structural engineering training')
    c.drawRightString(W-M,25,f'{num} / 24');c.restoreState()

def flows(pg,num,scale):
    if num==1:
        data=[['Student','Demo Student | Roll No. DEMO-001'],['Institution','Demo College of Engineering'],['Training organization','Demo Structural Consultants'],['Supervisor','Demo Training Supervisor'],['Training period','Four weeks — dates to be entered'],['Report issue','21 October 2026 | Revision D1']]
        tb=Table([[para(a,sty(11,14,bold=True)),para(b,sty(11,14))] for a,b in data],colWidths=[145,CW-145])
        tb.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6),('LINEBELOW',(0,0),(-1,-1),.35,HexColor('#c9c9c9'))]))
        return [Spacer(1,20),para('A<br/>STRUCTURAL ENGINEERING<br/>TRAINING REPORT',sty(22,29,bold=True,align=TA_CENTER)),Spacer(1,12),para('ON',sty(13,18,align=TA_CENTER)),para('ANALYSIS, DESIGN AND DETAILING OF A<br/>PRE-ENGINEERED STEEL BUILDING',sty(16,22,bold=True,align=TA_CENTER)),para('Proposed PEB Industrial Building, Chennai',sty(12,18,align=TA_CENTER)),pic('model',185),Spacer(1,10),tb,Spacer(1,17),para('36 m × 72.2 m • Two 18 m roof spans • Four-week study',sty(11.5,16,align=TA_CENTER)),para('Demonstration personal details. Prepared from the supplied project records.<br/>Study drawings and illustrative calculations are identified in the report.',sty(10,14,align=TA_CENTER))]
    fs=[band(pg['title']),Spacer(1,12)]
    if 'toc' in pg:return fs+[TocEntry(*e) for e in pg['toc']]
    front=num in [2,5,6]
    body=sty((12.4 if num==2 else 11.8 if front else 11.2)*scale,(21.4 if num==2 else 17.5 if front else 14.5)*scale,align=TA_JUSTIFY,spaceAfter=12 if front else 7)
    for b in pg['blocks']:
        k=b['kind']
        if k=='p':fs.append(para(b['text'],body))
        elif k=='h':fs.append(para(b['text'],sty(12.5*scale,16*scale,bold=True,spaceBefore=4,spaceAfter=5)))
        elif k=='source':fs.append(para('Source basis: '+b['text'],sty(8.5*scale,11*scale)))
        elif k in ['note','eq']:
            t=Table([[para(b['text'],sty((10.1 if k=='note' else 10.6)*scale,13.8*scale))]],colWidths=[CW])
            t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),HexColor('#f2f4f8' if k=='eq' else '#f7f7f7')),('BOX',(0,0),(-1,-1),.35,HexColor('#c7c7c7')),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),4)]));fs += [t,Spacer(1,7)]
        elif k=='table':
            widths=b.get('widths') or [1/len(b['headers'])]*len(b['headers'])
            rows=[[para(x,sty(9.7*scale,12*scale,bold=True,spaceAfter=0)) for x in b['headers']]]+[[para(x,sty(9.7*scale,12*scale,spaceAfter=0)) for x in row] for row in b['rows']]
            t=Table(rows,colWidths=[CW*w/sum(widths) for w in widths],repeatRows=1)
            t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),HexColor('#dce3f1')),('GRID',(0,0),(-1,-1),.35,HexColor('#b4b4b4')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5),('TOPPADDING',(0,0),(-1,-1),3.5*scale),('BOTTOMPADDING',(0,0),(-1,-1),3.5*scale)]));fs += [t,Spacer(1,8)]
        elif k=='fig':fs += [pic(b['name'],b['height']*scale),Spacer(1,3),para(b['caption'],sty(9*scale,11.6*scale)),Spacer(1,3)]
        elif k=='reference':
            label=html.escape(b['label'])
            if b['url']:label=f'<link href="{html.escape(b["url"],quote=True)}" color="{BLUE}">{label}</link>'
            fs.append(para('<b>'+label+'</b> '+html.escape(b['text']),sty(9.5*scale,12.4*scale)))
    return fs

merged=fitz.open();scales=[]
for num,pg in enumerate(pages,1):
    for attempt in range(12):
        scale=1-.02*attempt;buf=io.BytesIO()
        doc=SimpleDocTemplate(buf,pagesize=A4,leftMargin=M,rightMargin=M,topMargin=55,bottomMargin=46)
        doc.build(flows(pg,num,scale),onFirstPage=lambda c,d:decorate(c,d,num),onLaterPages=lambda c,d:decorate(c,d,num))
        result=fitz.open(stream=buf.getvalue(),filetype='pdf')
        if len(result)==1:break
    assert len(result)==1,f'Page {num} overflow'
    scales.append(scale);merged.insert_pdf(result);print(f'Page {num}: scale {scale:.2f}')

# Contents links target physical report pages; bookmarks use the same page map.
bookmarks=[[1,'Cover',1],[1,'Abstract',2],[1,'Table of contents',3]]
for level,label,target in toc[1:]:bookmarks.append([min(level+1,3),label,target])
merged.set_toc(bookmarks)
for page_index in [2,3]:
    page=merged[page_index]
    for level,label,target in pages[page_index]['toc']:
        for r in page.search_for(label if len(label)<55 else label[:45]):
            page.insert_link({'kind':fitz.LINK_GOTO,'from':r,'page':target-1,'to':fitz.Point(0,0)})
merged.set_metadata({'title':'Structural Engineering Training Report — PEB Design (Updated)','author':'Demo Student','subject':'24-page academic report with abstract, contents and chapter-wise introduction','keywords':'PEB, training, abstract, table of contents, structural engineering'})
updated=OUT/'PEB_Structural_Engineering_Training_Report_Updated.pdf'
merged.save(updated,garbage=4,deflate=True)
canonical=OUT/'PEB_Structural_Engineering_Training_Report.pdf'
archive=OUT/'archive';archive.mkdir(exist_ok=True)
backup=archive/'PEB_Training_Report_Original_20_Pages.pdf'
if canonical.exists() and not backup.exists():shutil.copy2(canonical,backup)
shutil.copy2(updated,canonical)
(OUT/'report-content-updated.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2),encoding='utf-8')
for n in [1,2,3,4,5,6,7,8,11,15,20,21,22,23,24]:
    merged[n-1].get_pixmap(matrix=fitz.Matrix(1.2,1.2)).save(REVIEW/f'page-{n:02}.png')
for batch,start in enumerate([1,7,13,19],1):
    montage=Image.new('RGB',(6*250,380),'#dde1e6');dr=ImageDraw.Draw(montage)
    for j,n in enumerate(range(start,min(start+6,25))):
        pix=merged[n-1].get_pixmap(matrix=fitz.Matrix(.5,.5));im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples);im.thumbnail((240,345));montage.paste(im,(j*250+5,22));dr.text((j*250+8,5),str(n),fill='black')
    montage.save(REVIEW/f'contact-{batch}.jpg')
texts=[p.get_text() for p in merged]
assert len(merged)==24
assert 'ABSTRACT' in texts[1] and 'TABLE OF CONTENTS' in texts[2]
assert '1.1 General' in texts[4] and '1.8 Documentation' in texts[5]
assert '11.5EX' in texts[9] and '1.039' in texts[12]
assert all(f'{n} / 24' in t for n,t in enumerate(texts,1))
validation={'pages':24,'contents_entries':len(toc),'page_scales':scales,'all_original_technical_sections_retained':True,'original_archived':str(backup),'updated_pdf':str(updated)}
(OUT/'validation-updated.json').write_text(json.dumps(validation,indent=2))
print(json.dumps(validation,indent=2))
