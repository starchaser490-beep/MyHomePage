// ============ 4. 报告模块 ============
function renderReport() {
  const s = strategies[0];
  // Core pie
  if (charts.core) charts.core.destroy();
  charts.core = new Chart(document.getElementById('coreChart'), {
    type: 'doughnut',
    data: { labels: ['标普500ETF', '中短债基金', '美国国债ETF', '现金/货基'], datasets: [{ data: [15, 20, 10, 5], backgroundColor: ['#3b82f6', '#10b981', '#06b6d4', '#94a3b8'], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 12, font: { size: 11 } } } } }
  });
  // Satellite pie
  if (charts.sat) charts.sat.destroy();
  charts.sat = new Chart(document.getElementById('satChart'), {
    type: 'doughnut',
    data: { labels: ['纳斯达克100ETF', '黄金ETF', '商品ETF', '全球REITs'], datasets: [{ data: [20, 20, 5, 5], backgroundColor: ['#8b5cf6', '#f59e0b', '#ef4444', '#f97316'], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 12, font: { size: 11 } } } } }
  });
  // Alloc bar
  const items = s.alloc.filter(a => a.pct > 0);
  document.getElementById('allocBar').innerHTML = items.map((a, i) => `<div class="alloc-seg" style="width:${a.pct}%;background:${COLORS[i]}" title="${a.name}: ${a.pct}%">${a.pct > 8 ? a.name.substring(0, 4) : ''}</div>`).join('');
  document.getElementById('allocLegend').innerHTML = items.map((a, i) => `<div class="legend-item"><div class="legend-dot" style="background:${COLORS[i]}"></div>${a.name} (${a.pct}%)</div>`).join('');
  // Alloc table
  document.querySelector('#allocTable tbody').innerHTML = items.map(a => {
    const cat = a.name.includes('纳斯达克') ? '美股科技' : a.name.includes('标普') ? '美股大盘' : a.name.includes('黄金') ? '黄金' : a.name.includes('债') ? '债券' : a.name.includes('商品') ? '大宗商品' : a.name.includes('REITs') ? 'REITs' : '现金';
    return `<tr><td><strong>${cat}</strong></td><td>${a.name}</td><td><code>${a.code}</code></td><td><strong>${a.pct}%</strong></td><td>¥${(500000 * a.pct / 100).toLocaleString()}</td><td style="color:${a.ret > 5 ? 'var(--rd)' : 'var(--tx2)'}">${a.ret}%</td><td>${a.role}</td></tr>`;
  }).join('');
  // Projection
  if (charts.proj) charts.proj.destroy();
  const pLabels = Array.from({ length: 61 }, (_, i) => { const y = 2026 + Math.floor(i / 12); return y + '-' + String(i % 12 + 1).padStart(2, '0'); });
  charts.proj = new Chart(document.getElementById('projChart'), {
    type: 'line',
    data: {
      labels: pLabels,
      datasets: [
        { label: '乐观(12%)', data: pLabels.map((_, i) => 500000 * Math.pow(1.12, i / 12)), borderColor: 'rgba(239,68,68,.5)', borderDash: [3, 3], pointRadius: 0, borderWidth: 1.5, fill: false },
        { label: '目标(10%)', data: pLabels.map((_, i) => 500000 * Math.pow(1.10, i / 12)), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,.1)', fill: true, pointRadius: 0, borderWidth: 2.5, tension: .3 },
        { label: '保守(8%)', data: pLabels.map((_, i) => 500000 * Math.pow(1.08, i / 12)), borderColor: 'rgba(16,185,129,.5)', borderDash: [3, 3], pointRadius: 0, borderWidth: 1.5, fill: false }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { x: { ticks: { color: '#94a3b8', maxTicksLimit: 12 }, grid: { color: 'rgba(45,55,72,.5)' } }, y: { ticks: { color: '#94a3b8', callback: v => '¥' + Math.round(v / 10000) + '万' }, grid: { color: 'rgba(45,55,72,.5)' } } } }
  });
}

