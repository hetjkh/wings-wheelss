"""Report text: supplied records are distinguished from calculations and demo details."""
PAGES=[]
def page(title,kicker):
    p={'title':title,'kicker':kicker,'blocks':[]};PAGES.append(p);return p
def add(kind,**kw):PAGES[-1]['blocks'].append({'kind':kind,**kw})
def p(text):add('p',text=text)
def h(text):add('h',text=text)
def table(headers,rows,widths=None):add('table',headers=headers,rows=rows,widths=widths)
def eq(text):add('eq',text=text)
def fig(name,caption,height):add('fig',name=name,caption=caption,height=height)
def note(text):add('note',text=text)
def source(text):add('source',text=text)

page('STRUCTURAL ENGINEERING\nTRAINING REPORT','FOUR-WEEK STUDY • DEMO EDITION')
add('cover')

page('Abstract, scope and report guide','ABOUT THIS REPORT')
h('Abstract')
p('This report presents a four-week study of the analysis, proportioning and detailing of a pre-engineered steel building (PEB). The case study is a proposed industrial building in Chennai, with a plan of 36 m × 72.2 m, a 1:12 roof slope, 10 m analytical eaves and ridge columns supporting two 18 m roof spans. It explains the transfer of gravity, wind and earthquake actions through primary frames, secondary steel and bracing to the foundations.')
p('The technical basis consists of a 68-page illustrated training PDF and the supplied STAAD.Pro analysis output. Calculations reproduce the load assumptions in those records; selected results are transcribed from the analysis. Additional hand calculations and drawings are explicitly educational. No new STAAD analysis or connection-design run has been performed.')
h('Acknowledgement and declaration — demonstration text')
p('The trainee acknowledges the guidance of the training supervisor and faculty mentor in studying structural modelling, steel design and engineering drawings. Student, institution, company and supervisor particulars on the cover are demonstration entries. This report does not certify attendance, site visits, completed fabrication or professional design approval.')
table(['Report section','Pages','Main deliverable'],[
['Week 1: project and loading','3–6','Project brief, structural types, load calculations and case register'],
['Week 2: structural analysis','7–10','Model interpretation, shear and moment diagrams, forces and displacements'],
['Week 3: member design','11–15','Section sizes, column/rafter checks, secondary steel and design coverage'],
['Week 4: detailing','16–19','General notes, dimensioned arrangement and member/connection study sheets'],
['Conclusion and references','20','Learning outcomes, open items and source register']],[.38,.12,.50])
h('How evidence is identified')
p('<b>[S1]</b> means the supplied PDF; its page numbers refer to the physical PDF pages. <b>[S2]</b> means R1_PEB.ANL; references identify printed STAAD pages or numbered input commands. <b>[R1–R4]</b> identify external primary references on page 20. “Calculated” means arithmetic derived from stated inputs. “Illustrative” means a teaching example, not a verified project result.')
note('Design status: the output records 249 PASS and 2 FAIL results among 251 checked members. It also contains load-input discrepancies and design warnings. The report is suitable as a training draft; the drawings are not issued for construction.')

page('Project information and structural systems','WEEK 1 • PROJECT FAMILIARIZATION')
p('A PEB combines engineered primary frames with repetitive secondary members and profiled cladding. Built-up tapered sections allow the depth to vary with the force pattern. Shop-fabricated components are assembled on site, commonly using bolted field connections. The selected structural arrangement must also accommodate openings, drainage, services and erection stability.')
table(['Project parameter','Record adopted for this study'],[
['Project / location','Proposed PEB industrial building / Chennai [S1, p.1]'],
['Building plan','36.0 m transverse × 72.2 m longitudinal; plan area = 2,599.2 m²'],
['Frames and bays','10 frame lines; 9 bays = 8.1 + 7 × 8.0 + 8.1 m'],
['Vertical geometry','Analytical eave 10.0 m; ridge 11.5 m; stated clear height 9.5 m'],
['Roof geometry','Two 18 m horizontal half-spans; slope 1:12; half-rafter length 18.062 m'],
['Supports and gables','Ridge columns at interior frames; gable posts at 6 m spacing'],
['Cladding / openings','0.47 mm Galvalume roof and walls; 3 m brick-wall height; 3 framed openings'],
['Canopies / mezzanine','Three canopy zones with 3 m projection; no mezzanine stated'],
['Materials in analysis','Primary steel fy/fu = 345/490 MPa; SHS 310/450 MPa; rods 250/420 MPa']],[.31,.69])
h('Types of structures considered during training')
table(['System','Structural action and relevance'],[
['RCC frame','Concrete beams and columns resist bending and axial force; a useful comparison for stiffness, weight and construction sequence.'],
['Conventional steel frame','Rolled sections or trusses; suitable for varied layouts, with member sizes selected from standard products.'],
['PEB rigid frame','Welded tapered columns and rafters; moment joints provide transverse frame action. This is the principal system studied.'],
['Braced steel system','Roof and wall diagonals transfer longitudinal actions; the supplied model uses tension-only rods.'],
['Secondary / cladding system','Purlins, girts and eave struts transfer surface pressures to primary steel and provide designed restraints.']],[.28,.72])
eq('Roof rise = 18 / 12 = 1.50 m; roof angle = tan⁻¹(1/12) = 4.764°; sloping length = √(18² + 1.5²) = 18.062 m.')
note('The overall width is 36 m, but the model has ridge columns. It must therefore be described as a supported two-span arrangement, rather than a 36 m unobstructed clear span. Clear architectural height and analytical node elevation are different dimensions.')
source('[S1] pp.1–4; [S2] joint coordinates, commands 8–45, and material/design assignments.')

