from pathlib import Path
import sys, os, json, math
BASE=Path(__file__).resolve().parent
sys.path.insert(0,str(BASE.parent/'peb-libs'))
os.environ['MPLCONFIGDIR']=str(BASE/'mpl-cache')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Polygon, Circle
import numpy as np

OUT=Path(r'D:\my-wings\output\peb-training-report')
FIG=OUT/'figures'; FIG.mkdir(parents=True,exist_ok=True)
D=json.loads((BASE/'analysis-data.json').read_text())
NAVY='#183247'; TEAL='#087e8b'; GREY='#637785'; ORANGE='#b76230'; LIGHT='#e8f0f3'
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':9,'axes.spines.top':False,'axes.spines.right':False,'axes.labelcolor':NAVY,'text.color':NAVY,'axes.edgecolor':GREY})
def save(fig,name):
    fig.savefig(FIG/(name+'.png'),dpi=220,bbox_inches='tight',facecolor='white')
    plt.close(fig)
def clean(ax,xlim,ylim):
    ax.set_xlim(*xlim);ax.set_ylim(*ylim);ax.axis('off');ax.set_aspect('equal')
def line(ax,x,y,c=NAVY,lw=1.5,**kw):ax.plot(x,y,color=c,lw=lw,**kw)
def txt(ax,x,y,t,**kw):ax.text(x,y,t,ha=kw.pop('ha','center'),va=kw.pop('va','center'),**kw)
def dim(ax,p1,p2,label,offset=(0,0),fs=8):
    x1,y1=p1;x2,y2=p2;dx,dy=offset
    for x,y in [p1,p2]:line(ax,[x,x+dx],[y,y+dy],GREY,.6)
    ax.annotate('',(x1+dx,y1+dy),(x2+dx,y2+dy),arrowprops={'arrowstyle':'<->','lw':.7,'color':GREY})
    txt(ax,(x1+x2)/2+dx,(y1+y2)/2+dy,label,fontsize=fs,bbox={'facecolor':'white','edgecolor':'none','pad':1.5})
def support(ax,x,y):
    ax.add_patch(Polygon([[x,y],[x-.32,y-.6],[x+.32,y-.6]],closed=True,fill=False,edgecolor=TEAL,lw=1.2))
    line(ax,[x-.45,x+.45],[y-.65,y-.65],TEAL,1)

# Three-dimensional geometry, using the supplied analytical incidences.
fig,ax=plt.subplots(figsize=(10,4.8))
for key,(a,b) in D['members'].items():
    m=int(key);pa=D['nodes'][str(a)];pb=D['nodes'][str(b)]
    color=TEAL if 230<=m<=289 else NAVY
    lw=.65 if 230<=m<=289 else 1.05
    ax.plot([.82*pa[2]+.60*pa[0],.82*pb[2]+.60*pb[0]],
            [pa[1]+.20*pa[2]-.30*pa[0],pb[1]+.20*pb[2]-.30*pb[0]],color=color,lw=lw,alpha=.8)
ax.set_aspect('equal');ax.margins(.045);ax.set_axis_off(); fig.subplots_adjust(0,0,1,1);save(fig,'model')

# Hand-calculation diagrams: these are deliberately identified as reference systems.
fig,axs=plt.subplots(3,2,figsize=(10,5.7),gridspec_kw={'height_ratios':[.7,1,1]})
w=6.075;L=6.0;x=np.linspace(0,L,101)
wc=8.405;Lc=3.0;xc=np.linspace(0,Lc,101)
for col,(span,load) in enumerate([(L,w),(Lc,wc)]):
    a=axs[0,col];a.set_xlim(-.4,span+.4);a.set_ylim(-.7,1.2);a.axis('off')
    line(a,[0,span],[0,0],NAVY,2)
    for pos in np.linspace(0,span,10):a.annotate('',(pos,.03),(pos,.75),arrowprops={'arrowstyle':'->','color':TEAL,'lw':1})
    if col==0:
        support(a,0,0);support(a,span,0)
    else:
        line(a,[0,0],[-.4,.45],NAVY,3)
    txt(a,span/2,1.05,f'{"Simply supported reference beam" if col==0 else "Cantilever reference beam"}\nL = {span:g} m; w = {load:g} kN/m',fontsize=9)
    xx=x if col==0 else xc
    v=load*span/2-load*xx if col==0 else load*(span-xx)
    mm=load*span*xx/2-load*xx**2/2 if col==0 else -load*(span-xx)**2/2
    for row,yy,label in [(1,v,'Shear V (kN)'),(2,mm,'Moment M (kN·m)')]:
        a=axs[row,col];a.axhline(0,color=GREY,lw=.7);a.plot(xx,yy,color=TEAL,lw=2);a.fill_between(xx,0,yy,color=TEAL,alpha=.12)
        a.set_xlim(0,span);a.set_ylabel(label);a.grid(alpha=.16)
        extreme=int(np.argmax(abs(yy)));a.annotate(f'{yy[extreme]:.2f}',(xx[extreme],yy[extreme]),xytext=(8,-10 if yy[extreme]>0 else 10),textcoords='offset points',fontsize=9)
        if row==2:a.set_xlabel('Distance from left support / fixed end (m)')
