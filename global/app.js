// ============ UI 交互与渲染 ============
let selectedStrategy = 0;
let positions = [];
let trades = [];
let reminders = [];
let charts = {};

// -- Tab切换 --
function switchTab(name, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('sec-' + name).classList.add('active');
  el.classList.add('active');
}

// -- 本地存储 --
function save() { localStorage.setItem('ga_pos', JSON.stringify(positions)); localStorage.setItem('ga_trd', JSON.stringify(trades)); localStorage.setItem('ga_rem', JSON.stringify(reminders)); }
function load() { try { positions = JSON.parse(localStorage.getItem('ga_pos')) || []; trades = JSON.parse(localStorage.getItem('ga_trd')) || []; reminders = JSON.parse(localStorage.getItem('ga_rem')) || []; } catch (e) { } }

// -- Toast --
function showToast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2500); }

// ============ 1. 调研模块 ============
function renderAssetTable() {
  const tb = document.querySelector('#assetTable tbody');
  tb.innerHTML = assetData.map(a => `<tr>
    <td><strong>${a.cls}</strong></td><td>${a.name}</td><td><code>${a.domestic}</code></td>
    <td style="color:${a.ret > 0 ? 'var(--rd)' : 'var(--gn)'};font-weight:700">${a.ret > 0 ? '+' : ''}${a.ret}%</td>
    <td style="color:var(--gn)">${a.dd}%</td><td>${a.sharpe}</td><td>${a.vol}%</td><td>${a.corr}</td>
  </tr>`).join('');
}

function renderCorrChart() {
  const labels = assetData.map(a => a.cls);
  const data = [];
  for (let i = 0; i < labels.length; i++) for (let j = 0; j < labels.length; j++) data.push({ x: j, y: i, v: corrMatrix[i][j] });
  if (charts.corr) charts.corr.destroy();
  charts.corr = new Chart(document.getElementById('corrChart'), {
    type: 'bubble',
    data: { datasets: [{ data: data.map(d => ({ x: d.x, y: d.y, r: Math.abs(d.v) * 18 + 3 })), backgroundColor: data.map(d => d.v > 0.5 ? 'rgba(239,68,68,.7)' : d.v > 0 ? 'rgba(239,68,68,.3)' : d.v > -0.3 ? 'rgba(148,163,184,.3)' : 'rgba(16,185,129,.7)') }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => { const i = ctx.raw.y, j = ctx.raw.x; return `${labels[i]} ↔ ${labels[j]}: ${corrMatrix[i][j].toFixed(2)}`; } } } },
      scales: { x: { type: 'linear', min: -.5, max: labels.length - .5, ticks: { callback: v => labels[v] || '', color: '#94a3b8', font: { size: 10 } }, grid: { display: false } }, y: { type: 'linear', min: -.5, max: labels.length - .5, ticks: { callback: v => labels[v] || '', color: '#94a3b8', font: { size: 10 } }, grid: { display: false }, reverse: true } }
    }
  });
}

// ============ 2. 策略模块 ============
function renderStrategies() {
  document.getElementById('strategyCards').innerHTML = strategies.map((s, i) => `
    <div class="strategy-card ${i === selectedStrategy ? 'selected' : ''}" onclick="selectStrategy(${i})">
      <div class="stag" style="background:${s.tagColor}">${s.tag}</div>
      <h3>${s.name}</h3><p class="desc">${s.desc}</p>
      <div class="metrics">
        <div class="metric"><div class="mv" style="color:var(--rd)">${s.cagr}%</div><div class="ml">年化收益</div></div>
        <div class="metric"><div class="mv" style="color:var(--gn)">${s.maxdd}%</div><div class="ml">最大回撤</div></div>
        <div class="metric"><div class="mv" style="color:var(--ac2)">${s.sharpe}</div><div class="ml">夏普比率</div></div>
        <div class="metric"><div class="mv" style="color:var(--yw)">${s.vol}%</div><div class="ml">年化波动</div></div>
      </div>
    </div>`).join('');
}

