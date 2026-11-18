import * as si from 'simple-icons';

const TOTAL = 15;

// ---------- helpers ----------
const logo = (k) => `<span class="logo"><svg viewBox="0 0 24 24"><path d="${si[k].path}"/></svg></span>`;
const badge = (t) => `<span class="badge">${t}</span>`;
const PIX = {
  plus: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]],
  diag: [[0, 0], [1, 1], [2, 2], [2, 0], [0, 2]],
  step: [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2]],
  corner: [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2]],
  arrow: [[0, 0], [1, 1], [2, 1], [1, 2], [0, 2]],
  bars: [[0, 2], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
  dot: [[1, 1], [0, 0], [2, 0], [0, 2], [2, 2]],
};
const pix = (name, color = '#0f1820') =>
  `<svg viewBox="0 0 3 3">${PIX[name].map(([x, y]) => `<rect x="${x + 0.06}" y="${y + 0.06}" width="0.88" height="0.88" fill="${color}"/>`).join('')}</svg>`;
const ico = (name, dark = false) => `<div class="ico ${dark ? '' : ''}">${pix(name)}</div>`;
const pill = (label, n, light = false) =>
  `<div class="flex items-center gap-[10px]"><span class="pill ${light ? 'pill-l' : ''}">${label}</span><span class="chip ${light ? 'chip-l' : ''}">${n}</span></div>`;
const foot = (n, light = false) =>
  `<div class="foot ${light ? 'foot-l' : ''} left-[110px] top-[1020px]">RomanKnows  —  Project-1  ·  IAR Gandhinagar</div>
   <div class="foot ${light ? 'foot-l' : ''} right-[110px] top-[1020px] text-right">${String(n).padStart(2, '0')} / ${TOTAL}</div>`;
const slide = (n, cls, inner, notes = '', light = false) =>
  `<section class="slide ${cls}" data-n="${n}" data-light="${light ? 1 : 0}" data-notes="${notes.replace(/"/g, '&quot;')}">${inner}${foot(n, light)}</section>`;
const bgimg = (f) => `<div class="abs-fill bg-img" style="background-image:url('../assets/bg/${f}')"></div>`;

const slides = [];

// ============================================================ 01 TITLE
slides.push(slide(1, 'bg-cover', `
  <div class="left-[110px] top-[90px]">${pill('Project Introduction', '01')}</div>
  <img src="../assets/agent-infrastructure-cube.png" class="left-[1130px] top-[40px] w-[760px]" />
  <h1 class="left-[100px] top-[270px] m-0 whitespace-nowrap text-[190px] leading-[1] tracking-[-0.035em]"><span style="font-family:'RK Light'">Roman</span><span style="font-family:'RK Semibold'">Knows</span></h1>
  <div class="left-[110px] top-[500px] w-[980px] text-[50px] leading-[1.15]" style="font-family:'RK Light';color:#e6f2f7">An AI-Powered Website Vulnerability Assessment System</div>
  <div class="body left-[110px] top-[660px] w-[900px] text-[28px]">Making website security assessments smarter, safer, and easier to manage.</div>
  <div class="hair left-[110px] top-[790px] w-[1700px]"></div>
  <div class="left-[110px] top-[825px] w-[380px]"><div class="mono">Project-1</div><div class="mt-[12px] text-[26px] leading-[1.35]" style="font-family:'RK Medium'">Bachelor of Technology —<br>Information Technology</div></div>
  <div class="left-[500px] top-[825px] w-[400px]"><div class="mono">Presented by</div>
    <div class="mt-[12px] text-[25px] leading-[1.5]" style="font-family:'RK Medium'">Ronit Kaushal <span class="text-mute">(15501)</span><br>Het Jani <span class="text-mute">(14824)</span><br>Vaghela Mitrajsinh <span class="text-mute">(14612)</span></div></div>
  <div class="left-[900px] top-[825px] w-[260px]"><div class="mono">Guided by</div><div class="mt-[12px] text-[26px] leading-[1.35]" style="font-family:'RK Medium'">Mr. Milan Trivedi</div></div>
  <div class="left-[1180px] top-[825px] w-[640px]"><div class="mono">Institute</div><div class="mt-[12px] text-[24px] leading-[1.4]" style="font-family:'RK Medium'">School of Computing and Technology<br>Institute of Advanced Research, Gandhinagar<br><span class="text-mute">Academic Year 2026–2027</span></div></div>
`, 'Introduce the project: RomanKnows, an AI-powered website vulnerability assessment system (Website Vulnerability Tester), Project-1, guided by Mr. Milan Trivedi.'));

// ============================================================ 02 OUTLINE
const outline = [
  ['01', 'Foundation', ['Introduction', 'Literature Review', 'Modules & Functionalities']],
  ['02', 'Development', ['Tools & Technologies', 'Software Development Model', 'Project Planning']],
  ['03', 'System Design', ['System Analysis', 'Data Dictionary', 'Test Cases']],
  ['04', 'Results', ['Implementation Snapshots', 'Conclusion & Future Scope', 'References']],
];
slides.push(slide(2, '', `
  ${bgimg('glow-2.jpg')}
  <div class="left-[110px] top-[90px]">${pill('Presentation Outline', '02')}</div>
  <div class="h1 left-[110px] top-[170px] w-[1100px] text-[96px]">What we'll <b>cover</b></div>
  ${outline.map(([n, label, items], i) => {
    const top = 500 - i * 76;
    return `<div class="glass-fade left-[${110 + i * 434}px] top-[${top}px] w-[410px] h-[${950 - top}px]">
      <div class="mono left-0 !static block px-[34px] pt-[34px] text-[#d3e6ef]">${n} — ${label}</div>
      <div class="num absolute right-[30px] top-[24px] text-[104px] opacity-90" style="font-family:'RK Light'">${n}</div>
      <div class="absolute left-[34px] right-[26px] top-[140px]">
        ${items.map((t) => `<div class="hair mb-[18px]"></div><div class="mb-[18px] text-[31px] leading-[1.2]" style="font-family:'RK Medium'">${t}</div>`).join('')}
      </div></div>`;
  }).join('')}
`, 'Walk through the outline: four groups — foundation, development, system design and results.'));