page('Dead load and imposed load calculations','WEEK 1 • GRAVITY ACTIONS')
h('Dead load (DL)')
p('The model generates steel self-weight in global −Y and multiplies it by 1.15 to include the stated connection allowance. Roof and wall loads are added separately. The training slides use the rounded conversion 100 kg ≈ 1 kN; the following reproduction retains their adopted load values. Detailed design should use a consistent unit-weight convention.')
table(['Roof load component','Adopted value','Calculation / interpretation'],[
['Roof sheeting','5 kg/m²','0.47 mm sheet, as assumed in the source'],
['Sag rods and flange braces','5 kg/m²','Allowance stated in the training PDF'],
['Collateral load','10 kg/m²','Services allowance; specific supported equipment requires confirmation'],
['Total surface allowance','0.20 kN/m²','20 kg/m² using the source conversion'],
['Load on main-frame rafter','1.620 kN/m','0.20 × 8.1 tributary width'],
['Purlin equivalent line load','0.551 kN/m','14 × 8.1 × 8.77 / 18.062 = 55.06 kg/m'],
['Total applied roof DL','2.171 kN/m','1.620 + 0.551; end-frame value ≈ 1.086 kN/m']],[.31,.21,.48])
p('The purlin assumption is Z 270 × 75 × 20 × 2.55 mm, weighing 8.77 kg/m. Fourteen lines along an 18.062 m slope correspond to 13 spaces, or about 1.389 m average spacing. A layout limited to 1.5 m spacing requires a ceiling operation: ceil(18.062/1.5) + 1 = 14 lines. The exact eave/ridge sharing and member layout must be reconciled.')
eq('Side-column DL = 0.10 × 8.1 + 0.608 ≈ 1.410 kN/m.\nGable-post DL = 0.10 × 6.0 + 0.380 = 0.980 kN/m.\nEave-strut + gutter point load = (10.70 + 5.89) × 8.1 / 100 = 1.344 kN.')
h('Roof imposed load and gutter water')
p('The training basis adopts 0.75 kN/m² for the low-slope roof without general access. Loads in the ANL are applied as member UDLs in global −Y. For final input, distinguish loads defined on plan area from loads per sloping member length; the source directly uses the tributary-width products below.')
eq('Main-frame roof LL = 0.75 × 8.1 = 6.075 kN/m.\nEnd-frame roof LL = 0.5 × 6.075 = 3.0375 kN/m.\nGutter-water load = 0.25 × 0.25 × 10 × 8.1 = 5.0625 kN per interior eave node.\nEnd-frame gutter-water load = 2.5313 kN (model rounded to 2.532 kN).')
note('The 8.1 m loading width is used in the supplied calculations even though most geometrical bays are 8.0 m. Brick-wall support, maintenance point loads, drainage blockage, erection loads and any equipment loads require an explicit design basis; they are not assumed to be verified by these calculations.')
source('[S1] pp.5, 9–12; [S2] commands 164–184. Imposed-load scope: [R2].')

page('Wind and earthquake load calculations','WEEK 1 • LATERAL ACTIONS')
h('Wind calculation reproduced from the training PDF')
table(['Input','Adopted source value'],[
['Basic wind speed and modifiers','Vb = 50 m/s; k1 = 1.0; k2 = 1.0; k3 = 1.0; k4 = 1.15'],
['Exposure / pressure modifiers','Terrain category 2; Kd = 1.0; Ka = 0.83; Kc = 0.90'],
['Internal pressure','Cpi = +0.5 and −0.5; source assumes 5–20% openings'],
['Dimensions used for coefficients','h/w = 10/36 = 0.278; L/w = 72.2/36 = 2.006']],[.38,.62])
eq('Vz = Vb k1 k2 k3 k4 = 50 × 1 × 1 × 1 × 1.15 = 57.5 m/s.\npz = 0.6 Vz² = 1,983.75 N/m² = 1.984 kN/m².\npd = Kd Ka Kc pz = 1 × 0.83 × 0.90 × 1.984 ≈ 1.482 kN/m².\nNet pressure = (Cpe − Cpi) pd; line load = net pressure × tributary width.')
table(['Surface / source coefficients','Worked line load at 8.1 m width'],[
['Windward wall; Cpe = +0.7, Cpi = +0.5','(+0.7 − 0.5) × 1.482 × 8.1 = +2.40 kN/m'],
['Windward wall; Cpe = +0.7, Cpi = −0.5','(+0.7 + 0.5) × 1.482 × 8.1 = +14.41 kN/m'],
['Roof EF at 0°; Cpe = −0.9, Cpi = +0.5','(−0.9 − 0.5) × 1.482 × 8.1 = −16.81 kN/m'],
['Roof GH at 0°; Cpe = −0.4, Cpi = +0.5','(−0.4 − 0.5) × 1.482 × 8.1 = −10.80 kN/m']],[.52,.48])
p('Negative pressure denotes suction on the surface. Its sign in STAAD depends on the member local axes: the ANL uses local Y for roof wind and global X/Z for wall wind. Coefficients, openings, area reductions, local cladding zones and the applicable wind map must be confirmed against the project-adopted standard; the slide values are not independently certified here.')
h('Earthquake calculation reproduced from the analysis')
p('The source uses an equivalent-static IS 1893 basis with Z = 0.16, R = 4, I = 1.2, 5% damping and medium soil. STAAD reports T = 0.53081 s, Sa/g = 2.50 and seismic weight W = 2,181.48 kN in both horizontal directions.')
eq('Ah = (Z / 2) × (I / R) × (Sa/g) = (0.16 / 2) × (1.2 / 4) × 2.5 = 0.060.\nVB = Ah W = 0.060 × 2,181.48 = 130.889 kN ≈ 130.89 kN.')
note('The seismic weight command uses SELFWEIGHT 1.5, while the DL case uses 1.15. The intended seismic mass must be reconciled. This report preserves the supplied code basis, including the PDF’s IS 1893 (Part 1):2016 reference; it does not establish the code edition or amendments required for a new 2026 approval.')
source('[S1] pp.13–27, 36–43; [S2] commands 142–163 and printed pp.4–5.')