fig.tight_layout(h_pad=1.0,w_pad=3);save(fig,'sfd_bmd')

# GA plan and transverse section.
zs=[0,8.1,16.1,24.1,32.1,40.1,48.1,56.1,64.1,72.2]
fig,axs=plt.subplots(2,1,figsize=(10,10.2),gridspec_kw={'height_ratios':[1.5,1]})
a=axs[0];clean(a,(-7,80),(-9,43))
for z in zs:line(a,[z,z],[0,36],GREY,.7)
for x0 in [0,6,12,18,24,30,36]:line(a,[0,72.2],[x0,x0],TEAL if x0 in [0,18,36] else '#c0d1d8',1.2 if x0 in [0,18,36] else .6)
for z in zs:
    for xx in [0,18,36]:a.add_patch(Rectangle((z-.45,xx-.45),.9,.9,color=NAVY))
for z in [0,72.2]:
    for xx in [6,12,24,30]:a.add_patch(Rectangle((z-.4,xx-.4),.8,.8,color=NAVY))
for b in [0,5,8]:
    for low,high in [(i,i+6) for i in range(0,36,6)]:
        line(a,[zs[b],zs[b+1]],[low,high],TEAL,1)
        line(a,[zs[b],zs[b+1]],[high,low],TEAL,1)
for start,end in [(8.1,16.1),(32.1,40.1),(48.1,56.1)]:
    a.add_patch(Rectangle((start,-3),end-start,3,facecolor=LIGHT,edgecolor=TEAL,lw=1))
for i,z in enumerate(zs):
    txt(a,z,39,chr(65+i),fontweight='bold')
for xx in [0,6,12,18,24,30,36]:txt(a,-4,xx,f'{xx*1000:.0f}',fontsize=7)
dim(a,(0,36),(72.2,36),'72 200',offset=(0,6))
dim(a,(72.2,0),(72.2,36),'36 000',offset=(5,0))
for i in range(9):dim(a,(zs[i],0),(zs[i+1],0),f'{(zs[i+1]-zs[i])*1000:.0f}',offset=(0,-6),fs=7)
txt(a,36,45,'GA-01  |  ROOF / COLUMN PLAN',fontweight='bold',fontsize=11)
txt(a,36,-8.5,'Frame labels A–J assigned for this report. End-wall posts at 6 000 centres.',fontsize=8)
a=axs[1];clean(a,(-5,41),(-4,16))
line(a,[0,0,18,36,36],[0,10,11.5,10,0],NAVY,2.4);line(a,[18,18],[0,11.5],NAVY,2.4)
for xx in [0,18,36]:support(a,xx,0)
line(a,[-3,0],[5.75,6],TEAL,2);line(a,[-3,-3],[0,5.75],GREY,.5,ls='--')
for xx in [6,12,24,30]:line(a,[xx,xx],[0,10+min(xx,36-xx)/12],GREY,.6,ls='--')
dim(a,(0,0),(18,0),'18 000',offset=(0,-2));dim(a,(18,0),(36,0),'18 000',offset=(0,-2))
dim(a,(36,0),(36,10),'10 000',offset=(3,0));dim(a,(18,0),(18,11.5),'11 500',offset=(2.3,0))
txt(a,8,12.5,'Roof slope 1 : 12',fontsize=9);txt(a,-1,7,'3 000 canopy',fontsize=7)
txt(a,18,15,'GA-02  |  TYPICAL INTERIOR TRANSVERSE FRAME',fontweight='bold',fontsize=11)
txt(a,18,-3.5,'Dashed interior posts apply at gable ends only. All dimensions in mm; geometry diagram, NTS.',fontsize=8)
fig.tight_layout();save(fig,'ga')