// ============================================================ 03 INTRODUCTION (light)
slides.push(slide(3, '', `
  ${bgimg('light.jpg')}
  <img src="../assets/agent-infrastructure-cube.png" class="left-[1230px] top-[-90px] w-[640px]" style="filter:saturate(.9)" />
  <div class="left-[110px] top-[90px]">${pill('Introduction', '03', true)}</div>
  <div class="h1 on-light left-[110px] top-[165px] w-[1150px] text-[88px]">Website security testing <i>shouldn't be complicated.</i></div>
  <div class="body body-l left-[110px] top-[410px] w-[1100px] text-[25px] leading-[1.5]">Website vulnerability assessments often involve multiple tools, manual commands, and scattered results. This makes testing difficult to manage, especially for beginners.<br><br><span style="font-family:'RK Semibold';color:#0f1820">RomanKnows</span> is an AI-powered platform designed to simplify and coordinate authorized website security assessments through a single interface.</div>
  <div class="card-teal left-[1180px] top-[470px] w-[0px] h-[0px]"></div>
  ${[
    ['01', 'AI-Guided', 'Intelligent assistance with assessment workflows', 'card-teal', 'plus'],
    ['02', 'Controlled', 'Authorization and scope checks before testing', 'card-black', 'corner'],
    ['03', 'Documented', 'Organized findings, evidence, and reporting', 'card-white', 'step'],
  ].map(([n, t, d, cls, ic], i) => {
    const dark = cls !== 'card-white';
    return `<div class="${cls} left-[${110 + i * 580}px] top-[640px] w-[550px] h-[270px]" ${cls === 'card-teal' ? `style="background-image:url('../assets/bg/teal-mid.jpg')"` : ''}>
      <div class="absolute left-[32px] top-[30px]"><div class="ico" style="background:${dark ? 'rgba(255,255,255,.14)' : '#eef0f6'}">${pix(ic, dark ? '#fff' : '#0f1820')}</div></div>
      <div class="mono absolute right-[32px] top-[40px]" style="color:${dark ? '#b9cfda' : '#8a97a3'}">${n}</div>
      <div class="absolute left-[34px] top-[132px] text-[50px] leading-[1]" style="font-family:'RK Medium';color:${dark ? '#fff' : '#0f1820'}">${t}</div>
      <div class="absolute left-[34px] top-[196px] w-[450px] text-[22px] leading-[1.35]" style="font-family:'RK Medium';color:${dark ? '#c3d6df' : '#4a5966'}">${d}</div></div>`;
  }).join('')}
  <div class="left-[110px] top-[945px] w-[1700px] text-[23px] leading-[1.4] text-ink2" style="font-family:'RK Medium'"><span class="mono mono-l mr-[18px]">Our objective</span>Make security assessments easier to start, monitor, understand, and document — while keeping the operator in control.</div>
`, 'Explain why manual testing is fragmented, then the three principles: AI-guided, controlled, documented.', true));

// ============================================================ 04 LITERATURE REVIEW
const lit = [
  ['OWASP Top 10', 'Identifies major web security risks'],
  ['OWASP WSTG', 'Provides structured testing guidance'],
  ['Nmap', 'Network discovery and service identification'],
  ['WhatWeb', 'Website technology fingerprinting'],
  ['AI / LLM systems', 'Assist with analysis and decision-making'],
];
slides.push(slide(4, '', `
  ${bgimg('glow-3.jpg')}<div class="abs-fill shade"></div>
  <div class="left-[110px] top-[90px]">${pill('Literature Review', '04')}</div>
  <div class="h1 left-[110px] top-[165px] w-[820px] text-[70px]">Existing tools are powerful. <b>But the workflow is fragmented.</b></div>
  <div class="body left-[110px] top-[470px] w-[760px] text-[25px]">Current website security testing uses established frameworks and specialized tools.</div>
  <div class="mono left-[110px] top-[580px]">Challenges identified</div>
  ${['Multiple tools require separate operations.', 'Results need manual interpretation and documentation.', 'Evidence can become scattered across tools.', 'Authorization, scope, and activity tracking need careful control.'].map((t, i) =>
    `<div class="left-[110px] top-[${628 + i * 76}px] w-[780px] flex gap-[20px] items-start"><span class="dot mt-[13px]"></span><span class="text-[25px] leading-[1.35]" style="font-family:'RK Medium';color:#e3edf2">${t}</span></div>`).join('')}
  <div class="glass left-[960px] top-[130px] w-[850px] h-[640px]"></div>
  <div class="mono left-[1010px] top-[160px]">Existing approach</div><div class="mono left-[1380px] top-[160px]">Purpose</div>
  ${lit.map(([a, b], i) => `<div class="hair left-[1010px] top-[${205 + i * 112}px] w-[750px]"></div>
    <div class="left-[1010px] top-[${205 + i * 112 + 30}px] w-[330px] text-[36px] leading-[1.1]" style="font-family:'RK Semibold'">${a}</div>
    <div class="left-[1380px] top-[${205 + i * 112 + 28}px] w-[390px] text-[24px] leading-[1.35]" style="font-family:'RK Medium';color:#c9d5dc">${b}</div>`).join('')}
  <div class="left-[960px] top-[810px] w-[850px] h-[150px] rounded-[28px]" style="background:linear-gradient(100deg,rgba(191,230,242,.95),rgba(143,190,208,.9))"></div>
  <div class="left-[1000px] top-[836px] w-[780px] text-[#06202d]"><div class="mono" style="color:#0f4a62">The gap we address</div><div class="mt-[8px] text-[27px] leading-[1.3]" style="font-family:'RK Semibold'">RomanKnows connects AI assistance, approved tools, evidence, and reporting into one workflow.</div></div>
`, 'Existing frameworks and tools are mature, but testers still coordinate them by hand — the gap RomanKnows fills.'));