page('Load cases and combination register','WEEK 1 • INPUT DOCUMENTATION')
table(['Case','Physical action','Model description'],[
['1 / 2','EL X+ / EL Z+','Positive-direction equivalent-static earthquake cases'],
['3 / 4','DL / LL','Gravity self-weight, roof/wall DL, roof LL and gutter loads'],
['5 / 6','WL 0° +Cpi / −Cpi','Transverse wind with both internal-pressure signs'],
['7 / 8','WL 90° +Cpi / −Cpi','Longitudinal wind with both internal-pressure signs']],[.13,.37,.50])
p('There are 8 primary cases, 19 strength combinations (101–119) and 13 service combinations (201–213). In the register below, W5…W8 refer to wind cases 5…8, and EX/EZ refer to cases 1/2. Combination titles are reproduced separately from the numerical input where they disagree.')
table(['Combination IDs','Expressions in the supplied model'],[
['101','1.5D + 1.5L'],
['102, 103, 104, 105','1.2D + 1.2L + 1.2W5 / W6 / W7 / W8, respectively'],
['106, 107','1.2D + 1.2L + 1.2EX / EZ, respectively'],
['108, 109, 110, 111','1.5D + 1.5W5 / W6 / W7 / W8, respectively'],
['112, 113','1.5D + 1.5EX / EZ, respectively'],
['114, 115, 116, 117','0.9D + 1.5W5 / W6 / W7 / W8, respectively'],
['118','Title: 0.9D + 1.5EX; ACTUAL INPUT: 0.9D + 11.5EX'],
['119','0.9D + 1.5EZ'],
['201','D + L'],
['202, 203','D + 0.8L + 0.8EX / EZ, respectively'],
['204, 205, 206, 207','D + 0.8L + 0.8W5 / W6 / W7 / W8, respectively'],
['208, 209','D + EX / EZ, respectively'],
['210, 211, 212, 213','D + W5 / W6 / W7 / W8, respectively']],[.29,.71])
h('Input checks identified during the study')
p('<b>LC118:</b> command 274 is “3 0.9 1 11.5”. The earthquake factor is 7.667 times the 1.5 stated in the title. A revised factor must be confirmed and analysed; the report does not silently substitute a corrected result. <b>Load classification:</b> cases 3–8 are also tagged LOADTYPE SEISMIC, despite their DL/LL/WL titles. These labels should be corrected for clear future processing.')
p('<b>Direction and wind-zone coverage:</b> explicit negative earthquake directions are absent from the listed cases. The 90° roof-pressure zones in PDF pp.37/43 also need reconciliation with ANL cases 7/8: case 8 applies +10.8 kN/m to both roof slopes, whereas the PDF table lists different zone values. Review the full required lateral-action set and local-axis signs before re-analysis.')
source('[S2] commands 156–302; strength/service envelopes at commands 304–307. [S1] pp.34–37, 43.')

page('Structural model and analysis procedure','WEEK 2 • ANALYSIS OF MEMBERS')
p('The model is a three-dimensional STAAD SPACE frame with 180 joints, 314 beam members and 38 pinned supports. Global X is across the 36 m width, Y is vertical and Z is along the 72.2 m length. Pins restrain translations and release support rotations; the bases still transfer vertical force, horizontal shear and possible uplift.')
fig('model','Figure 1. Analytical geometry reconstructed from the supplied joint coordinates and member incidences. Teal lines indicate the modelled rod bracing.',183)
table(['Analysis feature','Meaning for structural behaviour'],[
['Rigid primary frame joints','Rafters and columns transfer bending moment, shear and axial force in the transverse plane.'],
['Longitudinal members','SHS ties and roof/wall bracing provide a longitudinal load path and restraint where detailed.'],
['Tension-only diagonals','Members 230–289 are active in tension; the active set can change with load direction.'],
['Member end releases','Specified SHS ends release MY/MZ; upper gable posts have end releases. Releases must match actual connection behaviour.'],
['Rotated gable sections','BETA 90 is assigned to gable-post groups; the local major/minor axes must be checked.']],[.30,.70])
h('Analysis sequence and interpretation')
p('The study sequence is: establish geometry and connectivity; assign material and section properties; define supports, releases and restraints; apply loads; solve; check equilibrium and deformation; extract member forces; and complete strength and serviceability checks. Gravity flows from sheeting to purlins, rafters, columns and foundations. Longitudinal wind flows through the roof/wall bracing system to restrained bases.')
p('The supplied run uses PERFORM ANALYSIS and shows tension/compression iterations for primary cases. It then uses LOAD COMB to combine results. Bentley explains that tension-only behaviour and second-order effects require simultaneous combined loading, normally using appropriate REPEAT LOAD cases, rather than superposition of separate results [R3]. Re-analysis is therefore a necessary follow-up.')
source('[S2] printed pp.1–8 and commands 129–163, 303; [R3].')

page('Shear force and bending moment diagrams','WEEK 2 • WORKED MECHANICS')
p('Shear force describes the transverse force transmitted across a cut; bending moment describes the internal couple. For a downward UDL w and the usual sagging-positive beam convention, dV/dx = −w and dM/dx = V. Thus a constant UDL gives a straight shear diagram and a parabolic moment diagram. Diagram signs must be distinguished from STAAD local member-end sign conventions.')
fig('sfd_bmd','Figure 2. Calculated teaching diagrams for two idealized members. These are not extracted project-frame envelopes. The cantilever uses a downward reference load; an upward load reverses the diagram signs.',272)
h('Example A — simply supported reference beam')
eq('Assume L = 6.0 m and w = 6.075 kN/m (the source roof-LL line-load magnitude).\nRA = RB = wL/2 = 18.225 kN.\nV(x) = 18.225 − 6.075x kN.\nM(x) = 18.225x − 3.0375x² kN·m.\nAt x = L/2 = 3.0 m: V = 0 and Mmax = wL²/8 = 27.3375 kN·m.')
h('Example B — canopy reference cantilever')
eq('Assume L = 3.0 m and |w| = 8.405 kN/m, matching a supplied canopy wind-load magnitude.\n|Vfixed| = wL = 25.215 kN; |Mfixed| = wL²/2 = 37.8225 kN·m.')
p('The actual canopy member has a sloping length of about 3.010 m and participates in the three-dimensional frame. Its recorded governing forces therefore differ from this isolated, unfactored reference. Portal rafters also carry axial force and end moments; the simple-beam expression wL²/8 must not replace their frame analysis. Tension-only braces principally transmit axial force, while columns resist combined axial load and biaxial bending.')
source('Calculated examples using stated idealizations; load magnitudes from [S2] commands 180 and 197. Actual canopy results appear on p.9.')