# Section and member detail sheet; model dimensions, no invented fabrication connections.
fig,axs=plt.subplots(2,2,figsize=(10,9))
a=axs[0,0];clean(a,(-1.7,5),(-1,11.7))
y=[0,3,6,10]; depths=[.524,.659,.794,.974]
a.add_patch(Polygon([(0,0),(0,10),(.974,10),(.794,6),(.659,3),(.524,0)],fc=LIGHT,ec=NAVY,lw=1.5))
for yy,dd in zip(y,depths):
    line(a,[0,dd],[yy,yy],TEAL,1);txt(a,2.9,yy,f'D = {dd*1000:.0f}',fontsize=9)
for i in range(3):dim(a,(0,y[i]),(0,y[i+1]),f'{(y[i+1]-y[i])*1000:.0f}',offset=(-1,0),fs=8)
txt(a,1.5,11.4,'D-01  |  EXTERIOR COLUMN',fontsize=10,fontweight='bold')
txt(a,2.1,-.65,'Flanges 250 × 12; web 6\nDepth exaggerated for clarity',fontsize=8)
a=axs[0,1];clean(a,(-1,8),(-1,11.7))
a.add_patch(Polygon([(0,0),(0,10),(.95,10),(.42,0)],fc=LIGHT,ec=NAVY,lw=1.5))
txt(a,4.5,9.5,'Dtop = 1 150',fontsize=9);txt(a,4.5,.6,'Dbase = 500',fontsize=9)
dim(a,(0,0),(0,10),'11 500 actual height',offset=(-.7,0),fs=7)
txt(a,3.4,11.4,'D-02  |  RIDGE COLUMN',fontsize=10,fontweight='bold')
txt(a,4.3,5.2,'Flanges 350 × 25\nWeb 6\nMembers 154–161',fontsize=9)
txt(a,3.4,-.65,'Source web-thickness warning applies.\nRevision required before fabrication.',fontsize=8,color=ORANGE)
a=axs[1,0];clean(a,(-1,19),(-3,10))
xx=[0,3.98618,6,12,18];dd=[.924,.524,.524,.524,.974]
top=[4+.083333*t for t in xx];bot=[t-d*3 for t,d in zip(top,dd)]
a.add_patch(Polygon(list(zip(xx,top))+list(zip(xx[::-1],bot[::-1])),fc=LIGHT,ec=NAVY,lw=1.5))
for x0,t,b,d in zip(xx,top,bot,dd):
    line(a,[x0,x0],[b,t],TEAL,1);txt(a,x0,t+1,f'{d*1000:.0f}',fontsize=8)
txt(a,9,9,'D-03  |  HALF-ROOF RAFTER PROFILE',fontsize=10,fontweight='bold')
txt(a,9,-.4,'Eave → knee tip → intermediate nodes → ridge\nFlanges 275 × 12 throughout\nWeb 6 at tapers; web 5 in constant-depth lengths',fontsize=8)
dim(a,(0,2),(18,2),'18 000 horizontal',offset=(0,-4),fs=8)
a=axs[1,1];clean(a,(-1,12),(-3,10))
txt(a,5.5,9,'D-04  |  SECONDARY SECTIONS',fontsize=10,fontweight='bold')
line(a,[0,0,2,2,4,4],[4.6,5.2,5.2,1.2,1.2,1.8],TEAL,2.5)
txt(a,2,-.7,'Z purlin / girt\nSee member schedule',fontsize=8)
a.add_patch(Rectangle((6,3.1),2.1,2.1,fill=False,edgecolor=NAVY,lw=2.5));a.add_patch(Rectangle((6.12,3.22),1.86,1.86,fill=False,edgecolor=NAVY,lw=.6))
txt(a,7,1.9,'SHS\n150 × 150 × 4',fontsize=8)
a.add_patch(Circle((10,4.1),.5,fc=LIGHT,ec=NAVY,lw=1.5));txt(a,10,1.9,'Rod\nØ25',fontsize=8)
txt(a,5.5,-2.5,'Dimensions in mm. Schematic profiles; not fabrication templates.',fontsize=8)
fig.tight_layout();save(fig,'sections')

# Concept connection details with variable dimensions.
fig,axs=plt.subplots(2,2,figsize=(10,8.5))
for a in axs.flat:clean(a,(0,10),(0,9))
a=axs[0,0];txt(a,5,8.6,'C-01  |  PINNED BASE CONCEPT',fontweight='bold',fontsize=10)
a.add_patch(Rectangle((1.6,.8),6.8,1.4,fc=LIGHT,ec=GREY));a.add_patch(Rectangle((2.2,2.2),5.6,.3,fc='#bacdd6',ec=NAVY))
line(a,[3.5,3.5],[2.5,6.7],NAVY,2);line(a,[5,5],[2.5,6.7],NAVY,1);line(a,[6.5,6.5],[2.5,6.7],NAVY,2)
for x in [2.8,7.2]:
    line(a,[x,x,x+.5],[3.2,1.1,1.1],TEAL,1.5);a.add_patch(Rectangle((x-.18,2.6),.36,.15,fc=TEAL))