// ============================================================ 05 MODULES (light bento)
const mods = [
  ['01', 'User Authentication', 'Secure signup, login, JWT-based sessions, and administrator access.', 'plus'],
  ['02', 'Target Authorization', 'Target URL validation, ownership confirmation, approved scope, and testing window.', 'corner'],
  ['03', 'AI Assessment Agent', 'Hermes Agent uses AI reasoning and controlled security tool integrations.', 'diag'],
  ['04', 'Mission Dashboard', 'Live progress, agent activity, tool events, findings, and assessment status.', 'bars'],
];
const modCard = ([n, t, d, ic], x, y, dark) => `<div class="${dark ? 'card-black' : 'card-white'} left-[${x}px] top-[${y}px] w-[470px] h-[350px]">
  <div class="absolute left-[30px] top-[28px]"><div class="ico" style="background:${dark ? 'rgba(255,255,255,.14)' : '#eef0f6'}">${pix(ic, dark ? '#fff' : '#0f1820')}</div></div>
  <div class="num absolute right-[30px] top-[22px] text-[84px]" style="color:${dark ? '#dfeaf0' : '#0f1820'}">${n}</div>
  <div class="absolute left-[32px] top-[178px] w-[410px] text-[38px] leading-[1.05]" style="font-family:'RK Medium';color:${dark ? '#fff' : '#0f1820'}">${t}</div>
  <div class="absolute left-[32px] top-[240px] w-[400px] text-[20px] leading-[1.4]" style="font-family:'RK Medium';color:${dark ? '#b7c9d3' : '#4a5966'}">${d}</div></div>`;
slides.push(slide(5, '', `
  ${bgimg('light.jpg')}
  <div class="left-[110px] top-[60px]">${pill('Modules & Functionalities', '05', true)}</div>
  ${modCard(mods[0], 110, 130, false)}${modCard(mods[1], 110, 510, false)}
  <div class="card-teal left-[610px] top-[130px] w-[700px] h-[730px]" style="background-image:url('../assets/bg/blocks.jpg');background-position:center 60%"></div>
  <div class="left-[610px] top-[130px] w-[700px] h-[730px] rounded-[30px]" style="background:linear-gradient(180deg,rgba(2,12,20,.78),rgba(2,12,20,.05) 55%,rgba(2,12,20,.35))"></div>
  <div class="h1 left-[660px] top-[170px] w-[600px] text-[66px]"><b>One platform.</b> Every essential assessment function.</div>
  <div class="mono left-[660px] top-[805px]" style="color:#b9d3df">RomanKnows  ·  4 core modules</div>
  ${modCard(mods[2], 1340, 130, true)}${modCard(mods[3], 1340, 510, false)}
  <div class="left-[110px] top-[900px] w-[1700px] h-[84px] rounded-[26px] bg-white/70"></div>
  <div class="left-[150px] top-[900px] w-[1620px] h-[84px] flex items-center text-[23px] text-ink2" style="font-family:'RK Medium'"><span class="mono mono-l mr-[22px]">Additional functionality</span><span style="color:#0f1820">Evidence storage · Assessment history · Administrator monitoring · Structured report generation</span></div>
`, 'Four core modules plus evidence storage, history, admin monitoring and reporting.', true));

