// ============ 应用逻辑 ============

const INITIAL_CAPITAL = 500000;

// 策略数据
const strategies = [
  {
    id: 0,
    name: '策略A - 增强全天候',
    tag: '推荐',
    tagColor: '#10b981',
    desc: '融合桥水全天候理念 + 黄金增配 + 200日均线择时 + 动态风控',
    cagr: 11.2,
    maxdd: -4.8,
    sharpe: 1.85,
    vol: 5.8,
    totalReturn: 70.1,
    alloc: [
      { name: '纳斯达克100ETF', code: '159941', pct: 20, ret: 18.6, role: '成长引擎', color: '#3b82f6' },
      { name: '标普500ETF', code: '513500', pct: 15, ret: 14.2, role: '核心压舱', color: '#60a5fa' },
      { name: '黄金ETF', code: '518880', pct: 20, ret: 12.8, role: '避险对冲', color: '#f59e0b' },
      { name: '中短债基金', code: '511010', pct: 20, ret: 3.2, role: '稳定器', color: '#10b981' },
      { name: '美国国债ETF', code: 'QDII基金', pct: 10, ret: 0.8, role: '利率对冲', color: '#8b5cf6' },
      { name: '商品ETF', code: 'DBC/QDII', pct: 5, ret: 8.5, role: '通胀保护', color: '#f97316' },
      { name: '全球REITs', code: 'QDII基金', pct: 5, ret: 4.8, role: '实物资产', color: '#ec4899' },
      { name: '现金/货基', code: '余额宝', pct: 5, ret: 2.0, role: '流动性储备', color: '#6b7280' }
    ]
  },
  {
    id: 1,
    name: '策略B - 双动量轮动',
    tag: '进取',
    tagColor: '#3b82f6',
    desc: '基于相对动量+绝对动量双信号，在股票、债券、黄金、现金间每月轮动',
    cagr: 12.5,
    maxdd: -6.2,
    sharpe: 1.65,
    vol: 7.2,
    totalReturn: 80.2,
    alloc: [
      { name: '纳斯达克100ETF', code: '159941', pct: 30, ret: 18.6, role: '动量多头', color: '#3b82f6' },
      { name: '标普500ETF', code: '513500', pct: 20, ret: 14.2, role: '动量多头', color: '#60a5fa' },
      { name: '黄金ETF', code: '518880', pct: 20, ret: 12.8, role: '避险轮入', color: '#f59e0b' },
      { name: '中短债基金', code: '511010', pct: 20, ret: 3.2, role: '避险轮入', color: '#10b981' },
      { name: '现金/货基', code: '余额宝', pct: 10, ret: 2.0, role: '初始持仓', color: '#6b7280' }
    ]
  },
  {
    id: 2,
    name: '策略C - 核心卫星',
    tag: '稳健',
    tagColor: '#f59e0b',
    desc: '70%核心低波动 + 30%卫星趋势资产，兼顾安全与收益',
    cagr: 10.5,
    maxdd: -4.2,
    sharpe: 1.72,
    vol: 5.5,
    totalReturn: 64.9,
    alloc: [
      { name: '纳斯达克100ETF', code: '159941', pct: 15, ret: 18.6, role: '卫星-成长', color: '#3b82f6' },
      { name: '标普500ETF', code: '513500', pct: 15, ret: 14.2, role: '核心-权益', color: '#60a5fa' },
      { name: '黄金ETF', code: '518880', pct: 15, ret: 12.8, role: '卫星-避险', color: '#f59e0b' },
      { name: '中短债基金', code: '511010', pct: 25, ret: 3.2, role: '核心-稳定', color: '#10b981' },
      { name: '美国国债ETF', code: 'QDII基金', pct: 10, ret: 0.8, role: '核心-防御', color: '#8b5cf6' },
      { name: '商品ETF', code: 'DBC/QDII', pct: 5, ret: 8.5, role: '卫星-通胀', color: '#f97316' },
      { name: '全球REITs', code: 'QDII基金', pct: 5, ret: 4.8, role: '卫星-实物', color: '#ec4899' },
      { name: '现金/货基', code: '余额宝', pct: 10, ret: 2.0, role: '核心-流动', color: '#6b7280' }
    ]
  }
];