txt(a,5,7.4,'Column welded to base plate',fontsize=8)
dim(a,(2.2,2.2),(7.8,2.2),'Bp (design)',offset=(0,-1.9))
txt(a,5,4.1,'tp, anchors, grout and pedestal\nto be designed from N, V and uplift',fontsize=8,bbox={'facecolor':'white','edgecolor':'none','pad':2})
a=axs[0,1];txt(a,5,8.6,'C-02  |  EAVE MOMENT JOINT',fontweight='bold',fontsize=10)
line(a,[1.7,1.7],[.7,6.4],NAVY,2);line(a,[3.3,3.3],[.7,6.4],NAVY,2)
line(a,[3.5,9],[6.4,7.1],NAVY,2);line(a,[3.5,9],[4.5,5.8],NAVY,2)
line(a,[3.45,3.45],[4,7.2],TEAL,3)
for yy in [4.4,5,5.6,6.2,6.8]:a.add_patch(Circle((3.5,yy),.1,fc=ORANGE))
line(a,[1.7,3.3],[6.4,6.4],TEAL,1.2);line(a,[1.7,3.3],[4.5,4.5],TEAL,1.2)
txt(a,6.9,3.5,'End plate, bolt rows, stiffeners\nand welds sized for M, N, V\nBolt pattern shown schematically',fontsize=8)
a=axs[1,0];txt(a,5,8.6,'C-03  |  RIDGE / APEX JOINT',fontweight='bold',fontsize=10)
line(a,[.5,5,9.5],[5.8,6.6,5.8],NAVY,2);line(a,[.5,5,9.5],[4.5,4.7,4.5],NAVY,2)
line(a,[4.85,4.85],[4.1,7],TEAL,2);line(a,[5.15,5.15],[4.1,7],TEAL,2)
for yy in [4.4,5,5.6,6.2,6.8]:line(a,[4.65,5.35],[yy,yy],ORANGE,1.3)
line(a,[4.1,4.1],[.8,4.7],NAVY,2);line(a,[5.9,5.9],[.8,4.7],NAVY,2)
txt(a,5,2.4,'Ridge column connection and rafter splice\nrequire coordinated moment / shear transfer',fontsize=8,bbox={'facecolor':'white','edgecolor':'none','pad':2})
a=axs[1,1];txt(a,5,8.6,'C-04  |  BRACING & PURLIN CLEAT',fontweight='bold',fontsize=10)
line(a,[1,1],[4.1,7.8],NAVY,2);a.add_patch(Polygon([[1,4.3],[1,6.8],[4,6.8]],fc=LIGHT,ec=NAVY))
line(a,[2.4,8.5],[5.7,2.3],TEAL,2)
for xx,yy in [(2.1,5.9),(2.8,5.5)]:a.add_patch(Circle((xx,yy),.13,fill=False,ec=NAVY))
txt(a,6.7,6.5,'Gusset + rod-end fitting\nVerify net section, block shear,\nedge distances and turnbuckle',fontsize=8)
line(a,[.8,3.8],[1,1],NAVY,2);line(a,[1.7,1.7,2.7],[1,2.5,2.5],TEAL,2)
txt(a,6.5,.9,'Cleat transfers purlin reaction;\nprovide required flange restraint.',fontsize=8)
fig.tight_layout();save(fig,'connections')

# A compact chart showing recorded check coverage, not certifying the design.
fig,ax=plt.subplots(figsize=(9,2.4))
ids=[12,23,39,147,154,161,194,290]
rows=[next(r for r in D['checks'] if r['member']==i) for i in ids]
ax.bar([str(i) for i in ids],[r['ratio'] for r in rows],color=[ORANGE if r['ratio']>1 else TEAL for r in rows],width=.58)
ax.axhline(1,color=ORANGE,lw=1,ls='--');ax.set_ylim(0,1.22);ax.set_ylabel('Recorded utilization');ax.set_xlabel('STAAD member number')
for i,r in enumerate(rows):ax.text(i,r['ratio']+.035,f"{r['ratio']:.3f}",ha='center',fontsize=8)
ax.grid(axis='y',alpha=.15);fig.tight_layout();save(fig,'ratios')
print('Figures generated:',len(list(FIG.glob('*.png'))))