// ============================================================ 06 WORKFLOW (stair)
const phases = [
  ['00', 'Engagement Setup', 'Record authorization, target, scope, and testing limits.'],
  ['01', 'Pre-Reconnaissance', 'Gather initial context or document why the phase is skipped.'],
  ['02', 'Reconnaissance', 'Identify technologies, services, and permitted entry points.'],
  ['03', 'Vulnerability Analysis', 'Investigate potential security weaknesses.'],
  ['04', 'Verification', 'Validate candidate findings through authorized checks.'],
  ['05', 'Reporting', 'Organize evidence, findings, and remediation guidance.'],
];
slides.push(slide(6, 'bg-cover', `
  <div class="left-[110px] top-[90px]">${pill('Assessment Workflow', '06')}</div>
  <div class="h1 left-[110px] top-[165px] w-[1000px] text-[84px]">Six controlled phases. <b>One evidence trail.</b></div>
  <div class="body left-[1230px] top-[150px] w-[580px] text-[25px]">RomanKnows organizes each authorized assessment into six phases, numbered 0 through 5.</div>
  <div class="left-[110px] top-[400px] w-[820px] text-[25px] leading-[1.4]" style="font-family:'RK Medium'"><span class="mono block mb-[10px]" style="color:#bfe6f2">Key principle</span>A phase advances only after the required evidence is saved or an allowed skip is documented.</div>
  ${phases.map(([n, t, d], i) => {
    const w = 262, gap = 20, x = 110 + i * (w + gap), top = 640 - i * 66;
    return `<div class="glass-fade left-[${x}px] top-[${top}px] w-[${w}px] h-[${960 - top}px]">
      <div class="num absolute right-[22px] top-[18px] text-[84px]">${n}</div>
      <div class="absolute left-[26px] top-[116px] w-[222px] text-[27px] leading-[1.08]" style="font-family:'RK Semibold'">${t}</div>
      <div class="absolute left-[26px] top-[196px] w-[214px] text-[19px] leading-[1.35]" style="font-family:'RK Medium';color:#c3d6df">${d}</div></div>`;
  }).join('')}
`, 'Phases 0 to 5; a phase advances only when its evidence artifact is saved or a skip is documented.'));

// ============================================================ 07 TOOLS
const stack = [
  ['Frontend', [['siReact', 'React 19'], ['siTypescript', 'TypeScript'], ['siTailwindcss', 'Tailwind CSS']]],
  ['Web Application', [['siNextdotjs', 'Next.js 15'], ['siNodedotjs', 'Node.js']]],
  ['AI Engine', [['b:HA', 'Hermes Agent'], ['siOpenrouter', 'OpenRouter']]],
  ['Security Tools', [['b:Nm', 'Nmap'], ['b:Ww', 'WhatWeb']]],
  ['Database', [['siMongodb', 'MongoDB'], ['siSqlite', 'SQLite']]],
  ['Authentication', [['siJsonwebtokens', 'JWT'], ['b:bc', 'bcrypt']]],
  ['Communication', [['b:WS', 'WebSocket'], ['siJson', 'JSON-RPC']]],
  ['Deployment', [['siNginx', 'Nginx'], ['siPm2', 'PM2'], ['siLetsencrypt', 'SSL']]],
];
slides.push(slide(7, '', `
  ${bgimg('mosaic.jpg')}
  <div class="left-[110px] top-[90px]">${pill('Tools & Technologies', '07')}</div>
  <div class="h1 left-[110px] top-[165px] w-[900px] text-[88px]">Built with <b>modern technology.</b></div>
  <div class="body left-[110px] top-[372px] w-[760px] text-[25px]">RomanKnows combines web development, artificial intelligence, security utilities, and persistent storage.</div>
  <div class="left-[1130px] top-[150px] w-[680px]"><div class="mono" style="color:#bfe6f2">Why this stack?</div><div class="mt-[14px] text-[26px] leading-[1.42]" style="font-family:'RK Medium';color:#e3edf2">A responsive interface, AI-assisted decisions, controlled security tool execution, real-time monitoring, and reliable evidence storage.</div></div>
  ${stack.map(([layer, items], i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = 110 + col * 435, y = 480 + row * 270;
    return `<div class="glass-dk left-[${x}px] top-[${y}px] w-[410px] h-[246px]">
      <div class="mono absolute left-[30px] top-[24px]" style="color:#a9c6d4">${layer}</div>
      <div class="absolute left-[30px] top-[66px] right-[20px] flex flex-col gap-[13px]">
      ${items.map(([k, name]) => `<div class="flex items-center gap-[16px]">${k.startsWith('b:') ? badge(k.slice(2)) : logo(k)}<span class="text-[28px] leading-none" style="font-family:'RK Medium'">${name}</span></div>`).join('')}
      </div></div>`;
  }).join('')}
`, 'Layer-by-layer stack: React/TypeScript/Tailwind front end, Next.js host, Hermes + OpenRouter AI, Nmap and WhatWeb tools, MongoDB and SQLite storage, JWT/bcrypt auth, WebSocket comms, Nginx/PM2/SSL deployment.'));

// ============================================================ 08 DEVELOPMENT MODEL
const dev = [
  ['1', 'Requirement Analysis', 'Identify user needs, core functions, and security requirements.'],
  ['2', 'System Design', 'Prepare architecture, UML diagrams, data flow, and database structures.'],
  ['3', 'Module Development', 'Build authentication, AI integration, assessment controls, and reporting.'],
  ['4', 'Integration & Validation', 'Connect components and check functionality, authorization, and phase controls.'],
  ['5', 'Deployment & Improvement', 'Configure hosting and refine the system using feedback.'],
];
slides.push(slide(8, '', `
  ${bgimg('glow-1.jpg')}
  <div class="left-[110px] top-[90px]">${pill('Software Development Model', '08')}</div>
  <div class="h1 left-[110px] top-[165px] w-[1000px] text-[78px]">An <b>iterative, module-based</b> development approach.</div>
  <div class="body left-[1180px] top-[190px] w-[630px] text-[25px]">The development process can be presented as five connected stages, moving from system requirements to an integrated application.</div>
  <div class="hair left-[110px] top-[500px] w-[1700px]" style="height:2px;background:linear-gradient(90deg,rgba(191,230,242,.9),rgba(191,230,242,.15))"></div>
  ${dev.map(([n, t, d], i) => {
    const x = 110 + i * 346;
    return `<div class="left-[${x}px] top-[462px] w-[76px] h-[76px] rounded-full flex items-center justify-center text-[30px]" style="background:${i === 0 ? '#eef4fa' : 'rgba(10,30,44,.85)'};color:${i === 0 ? '#12202a' : '#fff'};border:1.5px solid rgba(200,225,235,.6);font-family:'RK Light'">${n}</div>
    <div class="glass left-[${x}px] top-[580px] w-[326px] h-[290px]">
      <div class="absolute left-[28px] top-[28px] w-[270px] text-[32px] leading-[1.1]" style="font-family:'RK Semibold'">${t}</div>
      <div class="absolute left-[28px] top-[130px] w-[270px] text-[21px] leading-[1.42]" style="font-family:'RK Medium';color:#c3d6df">${d}</div></div>`;
  }).join('')}
  <div class="left-[110px] top-[905px] w-[1700px] text-[26px] leading-[1.35]" style="font-family:'RK Medium'"><span class="mono mr-[20px]" style="color:#bfe6f2">Development focus</span>Build functional modules, integrate them step by step, and improve reliability through validation.</div>
`, 'Presentation-friendly description of the development approach. Note: the report does not formally name a specific SDLC model — this is an iterative, module-based reading of how the system was built.'));