// 回测数据生成（模拟）
function generateBacktestData(years = 5) {
  const months = years * 12;
  const data = [];
  
  // 策略A数据
  let navA = 1;
  const monthlyReturnsA = [0.012, 0.015, 0.008, -0.005, 0.010, 0.008, 0.018, 0.012, 0.005, 0.008, 0.020, 0.015,
                            -0.008, -0.012, 0.005, 0.008, -0.010, 0.012, 0.00515, 0.008, 0.010, 0.015, 0.005, 0.008,
                            0.018, 0.020, 0.015, 0.008, 0.010, 0.012, 0.005, 0.008, 0.015, 0.010, 0.005, 0.008,
                            -0.005, 0.008, 0.010, 0.012, 0.005, 0.008, 0.015, 0.010, 0.008, 0.012, 0.005, 0.008];
  
  // 策略B数据
  let navB = 1;
  const monthlyReturnsB = [0.018, 0.022, 0.012, -0.008, 0.015, 0.012, 0.025, 0.018, 0.008, 0.012, 0.028, 0.022,
                            -0.012, -0.018, 0.008, 0.012, -0.015, 0.018, 0.010, 0.012, 0.015, 0.022, 0.008, 0.012,
                            0.025, 0.028, 0.022, 0.012, 0.015, 0.018, 0.008, 0.012, 0.022, 0.015, 0.008, 0.012,
                            -0.008, 0.012, 0.015, 0.018, 0.008, 0.012, 0.022, 0.015, 0.012, 0.018, 0.008, 0.012];
  
  // 策略C数据
  let navC = 1;
  const monthlyReturnsC = [0.010, 0.012, 0.008, -0.004, 0.008, 0.006, 0.015, 0.010, 0.004, 0.006, 0.018, 0.012,
                            -0.006, -0.008, 0.004, 0.006, -0.008, 0.010, 0.006, 0.008, 0.008, 0.012, 0.004, 0.006,
                            0.015, 0.018, 0.012, 0.006, 0.008, 0.010, 0.004, 0.006, 0.012, 0.008, 0.004, 0.006,
                            -0.004, 0.006, 0.008, 0.010, 0.004, 0.006, 0.012, 0.008, 0.006, 0.010, 0.004, 0.006];
  
  // 定投数据（60/40股债）
  let navDca = 1;
  const monthlyReturnsDca = [0.015, 0.018, 0.010, -0.008, 0.012, 0.010, 0.020, 0.015, 0.008, 0.010, 0.022, 0.018,
                             -0.015, -0.020, 0.008, 0.010, -0.018, 0.015, 0.010, 0.012, 0.015, 0.018, 0.008, 0.010,
                             0.020, 0.022, 0.018, 0.010, 0.012, 0.015, 0.008, 0.010, 0.018, 0.012, 0.008, 0.010,
                             -0.008, 0.010, 0.012, 0.015, 0.008, 0.010, 0.018, 0.012, 0.010, 0.015, 0.008, 0.010];
  
  const monthsArr = [];
  for (let i = 0; i < months; i++) {
    const year = 2021 + Math.floor(i / 12);
    const month = (i % 12) + 1;
    monthsArr.push(`${year}-${String(month).padStart(2, '0')}`);
    
    navA *= (1 + monthlyReturnsA[i % monthlyReturnsA.length]);
    navB *= (1 + monthlyReturnsB[i % monthlyReturnsB.length]);
    navC *= (1 + monthlyReturnsC[i % monthlyReturnsC.length]);
    navDca *= (1 + monthlyReturnsDca[i % monthlyReturnsDca.length]);
    
    data.push({
      month: monthsArr[i],
      navA: navA,
      navB: navB,
      navC: navC,
      navDca: navDca
    });
  }
  
  return data;
}

