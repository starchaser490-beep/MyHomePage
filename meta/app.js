// ============ 应用逻辑 ============

let currentView = 'ranking';
let currentTabButtons = [];

// 视图切换
function switchView(viewId, btn) {
  currentView = viewId;
  
  // 隐藏所有 sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  // 取消所有 tabs 激活状态
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  
  // 显示选中的 section
  document.getElementById(`view-${viewId}`).classList.add('active');
  btn.classList.add('active');
  
  // 初始化对应页面
  if (viewId === 'ranking') initRankingView();
  if (viewId === 'detail') initDetailView();
  if (viewId === 'bloggers') initBloggersView();
}

// 获取评分等级
function getScoreLevel(score) {
  if (score >= 8) return { class: 'good', label: '强烈看多' };
  if (score >= 6) return { class: 'good', label: '看多' };
  if (score >= 4) return { class: 'mid', label: '中性' };
  if (score >= 2) return { class: 'bad', label: '看空' };
  return { class: 'bad', label: '强烈看空' };
}

// 获取博主信息
function getBlogger(id) {
  return bloggers.find(b => b.id === id);
}

// 格式化日期
function formatDate(isoString) {
  const date = new Date(isoString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// ============ 排名视图 ============
let rankingInited = false;
function initRankingView() {
  if (rankingInited) return;
  
  // 计算综合评分并排序
  const rankedStocks = magnificent7.map(stock => {
    const opinion = stockOpinions[stock.symbol];
    return {
      ...stock,
      ...opinion,
      totalOpinions: opinion.bullCount + opinion.bearCount + opinion.neutralCount
    };
  }).sort((a, b) => b.score - a.score);
  
  // 渲染卡片
  const container = document.getElementById('rankingCards');
  rankedStocks.forEach((stock, index) => {
    const level = getScoreLevel(stock.score);
    const barWidth = Math.min((stock.score / 10) * 100, 100);
    const bullishPct = ((stock.bullCount / stock.totalOpinions) * 100).toFixed(0);
    
    container.innerHTML += `
      <div class="stock-card rank-${index + 1}" onclick="switchView('detail', document.querySelectorAll('.tab')[1])">
        <div class="rank">${index + 1}</div>
        <div class="header">
          <div>
            <div class="name">${stock.emoji} ${stock.name} <span style="color:var(--tx2);font-size:0.8em">(${stock.symbol})</span></div>
            <div class="symbol">${stock.sector} · ${stock.marketCap}</div>
          </div>
          <div class="score-box">
            <div class="score ${level.class}">${stock.score.toFixed(1)}</div>
            <div class="score-label">${level.label}</div>
          </div>
        </div>
        <div class="bar">
          <div class="bar-fill ${level.class}" style="width:${barWidth}%"></div>
        </div>
        <div class="metrics">
          <div class="metric">
            <span class="label">看多</span>
            <span class="value" style="color:var(--gn)">${stock.bullCount}票</span>
          </div>
          <div class="metric">
            <span class="label">看空</span>
            <span class="value" style="color:var(--rd)">${stock.bearCount}票</span>
          </div>
          <div class="metric">
            <span class="label">中性</span>
            <span class="value" style="color:var(--yw)">${stock.neutralCount}票</span>
          </div>
          <div class="metric">
            <span class="label">看多占比</span>
            <span class="value">${bullishPct}%</span>
          </div>
        </div>
        <div class="sentiment">
          <span class="sentiment-tag bull">📈 ${bullishPct}% 看多</span>
          <span class="sentiment-tag bear">📉 ${((stock.bearCount / stock.totalOpinions) * 100).toFixed(0)}% 看空</span>
          <span class="sentiment-tag neutral">😐 ${((stock.neutralCount / stock.totalOpinions) * 100).toFixed(0)}% 中性</span>
        </div>
      </div>
    `;
  });
  
  // 渲染图表
  renderScoreChart(rankedStocks);
  
  rankingInited = true;
}

// 渲染评分分布图表
function renderScoreChart(rankedStocks) {
  const ctx = document.getElementById('scoreChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: rankedStocks.map(s => s.symbol),
      datasets: [{
        label: '综合评分',
        data: rankedStocks.map(s => s.score),
        backgroundColor: rankedStocks.map(s => {
          const level = getScoreLevel(s.score);
          if (level.class === 'good') return 'rgba(16, 185, 129, 0.6)';
          if (level.class === 'mid') return 'rgba(245, 158, 11, 0.6)';
          return 'rgba(239, 68, 68, 0.6)';
        }),
        borderColor: rankedStocks.map(s => {
          const level = getScoreLevel(s.score);
          if (level.class === 'good') return '#10b981';
          if (level.class === 'mid') return '#f59e0b';
          return '#ef4444';
        }),
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
          ticks: { color: '#64748b' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          min: 0,
          max: 10,
          ticks: { color: '#64748b' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });
}

// ============ 详细观点视图 ============
let detailInited = false;
function initDetailView() {
  if (detailInited) return;
  
  const container = document.getElementById('stockDetailCards');
  
  magnificent7.forEach(stock => {
    const opinion = stockOpinions[stock.symbol];
    const level = getScoreLevel(opinion.score);
    
    container.innerHTML += `
      <div class="card">
        <div class="card-title">
          <div style="font-size:1.3em">${stock.emoji}</div>
          <div>
            <div>${stock.name} <span style="color:var(--tx2);font-size:0.85em">(${stock.symbol})</span></div>
            <div style="font-size:0.8em;color:var(--tx2);margin-top:2px">${stock.sector} · ${stock.marketCap}</div>
          </div>
          <div style="margin-left:auto;text-align:right">
            <div style="font-size:1.5em;font-weight:800;color:${level.class === 'good' ? 'var(--gn)' : level.class === 'mid' ? 'var(--yw)' : 'var(--rd)'}">${opinion.score.toFixed(1)}</div>
            <div style="font-size:0.7em;color:var(--tx2)">${level.label}</div>
          </div>
        </div>
        
        <div class="grid3" style="margin-bottom:12px;padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
          <div style="text-align:center">
            <div style="font-size:0.7em;color:var(--tx2)">看多</div>
            <div style="font-size:1.2em;font-weight:700;color:var(--gn)">${opinion.bullCount}票</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:0.7em;color:var(--tx2)">看空</div>
            <div style="font-size:1.2em;font-weight:700;color:var(--rd)">${opinion.bearCount}票</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:0.7em;color:var(--tx2)">中性</div>
            <div style="font-size:1.2;em;font-weight:700;color:var(--yw)">${opinion.neutralCount}票</div>
          </div>
        </div>
        
        <div style="font-weight:600;margin-bottom:12px">📝 最新观点</div>
        <div class="opinion-list">
          ${opinion.opinions.map(o => {
            const blogger = getBlogger(o.bloggerId);
            const sentimentIcon = o.type === 'bull' ? '🟢 看多' : o.type === 'bear' ? '🔴 看空' : '🟡 中性';
            return `
              <div class="opinion-item type-${o.type}">
                <div class="opinion-header">
                  <div class="opinion-blogger">${blogger ? blogger.avatar : ''} ${blogger ? blogger.name : 'Unknown'}</div>
                  <div class="opinion-date">${o.date}</div>
                </div>
                <div class="opinion-sentiment">${sentimentIcon}</div>
                <div class="opinion-text">${o.text}</div>
                <div class="opinion-links">
                  <div class="opinion-link source-link">
                    📎 <a href="${o.link}" target="_blank">${o.source || '来源'}</a>
                  </div>
                  ${o.postUrl ? `
                    <div class="opinion-link post-link">
                      💬 <a href="${o.postUrl}" target="_blank">博主原帖</a>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });
  
  detailInited = true;
}

// ============ 博主列表视图 ============
let bloggersInited = false;
function initBloggersView() {
  if (bloggersInited) return;
  
  const container = document.getElementById('bloggerCards');
  
  bloggers.forEach(blogger => {
    container.innerHTML += `
      <div class="blogger-card">
        <div class="info">
          <div class="avatar">${blogger.avatar}</div>
          <div>
            <div class="name">${blogger.name} ${blogger.verified ? '✅' : ''}</div>
            <div class="platform">${blogger.platform} · ${blogger.followers} 粉丝</div>
          </div>
          <div class="winrate">胜率 ${blogger.winrate}%</div>
        </div>
        <div class="stats">
          <div class="stat-box">
            <div class="label">胜率</div>
            <div class="value">${blogger.winrate}%</div>
          </div>
          <div class="stat-box">
            <div class="label">粉丝</div>
            <div class="value">${blogger.followers}</div>
          </div>
          <div class="stat-box">
            <div class="label">专长</div>
            <div class="value">${blogger.focus}</div>
          </div>
        </div>
        ${blogger.winrateExplanation ? `
          <div class="winrate-detail">
            <div class="winrate-detail-title">📊 胜率说明</div>
            <div class="winrate-detail-content">
              <div>• 统计周期：<strong>${blogger.winrateExplanation.period}</strong></div>
              <div>• 总观点数：<strong>${blogger.winrateExplanation.totalOpinions}</strong></div>
              <div>• 正确观点：<strong>${blogger.winrateExplanation.correctOpinions}</strong></div>
              <div>• 备注：<strong>${blogger.winrateExplanation.note}</strong></div>
            </div>
          </div>
        ` : ''}
        ${blogger.profileUrl ? `
          <div class="profile-link">
            <a href="${blogger.profileUrl}" target="_blank">🔗 查看博主主页</a>
          </div>
        ` : ''}
      </div>
    `;
  });
  
  bloggersInited = true;
}

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', function() {
  // 更新时间显示
  const updateInfo = document.getElementById('updateInfo');
  if (updateInfo) {
    updateInfo.innerHTML = `🕐 最后更新：${formatDate(lastUpdateTime)} · 每日自动更新`;
  }
  
  // 初始化排名视图
  initRankingView();
});