// ============================================================ 09 PLANNING
const plan = [
  ['01', 'Research & Planning', 'Study requirements, existing tools, and security guidelines', 'dot'],
  ['02', 'System Design', 'Create UML diagrams, architecture, and database structures', 'corner'],
  ['03', 'Core Development', 'Implement user authentication, dashboard, and backend', 'step'],
  ['04', 'AI Integration', 'Connect Hermes, OpenRouter, and approved security tools', 'diag'],
  ['05', 'Testing & Deployment', 'Validate workflows, integrate evidence storage, and configure hosting', 'arrow'],
];
slides.push(slide(9, '', `
  ${bgimg('teal-mid.jpg')}<div class="abs-fill" style="background:linear-gradient(90deg,rgba(0,12,22,.55),rgba(0,12,22,.1) 60%,rgba(0,12,22,.25))"></div>
  <div class="left-[110px] top-[90px]">${pill('Project Planning', '09')}</div>
  <div class="h1 left-[110px] top-[165px] w-[740px] text-[80px]" style="color:#a9c7d6">From planning to a <b>working security platform.</b></div>
  <div class="body left-[110px] top-[560px] w-[640px] text-[25px]">The following milestones organize the implementation into logical development stages.</div>
  <div class="left-[110px] top-[760px] w-[640px] text-[26px] leading-[1.35]" style="font-family:'RK Medium'"><span class="mono block mb-[10px]" style="color:#d4eef7">Expected deliverable</span>An integrated application supporting authorized, observable website security assessments.</div>
  ${plan.map(([n, t, d, ic], i) => `<div class="glass left-[880px] top-[${100 + i * 170}px] w-[930px] h-[150px]">
    <div class="mono absolute left-[40px] top-[26px]" style="color:#a9c6d4">Stage ${n}</div>
    <div class="absolute left-[40px] top-[56px] text-[38px] leading-[1.1]" style="font-family:'RK Semibold'">${t}</div>
    <div class="absolute left-[40px] top-[104px] w-[720px] text-[21px]" style="font-family:'RK Medium';color:#c3d6df">${d}</div>
    <div class="ico absolute right-[36px] top-[44px]" style="background:rgba(255,255,255,.92)">${pix(ic)}</div></div>`).join('')}
`, 'Proposed project milestones based on the implemented components. Note: the report does not provide a dated development schedule.'));

// ============================================================ 10 ANALYSIS
const nodes = [
  ['Layer 01', 'User / Operator', 'Provides an authorized target and monitors progress'],
  ['Layer 02', 'Next.js Interface & Gateway', 'Authentication • Scope control • Live monitoring'],
  ['Layer 03', 'Hermes Agent + OpenRouter', 'AI reasoning and controlled tool selection'],
  ['Layer 04', 'Approved Security Tools', 'Execute permitted assessments against the target'],
];
slides.push(slide(10, 'bg-cover', `
  <div class="left-[110px] top-[90px]">${pill('Analysis of System', '10')}</div>
  <div class="h1 left-[110px] top-[165px] w-[1000px] text-[78px]">How RomanKnows works <b>behind the interface.</b></div>
  <div class="body left-[110px] top-[395px] w-[820px] text-[25px]">The system separates user interaction, AI reasoning, tool execution, and evidence storage.</div>
  <img src="../assets/authorized-website-assessment.png" class="left-[1320px] top-[20px] w-[500px]" />
  ${nodes.map(([l, t, d], i) => {
    const x = 110 + i * 440;
    return `<div class="glass left-[${x}px] top-[500px] w-[380px] h-[236px]">
      <div class="mono absolute left-[30px] top-[26px]" style="color:#a9c6d4">${l}</div>
      <div class="absolute left-[30px] top-[66px] w-[320px] text-[32px] leading-[1.1]" style="font-family:'RK Semibold'">${t}</div>
      <div class="absolute left-[30px] top-[150px] w-[320px] text-[20px] leading-[1.38]" style="font-family:'RK Medium';color:#c3d6df">${d}</div></div>
    ${i < 3 ? `<div class="left-[${x + 388}px] top-[606px] w-[44px] h-[24px]"><svg viewBox="0 0 44 24" width="44" height="24"><path d="M0 12H38M30 4l8 8-8 8" stroke="#bfe6f2" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>` : ''}`;
  }).join('')}
  <div class="left-[550px] top-[738px] w-[2px] h-[56px]" style="background:rgba(191,230,242,.55)"></div>
  <div class="left-[990px] top-[738px] w-[2px] h-[56px]" style="background:rgba(191,230,242,.55)"></div>
  <div class="left-[1430px] top-[738px] w-[2px] h-[56px]" style="background:rgba(191,230,242,.55)"></div>
  ${[['MongoDB', 'Users & scans', 'siMongodb', 110 + 440], ['SQLite', 'Agent sessions', 'siSqlite', 110 + 880], ['Artifacts', 'Evidence & reports', 'b:Fx', 110 + 1320]].map(([t, d, k, x]) =>
    `<div class="glass-dk left-[${x - 90}px] top-[794px] w-[380px] h-[96px]"><div class="absolute left-[26px] top-[30px]">${k.startsWith('b:') ? badge('▤') : logo(k)}</div>
      <div class="absolute left-[78px] top-[18px] text-[28px] leading-none" style="font-family:'RK Semibold'">${t}</div><div class="absolute left-[78px] top-[56px] text-[20px]" style="font-family:'RK Medium';color:#b2c8d3">${d}</div></div>`).join('')}
  <div class="left-[110px] top-[935px] w-[1700px] text-[26px]" style="font-family:'RK Medium'"><span class="mono mr-[20px]" style="color:#bfe6f2">Core principle</span>AI recommends actions, controlled tools execute them, and the system maintains traceable evidence.</div>
`, 'Layered architecture: operator, Next.js gateway, Hermes + OpenRouter, approved tools; persistence in MongoDB, SQLite and file artifacts.'));