// ============ 5. 持仓模块 ============
function loadDefaultPositions() {
  positions = strategies[0].alloc.filter(a => a.pct > 0).map((a, i) => ({
    id: Date.now() + i, name: a.name, code: a.code,
    cost: 500000 * a.pct / 100,
    current: 500000 * a.pct / 100 * (1 + (Math.random() * .06 - .01)),
    pct: a.pct
  }));
  save(); renderPositions();
}

function renderPositions() {
  const total = positions.reduce((s, p) => s + p.current, 0) || 0;
  const totalCost = positions.reduce((s, p) => s + p.cost, 0) || 1;
  const profit = total - totalCost;
  document.getElementById('totalAsset').textContent = '¥' + Math.round(total).toLocaleString();
  document.getElementById('totalProfit').textContent = (profit >= 0 ? '+' : '') + Math.round(profit).toLocaleString();
  document.getElementById('totalProfit').style.color = profit >= 0 ? 'var(--rd)' : 'var(--gn)';
  document.getElementById('totalReturn').textContent = (profit / totalCost * 100).toFixed(1) + '%';
  document.getElementById('totalReturn').style.color = profit >= 0 ? 'var(--rd)' : 'var(--gn)';
  document.getElementById('posCount').textContent = positions.length;

  document.getElementById('posTable').innerHTML = positions.map(p => {
    const ret = (p.current / p.cost - 1) * 100;
    return `<tr><td><strong>${p.name}</strong></td><td><code>${p.code}</code></td><td>¥${Math.round(p.cost).toLocaleString()}</td><td>¥${Math.round(p.current).toLocaleString()}</td><td>${(p.current / total * 100).toFixed(1)}%</td><td style="color:${ret >= 0 ? 'var(--rd)' : 'var(--gn)'};font-weight:700">${ret >= 0 ? '+' : ''}${ret.toFixed(1)}%</td><td><button class="btn btn-danger" style="padding:4px 12px;font-size:.8em" onclick="removePosition(${p.id})">删除</button></td></tr>`;
  }).join('');

  if (charts.pos) charts.pos.destroy();
  if (positions.length > 0) {
    charts.pos = new Chart(document.getElementById('posChart'), {
      type: 'doughnut',
      data: { labels: positions.map(p => p.name), datasets: [{ data: positions.map(p => p.current), backgroundColor: COLORS, borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#94a3b8', padding: 8, font: { size: 11 } } } } }
    });
  }

  document.getElementById('tradeTable').innerHTML = trades.map(t => `<tr><td>${t.date}</td><td><span style="color:${t.type === 'buy' ? 'var(--rd)' : t.type === 'sell' ? 'var(--gn)' : 'var(--ac2)'}">${t.type === 'buy' ? '买入' : t.type === 'sell' ? '卖出' : '再平衡'}</span></td><td>${t.name}</td><td>¥${t.amount.toLocaleString()}</td><td style="color:var(--tx2)">${t.note}</td></tr>`).join('');
}

function showAddPosition() { document.getElementById('addPosForm').style.display = 'block'; }
function hideAddPosition() { document.getElementById('addPosForm').style.display = 'none'; }
function showAddTrade() { document.getElementById('addTradeForm').style.display = 'block'; document.getElementById('tradeDate').value = new Date().toISOString().split('T')[0]; }
function hideAddTrade() { document.getElementById('addTradeForm').style.display = 'none'; }

function addPosition() {
  const name = document.getElementById('posName').value, code = document.getElementById('posCode').value, amount = parseFloat(document.getElementById('posAmount').value);
  if (!name || !amount) return showToast('请填写完整信息');
  positions.push({ id: Date.now(), name, code, cost: amount, current: amount, pct: 0 });
  trades.push({ date: new Date().toISOString().split('T')[0], type: 'buy', name, amount, note: '新建持仓' });
  save(); renderPositions(); hideAddPosition(); showToast('持仓添加成功！');
}
function addTrade() {
  const date = document.getElementById('tradeDate').value, type = document.getElementById('tradeType').value, name = document.getElementById('tradeName').value, amount = parseFloat(document.getElementById('tradeAmount').value), note = document.getElementById('tradeNote').value;
  if (!date || !name || !amount) return showToast('请填写完整信息');
  trades.push({ date, type, name, amount, note }); save(); renderPositions(); hideAddTrade(); showToast('交易记录成功！');
}
function removePosition(id) { positions = positions.filter(p => p.id !== id); save(); renderPositions(); }
function exportPositions() {
  let csv = '资产名称,代码,买入成本,当前市值,收益率\n';
  positions.forEach(p => { csv += `${p.name},${p.code},${p.cost},${Math.round(p.current)},${((p.current / p.cost - 1) * 100).toFixed(1)}%\n`; });
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv' })); a.download = '持仓_' + new Date().toISOString().split('T')[0] + '.csv'; a.click(); showToast('导出成功！');
}

// ============ 6. 提醒模块 ============
function loadDefReminders() { reminders = JSON.parse(JSON.stringify(defaultReminders)); save(); renderReminders(); showToast('默认提醒已加载'); }
function renderReminders() {
  const sorted = [...reminders].sort((a, b) => new Date(a.date) - new Date(b.date));
  document.getElementById('reminderList').innerHTML = sorted.map(r => `
    <div class="reminder-item ${r.urgent ? 'urgent' : ''} ${r.done ? 'done' : ''}">
      <div class="ri-check ${r.done ? 'checked' : ''}" onclick="toggleReminder(${r.id})">${r.done ? '✓' : ''}</div>
      <div class="ri-info"><div class="ri-title">${r.urgent ? '🔴 ' : ''}${r.title}</div><div class="ri-desc">${r.desc}</div><div class="ri-desc" style="margin-top:4px">${r.repeat === 'none' ? '一次性' : r.repeat === 'monthly' ? '📅 每月' : r.repeat === 'quarterly' ? '📅 每季度' : '📅 每年'}</div></div>
      <div class="ri-date">${r.date}</div><div class="ri-del" onclick="removeReminder(${r.id})">×</div>
    </div>`).join('');
}
function toggleReminder(id) { const r = reminders.find(r => r.id === id); if (r) { r.done = !r.done; save(); renderReminders(); } }
function removeReminder(id) { reminders = reminders.filter(r => r.id !== id); save(); renderReminders(); }
function showAddReminder() { document.getElementById('addReminderForm').style.display = 'block'; document.getElementById('remDate').value = new Date().toISOString().split('T')[0]; }
function hideAddReminder() { document.getElementById('addReminderForm').style.display = 'none'; }
function addReminder() {
  const title = document.getElementById('remTitle').value, date = document.getElementById('remDate').value, repeat = document.getElementById('remRepeat').value, desc = document.getElementById('remDesc').value;
  if (!title || !date) return showToast('请填写标题和日期');
  reminders.push({ id: Date.now(), title, desc, date, repeat, done: false, urgent: false }); save(); renderReminders(); hideAddReminder(); showToast('提醒添加成功！');
}

function renderChecklist() {
  document.getElementById('checklist').innerHTML = checklistItems.map((item, i) => `
    <div class="reminder-item" style="border-left-color:var(--yw)">
      <div class="ri-check" onclick="this.classList.toggle('checked');this.textContent=this.classList.contains('checked')?'✓':''" style="cursor:pointer"></div>
      <div class="ri-info"><div class="ri-title">${item}</div></div>
    </div>`).join('');
}

function renderCalChart() {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const rebalance = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
  const monitor = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  if (charts.cal) charts.cal.destroy();
  charts.cal = new Chart(document.getElementById('calChart'), {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        { label: '季度再平衡', data: rebalance, backgroundColor: 'rgba(59,130,246,.7)', borderRadius: 4 },
        { label: '月度监控', data: monitor.map(v => v * 0.5), backgroundColor: 'rgba(245,158,11,.4)', borderRadius: 4 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { x: { stacked: true, ticks: { color: '#94a3b8' }, grid: { display: false } }, y: { stacked: true, ticks: { color: '#94a3b8' }, grid: { color: 'rgba(45,55,72,.5)' }, max: 2 } } }
  });
}

// ============ 初始化 ============
window.onload = function () {
  load();
  renderAssetTable();
  renderCorrChart();
  renderStrategies();
  runBacktest();
  renderReport();
  if (positions.length === 0) loadDefaultPositions(); else renderPositions();
  if (reminders.length === 0) loadDefReminders(); else renderReminders();
  renderChecklist();
  renderCalChart();
};