page('Recorded forces in representative members','WEEK 2 • ANALYSIS RESULTS')
p('The following values are the <b>concurrent critical design forces</b> printed at each member’s governing code-check location. They are not separate maximum envelopes. FX is axial force; FY and FZ are local shears; MZ and MY are the corresponding bending moments. The dominant FY/MZ pair is shown here. Forces are in kN and moments in kN·m; negative FX denotes tension in these output rows.')
table(['Member / role','LC / x (m)','FX','FY','MZ','Ratio'],[
['21 / exterior column base segment','114 / 3.00','−222.398','69.792','−209.375','0.499'],
['194 / upper exterior column','114 / 4.00','−203.925','47.744','−672.842','0.809'],
['23 / eave rafter taper','114 / 0.00','−50.565','−204.161','−673.600','0.944'],
['39 / ridge-side rafter','116 / 0.00','−148.547','−201.748','−781.111','0.985'],
['154 / interior ridge column','118 / 11.50','61.030','95.754','−1,101*','1.039'],
['161 / interior ridge column','118 / 11.50','61.154','95.707','−1,101*','1.038'],
['18 / longitudinal SHS','111 / 4.05','104.595','0.000','−2.494','0.598'],
['290 / canopy beam','114 / 0.00','−0.346','−33.809','−50.464','0.712']],[.28,.15,.14,.14,.16,.13])
p('*The source prints −1.101E+03, so further moment precision is unavailable. x is measured from the individual member’s start node, not necessarily from the building base or eave. Member 18 also has torsion MX = −0.302 kN·m. Result coordinates and signs must be retained when extracting joint design actions.')
fig('ratios','Figure 3. Selected utilization ratios as recorded in the supplied run. The dashed line is the 1.0 check threshold; input and analysis issues remain unresolved.',155)
h('Engineering interpretation')
p('The eave region carries substantial frame moment and shear, which explains the increased column/rafter depths near the joint. Ridge-side rafter 39 is close to its recorded shear resistance. The ridge columns reverse between compression and tension across the load set and also develop large moments. The canopy behaves as a cantilever connected to the main column system.')
p('The reported PASS of the longitudinal SHS member is accompanied by a second-order-analysis warning. The failed ridge-column checks are governed by LC118, whose input factor is inconsistent with its title. A revised analysis may change both forces and utilization; no revised pass/fail outcome is inferred here.')
source('[S2] printed pp.93–100, 103–106, 135–136, 365–366, 379–380, 445–446 and 517–518.')

page('Displacements, equilibrium and model review','WEEK 2 • VALIDATION OF RESULTS')
h('Primary-case displacement summary')
p('The ANL reports translations in centimetres; they are converted below to millimetres. Each cell gives the signed reported extreme followed by its node number. Different component extremes generally occur at different nodes, so these entries cannot be combined as one displacement vector or directly added to form a service combination.')
table(['Case','X (mm) / node','Y (mm) / node','Z (mm) / node'],[
['3 — DL','−2.136 / 156','−6.725 / 72','−0.070 / 164'],
['4 — LL','−3.921 / 154','−12.156 / 72','−0.094 / 164'],
['5 — WL 0° +Cpi','+41.692 / 27','+32.669 / 44','−34.070 / 118'],
['6 — WL 0° −Cpi','+39.442 / 3','+16.456 / 25','−3.109 / 118'],
['7 — WL 90° +Cpi','+4.599 / 154','+27.387 / 54','+23.178 / 141'],
['8 — WL 90° −Cpi','+6.556 / 154','+21.604 / 54','+42.808 / 118']],[.28,.24,.24,.24])
h('Serviceability interpretation')
p('The PDF separately illustrates 52.3 mm lateral movement against 10,000/150 = 66.7 mm, and 9.844 mm vertical rafter movement against 18,000/180 = 100 mm [S1, p.57]. Those values are not established as service envelopes of this ANL run. They are retained only as training-slide examples. Actual limits depend on cladding, supported finishes, use, connection details and the adopted design specification.')
p('For final checking, obtain nodal and member displacements for each service combination, including the relative vertical deflection of rafters between their moving supports. Check purlins/girts, canopy tips, frame sway, gutter falls and drainage separately. A primary-case joint displacement is not a complete member-deflection check.')
h('Equilibrium and warnings')
eq('DL case 3: total applied FY = −1,910.11 kN; total reaction FY = +1,910.11 kN.\nWind case 8: applied (FX,FY,FZ) = (−8.10, +3,596.40, +330.69) kN;\nreaction = (+8.10, −3,596.40, −330.69) kN.')
p('These aggregate balances support force equilibrium for the printed cases. They do not validate the assumed loads, member restraints or nonlinear combinations. Individual foundation reaction envelopes are still required, including coincident shear and uplift.')
table(['Observed issue','Required follow-up'],[
['Members 18 and 19','Moment-amplification warning above 1.4 in LC111; perform the required second-order review.'],
['Members 154–161','Minimum web-thickness serviceability warning; investigate web slenderness and stiffening/design changes.'],
['LC118 and tension-only bracing','Resolve the 11.5 factor and use combined-load analysis appropriate to changing brace activity.'],
['Load definition and restraint','Verify seismic mass, wind zones/signs, lateral directions, effective lengths and actual restraint details.']],[.35,.65])
source('[S2] primary-case output, printed warnings and load commands; [S1] pp.57–59; combination treatment [R3].')