// ============================================================ 11 DATA DICTIONARY (light)
const dd = [
  ['card-teal', 'MongoDB', 'Application Records', [['users', 'email, password hash, role and account information'], ['scans', 'target URL, status, progress and findings'], ['activity', 'user actions and audit events']], 'siMongodb'],
  ['card-black', 'SQLite', 'AI Conversation Records', [['sessions', 'agent session metadata and configuration'], ['messages', 'conversation history and tool calls']], 'siSqlite'],
  ['card-white', 'Files', 'Assessment Artifacts', [['Authorization & scope', 'documents'], ['Evidence', 'reconnaissance evidence'], ['Findings & reports', 'final assessment reports']], null],
];
slides.push(slide(11, '', `
  ${bgimg('light.jpg')}
  <div class="left-[110px] top-[90px]">${pill('Data Dictionary', '11', true)}</div>
  <div class="h1 on-light left-[110px] top-[165px] w-[1000px] text-[88px]">Organized data. <i>Traceable assessments.</i></div>
  <div class="body body-l left-[1180px] top-[205px] w-[630px] text-[25px]">RomanKnows uses a hybrid storage architecture.</div>
  ${dd.map(([cls, t, sub, rows, k], i) => {
    const dark = cls !== 'card-white';
    return `<div class="${cls} left-[${110 + i * 580}px] top-[400px] w-[550px] h[500px]" style="height:510px;${cls === 'card-teal' ? "background-image:url('../assets/bg/teal-mid.jpg')" : ''}">
      <div class="absolute left-[34px] top-[32px] ico" style="background:${dark ? 'rgba(255,255,255,.14)' : '#eef0f6'};${k ? '' : ''}">${k ? `<span class="logo" style="width:28px;height:28px;color:#fff"><svg viewBox="0 0 24 24"><path d="${si[k].path}"/></svg></span>` : pix('step')}</div>
      <div class="mono absolute right-[34px] top-[48px]" style="color:${dark ? '#b9cfda' : '#8a97a3'}">${sub}</div>
      <div class="absolute left-[34px] top-[118px] text-[62px] leading-none" style="font-family:'RK Semibold';color:${dark ? '#fff' : '#0f1820'}">${t}</div>
      <div class="absolute left-[34px] right-[30px] top-[208px]">${rows.map(([a, b]) => `<div class="mb-[18px]"><div class="text-[24px]" style="font-family:'Consolas';color:${dark ? '#dff1f8' : '#0f1820'}">${a}</div><div class="text-[21px] leading-[1.35] mt-[4px]" style="font-family:'RK Medium';color:${dark ? '#b7cad4' : '#4a5966'}">${b}</div></div>`).join('')}</div></div>`;
  }).join('')}
  <div class="left-[110px] top-[945px] w-[1700px] text-[23px] text-ink2" style="font-family:'RK Medium'"><span class="mono mono-l mr-[18px]">Benefit</span>Application data, AI conversations, and security evidence are stored separately for better organization and traceability.</div>
`, 'Hybrid storage: MongoDB for application records, SQLite for AI conversations, and files for assessment artifacts.', true));