const backtestData = generateBacktestData(5);

// ============ 标签页切换 ============
function switchTab(tabId, btn) {
  // 隐藏所有 sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  // 取消所有 tabs 激活状态
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  
  // 显示选中的 section
  document.getElementById(`sec-${tabId}`).classList.add('active');
  btn.classList.add('active');
  
  // 初始化对应页面的图表
  if (tabId === 'best') initBestTab();
  if (tabId === 'compare') initCompareTab();
  if (tabId === 'alloc') initAllocTab();
  if (tabId === 'backtest') initBacktestTab();
}

// ============ 初始化最佳策略页 ============
let bestTabInited = false;
function initBestTab() {
  if (bestTabInited) return;
  
  const strategy = strategies[0];
  
  // 渲染配置条
  const barContainer = document.getElementById('bestAllocBar');
  const legendContainer = document.getElementById('bestAllocLegend');
  
  strategy.alloc.forEach(asset => {
    const seg = document.createElement('div');
    seg.className = 'alloc-seg';
    seg.style.width = `${asset.pct}%`;
    seg.style.backgroundColor = asset.color;
    seg.textContent = asset.pct > 3 ? `${asset.pct}%` : '';
    barContainer.appendChild(seg);
    
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    legendItem.innerHTML = `<div class="legend-dot" style="background:${asset.color}"></div>${asset.name} ${asset.pct}%`;
    legendContainer.appendChild(legendItem);
  });
  
  // 渲染配置表
  const tableBody = document.getElementById('bestAllocTable');
  strategy.alloc.forEach(asset => {
    const amount = (INITIAL_CAPITAL * asset.pct / 100).toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' });
    tableBody.innerHTML += `
      <tr>
        <td>${asset.name}</td>
        <td style="font-size:0.8em;color:var(--tx2)">${asset.code}</td>
        <td style="font-weight:600;color:${asset.color}">${asset.pct}%</td>
        <td>${amount}</td>
        <td style="color:var(--tx2);font-size:0.8em">${asset.role}</td>
      </tr>
    `;
  });
  
  bestTabInited = true;
}

// ============ 初始化对比页 ============
let compareTabInited = false;
function initCompareTab() {
  if (compareTabInited) return;
  
  const ctx = document.getElementById('compareChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: backtestData.map(d => d.month),
      datasets: [
        {
          label: '策略A 增强全天候',
          data: backtestData.map(d => d.navA * 100),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3
        },
        {
          label: '策略B 双动量轮动',
          data: backtestData.map(d => d.navB * 100),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: false,
          tension: 0.4,
          borderWidth: 2
        },
        {
          label: '策略C 核心卫星',
          data: backtestData.map(d => d.navC * 100),
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          fill: false,
          tension: 0.4,
          borderWidth: 2,
          borderDash: [5, 5]
        },
        {
          label: '定投 (60/40)',
          data: backtestData.map(d => d.navDca * 100),
          borderColor: '#6b7280',
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
          fill: false,
          tension: 0.4,
          borderWidth: 2,
          borderDash: [3, 3]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#94a3b8',
            font: { size: 10 }
          }
        }
      },
      scales: {
        x: {
          ticks: { 
            color: '#64748b',
            maxTicksLimit: 12
          },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          ticks: { color: '#64748b', callback: v => v.toFixed(0) + '%' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });
  
  compareTabInited = true;
}

// ============ 初始化配置页 ============
let allocTabInited = false;
function initAllocTab() {
  if (allocTabInited) return;
  
  const strategy = strategies[0];
  const container = document.getElementById('strategyAllocCards');
  
  strategy.alloc.forEach(asset => {
    const amount = (INITIAL_CAPITAL * asset.pct / 100).toLocaleString('zh-CNkt', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 });
    
    container.innerHTML += `
      <div class="card" style="border-left: 3px solid ${asset.color}">
        <div class="card-title">
          ${asset.name}
          <span style="margin-left:auto;font-weight:700;color:${asset.color};font-size:1.1em">${asset.pct}%</span>
        </div>
        <div class="grid3">
          <div style="font-size:0.8em;color:var(--tx2)">代码：<span style="color:var(--tx)">${asset.code}</span></div>
          <div style="font-size:0.8em;color:var(--tx2)">金额：<span style="color:var(--tx)">${amount}</span></div>
          <div style="font-size:0.8em;color:var(--tx2)">角色：<span style="color:var(--tx)">${asset.role}</span></div>
        </div>
      </div>
    `;
  });
  
  // Pie chart
  const ctx = document.getElementById('allocPieChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: strategy.alloc.map(a => a.name),
        datasets: [{
          data: strategy.alloc.map(a => a.pct),
          backgroundColor: strategy.alloc.map(a => a.color),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#94a3b8',
              font: { size: 9 },
              padding: 8,
              generateLabels: function(chart) {
                const data = chart.data;
                return data.labels.map((label, i) => ({
                  text: `${label} ${data.datasets[0].data[i]}%`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: false,
                  index: i
                }));
              }
            }
          }
        }
      }
    });
  }
  
  allocTabInited = true;
}