function selectStrategy(i) {
  selectedStrategy = i;
  renderStrategies();
  const s = strategies[i], det = document.getElementById('strategyDetail');
  det.style.display = 'block';
  document.getElementById('detailTitle').textContent = s.name;
  const items = s.alloc.filter(a => a.pct > 0);
  let h = '<div class="alloc-bar">' + items.map((a, j) => `<div class="alloc-seg" style="width:${a.pct}%;background:${COLORS[j]}" title="${a.name}: ${a.pct}%">${a.pct > 8 ? a.pct + '%' : ''}</div>`).join('') + '</div>';
  h += '<div class="table-wrap"><table><thead><tr><th>标的</th><th>代码</th><th>配置%</th><th>金额¥</th><th>预期收益</th><th>角色</th></tr></thead><tbody>';
  items.forEach(a => { h += `<tr><td>${a.name}</td><td><code>${a.code}</code></td><td><strong>${a.pct}%</strong></td><td>¥${(500000 * a.pct / 100).toLocaleString()}</td><td style="color:${a.ret > 5 ? 'var(--rd)' : 'var(--tx2)'}">${a.ret}%</td><td>${a.role}</td></tr>`; });
  h += '</tbody></table></div>';
  const wRet = items.reduce((s, a) => s + a.pct * a.ret / 100, 0);
  h += `<div style="margin-top:16px;padding:12px;background:var(--sf2);border-radius:8px"><strong>加权预期收益：</strong><span style="color:var(--rd);font-weight:700">${wRet.toFixed(1)}%</span> (未扣除动态风控对冲成本)</div>`;
  document.getElementById('detailContent').innerHTML = h;
  document.getElementById('btStrategy').value = i;
  runBacktest();
}

