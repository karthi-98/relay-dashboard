/* Relay: standalone mockup. All data and interactions stay in this browser. */
'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const paths = {
  overview:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 9v12"/>',
  cube:'<path d="m12 3 9 5v8l-9 5-9-5V8Zm0 9 9-4M12 12 3 8m9 4v9M7.5 5.5l9 5"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  terminal:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m7 8 3 3-3 3m6 1h4"/>',
  alert:'<path d="m10.3 4-8 14a2 2 0 0 0 1.7 3h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
  building:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1M10 21v-3h4v3"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-9 12a3 3 0 0 0 6 0"/>',
  plug:'<path d="M8 3v5m8-5v5M6 8h12v3a6 6 0 0 1-12 0Zm6 9v5"/>',
  settings:'<path d="m9 3-.6 2.4-2 .9L4 5.6 2 9l1.8 1.7v2.6L2 15l2 3.4 2.4-.7 2 .9L9 21h4l.6-2.4 2-.9 2.4.7 2-3.4-1.8-1.7v-2.6L20 9l-2-3.4-2.4.7-2-.9L13 3Z"/><circle cx="11" cy="12" r="3"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .6-1.5 1-1.5 2M12 17h.01"/>',
  external:'<path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  chevron:'<path d="m7 10 5 5 5-5"/>', chevrons:'<path d="m8 9 4-4 4 4m-8 6 4 4 4-4"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 15v5h16v-5"/>',
  upload:'<path d="M12 15V3M7 8l5-5 5 5M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
  window:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M6.5 6.5h.01M9.5 6.5h.01"/>',
  network:'<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4m0 0-5.2 5.4m5.2-5.4 5.2 5.4"/>',
  alertSolid:'<path class="solid" d="m10.3 4-8 14a2 2 0 0 0 1.7 3h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z"/><path class="mark" d="M12 9.5v3.5m0 3.6h.01"/>',
  xSolid:'<circle class="solid" cx="12" cy="12" r="10"/><path class="mark" d="m9 9 6 6m0-6-6 6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  sort:'<path d="M8 5v14m-3-3 3 3 3-3M16 19V5m-3 3 3-3 3 3"/>',
  sliders:'<path d="M4 7h5m4 0h7M4 17h9m4 0h3"/><circle cx="11" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  branch:'<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M6 7v10m12-10c0 8-12 4-12 10"/>',
  code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
  copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  check:'<path d="m5 12 4 4L19 6"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>',
  shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 11 3 3 5-5"/>',
  server:'<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h6m-6 11h6"/>',
  pulse:'<path d="M2 12h5l3-8 4 16 3-8h5"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  rocket:'<path d="M14 4c3-2 7-1 7-1s1 4-1 7l-7 7-6-6ZM7 11H3l4-5h5m1 11v4l5-4v-5M5 15l-2 6 6-2"/><circle cx="16" cy="8" r="1.5"/>',
  refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 6a8 8 0 0 1 13 3M5 15a8 8 0 0 0 13 3"/>',
  activity:'<path d="M4 19V9m5 10V5m5 14v-7m5 7V3"/>',
  pause:'<path d="M8 5v14M16 5v14"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>'
};
function icon(name, extra = '') { return `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.cube}</svg>`; }
function hydrateIcons(root = document) { $$('[data-icon]', root).forEach(el => { el.innerHTML = icon(el.dataset.icon); }); }
const owners = ['Alex Morgan', 'Sam Lee', 'Maya Chen', 'Noah Park'];
function avatar(owner) { const index = Math.max(0, owners.indexOf(owner)); return `<span class="avatar avatar-${index}" aria-hidden="true">${owner.split(' ').map(n => n[0]).join('')}</span>`; }
function ownerCell(owner) { return `<span class="owner">${avatar(owner)}${escapeHTML(owner)}</span>`; }
function badge(label, color = 'green') { return `<span class="badge ${color}">${escapeHTML(label)}</span>`; }
const baseServices = [
  {name:'web-app', project:'web', owner:0, requests:1420000, latency:112, error:.03, commit:'a3f82c1', time:'24m ago', glyph:'window', description:'The customer-facing web application. Serves the main product experience from the global edge network.'},
  {name:'api-gateway', project:'core', owner:1, requests:780000, latency:168, error:.06, commit:'b7d491e', time:'1h ago', glyph:'network', description:'Routes and authenticates incoming API requests across core platform services.'},
  {name:'auth-service', project:'core', owner:2, requests:310000, latency:620, error:.74, commit:'e5c02a4', time:'2h ago', glyph:'shield', description:'Manages identity, sessions, and access tokens. Elevated database latency is affecting session validation.'},
  {name:'background-worker', project:'core', owner:3, requests:130000, latency:240, error:.05, commit:'c91f6b2', time:'3h ago', glyph:'cube', description:'Processes asynchronous jobs, scheduled work, and background data synchronization.'},
  {name:'edge-proxy', project:'web', owner:0, requests:90000, latency:42, error:.01, commit:'f60a9e1', time:'4h ago', glyph:'globe', description:'A global routing layer with caching, request protection, and origin failover.'},
  {name:'notifications', project:'core', owner:1, requests:60000, latency:96, error:.02, commit:'12ec7b3', time:'5h ago', glyph:'bell', description:'Delivers transactional emails and in-app notifications through a reliable event queue.'},
  {name:'search-api', project:'core', owner:2, requests:35000, latency:138, error:.04, commit:'7ac031d', time:'6h ago', glyph:'search', description:'Indexes workspace content and serves full-text search with relevance ranking.'},
  {name:'media-service', project:'web', owner:3, requests:15000, latency:205, error:.05, commit:'8db21af', time:'8h ago', glyph:'server', description:'Optimizes, transforms, and delivers user-uploaded media assets.'}
];
const state = {page:'overview', tab:'overview', project:'all', environment:'Production', hours:24, query:'', status:'all', sort:'', direction:1, selected:new Set(['auth-service']), chart:'requests', acknowledged:false, logService:'all', logLevel:'all'};
const deployments = [
  {message:'Improve cache invalidation',service:'web-app',branch:'main',commit:'a3f82c1',status:'Ready',owner:'Alex Morgan',time:'24m ago',environment:'Production'},
  {message:'Update auth callback',service:'web-app',branch:'feature/auth',commit:'d82a70f',status:'Failed',owner:'Sam Lee',time:'18m ago',environment:'Production'},
  {message:'Optimize request routing',service:'api-gateway',branch:'main',commit:'b7d491e',status:'Ready',owner:'Sam Lee',time:'1h ago',environment:'Production'},
  {message:'Test session refresh',service:'auth-service',branch:'develop',commit:'7e912ca',status:'Ready',owner:'Maya Chen',time:'42m ago',environment:'Staging'},
  {message:'Preview account settings',service:'web-app',branch:'feature/settings',commit:'9a2b301',status:'Ready',owner:'Alex Morgan',time:'12m ago',environment:'Preview'},
  {message:'Refresh worker dependencies',service:'background-worker',branch:'develop',commit:'31cafd7',status:'Ready',owner:'Noah Park',time:'2h ago',environment:'Staging'}
];
const number = value => value >= 1000000 ? `${(value/1000000).toFixed(2).replace(/\.00$/,'')}M` : value >= 1000 ? `${(value/1000).toFixed(value % 1000 ? 1 : 0)}K` : Math.round(value).toLocaleString();
function scopedServices() {
  const factor = state.environment === 'Production' ? 1 : state.environment === 'Staging' ? .085 : .018;
  const names = state.environment === 'Staging' ? ['web-app','api-gateway','auth-service','background-worker'] : state.environment === 'Preview' ? ['web-app','api-gateway'] : baseServices.map(s=>s.name);
  deployments.filter(d=>d.environment===state.environment).forEach(d=>{if(!names.includes(d.service))names.push(d.service);});
  return baseServices.filter(s => names.includes(s.name) && (state.project === 'all' || s.project === state.project)).map(s => ({...s,environment:state.environment,status:s.name==='auth-service'&&state.environment==='Production'?'Degraded':'Healthy',requests:Math.round(s.requests * factor * state.hours / 24),latency:state.environment==='Production'?s.latency:Math.round(s.latency*.55),error:state.environment==='Production'?s.error:s.error*.1}));
}
function visibleServices() {
  const list = scopedServices().filter(s => (state.status==='all'||s.status===state.status) && s.name.includes(state.query.toLowerCase()));
  if (state.sort) list.sort((a,b)=>(typeof a[state.sort]==='string'?a[state.sort].localeCompare(b[state.sort]):a[state.sort]-b[state.sort])*state.direction);
  return list;
}
function scopedDeployments(){const names = new Set(scopedServices().map(s=>s.name));return deployments.filter(d=>d.environment===state.environment&&names.has(d.service));}
function spark(seed, bars = false, degraded = false) {
  const values = Array.from({length:18},(_,i) => 5 + ((i*13 + seed*7 + i*i*3)%17));
  if (bars) return `<span class="bar-spark ${degraded?'degraded':''}" role="img" aria-label="${degraded?'Variable':'Stable'} traffic trend">${values.map(v=>`<span style="height:${Math.round(3+v*.6)}px"></span>`).join('')}</span>`;
  // Metric sparklines: a gentle trend with deterministic jitter, smoothed so it reads as a signal rather than noise.
  const trend = seed===2 ? .5 : 0;
  const points = Array.from({length:16},(_,i)=>[i/15*110, 18-i*trend*1.5+Math.sin(i*1.7+seed)*2.4+Math.sin(i*.6+seed*2)*1.8]);
  const line = monotonePath(points);
  const lastY = points[points.length-1][1];
  return `<span class="metric-spark"><svg viewBox="0 0 110 28" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="spark-fill-${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#34c473" stop-opacity=".28"/><stop offset="100%" stop-color="#34c473" stop-opacity="0"/></linearGradient></defs><path d="${line} L110,28 L0,28 Z" fill="url(#spark-fill-${seed})"/><path d="${line}" fill="none" stroke="#34c473" stroke-width="1.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg><span class="spark-dot" style="top:${(lastY/28*100).toFixed(1)}%"></span></span>`;
}
// Monotone cubic interpolation (Fritsch–Carlson): smooth curves that never overshoot the data.
function monotoneTangents(points){
  const n=points.length,slope=[],tangent=[];
  for(let i=0;i<n-1;i++)slope[i]=(points[i+1][1]-points[i][1])/(points[i+1][0]-points[i][0]);
  tangent[0]=slope[0];tangent[n-1]=slope[n-2];
  for(let i=1;i<n-1;i++)tangent[i]=slope[i-1]*slope[i]<=0?0:(slope[i-1]+slope[i])/2;
  for(let i=0;i<n-1;i++){
    if(slope[i]===0){tangent[i]=tangent[i+1]=0;continue;}
    const a=tangent[i]/slope[i],b=tangent[i+1]/slope[i],s=a*a+b*b;
    if(s>9){const k=3/Math.sqrt(s);tangent[i]=k*a*slope[i];tangent[i+1]=k*b*slope[i];}
  }
  return tangent;
}
function monotonePath(points,tangent=monotoneTangents(points)){
  if(points.length<2)return '';
  let d=`M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for(let i=0;i<points.length-1;i++){
    const [x0,y0]=points[i],[x1,y1]=points[i+1],third=(x1-x0)/3;
    d+=`C${(x0+third).toFixed(1)},${(y0+tangent[i]*third).toFixed(1)} ${(x1-third).toFixed(1)},${(y1-tangent[i+1]*third).toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
  }
  return d;
}
// Height of the drawn curve at any x. The Bézier segments above have evenly spaced control
// points, so each one is exactly the cubic Hermite below; the hover dot sits on the visible line.
function monotoneYAt(points,tangent,x){
  const last=points.length-1;
  let i=Math.floor((x-points[0][0])/(points[last][0]-points[0][0])*last);
  i=Math.max(0,Math.min(last-1,i));
  const [x0,y0]=points[i],[x1,y1]=points[i+1],h=x1-x0,t=Math.max(0,Math.min(1,(x-x0)/h)),t2=t*t,t3=t2*t;
  return (2*t3-3*t2+1)*y0+(t3-2*t2+t)*h*tangent[i]+(-2*t3+3*t2)*y1+(t3-t2)*h*tangent[i+1];
}
function healthBars(healthy, total) {
  // Rising bars echo the healthy-service ratio; dimmer leading bars keep the shape readable.
  const heights = [7,9,11,10,14,17,20,24,28];
  return `<span class="metric-bars" role="img" aria-label="${healthy} of ${total} services healthy">${heights.map(h=>`<span style="height:${h}px"></span>`).join('')}</span>`;
}
function renderMetrics(){
  const services = scopedServices();
  const total = services.reduce((sum,s)=>sum+s.requests,0);
  const degraded = services.filter(s=>s.status==='Degraded').length;
  const weightedErrors = services.reduce((sum,s)=>sum+s.requests*s.error,0)/(total||1);
  const latency = services.length ? (state.environment==='Production'&&state.project==='all'?184:Math.round(services.reduce((sum,s)=>sum+s.latency,0)/services.length)) : 0;
  const metrics = [
    ['Total requests',number(total),'+8.2%',2],['Error rate',`${weightedErrors.toFixed(2)}%`,'−0.04 pp',5],['p95 latency',`${latency} ms`,'−12%',9],['Healthy services',`${services.length-degraded} / ${services.length}`,degraded?'1 needs attention':'All operational',13]
  ];
  $('.metrics').innerHTML=metrics.map(([label,value,change,seed],index)=>`<div class="metric"><div class="metric-label">${label}</div><div class="metric-line"><strong class="metric-value">${value}</strong><span class="metric-change ${index===3&&degraded?'amber':''}">${change}</span>${index===3?healthBars(services.length-degraded,services.length):spark(seed)}</div></div>`).join('');
  $('#global-health').className=`badge ${degraded?'amber':'green'}`;
  $('#global-health').innerHTML=`<span class="dot"></span>${degraded?'1 degraded':'Operational'}`;
  renderAttention(services);
  renderChart();
}
function renderAttention(services){
  const degraded = services.some(s=>s.status==='Degraded');
  const failed = scopedDeployments().some(d=>d.status==='Failed');
  const count=Number(degraded)+Number(failed);
  $('.attention-panel').innerHTML=`<div class="attention-heading"><h2 id="attention-title">Needs attention</h2>${count?`<span class="count-pill amber">${count}</span>`:''}</div>${degraded?`<div class="attention-item"><span class="attention-icon">${icon('alertSolid')}</span><div class="attention-info"><div class="attention-title"><h3>Elevated auth latency</h3><time>12m ago</time></div><div class="attention-row"><p>auth-service<span class="separator">·</span>p95 620 ms</p><button class="text-button" data-action="incident">View incident ${icon('arrow')}</button></div><span class="attention-state">${state.acknowledged?'Acknowledged':'Investigating'}</span></div></div>`:''}${failed?`<div class="attention-item"><span class="attention-icon red">${icon('xSolid')}</span><div class="attention-info"><div class="attention-title"><h3>Build failed</h3><time>18m ago</time></div><div class="attention-row"><p>web-app<span class="separator">·</span>feature/auth</p><button class="text-button" data-deployment="d82a70f">Inspect build ${icon('arrow')}</button></div><span class="attention-state quiet">18 min ago</span></div></div>`:''}${!degraded&&!failed?`<div class="attention-empty">${icon('check')}<h3>Everything looks good</h3><p>No active issues in this environment.</p></div>`:''}`;
}
const chartRanges={
  1:{span:60,start:13*60+30,points:61,ticks:[0,10,20,30,40,50],format:'clock'},
  24:{span:1440,start:0,points:97,ticks:[0,240,480,720,960,1200],format:'clock'},
  168:{span:10080,start:0,points:85,ticks:[0,1,2,3,4,5,6].map(d=>d*1440),format:'week'},
  720:{span:43200,start:0,points:61,ticks:[4,9,14,19,24,29].map(d=>d*1440),format:'month'}
};
const pad2=value=>String(value).padStart(2,'0');
function chartTime(minutes,format,detail=false){
  // The final point of a day closes at 24:00 rather than wrapping to the next midnight.
  const clock=minutes>0&&minutes%1440===0&&format==='clock'?'24:00':`${pad2(Math.floor(minutes%1440/60))}:${pad2(Math.round(minutes%60))}`;
  if(format==='clock')return clock;
  const day=Math.floor(minutes/1440);
  const label=format==='week'?['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][Math.min(6,day)]:`Sep ${pad2(day+1)}`;
  return detail?`${label}, ${clock}`:label;
}
function renderChart(){
  const services=scopedServices();
  const total=services.reduce((n,s)=>n+s.requests,0);
  const titles={requests:'Request volume',latency:'Response latency',errors:'Error rate'};
  const units={requests:'requests/min',latency:'p95 response time, ms',errors:'failed requests, %'};
  $('#chart-title').textContent=titles[state.chart];
  $('#chart-unit').textContent=units[state.chart];
  $('#chart-total').textContent=state.chart==='requests'?number(total):state.chart==='latency'?$('.metric:nth-child(3) .metric-value').textContent:$('.metric:nth-child(2) .metric-value').textContent;
  const chart=$('#main-chart');
  // While hidden there is nothing to measure; the resize observer redraws once it is visible.
  if(!chart.clientWidth){chart.dataset.size='';return;}
  chart.setAttribute('aria-label',`${titles[state.chart]} chart. Use the left and right arrow keys to inspect values.`);
  // Read the rendered height so text in the stretched SVG never distorts at any breakpoint.
  chart.dataset.size=`${chart.clientWidth}x${chart.clientHeight}`;
  const w=Math.max(320,chart.clientWidth),h=Math.max(120,chart.clientHeight||156),left=28,right=w-6,top=36,bottom=h-20,plot=right-left;
  const range=chartRanges[state.hours]||chartRanges[24],count=range.points;
  const scale={requests:3000,latency:600,errors:.6}[state.chart];
  const clamp=v=>Math.min(.96,Math.max(.06,v));
  const series=Array.from({length:count},(_,i)=>{
    const u=i/(count-1);
    const wave=state.chart==='errors'?.13*Math.sin(u*40):0;
    const current=clamp(.17+Math.exp(-Math.pow((u-.625)/.16,2))*.57+Math.sin(u*131)*.016+Math.sin(u*47)*.03+Math.sin(u*17+.5)*.02+wave);
    const previous=clamp(.15+Math.exp(-Math.pow((u-.6)/.17,2))*.47+Math.sin(u*97+1)*.014+Math.sin(u*37+2)*.026+wave*.8);
    return {current:current*scale,previous:previous*scale,minutes:range.start+u*range.span};
  });
  const xAt=i=>left+i/(count-1)*plot,yAt=v=>bottom-v/scale*(bottom-top);
  const coords=series.map((p,i)=>[xAt(i),yAt(p.current)]);
  const tangents=monotoneTangents(coords),curveY=x=>monotoneYAt(coords,tangents,x);
  const line=monotonePath(coords,tangents),previousLine=monotonePath(series.map((p,i)=>[xAt(i),yAt(p.previous)]));
  const yLabels=state.chart==='requests'?['3k','2k','1k','0']:state.chart==='latency'?['600','400','200','0']:['0.6%','0.4%','0.2%','0%'];
  const unit=state.chart==='requests'?'req/min':state.chart==='latency'?'ms':'%';
  const format=v=>state.chart==='errors'?v.toFixed(2):Math.round(v).toLocaleString();
  const grid=yLabels.map((label,i)=>{const y=Math.round(top+i*(bottom-top)/3)+.5;return `<line class="chart-grid" x1="${left}" x2="${right}" y1="${y}" y2="${y}"/><text class="chart-axis-text" x="${left-10}" y="${y+4}" text-anchor="end">${label}</text>`;}).join('');
  const ticks=range.ticks.map((t,i)=>{const x=Math.round(left+t/range.span*plot)+.5;return `<line class="chart-grid" x1="${x}" x2="${x}" y1="${top}" y2="${bottom}"/><text class="chart-axis-text" x="${x}" y="${h-2}" text-anchor="${i===0?'start':'middle'}">${chartTime(range.start+t,range.format)}</text>`;}).join('');
  const deploys=state.hours===24?[1/3,2/3].map((ratio,i)=>{const x=Math.round(left+plot*ratio)+.5;return `<line class="chart-deploy" x1="${x}" x2="${x}" y1="4" y2="${bottom}"/><text class="chart-deploy-label" x="${x+7}" y="12">Deploy</text><text class="chart-deploy-hash" x="${x+7}" y="25">${i?'d82a70f':'a3f82c1'}</text>`;}).join(''):'';
  chart.innerHTML=`<svg class="main-chart-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2fbf6b" stop-opacity=".38"/><stop offset="65%" stop-color="#2fbf6b" stop-opacity=".09"/><stop offset="100%" stop-color="#2fbf6b" stop-opacity="0"/></linearGradient></defs>${grid}${ticks}${deploys}<path class="chart-area" d="${line} L${right},${bottom} L${left},${bottom} Z" fill="url(#chart-fill)"/><path class="chart-line chart-line-previous" d="${previousLine}"/><path class="chart-line" d="${line}"/><rect class="chart-dim" x="${right}" y="0" width="0" height="${bottom}"/><line class="chart-crosshair" x1="0" x2="0" y1="${top-6}" y2="${bottom}"/><circle class="chart-halo" r="9"/><circle class="chart-dot" r="4"/></svg><div class="chart-tooltip" aria-hidden="true"></div>`;
  const svg=$('svg',chart),tip=$('.chart-tooltip',chart),dim=$('.chart-dim',svg),cross=$('.chart-crosshair',svg),halo=$('.chart-halo',svg),dot=$('.chart-dot',svg);
  // Hover: the crosshair, dot and dim region ease toward the pointer and settle in ~150ms (quick token),
  // with the dot riding the drawn curve. The tooltip eases on the same clock (a little softer vertically,
  // so it doesn't bob with the line) and glides across when it flips sides. Readouts come from the
  // nearest sample. Keyboard steps and reduced motion jump straight to the point.
  let active=-1,visible=false,frameId=0,lastTime=0,side='right',tipW=0,tipH=0;
  const pos={x:left},goal={x:left},tipPos={x:0,y:0};
  const describe=i=>{
    const point=series[i],change=(point.current-point.previous)/point.previous*100;
    return {point,change,good:state.chart==='requests'?change>=0:change<=0,time:`${chartTime(point.minutes,range.format,true)} UTC`};
  };
  const updateContent=i=>{
    active=i;
    const {point,change,good,time}=describe(i);
    tip.innerHTML=`<div class="chart-tooltip-time">${time}</div><div class="chart-tooltip-row"><span class="chart-key"></span><strong>${format(point.current)}</strong><span class="chart-tooltip-unit">${unit}</span><span class="chart-tooltip-delta ${good?'good':'bad'}">${change>=0?'↑':'↓'} ${Math.abs(change).toFixed(1)}%</span></div><div class="chart-tooltip-row previous"><span class="chart-key previous"></span><span>${format(point.previous)}</span><span class="chart-tooltip-unit">previous period</span></div>`;
    tipW=tip.offsetWidth;tipH=tip.offsetHeight;
  };
  // Beside the pointer, flipping left near the edge (with hysteresis so it doesn't flicker at the boundary).
  const tipTarget=x=>{
    if(side==='right'&&x+16+tipW>w)side='left';
    else if(side==='left'&&x+16+tipW<w-48)side='right';
    tip.dataset.side=side;
    return {x:side==='left'?x-16-tipW:x+16,y:Math.max(0,Math.min(bottom-tipH,curveY(x)-tipH/2))};
  };
  const draw=()=>{
    const x=pos.x,y=curveY(x);
    cross.setAttribute('x1',x);cross.setAttribute('x2',x);
    for(const el of [halo,dot]){el.setAttribute('cx',x);el.setAttribute('cy',y);}
    dim.setAttribute('x',x);dim.setAttribute('width',Math.max(0,right-x));
    const i=Math.max(0,Math.min(count-1,Math.round((x-left)/plot*(count-1))));
    if(i!==active)updateContent(i);
    tip.style.translate=`${tipPos.x.toFixed(1)}px ${tipPos.y.toFixed(1)}px`;
  };
  const step=now=>{
    // rAF timestamps can precede the moment the loop was scheduled; never step backwards.
    const dt=lastTime?Math.min(64,Math.max(0,now-lastTime)):16;lastTime=now;
    const ease=1-Math.exp(-dt/45),easeY=1-Math.exp(-dt/80);
    pos.x+=(goal.x-pos.x)*ease;
    if(Math.abs(goal.x-pos.x)<.05)pos.x=goal.x;
    const target=tipTarget(goal.x);
    tipPos.x+=(target.x-tipPos.x)*ease;tipPos.y+=(target.y-tipPos.y)*easeY;
    const settled=pos.x===goal.x&&Math.abs(target.x-tipPos.x)<.1&&Math.abs(target.y-tipPos.y)<.1;
    if(settled){tipPos.x=target.x;tipPos.y=target.y;}
    draw();
    frameId=settled?0:requestAnimationFrame(step);
  };
  const moveTo=(x,instant=false)=>{
    goal.x=Math.max(left,Math.min(right,x));
    if(instant||!visible||matchMedia('(prefers-reduced-motion: reduce)').matches){
      // Appear in place rather than sliding over from wherever the last hover ended.
      cancelAnimationFrame(frameId);frameId=0;pos.x=goal.x;
      const i=Math.max(0,Math.min(count-1,Math.round((goal.x-left)/plot*(count-1))));
      if(i!==active)updateContent(i);
      const target=tipTarget(goal.x);tipPos.x=target.x;tipPos.y=target.y;
      draw();
    }else if(!frameId){lastTime=0;frameId=requestAnimationFrame(step);}
    visible=true;chart.classList.add('is-active');
  };
  const hide=()=>{visible=false;cancelAnimationFrame(frameId);frameId=0;chart.classList.remove('is-active');};
  const pointerX=e=>{const rect=chart.getBoundingClientRect();return (e.clientX-rect.left)/rect.width*w;};
  chart.onpointermove=e=>moveTo(pointerX(e));
  chart.onpointerdown=e=>{if(e.pointerType==='touch')moveTo(pointerX(e));};
  chart.onpointerleave=hide;
  chart.onpointercancel=hide;
  chart.onkeydown=e=>{
    const stride=e.shiftKey?10:1,current=visible?active:-1;
    const next={ArrowRight:(current<0?count-1:current+stride),ArrowLeft:(current<0?count-1:current-stride),Home:0,End:count-1}[e.key];
    if(next!==undefined){
      e.preventDefault();
      const i=Math.max(0,Math.min(count-1,next));
      moveTo(xAt(i),true);
      const {point,change,time}=describe(i);
      $('#chart-live').textContent=`${time}: ${format(point.current)} ${unit}, ${change>=0?'up':'down'} ${Math.abs(change).toFixed(1)}% from the previous period`;
    }
    else if(e.key==='Escape')hide();
  };
  chart.onblur=hide;
}
function renderServices(){
  const list=visibleServices();
  $('#service-count').textContent=`${list.length} in view`;
  $('#service-rows').innerHTML=list.length?list.map(s=>`<tr class="${state.selected.has(s.name)?'selected':''}"><td class="check-cell"><input type="checkbox" data-select="${s.name}" aria-label="Select ${s.name}" ${state.selected.has(s.name)?'checked':''}></td><td><button class="service-name" data-service="${s.name}"><span class="service-glyph">${icon(s.glyph)}</span>${s.name}</button></td><td>${badge(s.environment,s.environment==='Production'?'green':s.environment==='Staging'?'purple':'neutral')}</td><td>${ownerCell(owners[s.owner])}</td><td>${badge(s.status,s.status==='Healthy'?'green':'amber')}</td><td class="numeric">${number(s.requests)}</td><td class="numeric">${s.latency} ms</td><td>${spark(baseServices.indexOf(baseServices.find(b=>b.name===s.name))+1,true,s.status==='Degraded')}</td><td class="last-deploy"><span class="mono">${s.commit}</span><span class="separator">·</span>${s.time}</td><td class="row-end"><button class="icon-button" data-service="${s.name}" aria-label="View ${s.name} details">${icon('more')}</button></td></tr>`).join(''):`<tr class="empty-row"><td colspan="10"><strong>No services found</strong><p>Try a different name, project, or status.</p><button class="text-button" data-action="reset-filters">Clear filters ${icon('arrow')}</button></td></tr>`;
  const selectedVisible=list.filter(s=>state.selected.has(s.name)).length;
  $('#select-all').checked=!!list.length&&selectedVisible===list.length;
  $('#select-all').indeterminate=selectedVisible>0&&selectedVisible<list.length;
  $('#select-all').disabled=!list.length;
  $('#table-summary').textContent=`${list.length} services in view${selectedVisible?` · ${selectedVisible} selected`:''}`;
  const degraded=list.filter(s=>s.status==='Degraded').length;
  $('#health-summary').innerHTML=`<span>${list.length-degraded} healthy</span>${degraded?`<span class="separator">·</span><span class="amber-text">${degraded} degraded</span>`:''}`;
  $$('[data-sort]').forEach(button=>{button.classList.toggle('sorted',button.dataset.sort===state.sort);button.closest('th').setAttribute('aria-sort',button.dataset.sort===state.sort?(state.direction===1?'ascending':'descending'):'none');});
}
function renderDeployments(){
  const list=scopedDeployments();const shown=state.page==='deployments'||state.tab==='activity'?list:list.slice(0,2);
  $('#deployment-count').textContent=list.length;$('#deployment-count').hidden=state.page!=='deployments';
  $('#deployments-title').textContent=state.page==='deployments'?'Deployments':'Recent deployments';
  $('[data-action="all-deployments"]').hidden=state.page==='deployments';
  $('#deployment-rows').innerHTML=shown.length?shown.map(d=>`<tr><td><div class="deployment-message"><button data-deployment="${d.commit}">${escapeHTML(d.message)}</button></div></td><td class="mono">${d.service}</td><td><span class="branch mono">${escapeHTML(d.branch)}</span></td><td><button class="commit-button" data-copy="${d.commit}" aria-label="Copy commit ${d.commit}">${d.commit}${icon('copy')}</button></td><td>${badge(d.status,d.status==='Ready'?'green':'red')}</td><td>${ownerCell(d.owner)}</td><td class="cell-time">${d.time}</td></tr>`).join(''):`<tr class="empty-row"><td colspan="7"><strong>No deployments in this view</strong><p>Select another project or create a sample deployment.</p><button class="text-button" data-action="deploy">New deployment ${icon('plus')}</button></td></tr>`;
}
function render(){renderMetrics();renderServices();renderDeployments();renderPage();hydrateIcons();syncDropdowns();}
// Dropdowns: a styled listbox layered over each native select. The select stays the source of truth,
// so existing change handlers and programmatic value updates keep working.
let dropdownCount=0;
// Leading decoration for an option: a status dot or a service glyph.
const optionDecor=option=>option.dataset.dot?`<span class="dot ${option.dataset.dot}"></span>`:option.dataset.glyph?`<span class="option-glyph">${icon(option.dataset.glyph)}</span>`:'';
function enhanceDropdowns(root=document){
  $$('.dropdown',root).forEach(wrapper=>{
    if(wrapper.dataset.ready)return;
    wrapper.dataset.ready='true';
    const select=$('select',wrapper);
    if(!select.id)select.id=`dropdown-${++dropdownCount}`;
    select.classList.add('dropdown-native');select.tabIndex=-1;select.setAttribute('aria-hidden','true');
    const trigger=document.createElement('button');
    trigger.type='button';trigger.className='dropdown-trigger';
    trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls',`${select.id}-menu`);
    trigger.innerHTML=`${wrapper.dataset.label?`<span class="dropdown-label">${escapeHTML(wrapper.dataset.label)}</span>`:''}<span class="dropdown-value"></span>${icon('chevron','dropdown-chevron')}`;
    const menu=document.createElement('div');
    menu.className='dropdown-menu';menu.id=`${select.id}-menu`;menu.dataset.state='closed';
    menu.setAttribute('role','listbox');menu.setAttribute('aria-label',select.getAttribute('aria-label'));
    menu.innerHTML=[...select.options].map((option,i)=>`<button type="button" class="dropdown-option" role="option" tabindex="-1" data-option="${i}">${optionDecor(option)}<span>${escapeHTML(option.text)}</span>${icon('check','dropdown-check')}</button>`).join('');
    wrapper.append(trigger,menu);
    syncDropdown(wrapper);
  });
}
function syncDropdown(wrapper){
  const select=$('select',wrapper),option=select.options[select.selectedIndex];if(!option)return;
  $('.dropdown-value',wrapper).innerHTML=`${optionDecor(option)}<span>${escapeHTML(option.text)}</span>`;
  $('.dropdown-trigger',wrapper).setAttribute('aria-label',`${select.getAttribute('aria-label')}: ${option.text}`);
  $$('.dropdown-option',wrapper).forEach((item,i)=>item.setAttribute('aria-selected',i===select.selectedIndex));
}
function syncDropdowns(){$$('.dropdown[data-ready]').forEach(syncDropdown);}
function openDropdown(wrapper,focus='selected'){
  $$('.dropdown.open').forEach(other=>other!==wrapper&&closeDropdown(other));
  const menu=$('.dropdown-menu',wrapper),options=$$('.dropdown-option',wrapper),select=$('select',wrapper);
  clearTimeout(menu.closeTimer);
  // Inside a dialog the menu floats in viewport space, so the dialog's scroll region can't clip it.
  wrapper.classList.add('open');menu.dataset.state='open';
  if(wrapper.closest('dialog'))placeFloatingMenu(wrapper);
  $('.dropdown-trigger',wrapper).setAttribute('aria-expanded','true');
  const index=focus==='first'?0:focus==='last'?options.length-1:Math.max(0,select.selectedIndex);
  options[index]?.focus({preventScroll:true});
}
function placeFloatingMenu(wrapper){
  const menu=$('.dropdown-menu',wrapper),rect=$('.dropdown-trigger',wrapper).getBoundingClientRect();
  menu.classList.add('is-floating');
  menu.style.left=`${rect.left}px`;menu.style.width=`${rect.width}px`;menu.style.maxHeight='';
  const natural=menu.scrollHeight,below=innerHeight-rect.bottom-16,above=rect.top-16;
  const upward=natural>below&&above>below;
  menu.dataset.placement=upward?'top':'bottom';
  menu.style.maxHeight=`${Math.max(120,upward?above:below)}px`;
  menu.style.top=upward?`${Math.max(16,rect.top-6-Math.min(natural,above))}px`:`${rect.bottom+6}px`;
}
function closeDropdown(wrapper,returnFocus=false){
  const menu=$('.dropdown-menu',wrapper);
  if(menu.dataset.state!=='open')return;
  wrapper.classList.remove('open');menu.dataset.state='closing';
  $('.dropdown-trigger',wrapper).setAttribute('aria-expanded','false');
  // Matches the 150ms close transition; afterwards the menu rests at its open-from scale.
  menu.closeTimer=setTimeout(()=>{if(menu.dataset.state==='closing')menu.dataset.state='closed';},150);
  if(returnFocus)$('.dropdown-trigger',wrapper).focus({preventScroll:true});
}
function chooseDropdownOption(wrapper,index){
  const select=$('select',wrapper);
  if(select.selectedIndex!==index){select.selectedIndex=index;select.dispatchEvent(new Event('change',{bubbles:true}));}
  syncDropdown(wrapper);closeDropdown(wrapper,true);
}
document.addEventListener('click',e=>{
  const trigger=e.target.closest('.dropdown-trigger'),option=e.target.closest('.dropdown-option');
  if(trigger){const wrapper=trigger.closest('.dropdown');wrapper.classList.contains('open')?closeDropdown(wrapper):openDropdown(wrapper);}
  else if(option)chooseDropdownOption(option.closest('.dropdown'),Number(option.dataset.option));
});
// Floating menus are positioned once; close them if their surroundings move.
document.addEventListener('scroll',e=>{$$('dialog .dropdown.open').forEach(wrapper=>{if(!$('.dropdown-menu',wrapper).contains(e.target))closeDropdown(wrapper);});},true);
window.addEventListener('resize',()=>$$('dialog .dropdown.open').forEach(wrapper=>closeDropdown(wrapper)));
document.addEventListener('pointerdown',e=>{$$('.dropdown.open').forEach(wrapper=>{if(!wrapper.contains(e.target))closeDropdown(wrapper);});});
document.addEventListener('pointermove',e=>{const option=e.target.closest?.('.dropdown-option');if(option&&document.activeElement!==option)option.focus({preventScroll:true});});
document.addEventListener('focusout',e=>{const wrapper=e.target.closest?.('.dropdown.open');if(wrapper&&!wrapper.contains(e.relatedTarget))closeDropdown(wrapper);});
document.addEventListener('keydown',e=>{
  const wrapper=e.target.closest?.('.dropdown');if(!wrapper)return;
  document.body.classList.add('keyboard-input');
  const isOpen=wrapper.classList.contains('open');
  if(e.target.classList.contains('dropdown-trigger')){
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();e.stopPropagation();openDropdown(wrapper,isOpen?'selected':e.key==='ArrowUp'?'last':'selected');}
    return;
  }
  if(!isOpen)return;
  const options=$$('.dropdown-option',wrapper),current=options.indexOf(document.activeElement);
  const target={ArrowDown:Math.min(options.length-1,current+1),ArrowUp:Math.max(0,current-1),Home:0,End:options.length-1}[e.key];
  if(target!==undefined){e.preventDefault();options[target].focus();}
  else if(e.key==='Escape'){e.preventDefault();closeDropdown(wrapper,true);}
  else if(e.key==='Tab'){closeDropdown(wrapper);return;}
  else if(e.key.length===1&&/\S/.test(e.key)){
    // Type to jump: cycle through options starting with the typed character.
    const starts=item=>item.textContent.trim().toLowerCase().startsWith(e.key.toLowerCase());
    const after=options.findIndex((item,i)=>i>current&&starts(item)),index=after>=0?after:options.findIndex(starts);
    if(index>=0)options[index].focus();
  }
  else return;
  // Keep page shortcuts (G then O, /) from firing while the menu has focus.
  e.stopPropagation();
},true);
function renderPage(){
  const onOverview=state.page==='overview',onServices=state.page==='services',onDeployments=state.page==='deployments';
  $('#dashboard-content').hidden=!onOverview||state.tab==='activity';
  $('.services-section').hidden=!(onServices||(onOverview&&state.tab!=='activity'));
  $('.deployments-section').hidden=!(onDeployments||onOverview);
  $('.page-tabs').hidden=!onOverview;
  $('#services-view-all').hidden=onServices;
  document.body.classList.toggle('performance-view',onOverview&&state.tab==='performance');
  $$('.nav-item[data-page]').forEach(link=>{const current=link.dataset.page===state.page;link.classList.toggle('active',current);if(current)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  $$('.page-tab').forEach(button=>{const current=button.dataset.tab===state.tab;button.classList.toggle('active',current);button.setAttribute('aria-pressed',current);});
  placeIndicators();
  const title=state.page[0].toUpperCase()+state.page.slice(1);$('#page-title').textContent=title;document.title=`Relay — ${title}`;
  const extra=$('#extra-content');extra.hidden=true;extra.innerHTML='';
  if(state.page==='logs'||(onOverview&&state.tab==='activity')){extra.hidden=false;renderLogs();}
  if(state.page==='incidents'){extra.hidden=false;renderIncidents();}
}
function navigate(page){const previous=state.page;state.page=page;state.tab='overview';state.logService='all';setNavigation(false);if(location.hash!==`#${page}`)history.replaceState(null,'',`#${page}`);render();window.scrollTo({top:0,behavior:'instant'});if(previous!==page)playViewTransition('page');}
// View transitions (motion tokens): a page enters with an 8px rise, 3px blur and fade over 250ms;
// a tab slides 8px from the side it sits on. The outgoing view is swapped instantly to keep navigation fast.
// Keyboard-driven changes skip motion entirely; reduced motion gets a plain 150ms fade.
const easeSmoothOut='cubic-bezier(.22,1,.36,1)';
let viewAnimations=[];
function playViewTransition(kind,direction=0){
  viewAnimations.forEach(animation=>animation.cancel());viewAnimations=[];
  if(document.body.classList.contains('keyboard-input'))return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets=['#dashboard-content','.services-section','.deployments-section','#extra-content'].map(selector=>$(selector)).filter(el=>!el.hidden);
  const offset=kind==='tab'?`translateX(${direction*8}px)`:'translateY(8px)';
  const frames=reduce?[{opacity:0},{opacity:1}]:[{opacity:0,transform:offset,filter:'blur(3px)'},{opacity:1,transform:'none',filter:'blur(0px)'}];
  const timing=reduce?{duration:150,easing:'ease-out'}:{duration:250,easing:easeSmoothOut};
  targets.forEach(el=>viewAnimations.push(el.animate(frames,timing)));
  if(kind==='page'&&!reduce)viewAnimations.push($('#page-title').animate([{opacity:0,transform:'translateY(4px)',filter:'blur(2px)'},{opacity:1,transform:'none',filter:'blur(0px)'}],{duration:150,easing:'ease-in-out'}));
}
// Sliding indicators for the active sidebar item and the active tab. They jump without motion
// on first placement, font loading and resizing, and slide only when the selection changes.
function placeIndicator(indicator,target,axis,animate=true){
  if(!target||!target.offsetWidth)return;
  if(!animate||!indicator.dataset.placed||document.body.classList.contains('keyboard-input'))indicator.style.transition='none';
  if(axis==='x'){indicator.style.translate=`${target.offsetLeft}px 0`;indicator.style.width=`${target.offsetWidth}px`;}
  else indicator.style.translate=`0 ${target.offsetTop}px`;
  indicator.dataset.placed='true';
  if(indicator.style.transition){indicator.offsetWidth;indicator.style.transition='';}
}
function placeIndicators(animate=true){
  placeIndicator($('.nav-indicator'),$('.primary-nav .nav-item.active'),'y',animate);
  placeIndicator($('.tab-indicator'),$('.page-tab.active'),'x',animate);
}
function renderLogs(){
  const items=scopedServices().filter(s=>state.logService==='all'||s.name===state.logService).flatMap(s=>[
    {time:'14:32:08',level:s.status==='Degraded'?'WARN':'INFO',service:s.name,message:s.status==='Degraded'?'Session lookup exceeded 500 ms threshold. Retrying database connection.':'Request completed successfully · GET /health · 200'},
    {time:'14:31:56',level:'INFO',service:s.name,message:'Health check passed · process ready · region iad1'},
    {time:'14:31:42',level:s.status==='Degraded'?'ERROR':'INFO',service:s.name,message:s.status==='Degraded'?'Database connection pool timeout after 2000 ms · request_id=rx_08a2':'Incoming request processed · cache=HIT · duration=42ms'}
  ]).filter(l=>state.logLevel==='all'||l.level===state.logLevel).sort((a,b)=>b.time.localeCompare(a.time));
  $('#extra-content').innerHTML=`<div class="logs-toolbar"><div class="section-name"><h2>Runtime logs</h2><span>${items.length} entries · snapshot</span></div><div class="filters"><div class="filter dropdown" data-align="end"><select id="log-service" aria-label="Log service"><option value="all">All services</option>${scopedServices().map(s=>`<option ${s.name===state.logService?'selected':''}>${s.name}</option>`).join('')}</select></div><div class="filter dropdown" data-align="end"><select id="log-level" aria-label="Log severity">${['all','INFO','WARN','ERROR'].map(v=>`<option value="${v}" ${v==='all'?'':`data-dot="${v==='ERROR'?'red':v==='WARN'?'amber':'gray'}"`} ${state.logLevel===v?'selected':''}>${v==='all'?'All levels':v}</option>`).join('')}</select></div></div></div>${items.length?items.map(l=>`<div class="log-entry"><span class="log-time">${l.time}</span>${badge(l.level,l.level==='ERROR'?'red':l.level==='WARN'?'amber':'neutral')}<button class="text-button" data-service="${l.service}">${l.service}</button><span class="log-message">${l.message}</span></div>`).join(''):'<div class="empty-state"><h3>No matching log entries</h3><p>Try another service or severity level.</p></div>'}`;
  enhanceDropdowns($('#extra-content'));
  $('#log-service').onchange=e=>{state.logService=e.target.value;renderLogs();};$('#log-level').onchange=e=>{state.logLevel=e.target.value;renderLogs();};
}
function renderIncidents(){const has=scopedServices().some(s=>s.status==='Degraded');$('#extra-content').innerHTML=`<div class="extra-header"><h2>Active incidents</h2><p>Issues affecting your selected environment and project.</p></div>${has?`<article class="incident-card"><span class="attention-icon">${icon('alert')}</span><div>${badge(state.acknowledged?'Acknowledged':'Investigating','amber')}<h3>Elevated latency in auth-service</h3><p>Session validation is slower than expected. p95 latency is 620 ms, above the 500 ms threshold.</p><span class="owner">${avatar('Maya Chen')}Maya Chen <span class="separator">·</span> Opened 12 minutes ago</span></div><button class="button" data-action="incident">View incident ${icon('arrow')}</button></article>`:`<div class="empty-state">${icon('check')}<h3>No active incidents</h3><p>All services in this view are operating normally.</p></div>`}`;}
const actionDialog=$('#action-dialog'),detailDialog=$('#detail-dialog');
function dialogHeader(title,subtitle='',detail=false){return `<div class="dialog-header"><div><h2 id="${detail?'detail':'action'}-title">${escapeHTML(title)}</h2>${subtitle?`<p>${escapeHTML(subtitle)}</p>`:''}</div><button class="icon-button" data-close aria-label="Close dialog">${icon('close')}</button></div>`;}
// Wrap everything between a dialog's header and footer in one scroll region, so the
// header and actions stay pinned and the scrollbar only spans the content.
function frameDialog(root){
  if($('.command-input',root))return;
  const host=$(':scope > form',root)||root;
  const items=[...host.children].filter(el=>!el.matches('.dialog-header,.dialog-footer'));
  if(!items.length)return;
  const scroll=document.createElement('div');
  scroll.className='dialog-scroll';
  items[0].before(scroll);scroll.append(...items);
}
function prepareDialog(root){frameDialog(root);enhanceDropdowns(root);hydrateIcons(root);}
function openAction(content){setNavigation(false);if(detailDialog.open)detailDialog.close();$('#action-content').innerHTML=content;prepareDialog($('#action-content'));if(!actionDialog.open)actionDialog.showModal();}
function openDetail(content){setNavigation(false);if(actionDialog.open)actionDialog.close();$('#detail-content').innerHTML=content;prepareDialog($('#detail-content'));if(!detailDialog.open)detailDialog.showModal();}
function serviceDetail(name){
  const s=scopedServices().find(item=>item.name===name);if(!s)return;
  openDetail(`${dialogHeader('Service details',`${s.environment} / ${s.project==='web'?'Web platform':'Core services'}`,true)}<div class="detail-hero"><span class="service-glyph">${icon(s.glyph)}</span><h3>${s.name}</h3>${badge(s.status,s.status==='Healthy'?'green':'amber')}<p>${s.description}</p></div><dl class="detail-facts"><div><dt>Total requests</dt><dd>${number(s.requests)}</dd></div><div><dt>p95 latency</dt><dd>${s.latency} ms</dd></div><div><dt>Error rate</dt><dd>${s.error.toFixed(2)}%</dd></div><div><dt>Owner</dt><dd>${ownerCell(owners[s.owner])}</dd></div><div><dt>Region</dt><dd>Washington, D.C. · iad1</dd></div><div><dt>Latest commit</dt><dd><button class="commit-button" data-copy="${s.commit}">${s.commit}${icon('copy')}</button></dd></div></dl><div class="detail-section"><h3>Recent activity</h3><div class="timeline-item">${s.status==='Degraded'?'Latency alert triggered':'Health check passed'}<p>${s.status==='Degraded'?'p95 exceeded the configured 500 ms threshold.':'All checks passed across the edge network.'} · 12m ago</p></div><div class="timeline-item">Deployment ${s.commit} promoted<p>${owners[s.owner]} deployed to ${s.environment.toLowerCase()} · ${s.time}</p></div><div class="timeline-item">Build completed successfully<p>Dependencies installed, checks passed, bundle uploaded.</p></div></div><div class="dialog-footer"><button class="button" data-service-logs="${s.name}">${icon('terminal')}View logs</button><button class="button primary" data-deploy-service="${s.name}">${icon('rocket')}Deploy service</button></div>`);
}
function deploymentDetail(commit){
  const d=deployments.find(item=>item.commit===commit);if(!d)return;
  openDetail(`${dialogHeader('Deployment details',`${d.service} / ${d.environment}`,true)}<div class="detail-hero"><span class="service-glyph">${icon('rocket')}</span><h3>${escapeHTML(d.message)}</h3>${badge(d.status,d.status==='Ready'?'green':'red')}<p>${d.status==='Ready'?'This deployment completed successfully and is serving traffic.':'The build failed during type checking. The previous deployment continues to serve traffic.'}</p></div><dl class="detail-facts"><div><dt>Commit</dt><dd class="mono">${d.commit}</dd></div><div><dt>Branch</dt><dd class="mono">${escapeHTML(d.branch)}</dd></div><div><dt>Deployed by</dt><dd>${ownerCell(d.owner)}</dd></div><div><dt>Created</dt><dd>${d.time}</dd></div></dl><div class="detail-section"><h3>Build output</h3><div class="code-block">14:13:02  Cloning repository…\n14:13:04  Installing dependencies\n14:13:12  Running build checks\n${d.status==='Ready'?'14:13:20  ✓ Type checks passed\n14:13:29  ✓ Build completed\n14:13:32  ✓ Deployment ready':'<span class="error-text">14:13:16  ✕ Type check failed\n\n  src/auth/callback.ts:42\n  Property \'session\' does not exist\n  on type \'AuthResponse\'.</span>'}</div></div><div class="dialog-footer"><button class="button" data-copy="${d.commit}">${icon('copy')}Copy commit</button><button class="button primary" data-deploy-service="${d.service}">${icon('refresh')}Redeploy</button></div>`);
}
function incidentDetail(){
  openDetail(`${dialogHeader('Incident INC-0042','Production / auth-service',true)}<div class="detail-hero"><span class="service-glyph">${icon('alert')}</span><h3>Elevated auth latency</h3>${badge(state.acknowledged?'Acknowledged':'Investigating','amber')}<p>Session validation requests are taking longer than expected. The team is investigating database connection pool saturation.</p></div><dl class="detail-facts"><div><dt>Severity</dt><dd>SEV 3 · Degraded</dd></div><div><dt>Owner</dt><dd>${ownerCell('Maya Chen')}</dd></div><div><dt>Current p95</dt><dd>620 ms</dd></div><div><dt>Alert threshold</dt><dd>500 ms for 5 min</dd></div></dl><div class="detail-section"><h3>Incident timeline</h3>${state.acknowledged?'<div class="timeline-item">Incident acknowledged<p>Alex Morgan is following this incident · just now</p></div>':''}<div class="timeline-item">Investigation started<p>Maya Chen is reviewing database connection usage · 8m ago</p></div><div class="timeline-item">Alert triggered<p>Latency exceeded 500 ms for five consecutive minutes · 12m ago</p></div></div><div class="dialog-footer"><button class="button" data-service-logs="auth-service">${icon('terminal')}View logs</button><button class="button primary" data-action="acknowledge" ${state.acknowledged?'disabled':''}>${icon('check')}${state.acknowledged?'Acknowledged':'Acknowledge'}</button></div>`);
}
function selectField(label,name,options,extra=''){return `<div class="form-field"><span class="form-label">${label}</span><div class="dropdown field-dropdown"><select name="${name}" aria-label="${label}" ${extra}>${options}</select></div></div>`;}
function deploymentForm(service=''){
  openAction(`${dialogHeader('New deployment','Create a deployment in this demo workspace.')}<form id="deployment-form"><div class="dialog-body">${selectField('Service','service',baseServices.map(s=>`<option data-glyph="${s.glyph}" ${s.name===service?'selected':''}>${s.name}</option>`).join(''),'required')}<label class="form-field"><span class="form-label">Git branch</span><span class="input-shell">${icon('branch')}<input name="branch" value="main" required maxlength="80" pattern="[a-zA-Z0-9_./-]+" autocomplete="off" spellcheck="false" title="Use letters, numbers, hyphens, underscores, dots, or slashes."></span></label>${selectField('Environment','environment',[['Production','green'],['Staging','purple'],['Preview','gray']].map(([env,dot])=>`<option data-dot="${dot}" ${env===state.environment?'selected':''}>${env}</option>`).join(''))}<p class="field-hint">${icon('info')}<span>This creates a simulated deployment. No code is published.</span></p></div><div class="dialog-footer"><button type="button" class="button" data-close>Cancel</button><button type="submit" class="button primary">${icon('rocket')}Deploy</button></div></form>`);
  $('#deployment-form').onsubmit=e=>{
    e.preventDefault();const data=new FormData(e.target);const serviceName=data.get('service');const environment=data.get('environment');const branch=data.get('branch');
    // A fixed mock success keeps the demo local and deterministic in behavior.
    const commit=Math.random().toString(16).slice(2,9).padEnd(7,'0');
    deployments.unshift({message:`Deploy ${branch}`,service:serviceName,branch,environment,commit,status:'Ready',owner:'Alex Morgan',time:'Just now'});
    if(environment==='Production'){const serviceRecord=baseServices.find(s=>s.name===serviceName);serviceRecord.commit=commit;serviceRecord.time='Just now';}
    state.environment=environment;state.project='all';$('#environment-filter').value=environment;$('#project-filter').value='all';
    actionDialog.close();navigate('deployments');toast(`Sample deployment for ${serviceName} is ready`);
  };
}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),3200);}
function simpleDialog(title,subtitle,body){openAction(`${dialogHeader(title,subtitle)}<div class="dialog-body">${body}</div><div class="dialog-footer"><button class="button" data-close>Done</button></div>`);}
function commandPalette(){
  openAction(`${dialogHeader('Search workspace','Jump to a page or inspect a service.')}<div class="command-input">${icon('search')}<input id="command-search" placeholder="Search pages and services…" autocomplete="off" aria-label="Search pages and services"></div><div class="command-results" id="command-results"></div><div class="command-caption">Tab to move through results <span style="float:right">Esc to close</span></div>`);
  const renderResults=()=>{const query=$('#command-search').value.toLowerCase();const pages=['overview','services','deployments','logs','incidents'].filter(p=>p.includes(query));const services=scopedServices().filter(s=>s.name.includes(query));$('#command-results').innerHTML=pages.map(p=>`<button class="command-result" data-command-page="${p}">${icon(p==='overview'?'overview':p==='services'?'cube':p==='deployments'?'layers':p==='logs'?'terminal':'alert')}<span>${p[0].toUpperCase()+p.slice(1)}</span><small>Page</small></button>`).join('')+services.map(s=>`<button class="command-result" data-service="${s.name}">${icon(s.glyph)}<span>${s.name}</span><small>Service</small></button>`).join('')||'<div class="empty-state"><h3>No results found</h3><p>Try a service name or page title.</p></div>';};
  renderResults();$('#command-search').oninput=renderResults;$('#command-search').focus();$('#command-search').onkeydown=e=>{if(e.key==='ArrowDown'){e.preventDefault();$('.command-result')?.focus();}if(e.key==='Enter'){e.preventDefault();$('.command-result')?.click();}};
}
async function copyText(value){try{await navigator.clipboard.writeText(value);toast(`Copied ${value}`);}catch{simpleDialog('Commit hash','Select and copy the hash below.',`<label class="form-field"><span class="form-label">Commit</span><input readonly value="${escapeHTML(value)}" onfocus="this.select()"></label>`);}}
function exportCSV(){const list=visibleServices();const rows=[['Service','Environment','Owner','Status','Requests','p95 latency (ms)','Error rate (%)','Commit'],...list.map(s=>[s.name,s.environment,owners[s.owner],s.status,s.requests,s.latency,s.error.toFixed(2),s.commit])];const csv=rows.map(row=>row.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));const link=document.createElement('a');link.href=url;link.download='relay-services.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(`Exported ${list.length} services`);}
const actions={
  deploy:()=>deploymentForm(),search:commandPalette,incident:incidentDetail,export:exportCSV,
  'all-deployments':()=>navigate('deployments'),
  'reset-filters':()=>{state.query='';state.status='all';state.project='all';state.sort='';$('#service-search').value='';$('#project-filter').value='all';render();},
  acknowledge:()=>{state.acknowledged=true;renderAttention(scopedServices());if(state.page==='incidents')renderIncidents();incidentDetail();toast('Incident acknowledged by Alex Morgan');},
  notifications:()=>simpleDialog('Notifications','2 updates in your workspace',`<div class="info-list"><div class="info-row"><div><strong>Elevated auth latency</strong><small>Production · auth-service · 12m ago</small></div><button class="text-button" data-action="incident">Inspect ${icon('arrow')}</button></div><div class="info-row"><div><strong>Deployment failed</strong><small>web-app · feature/auth · 18m ago</small></div><button class="text-button" data-deployment="d82a70f">Inspect ${icon('arrow')}</button></div></div>`),
  team:()=>simpleDialog('Team members','Acme Engineering · 4 members',`<div class="info-list">${owners.map((owner,i)=>`<div class="info-row"><div class="owner">${avatar(owner)}<div><strong>${owner}</strong><small>${['Workspace owner','Platform engineer','Backend engineer','Infrastructure engineer'][i]}</small></div></div>${badge(i?'Member':'Admin','neutral')}</div>`).join('')}</div>`),
  workspace:()=>simpleDialog('Acme Engineering','Your demo workspace',`<div class="info-list"><div class="info-row"><div><strong>Acme Engineering</strong><small>4 members · 8 production services</small></div>${badge('Current','purple')}</div><div class="info-row"><div><strong>Pro plan</strong><small>Unlimited previews and 30-day log retention</small></div>${icon('check')}</div></div>`),
  profile:()=>simpleDialog('Your profile','Signed in to the demo workspace',`<div class="info-row"><span class="owner">${avatar('Alex Morgan')}<span><strong>Alex Morgan</strong><small>alex@acme.example</small></span></span>${badge('Owner','purple')}</div><div class="info-row"><div><strong>Workspace</strong><small>Acme Engineering</small></div></div>`),
  alerts:()=>simpleDialog('Alert rules','Three rules monitor the production environment.',`<div class="info-list">${[['High response latency','p95 above 500 ms for 5 minutes','Triggered','amber'],['Elevated error rate','5xx errors above 1% for 5 minutes','Enabled','green'],['Service unavailable','3 consecutive health check failures','Enabled','green']].map(([title,desc,status,color])=>`<div class="info-row"><div><strong>${title}</strong><small>${desc}</small></div>${badge(status,color)}</div>`).join('')}</div>`),
  integrations:()=>simpleDialog('Integrations','Connected tools in the sample workspace.',`<div class="info-list">${[['GitHub','Source code and deployments'],['Slack','Incident notifications'],['OpenTelemetry','Metrics, logs, and traces']].map(([title,desc])=>`<div class="info-row"><div><strong>${title}</strong><small>${desc}</small></div>${badge('Connected','green')}</div>`).join('')}</div>`),
  settings:()=>{openAction(`${dialogHeader('Workspace settings','Preferences are saved for this browser.')}<div class="dialog-body"><label class="form-field"><span class="form-label">Workspace display name</span><input id="workspace-name" value="${escapeHTML(localStorage.getItem('relay-workspace')||'Acme Engineering')}" maxlength="40"></label>${selectField('Table density','density',`<option value="comfortable">Comfortable</option><option value="compact">Compact</option>`,'id="density-setting"')}</div><div class="dialog-footer"><button class="button" data-close>Cancel</button><button class="button primary" id="save-settings">${icon('check')}Save preferences</button></div>`);$('#density-setting').value=localStorage.getItem('relay-density')||'comfortable';syncDropdowns();$('#save-settings').onclick=()=>{const name=$('#workspace-name').value.trim()||'Acme Engineering';localStorage.setItem('relay-workspace',name);localStorage.setItem('relay-density',$('#density-setting').value);applyPreferences();actionDialog.close();toast('Preferences saved');};},
  help:()=>simpleDialog('Help & shortcuts','Move through Relay a little faster.',`<div class="info-list"><div class="info-row"><strong>Search workspace</strong><kbd>Ctrl / ⌘ + K</kbd></div><div class="info-row"><strong>Search services</strong><kbd>/</kbd></div><div class="info-row"><strong>Go to overview</strong><kbd>G then O</kbd></div><div class="info-row"><strong>Close a dialog</strong><kbd>Esc</kbd></div></div><p style="margin-top:15px;font-size:11px">This is an interactive design mockup. Metrics, logs, and deployments use sample data; all actions stay in your browser.</p>`)
};
function applyPreferences(){const name=localStorage.getItem('relay-workspace');if(name)$('[data-action="workspace"]>span').textContent=name;document.body.classList.toggle('compact-density',localStorage.getItem('relay-density')==='compact');}
document.addEventListener('click',e=>{
  const button=e.target.closest('button,a[data-page]');if(!button)return;
  if(button.dataset.page){e.preventDefault();navigate(button.dataset.page);}
  else if(button.dataset.commandPage){actionDialog.close();navigate(button.dataset.commandPage);}
  else if(button.dataset.tab){const tabs=['overview','performance','activity'],previous=state.tab;state.tab=button.dataset.tab;render();if(previous!==state.tab)playViewTransition('tab',Math.sign(tabs.indexOf(state.tab)-tabs.indexOf(previous)));}
  else if(button.dataset.action){actions[button.dataset.action]?.();}
  else if(button.hasAttribute('data-close')){button.closest('dialog').close();}
  else if(button.dataset.service){serviceDetail(button.dataset.service);}
  else if(button.dataset.deployment){deploymentDetail(button.dataset.deployment);}
  else if(button.dataset.copy){copyText(button.dataset.copy);}
  else if(button.dataset.deployService){deploymentForm(button.dataset.deployService);}
  else if(button.dataset.serviceLogs){const name=button.dataset.serviceLogs;detailDialog.close();navigate('logs');state.logService=name;state.logLevel='all';renderLogs();}
  else if(button.dataset.environment){state.environment=button.dataset.environment;$('#environment-filter').value=state.environment;state.selected.clear();render();}
  else if(button.dataset.sort){state.direction=state.sort===button.dataset.sort?-state.direction:button.dataset.sort==='name'?1:-1;state.sort=button.dataset.sort;renderServices();}
});
$('#project-filter').onchange=e=>{state.project=e.target.value;state.selected.clear();render();};
$('#environment-filter').onchange=e=>{state.environment=e.target.value;state.selected.clear();render();};
$('#time-filter').onchange=e=>{state.hours=Number(e.target.value);render();};
$('#chart-type').onchange=e=>{state.chart=e.target.value;renderChart();};
$('#service-search').oninput=e=>{state.query=e.target.value;renderServices();};
$('#select-all').onchange=e=>{visibleServices().forEach(s=>e.target.checked?state.selected.add(s.name):state.selected.delete(s.name));renderServices();};
$('#service-rows').onchange=e=>{if(e.target.dataset.select){e.target.checked?state.selected.add(e.target.dataset.select):state.selected.delete(e.target.dataset.select);renderServices();}};
const mobileBreakpoint=matchMedia('(max-width:700px)');
function setNavigation(open){const wasOpen=document.body.classList.contains('nav-open');document.body.classList.toggle('nav-open',open);$('.mobile-menu').setAttribute('aria-expanded',open);$('.sidebar').inert=mobileBreakpoint.matches&&!open;$('#main').inert=mobileBreakpoint.matches&&open;if(open)$('.sidebar-close').focus();else if(wasOpen&&mobileBreakpoint.matches)$('.mobile-menu').focus();}
$('.mobile-menu').onclick=()=>setNavigation(!document.body.classList.contains('nav-open'));
$('.sidebar-backdrop').onclick=()=>setNavigation(false);
$('.sidebar-close').onclick=()=>setNavigation(false);
mobileBreakpoint.addEventListener('change',()=>setNavigation(false));
for(const dialog of [actionDialog,detailDialog]){dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});}
let lastG=0;
document.addEventListener('keydown',e=>{
  document.body.classList.add('keyboard-input');
  const editing=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName);
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();commandPalette();return;}
  if(e.key==='Escape')setNavigation(false);
  if(e.key==='Tab'&&document.body.classList.contains('nav-open')&&mobileBreakpoint.matches){const focusable=$$('a,button', $('.sidebar')).filter(el=>el.getClientRects().length);const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  if(editing||actionDialog.open||detailDialog.open)return;
  if(e.key==='/'){e.preventDefault();if($('.services-section').hidden)navigate('services');$('#service-search').focus();}
  if(e.key.toLowerCase()==='o'&&Date.now()-lastG<1000)navigate('overview');
  if(e.key.toLowerCase()==='g')lastG=Date.now();
});
document.addEventListener('pointerdown',()=>document.body.classList.remove('keyboard-input'));
window.addEventListener('hashchange',()=>{const page=location.hash.slice(1);if(['overview','services','deployments','logs','incidents'].includes(page))navigate(page);});
hydrateIcons();enhanceDropdowns();applyPreferences();
document.fonts?.ready.then(()=>placeIndicators(false));
window.addEventListener('resize',()=>placeIndicators(false));
if(['services','deployments','logs','incidents'].includes(location.hash.slice(1)))state.page=location.hash.slice(1);
render();
setNavigation(false);
// Redraw whenever the visible size differs from the size last drawn (including after being hidden).
new ResizeObserver(()=>{const chart=$('#main-chart');if(chart.clientWidth&&chart.dataset.size!==`${chart.clientWidth}x${chart.clientHeight}`)renderChart();}).observe($('#main-chart'));