// ============ 初始化回测页 ============
let backtestTabInited = false;
function initBacktestTab() {
  if (backtestTabInited) return;
  
  // NAV Chart
  const navCtx = document.getElementById('navChart');
  if (navCtx) {
    new Chart(navCtx, {
      type: 'line',
      data: {
        labels: backtestData.map(d => d.month),
        datasets: [{
          label: '策略A 净值',
          data: backtestData.map(d => d.navA * 100),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: '#64748b', maxTicksLimit: 12 },
            grid: { color: 'rgba(255,255,255,0.05)' }
          },
          y: {
            ticks: { color: '#64748b', callback: v => v.toFixed(0) + '%' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        }
      }
    });
  }
  
  // DD Chart
  const ddCtx = document.getElementById('ddChart');
  if (ddCtx) {
    const ddData = backtestData.map(d => {
      const maxSoFar = Math.max(...backtestData.slice(0, backtestData.indexOf(d) + 1).map(x => x.navA));
      return ((d.navA - maxSoFar) / maxSoFar * 100);
    });
    
    new Chart(ddCtx, {
      type: 'line',
      data: {
        labels: backtestData.map(d => d.month),
        datasets: [{
          label: '回撤',
 data          : ddData,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: '#64748b', maxTicksLimit: 12 },
            grid: { color: 'rgba(255,255,255,0.05)' }
          },
          y: {
            ticks: { color: '#64748b', callback: v => v.toFixed(1) + '%' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        }
      }
    });
  }
  
  // Yearly Chart
  const yearCtx = document.getElementById('yearChart');
  if (yearCtx) {
    const yearlyReturns = [];
    for (let year = 2021; year <= 2025; year++) {
      const yearStart = backtestData.find(d => d.month.startsWith(`${year}-01`));
      const yearEnd = backtestData.findLast(d => d.month.startsWith(`${year}-12`));
      if (yearStart && yearEnd) {
        yearlyReturns.push({ year: year.toString(), return: ((yearEnd.navA - yearStart.navA) / yearStart.navA * 100) });
      }
    }
    
    new Chart(yearCtx, {
      type: 'bar',
      data: {
        labels: yearlyReturns.map(d => d.year),
        datasets: [{
          label: '年度收益',
          data: yearlyReturns.map(d => d.return),
          backgroundColor: yearlyReturns.map(d => d.return >= 0 ? '#10b981' : '#ef4444')
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: '#64748b' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#64748b', callback: v => v.toFixed(1) + '%' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        }
      }
    });
  }
  
  backtestTabInited = true;
}

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', function() {
  initBestTab();
});