page('Proportioning and member-size schedule','WEEK 3 • DIMENSIONS OF STRUCTURAL MEMBERS')
p('Proportioning starts from the force path, frame geometry and restraint conditions. Deeper sections are placed where bending demand is high; flange area resists bending/axial action, while the web transfers shear and stabilizes the flanges. Economy depends on plate thickness, fabrication repetition, transport limits, local buckling and serviceability, not only on section area.')
table(['Member family / examples','Depth D, start → end (mm)','Flanges b × t (mm)','Web (mm)'],[
['Exterior column, base segment 1/21/etc.','524 → 659','250 × 12','6'],
['Exterior column, middle 162/169/etc.','659 → 794','250 × 12','6'],
['Exterior column, upper 192–211','794 → 974','250 × 12','6'],
['Ridge columns 154–161','500 → 1,150','350 × 25','6'],
['Gable posts 5–9, 149–153, 164–168, 187–191','420 → 420','200 × 10','6'],
['Main eave rafters 23/27/38/42/etc.','924 → 524','275 × 12','6'],
['Main constant-depth rafters 26/28/etc.; 299–314','524 → 524','275 × 12','5'],
['Main ridge-side rafters 24/25/39/40/etc.','974 → 524','275 × 12','6'],
['End-frame eave rafters 3/12/143/147','524 → 424','200 × 12','5'],
['End-frame other rafters 4/10/11/13/144–146/148','424 → 424','200 × 12','5'],
['Canopy beams 290/291/293–296','316 → 316','150 × 8','5'],
['Longitudinal ties / struts','SHS 150 × 150 × 4','Closed hollow section','4'],
['Braces 230–289','Solid circular rod Ø25','Tension-only specification','—'],
['Canopy Z members 292/297/298','260ZS75X2 (source designation)','Cold-formed section','2 nominal']],[.42,.24,.23,.11])
h('Reading the tapered-section input')
p('The seven TAPERED values are Dstart, tw, Dend, btop, ttop, bbottom and tbottom [R4]. D is the overall section depth; clear web depth is D − ttop − tbottom. Equal flanges are assigned in the listed families. Start/end follow the member incidence order, so the schedule must not be reversed during fabrication interpretation.')
eq('For a symmetric I section: A = 2btf + (D − 2tf)tw.\nFor D = 524, b = 275, tf = 12, tw = 5 mm: A = 9,100 mm² = 91.0 cm².')
note('This is a schedule of analytical section assignments, not an approved fabrication bill. Original PDF elevation notes and the ANL are not assumed to be the same revision. Main-roof purlins are represented through applied loads; their sizes and checks need the separate secondary-member design described on p.14.')
source('[S2] commands 105–128; parameter interpretation [R4].')

page('Design of columns and gable posts','WEEK 3 • COMPRESSION AND COMBINED ACTION')
h('Column design procedure')
p('For each column, identify the effective length and restraint about both axes; classify flange and web plates; determine compression resistance; check tension reversal where applicable; evaluate bending, shear and axial–moment interaction; and check deflection and connection demands. A low axial-force ratio alone does not establish adequacy under frame bending.')
eq('Compression design framework: Pd = Ae fcd.\nElastic reference stress: fcc = π²E / (KL/r)².\nFor a prismatic compression member: λ̄ = √(fy/fcc);\nφ = 0.5[1 + α(λ̄ − 0.2) + λ̄²]; χ = 1/[φ + √(φ² − λ̄²)] ≤ 1;\nfcd = χfy/γm0. Select the code buckling curve and applicable section area.')
p('These equations explain the role of slenderness and imperfections; a tapered column requires the applicable tapered-member treatment and appropriate effective properties. E = 205,000 MPa is used in the supplied model. End restraints and intermediate restraints must be supported by actual details.')
h('Worked interpretation — ridge column 154')
table(['Parameter / result','Value from the supplied check'],[
['Geometry','11.5 m long; D = 500 → 1,150 mm; flanges 350 × 25 mm; web 6 mm'],
['Critical section area','At top: A = 2(350)(25) + (1,150 − 50)(6) = 24,100 mm²'],
['Local slenderness indicators','Top clear web ratio = 1,100/6 = 183.3; flange outstand ratio = (350 − 6)/(2 × 25) = 6.88'],
['Program classification','Slender web; plastic flange; overall section class slender'],
['Effective-length inputs','LZ = LY = 11.5 m; KZ = 2.0; KY = 1.0; reported slenderness 122.28'],
['Compression envelope','317.396 kN in LC101; printed minor-axis compression resistance 1,806 kN'],
['Critical bending','|MZ| ≈ 1,101 kN·m in LC118; printed resistance ≈ 1,093 kN·m'],
['Recorded governing result','Interaction ratio 1.039, FAIL; additional web-thickness serviceability warning']],[.35,.65])
p('The 317.396 kN compression and 1,101 kN·m moment arise from different cases and must not be combined arbitrarily. At the governing LC118 station, the concurrent axial compression is 61.030 kN. Member 161 similarly records ratio 1.038. Both results must be revisited after the load-case and analysis corrections.')
h('Exterior columns and gable posts')
p('Exterior columns comprise 3 m, 3 m and 4 m analytical segments with increasing depth toward the eave. Segmentation does not itself provide lateral restraint. Gable posts use 420 mm sections rotated by BETA 90 and transfer end-wall wind to the roof/bracing and bases. Their connection releases and effective lengths must be matched to the installed arrangement.')
source('[S2] printed pp.365–366 and 379–380; commands 130, 321–340. Design topics: [S1] pp.45–51, 65–67.')