// ============ 3. 回测模块 ============
function runBacktest() {
  const si = parseInt(document.getElementById('btStrategy').value);
  const capital = parseFloat(document.getElementById('btCapital').value) || 500000;
  const years = parseInt(document.getElementById('btPeriod').value);
  const bt = computeBacktest(si, capital, years);
  document.getElementById('btResults').style.display = 'block';
  document.getElementById('btCAGR').textContent = bt.cagr.toFixed(1) + '%';
  document.getElementById('btMaxDD').textContent = bt.maxDD.toFixed(1) + '%';
  document.getElementById('btSharpe').textContent = bt.sharpe.toFixed(2);
  document.getElementById('btFinal').textContent = '¥' + Math.round(bt.finalVal).toLocaleString();

  // NAV
  if (charts.nav) charts.nav.destroy();
  charts.nav = new Chart(document.getElementById('navChart'), {
    type: 'line',
    data: { labels: bt.labels, datasets: [{ label: '组合净值', data: bt.nav, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,.1)', fill: true, tension: .3, pointRadius: 0, borderWidth: 2 }, { label: '基准(年化10%)', data: bt.labels.map((_, i) => capital * Math.pow(1.1, i / 12)), borderColor: 'rgba(148,163,184,.5)', borderDash: [5, 5], pointRadius: 0, borderWidth: 1, fill: false }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { x: { ticks: { color: '#94a3b8', maxTicksLimit: 12 }, grid: { color: 'rgba(45,55,72,.5)' } }, y: { ticks: { color: '#94a3b8', callback: v => '¥' + Math.round(v / 10000) + '万' }, grid: { color: 'rgba(45,55,72,.5)' } } } }
  });

  // Drawdown
  if (charts.dd) charts.dd.destroy();
  charts.dd = new Chart(document.getElementById('ddChart'), {
    type: 'line',
    data: { labels: bt.labels, datasets: [{ label: '回撤', data: bt.drawdowns, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,.15)', fill: true, tension: .3, pointRadius: 0, borderWidth: 2 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } }, annotation: { annotations: { line1: { type: 'line', yMin: -5, yMax: -5, borderColor: 'rgba(245,158,11,.8)', borderDash: [5, 5], borderWidth: 2, label: { content: '回撤红线 -5%', display: true, color: '#f59e0b', font: { size: 11 } } } } } }, scales: { x: { ticks: { color: '#94a3b8', maxTicksLimit: 12 }, grid: { color: 'rgba(45,55,72,.5)' } }, y: { ticks: { color: '#94a3b8', callback: v => v + '%' }, grid: { color: 'rgba(45,55,72,.5)' } } } }
  });

  // Heatmap
  renderHeatmap(bt.mReturns, bt.startYear);

  // Yearly bar
  if (charts.year) charts.year.destroy();
  charts.year = new Chart(document.getElementById('yearChart'), {
    type: 'bar',
    data: { labels: Array.from({ length: years }, (_, i) => (bt.startYear + i) + '年'), datasets: [{ label: '年度收益', data: bt.yearlyReturns, backgroundColor: bt.yearlyReturns.map(v => v >= 0 ? 'rgba(239,68,68,.7)' : 'rgba(16,185,129,.7)'), borderRadius: 6 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#94a3b8' }, grid: { display: false } }, y: { ticks: { color: '#94a3b8', callback: v => v + '%' }, grid: { color: 'rgba(45,55,72,.5)' } } } }
  });

  // Stats
  document.getElementById('btStats').innerHTML = [
    ['总收益率', bt.totalReturn.toFixed(1) + '%', 'var(--rd)'], ['年化收益', bt.cagr.toFixed(1) + '%', 'var(--rd)'], ['最大回撤', bt.maxDD.toFixed(1) + '%', 'var(--gn)'],
    ['夏普比率', bt.sharpe.toFixed(2), 'var(--ac2)'], ['索提诺比率', bt.sortino.toFixed(2), 'var(--pp)'], ['年化波动率', bt.vol.toFixed(1) + '%', 'var(--yw)'],
    ['月胜率', (bt.positiveMonths / bt.months * 100).toFixed(0) + '%', 'var(--cy)'], ['最佳月', '+' + bt.bestMonth.toFixed(1) + '%', 'var(--rd)'], ['最差月', bt.worstMonth.toFixed(1) + '%', 'var(--gn)']
  ].map(([l, v, c]) => `<div class="stat-card"><div class="label">${l}</div><div class="value" style="font-size:1.3em;color:${c}">${v}</div></div>`).join('');
}

function renderHeatmap(returns, startYear) {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const years = Math.ceil(returns.length / 12);
  let h = '<table style="width:100%;text-align:center"><thead><tr><th>年份</th>';
  months.forEach(m => h += `<th style="padding:6px;font-size:.75em">${m}</th>`);
  h += '<th>年合计</th></tr></thead><tbody>';
  for (let y = 0; y < years; y++) {
    h += `<tr><td style="font-weight:700">${startYear + y}</td>`;
    let yr = 1;
    for (let m = 0; m < 12; m++) {
      const idx = y * 12 + m;
      if (idx < returns.length) {
        const r = returns[idx] * 100; yr *= (1 + returns[idx]);
        const bg = r > 2 ? 'rgba(239,68,68,.5)' : r > 0 ? 'rgba(239,68,68,.2)' : r > -2 ? 'rgba(16,185,129,.2)' : 'rgba(16,185,129,.5)';
        h += `<td style="background:${bg};padding:6px;font-size:.8em;border-radius:4px">${r > 0 ? '+' : ''}${r.toFixed(1)}%</td>`;
      } else h += '<td>-</td>';
    }
    const yrr = (yr - 1) * 100;
    h += `<td style="font-weight:700;color:${yrr >= 0 ? 'var(--rd)' : 'var(--gn)'}">${yrr > 0 ? '+' : ''}${yrr.toFixed(1)}%</td></tr>`;
  }
  h += '</tbody></table>';
  document.getElementById('heatmap').innerHTML = h;
}

function exportBacktest() { showToast('回测数据已准备导出'); }