// ============================================================ 12 TEST CASES
const tests = [
  ['Invalid signup email', 'Reject invalid email format'],
  ['Weak password', 'Reject password below the required length'],
  ['Incorrect login', 'Display an error and deny access'],
  ['Missing authorization', 'Prevent assessment execution'],
  ['Out-of-scope target', 'Block unauthorized tool execution'],
  ['Missing phase evidence', 'Prevent premature phase advancement'],
  ['Completed authorized assessment', 'Allow structured report generation'],
];
slides.push(slide(12, '', `
  ${bgimg('glow-3.jpg')}<div class="abs-fill shade"></div>
  <div class="left-[110px] top-[90px]">${pill('Test Cases', '12')}</div>
  <div class="h1 left-[110px] top-[165px] w-[700px] text-[68px]">Validating <b>security, functionality and workflow.</b></div>
  <div class="body left-[110px] top-[490px] w-[600px] text-[23px]">The following test scenarios are derived from the system requirements and documented validation rules.</div>
  <div class="mono left-[110px] top-[690px]" style="color:#bfe6f2">Testing objectives</div>
  ${['Verify input validation and access control.', 'Prevent unauthorized assessment activity.', 'Maintain correct phase progression.', 'Ensure evidence is available for reporting.'].map((t, i) =>
    `<div class="left-[110px] top-[${735 + i * 56}px] w-[620px] flex gap-[16px]"><span class="dot mt-[11px]"></span><span class="text-[23px] leading-[1.3]" style="font-family:'RK Medium';color:#e3edf2">${t}</span></div>`).join('')}
  <div class="glass left-[800px] top-[100px] w-[1010px] h-[860px]"></div>
  <div class="mono left-[850px] top-[135px]">Test case</div><div class="mono left-[1360px] top-[135px]">Expected result</div>
  ${tests.map(([a, b], i) => `<div class="hair left-[850px] top-[${178 + i * 110}px] w-[910px]"></div>
    <div class="left-[850px] top-[${178 + i * 110}px] h-[110px] w-[470px] flex items-center text-[30px] leading-[1.15]" style="font-family:'RK Semibold'">${a}</div>
    <div class="left-[1322px] top-[${178 + i * 110 + 39}px] w-[30px]"><svg viewBox="0 0 30 24" width="30" height="24"><path d="M0 12H25M17 4l8 8-8 8" stroke="#8fb5c6" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    <div class="left-[1370px] top-[${178 + i * 110}px] h-[110px] w-[400px] flex items-center text-[24px] leading-[1.3]" style="font-family:'RK Medium';color:#d6e5ec">${b}</div>`).join('')}
`, 'Expected-behavior test cases derived from validation rules — not recorded pass/fail results. The report documents validation logic but has no separate executed test-results table.'));

// ============================================================ 13 SNAPSHOTS
slides.push(slide(13, 'bg-cover', `
  <div class="left-[110px] top-[80px]">${pill('Implementation Snapshots', '13')}</div>
  <div class="h1 left-[110px] top-[150px] w-[1100px] text-[78px]">From concept to <b>working application.</b></div>
  <img src="../assets/shots/dashboard.png" class="shot left-[110px] top-[330px] w-[1080px]" />
  <div class="left-[110px] top-[900px] w-[1080px] flex items-baseline gap-[22px]"><span class="mono" style="color:#bfe6f2">02 — Mission Dashboard</span><span class="text-[22px]" style="font-family:'RK Medium';color:#c9d5dc">Central workspace showing assessment progress, agent activity, and live events.</span></div>
  <div class="mono left-[110px] top-[948px]" style="color:#7f9aa9">Report Figure 4.3</div>
  ${[
    ['login', '01 — Login & Signup', 'Registration, authentication and secure sessions', 'Figures 4.1–4.2'],
    ['phase', '03 — Phase Progress', 'Real-time, evidence-based phase markers', 'Figure 4.5'],
    ['report', '04 — Assessment Report', 'Findings, evidence, remediation and export', 'Figure 4.6'],
  ].map(([img, t, d, f], i) => `
    <div class="left-[1250px] top-[${70 + i * 318}px] w-[560px] h-[212px] overflow-hidden rounded-[18px]" style="box-shadow:0 30px 60px -25px rgba(0,8,16,.85),0 0 0 1.5px rgba(200,225,235,.22)">
      <img src="../assets/shots/${img}.png" class="!static w-[560px] h-[212px] object-cover object-top" /></div>
    <div class="left-[1250px] top-[${70 + i * 318 + 226}px] w-[560px]"><div class="mono" style="color:#bfe6f2;font-size:15px">${t}  ·  ${f}</div><div class="text-[22px] leading-[1.3] mt-[6px]" style="font-family:'RK Medium'">${d}</div></div>`).join('')}
`, 'Figures 4.1–4.6 from Chapter 4: login/signup, mission dashboard (largest), phase progress and generated assessment report.'));

// ============================================================ 14 CONCLUSION
const future = ['Scheduled assessments and historical comparisons', 'Improved analytics with OWASP category mapping', 'Team collaboration and role-based workflows', 'CI/CD integration for continuous authorized testing', 'Private or self-hosted LLM support', 'Advanced reporting and policy controls'];
slides.push(slide(14, '', `
  ${bgimg('mosaic.jpg')}
  <div class="left-[110px] top-[90px]">${pill('Conclusion & Future Scope', '14')}</div>
  <div class="h1 left-[110px] top-[165px] w-[900px] text-[84px]">A smarter way to manage <b>authorized security testing.</b></div>
  <div class="body left-[110px] top-[560px] w-[780px] text-[24px] leading-[1.5]">RomanKnows demonstrates how AI can help coordinate the different stages of a website security assessment while keeping authorization, scope, and evidence at the center.</div>
  <div class="body left-[110px] top-[740px] w-[780px] text-[24px] leading-[1.5]" style="color:#e3edf2">The platform brings together user management, AI-assisted workflows, security tools, progress tracking, and reporting in one system.</div>
  <div class="mono left-[1000px] top-[110px]" style="color:#d4eef7">Future enhancements</div>
  ${future.map((t, i) => `<div class="glass left-[1000px] top-[${160 + i * 100}px] w-[810px] h-[84px]">
    <div class="mono absolute left-[30px] top-[30px]" style="color:#a9c6d4">${String(i + 1).padStart(2, '0')}</div>
    <div class="absolute left-[100px] top-0 h-[84px] w-[680px] flex items-center text-[25px]" style="font-family:'RK Medium'">${t}</div></div>`).join('')}
  <div class="left-[1000px] top-[790px] w-[810px] h-[170px] rounded-[28px]" style="background:linear-gradient(100deg,rgba(214,238,246,.96),rgba(150,196,214,.92))"></div>
  <div class="left-[1040px] top-[818px] w-[740px] text-[#06202d]"><div class="mono" style="color:#0f4a62">Final takeaway</div><div class="mt-[8px] text-[30px] leading-[1.25]" style="font-family:'RK Semibold'">RomanKnows is an AI-powered assessment assistant, not a replacement for professional security experts.</div></div>
`, 'Conclusion and honest limitations; future scope from Section 5.2 of the report.'));