page('Design of rafters and canopy beams','WEEK 3 • BENDING, SHEAR AND STABILITY')
h('Rafter design principles')
p('A rafter check begins with plate classification and the compression-flange restraint under each load direction. Gravity and wind uplift can reverse the compression flange. Purlins connected to the upper flange do not automatically restrain the lower flange; flange stays and their connection/load path must be designed. Slender webs require explicit treatment of shear buckling and flexural resistance.')
eq('For a suitable laterally supported section: Md = βb Zp fy / γm0, subject to code limits.\nFor a semi-compact section βb Zp corresponds to Ze.\nFor an unrestrained member: Md depends on lateral-torsional buckling strength.\nShear yielding reference: Vd = Av fy / (√3 γm0); reduce/check for shear buckling where applicable.')
p('These are design frameworks, not a replacement for the slender-web and high-shear rules applicable to the supplied sections. Bending resistance can reduce when shear is high, and axial–moment interaction must be checked using concurrent forces.')
h('Worked interpretation — ridge-side rafter 39')
table(['Check','Demand / resistance','Interpretation'],[
['Section and restraint','D 974 → 524; b 275; tf 12; tw 6 mm','LX = LY = 1.5 m; LZ = 15.36 m as assigned'],
['Classification at deep end','Clear web = 950 mm; d/tw = 158.3','Slender web; semi-compact flange in output'],
['Critical local shear FY','|−201.748| / 204.891 = 0.9847','Governing ratio rounds to 0.985 in LC116'],
['Major-axis bending','|−781.111| / 982.925 = 0.7947','Printed bending ratio 0.795; high-shear treatment cited by output'],
['Section interaction','0.836 in LC116','Separate from the governing shear ratio'],
['Recorded status','PASS, ratio 0.985 at x = 0.0 m','Conditional on supplied inputs and unresolved model review']],[.28,.40,.32])
p('The program labels the FY-related check “Shear Minor” and the MZ check “Bend Major”; this report retains numerical components to avoid ambiguity. A 0.985 ratio leaves a small numerical margin in this run. Restraint spacing, load definition, fabrication tolerances and revised analysis can affect the result.')
h('Canopies and end-frame rafters')
p('Canopy beams 290, 291 and 293–296 have D = 316 mm, 150 × 8 mm flanges and 5 mm webs. Member 290 records MZ = −50.464 kN·m and FY = −33.809 kN under LC114, with ratio 0.712. The canopy connection must transfer the cantilever moment into the main column; drainage, uplift and lateral restraint require separate details.')
p('End-frame rafters use 200 × 12 mm flanges with 424/524 mm depths. Member 12 records ratio 0.994 in LC118. Its result should be revisited after the LC118 discrepancy is resolved, rather than treated as an optimized final section.')
source('[S2] printed pp.81–82, 135–136 and 517–518. Design concepts: [S1] pp.61–68.')

page('Secondary steel and bracing design','WEEK 3 • PURLINS, GIRTS, STRUTS AND RODS')
table(['Component','Section / evidence','Required design checks'],[
['Main-roof purlin','PDF assumption: Z 270 × 75 × 20 × 2.55 mm; 8.77 kg/m','Cold-formed effective section, biaxial bending, local/distortional buckling, uplift and deflection'],
['Side-wall girt','PDF: same Z section for 8.1 m bay','Wind pressure/suction, continuity, cleats, sheeting restraint and deflection'],
['Gable-wall girt','PDF: Z 230 × 75 × 20 × 2 mm; 6.32 kg/m','6 m bay bending, local buckling, fasteners and end connections'],
['Eave strut','PDF: CS 270 × 75 × 20 × 3.15 mm; 10.7 kg/m','Roof/wall reactions, gutter action, biaxial bending and axial action'],
['Longitudinal SHS','ANL: 150 × 150 × 4 mm','Compression, tension, bending, slenderness, connections and second-order behaviour'],
['Canopy secondary members','ANL 292/297/298: 260ZS75X2','Separate cold-formed check; omitted from listed CHECK CODE members'],
['Roof / wall bracing','ANL 230–289: Ø25 solid rods','Gross yielding, threaded/net-section rupture, connections, slack and load reversal']],[.23,.36,.41])
h('Illustrative roof-purlin calculation')
p('To demonstrate the method, idealize one 8.1 m purlin span as simply supported with 1.5 m tributary roof width. Use the source DL allowance of 0.20 kN/m² plus its assumed purlin self-weight. This is a service-load example; actual lap continuity, roof slope and restraint need a cold-formed design.')
eq('wDL ≈ 0.20 × 1.50 + 0.0877 = 0.3877 kN/m.\nwLL = 0.75 × 1.50 = 1.1250 kN/m; wtotal = 1.5127 kN/m.\nR = wL/2 = 6.126 kN; Mmax = wL²/8 = 12.406 kN·m.\nUsing the source’s illustrative L/240 limit: δallow = 8,100/240 = 33.75 mm.\nIrequired = 5wL⁴/(384Eδallow) ≈ 12.25 × 10⁶ mm⁴ (E = 205,000 MPa).')
p('The inertia requirement is an idealized strong-axis stiffness demand, not a pass result for the named Z section. Effective stiffness, weak-axis action, continuity and manufacturer properties must be checked. IS 800’s scope identifies cold-formed light-gauge sections as requiring separate provisions [R1].')
h('Illustrative gross-yielding resistance of a Ø25 brace')
eq('Ag = π × 25²/4 = 490.87 mm².\nTdg = Ag fy/γm0 = 490.87 × 250/1.10 = 111.56 kN.')
p('This is only the gross-section yielding resistance. Threaded net area, rupture, gusset block shear, rod-end/turnbuckle resistance and actual factored axial demand can govern. The ANL assigns rod material values but excludes members 230–289 from its CHECK CODE list; their final adequacy is not established.')
source('[S1] pp.5, 10–11 and 59; [S2] commands 121–128, 132–133, 311–312 and 351; [R1].')

page('Design coverage, connections and quantities','WEEK 3 • COMPLETION REVIEW')
h('Coverage of the supplied design output')
p('The CHECK CODE command covers members 1–229, 290–291, 293–296 and 299–314: 251 members. Counting the status lines gives 249 PASS and 2 FAIL results. The other 63 members comprise 60 tension-only rods and three canopy Z members. Presence in the analytical model does not demonstrate that a member or connection has been designed.')
table(['Design item','Evidence available','Status for this report'],[
['Primary columns and rafters','Sizes, loads and detailed member code checks','Recorded results summarized; correction/re-analysis required'],
['SHS ties / struts','Member checks included','Second-order warnings for members 18/19 remain open'],
['Rods / cold-formed members','Rod sizes; limited Z assignments; PDF assumptions','Separate member and connection checks needed'],
['Knee, ridge and splice joints','No complete connection calculations supplied','Design workflow and concept details provided'],
['Base plates / anchors / foundations','Pinned-base model; aggregate equilibrium output','Individual reaction envelopes, anchor and geotechnical design needed']],[.32,.34,.34])
h('Connection design method')
p('Extract the concurrent N, V and M at each joint for every governing case, including reversal. Select a connection arrangement that provides the stiffness/release assumed in the model. Check bolts in shear, tension and interaction; bearing, net section and block shear of connected plates; end-plate bending and prying; weld strength; and column/rafter local effects. An initial moment-couple estimate is T ≈ M/z, but actual bolt-row distribution and prying must be analysed.')
p('For a pinned base, determine compression bearing, uplift anchorage and shear transfer consistently with the assumed rotational release. Foundation design then checks soil pressure, sliding, overturning, uplift, concrete bending, shear and punching. Site soil data, concrete grade, embedment, anchor grade and base reactions are not supplied; foundation dimensions are therefore not invented.')
h('Steel quantity reported by the model')
eq('Total reported model steel weight = 775.328 kN.\nEquivalent mass using g = 9.81 m/s² ≈ 79.03 tonnes.\nModel mass / plan area ≈ 79,034 / 2,599.2 = 30.41 kg/m².')
p('This is the weight of the members represented in the model. Main-roof purlins and much of the girt/eave-strut system are accounted for as applied loading rather than explicit steel members. Connections, base plates, stiffeners, coating, sheeting and procurement waste are not established by this take-off. The 15% self-weight load factor is not a measured connection quantity.')
note('Week 3 deliverable: a traceable member schedule and explanation of design checks across all structural families. The source is insufficient for a complete approved building design; missing checks are identified rather than replaced with invented pass results.')
source('[S2] printed p.58, steel take-off; commands 349–351. Connection design study basis: [S1] pp.54–56 and 67.')

page('General notes for design and detailing','WEEK 4 • DRAWING REQUIREMENTS')
p('The following notes form a training specification to accompany the study drawings. They translate analysis assumptions into drawing requirements. Final material grades, tolerances, connection sizes and inspection criteria must be assigned by the responsible designer and project specification.')
table(['Topic','General design / detailing note'],[
['Units and dimensions','All drawing dimensions are in millimetres unless stated. Levels relate to the model base datum. Do not scale drawings. Verify site dimensions and openings before fabrication.'],
['Material identification','Primary member design values are fy = 345 MPa and fu = 490 MPa; SHS and rod values differ. Specify the actual product grade, thickness-dependent strength and certificates in procurement documents.'],
['Built-up members','Show flange/web thicknesses, taper direction, plate joints, weld symbols and stiffeners. Analytical division points do not automatically represent physical splices.'],
['Connections','Specify bolt grade, diameter, hole type, spacing, edge distances and tightening method. Show end plates, cleats, gussets, base plates and anchor projections with design references.'],
['Welds and fabrication','Show weld type, size, effective length and required continuity. Use approved welding procedures; inspect as required by the project quality plan. Do not prescribe unverified weld sizes from this report.'],
['Lateral restraint','Locate purlin/girt attachments, flange stays, sag rods and braces explicitly. Verify the compression-flange restraint under gravity and uplift. A 1.5 m software length requires a corresponding physical restraint system.'],
['Bracing and erection','Identify permanent braced bays and connections. Provide a planned erection sequence and temporary stability system; do not assume partially assembled frames are stable.'],
['Base and civil interface','Coordinate anchors, pedestal levels, grout, base rotation assumptions and foundation reactions. Model pins do not remove uplift or horizontal shear demand.'],
['Cladding and drainage','Coordinate sheet laps, screws, flashings, gutters and downpipes. Check local suction zones, openings and water accumulation; prevent incompatible restraint at expansion interfaces.'],
['Durability and maintenance','Define preparation, coating/galvanizing and touch-up requirements for the exposure. Avoid water traps and inaccessible unprotected joints; coordinate fire protection where required.']],[.24,.76])
h('Drawing register')
table(['Sheet','Report page','Contents / issue status'],[
['GA-01 / GA-02','17','Column/roof arrangement and transverse elevation — training geometry'],
['D-01 to D-04','18','Primary profiles and secondary sections — analytical sizes'],
['C-01 to C-04','19','Base, knee, ridge and bracing/cleat connections — schematic design intent']],[.25,.15,.60])
note('No approved fabrication drawings were supplied. Pages 17–19 are newly prepared study drawings. They include source dimensions where available and retain design-dependent connection dimensions as variables.')
source('Drawing requirements developed from [S1]/[S2] and the general design/fabrication scope in [R1].')

page('General arrangement and frame elevation','WEEK 4 • STUDY DRAWINGS — GA-01 / GA-02')
fig('ga','Figure 4. Dimensioned arrangement reconstructed from the ANL. Roof bracing is shown in the first, central and last braced bays. Three canopy zones are on the X = 0 side. NTS; dimensions in mm.',525)
p('Main column lines are at X = 0, 18,000 and 36,000. Interior ridge columns occur at Z = 8,100 through 64,100. Gable-end posts fill the 6,000 mm transverse intervals. Side-wall bracing is also modelled in the corresponding braced bays, with wall segmentation at 6,000 mm height. Column intermediate nodes occur at 3,000 and 6,000 mm.')
note('The 9,500 mm clear-height requirement is architectural; verify clearance below haunches and services separately from the 10,000 mm analytical eave node. Model centre lines do not define cladding faces, foundations or fabrication offsets.')
source('[S2] commands 8–94. Frame grid letters are report labels introduced for readability.')