// ============================================================ 15 REFERENCES + THANK YOU
const refs = [
  ['OWASP Foundation', 'OWASP Top 10 and Web Security Testing Guide', 'owasp.org'],
  ['NIST SP 800-115', 'Technical Guide to Information Security Testing and Assessment', ''],
  ['Nmap & WhatWeb', 'Network discovery and web technology identification', ''],
  ['Hermes Agent & OpenRouter', 'AI agent framework and model integration documentation', ''],
  ['Technology Documentation', 'React, Next.js, MongoDB, SQLite, and related implementation resources', ''],
];
slides.push(slide(15, 'bg-cover', `
  <div class="left-[110px] top-[90px]">${pill('References', '15')}</div>
  <div class="h1 left-[110px] top-[165px] w-[1100px] text-[72px]">Research and technologies <b>behind RomanKnows.</b></div>
  ${refs.map(([a, b, c], i) => `<div class="glass-fade left-[${110 + i * 344}px] top-[${420 - i * 0}px] w-[322px] h-[360px]">
    <div class="num absolute left-[26px] top-[22px] text-[70px]">${String(i + 1).padStart(2, '0')}</div>
    <div class="absolute left-[26px] top-[132px] w-[270px] text-[28px] leading-[1.12]" style="font-family:'RK Semibold'">${a}</div>
    <div class="absolute left-[26px] top-[${i >= 3 ? 222 : 190}px] w-[270px] text-[19px] leading-[1.4]" style="font-family:'RK Medium';color:#c3d6df">${b}</div>
    ${c ? `<div class="mono absolute left-[26px] top-[316px]" style="color:#8fb5c6;font-size:15px">${c}</div>` : ''}</div>`).join('')}
  <div class="hair left-[110px] top-[840px] w-[1700px]"></div>
  <div class="left-[110px] top-[862px] text-[128px] leading-[1.05] whitespace-nowrap" style="font-family:'RK Light'">Thank <span style="font-family:'RK Semibold'">You</span></div>
  <div class="left-[1010px] top-[900px] w-[800px] text-right"><div class="mono" style="color:#bfe6f2">Questions & Discussion</div><div class="mt-[10px] text-[25px]" style="font-family:'RK Medium';color:#e3edf2">Ronit Kaushal · Het Jani · Vaghela Mitrajsinh</div></div>
`, 'References (Table 6.1 of the report) and close with questions.'));

export const html = (cssHref) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>RomanKnows — Project-1 Presentation</title>
<link rel="stylesheet" href="${cssHref}"><style>.slide{font-family:'RK Medium',sans-serif}</style></head>
<body><div class="deck">${slides.join('\n')}</div>
<script>
 if(!location.search.includes('export')){
  const bar=document.createElement('div');
  bar.id='export-bar';
  const icon='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>';
  const FMT=[['pptx','Export to PPT'],['pdf','Export to PDF']];
  bar.innerHTML=FMT.map(([k,t])=>'<button class="export-btn" data-fmt="'+k+'">'+icon+'<span>'+t+'</span></button>').join('');
  document.body.appendChild(bar);
  const f=()=>{const z=Math.min(1,(innerWidth-40)/1920);document.documentElement.style.zoom=z;bar.style.zoom=1/z};f();addEventListener('resize',f);
  bar.querySelectorAll('button').forEach((btn)=>{
    const label=btn.querySelector('span'),orig=label.textContent,fmt=btn.dataset.fmt;
    btn.onclick=async()=>{
      if(location.protocol==='file:'){alert('Start the preview server first:\\n\\n  cd deck\\n  npm start\\n\\nthen open http://localhost:5173 and use the Export buttons.');return}
      bar.querySelectorAll('button').forEach((b)=>b.disabled=true);label.textContent='Exporting… (~15s)';
      try{
        const r=await fetch('/export?format='+fmt);
        if(!r.ok)throw new Error(await r.text());
        const a=document.createElement('a');a.href=URL.createObjectURL(await r.blob());a.download='RomanKnows_Presentation.'+fmt;a.click();
        label.textContent='Downloaded ✓';
      }catch(e){label.textContent='Export failed';alert(e.message)}
      setTimeout(()=>{bar.querySelectorAll('button').forEach((b)=>b.disabled=false);label.textContent=orig},2500);
    };
  });
 }
 else document.documentElement.classList.add('export');
</script></body></html>`;