page('Member profiles and section details','WEEK 4 • STUDY DRAWINGS — D-01 TO D-04')
fig('sections','Figure 5. Primary-member profiles and secondary-section concepts. Taper direction follows the representative model member orientation; section depths are exaggerated where needed for legibility.',470)
table(['Additional member detail','Size / detailing action'],[
['Gable posts','D 420; b 200; tf 10; tw 6 mm. Show BETA-90 section orientation and the released roof connection.'],
['End-frame rafters','D 524 → 424 or constant 424; b 200; tf 12; tw 5 mm. Confirm piece marks and splice positions.'],
['Canopy beams','D 316; b 150; tf 8; tw 5 mm. Projection 3,000; fall 250; check cantilever root connection.'],
['Secondary-member details','Main purlin/girt assumptions are on p.14. Show actual lip dimensions, laps, cleats, sag rods and flange stays after design.']],[.31,.69])
note('Dimension key: D = overall depth; b = flange width; tf = flange thickness; tw = web thickness. Final fabrication drawings must add plate lengths, bevels, welds, stiffeners, holes and approved connection dimensions.')
source('[S2] member-property commands 105–128; [S1] secondary-member assumptions, pp.5 and 10–11.')

page('Connection details and drawing completion','WEEK 4 • STUDY DRAWINGS — C-01 TO C-04')
fig('connections','Figure 6. Connection concepts illustrate load transfer and detailing requirements. Bolt symbols are schematic: the number, diameter and spacing are not designed. No detail is issued for construction.',417)
table(['Detail','Actions to obtain','Items required before issue'],[
['C-01 Base','Coincident compression/uplift and shear','Bp, Lp, tp; anchor grade/diameter/embedment; grout and pedestal design'],
['C-02 Eave joint','Rafter/column end N, V and M, both signs','Bolt-row forces; prying; plate/weld/stiffener design; erection access'],
['C-03 Ridge','Both rafter ends and ridge-column actions','Joint stiffness and splice location; bolt/weld group checks; node eccentricity'],
['C-04 Bracing / cleat','Factored rod tension; purlin/girt reaction','Gusset and threaded area; turnbuckle rating; restraint capacity and cleat checks']],[.23,.33,.44])
p('Drawing completion requires a coordinated general arrangement, member piece marks, connection calculations, erection marks, anchor plan, member/bolt lists and revision history. Each change affecting stiffness, release or load path should be returned to the analytical model. The final check is agreement among the calculation model, member schedule and drawings.')
source('New training sketches informed by [S1]/[S2]. Connection sizes and foundation design remain open because the required calculations and input data were not supplied.')

page('Learning outcomes, conclusions and references','COMPLETION OF THE FOUR-WEEK STUDY')
h('Weekly learning outcomes')
p('<b>Week 1:</b> interpreted the project geometry, distinguished frame types and reproduced gravity, wind and earthquake load calculations. <b>Week 2:</b> explained the model, plotted reference shear/moment diagrams and interpreted member forces, displacement summaries and equilibrium. <b>Week 3:</b> documented section proportions and studied compression, bending, shear, bracing and secondary-member design. <b>Week 4:</b> prepared general notes, arrangement drawings, member profiles and connection design concepts.')
h('Conclusion and remaining engineering work')
p('The records support a useful study of a tapered steel PEB with ridge-supported roof frames. They also show why analysis output must be reviewed before drawing a design conclusion. The most significant findings are the LC118 factor discrepancy, inappropriate result superposition for tension-only behaviour, two failed ridge-column checks, second-order warnings, web-thickness warnings and incomplete design coverage for rods, secondary steel and connections.')
p('The next engineering revision should confirm the adopted code editions and project loads; reconcile wind zones, seismic mass and load directions; correct and rerun the model using appropriate combined loading and second-order treatment; then complete strength/serviceability checks, connections, anchors and foundations. The report does not claim that these corrections have already been made.')
h('Source register and references')
add('reference',label='[S1] User-supplied training PDF: 1000016606.pdf, 68 pages.',text='Project and geometry pp.1–4; gravity loads pp.5, 9–12; wind/seismic pp.13–27, 36–43; analysis/design topics pp.29–35, 45–68. Screenshots were visually reviewed; no searchable text layer was present.',url=None)
add('reference',label='[S2] User-supplied STAAD.Pro output: R1_PEB.ANL.',text='CONNECT Edition 22.00.00.15; output dated 17 October 2026; 560 printed pages. Input/model pp.1–8; design parameters pp.56–57; take-off p.58; member checks pp.59–560. Original files were not altered.',url=None)
add('reference',label='[R1] Bureau of Indian Standards — IS 800:2007, official scope preview.',text='General steel-construction scope; loading standards and separate provisions for cold-formed sections. Detailed calculations in this report follow the supplied study records.',url='https://www.services.bis.gov.in/tmp/SR800.pdf')
add('reference',label='[R2] Bureau of Indian Standards — IS 875 (Part 2):1987, official scope preview.',text='Scope of imposed loads for buildings. Roof-load values used here are those adopted in the supplied PDF.',url='https://www.services.bis.gov.in/tmp/SR875_2.pdf')
add('reference',label='[R3] Bentley Systems — Member Tension And Combination Load Cases.',text='Explains the difference between result combinations and simultaneously applied repeat loads for nonlinear/tension-only behaviour.',url='https://bentleysystems.service-now.com/community?id=kb_article_view&sysparm_article=KB0113645')
add('reference',label='[R4] Bentley Systems — Assign Tapered I Beam Property and Material using OpenSTAAD.',text='Defines the seven tapered I-section dimensions used to interpret the ANL member-property schedule.',url='https://bentleysystems.service-now.com/community?id=kb_article_view&sysparm_article=KB0111417')
p('Standards named in the supplied study include IS 800:2007, IS 875 Parts 1 and 2:1987, IS 875 Part 3:2015 and IS 1893 Part 1:2016. These identify the source basis, not a statement that every edition remains applicable to a new approval. Web references checked 21 October 2026.')
