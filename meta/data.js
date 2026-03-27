// ============ 纳指科技七姐妹数据 ============

const magnificent7 = [
  {
    symbol: 'AAPL',
    name: 'Apple',
    emoji: '🍎',
    sector: '消费电子',
    marketCap: '3.1T'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft',
    emoji: '💙',
    sector: '云计算/AI',
    marketCap: '3.0T'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet',
    emoji: '🔵',
    sector: '搜索/AI',
    marketCap: '2.1T'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon',
    emoji: '📦',
    sector: '电商/云',
    marketCap: '1.9T'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA',
    emoji: '💚',
    sector: 'AI芯片',
    marketCap: '2.3T'
  },
  {
    symbol: 'META',
    name: 'Meta',
    emoji: '🔷',
    sector: '社交媒体',
    marketCap: '1.4T'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla',
    emoji: '⚡',
    sector: '电动车',
    marketCap: '850B'
  }
];

// 高胜率博主列表
const bloggers = [
  {
    id: 1,
    name: 'Charlie Munger Style',
    platform: 'Twitter/X',
    avatar: '🦅',
    winrate: 78,
    followers: '50K',
    focus: '价值投资',
    verified: true
  },
  {
    id: 2,
    name: 'The Quant Trader',
    platform: 'Twitter/X',
    avatar: '📊',
    winrate: 72,
    followers: '120K',
    focus: '量化策略',
    verified: true
  },
  {
    id: 3,
    name: 'Tech Growth Hunter',
    platform: '公众号',
    avatar: '🚀',
    winrate: 68,
    followers: '30K',
    focus: '科技成长',
    verified: true
  },
  {
    id: 4,
    name: 'Macro Insights',
    platform: '微博',
    avatar: '🌍',
    winrate: 65,
    followers: '80K',
    focus: '宏观分析',
    verified: true
  },
  {
    id: 5,
    name: 'Value Veteran',
    platform: 'Twitter/X',
    avatar: '💰',
    winrate: 70,
    followers: '45K',
    focus: '深度价值',
    verified: false
  },
  {
    id: 6,
    name: 'AI Trend Watcher',
    platform: '公众号',
    avatar: '🤖',
    winrate: 75,
    followers: '25K',
    focus: 'AI趋势',
    verified: true
  }
];

// 博主观点数据（模拟）
// 实际使用时，这些数据将通过 GitHub Actions 每天自动更新
const stockOpinions = {
  'AAPL': {
    score: 6.8,
    bullCount: 12,
    bearCount: 4,
    neutralCount: 2,
    opinions: [
      { bloggerId: 1, type: 'bull', text: 'iPhone 17 预售强劲，服务收入持续增长', date: '03-27' },
      { bloggerId: 2, type: 'bull', text: '技术面突破200日均线，动量强劲', date: '03-27' },
      { bloggerId: 3, type: 'neutral', text: '中国市场竞争加剧，短期承压', date: '03-26' },
      { bloggerId: 4, type: 'bull', text: '美元走强利好海外收入', date: '03-26' },
      { bloggerId: 6, type: 'bull', text: 'Apple Intelligence 带动硬件换机周期', date: '03-25' }
    ]
  },
  'MSFT': {
    score: 8.2,
    bullCount: 14,
    bearCount: 1,
    neutralCount: 1,
    opinions: [
      { bloggerId: 1, type: 'bull', text: 'Azure 增长率持续超30%，护城河稳固', date: '03-27' },
      { bloggerId: 2, type: 'bull', text: 'OpenAI 合作深化，AI 收入占比快速提升', date: '03-27' },
      { bloggerId: 3, type: 'bull', text: 'Copilot 企业渗透率突破30%', date: '03-27' },
      { bloggerId: 4, type: 'bull', text: '回购力度加大，股东回报强劲', date: '03-26' },
      { bloggerId: 6, type: 'bull', text: 'GitHub Copilot 收入翻倍', date: '03-25' }
    ]
  },
  'GOOGL': {
    score: 7.5,
    bullCount: 11,
    bearCount: 3,
    neutralCount: 4,
    opinions: [
      { bloggerId: 1, type: 'bull', text: '搜索业务稳定，YouTube 广告恢复', date: '03-27' },
      { bloggerId: 2, type: 'neutral', text: '监管担忧仍存，短期波动', date: '03-27' },
      { bloggerId: 3, type: 'bull', text: 'Gemini 性能提升，AI 搜索领先', date: '03-26' },
      { bloggerId: 4, type: 'bear', text: '反垄断调查升级，存在风险', date: '03-26' },
      { bloggerId: 6, type: 'bull', text: 'Waymo 商业化进展超预期', date: '03-25' }
    ]
  },
  'AMZN': {
    score: 7.8,
    bullCount: 13,
    bearCount: 2,
    neutralCount: 3,
    opinions: [
      { bloggerId: 1, type: 'bull', text: 'AWS 增速回升，云计算需求强劲', date: '03-27' },
      { bloggerId: 2, type: 'bull', text: 'Prime 会员增长，广告业务扩张', date: '03-27' },
      { bloggerId: 3, type: 'bull', text: '机器人物流降低成本', date: '03-26' },
      { bloggerId: 4, type: 'neutral', text: '消费降级影响，零售增速放缓', date: '03-26' },
      { bloggerId: 6, type: 'bull', text: 'Kuiper 卫星业务潜力巨大', date: '03-25' }
    ]
  },
  'NVDA': {
    score: 9.2,
    bullCount: 16,
    bearCount: 0.5,
    neutralCount: 1,
    opinions: [
      { bloggerId: 1, type: 'bull', text: 'Blackwell 芯片需求爆表，供不应求', date: '03-27' },
      { bloggerId: 2, type: 'bull', text: '数据中心资本支出持续增长', date: '03-27' },
      { bloggerId: 3, type: 'bull', text: 'H200 需求强劲，收入指引上调', date: '03-27' },
      { bloggerId: 4, type: 'bull', text: 'AI 基础设施投入周期至少3-5年', date: '03-26' },
      { bloggerId: 6, type: 'bull', text: '软件生态完善，客户粘性增强', date: '03-25' }
    ]
  },
  'META': {
    score: 7.2,
    bullCount: 10,
    bearCount: 4,
    neutralCount: 4,
    opinions: [
      { bloggerId: 1, type: 'bull', text: '广告收入恢复，Reels 增长强劲', date: '03-27' },
      { bloggerId: 2, type: 'neutral', text: 'Reality Labs 持续亏损，拖累利润', date: '03-27' },
      { bloggerId: 3, type: 'bull', text: 'Threads DAU 突破1亿，用户增长', date: '03-26' },
      { bloggerId: 4, type: 'bear', text: '监管压力加大，数据隐私担忧', date: '03-26' },
      { bloggerId: 6, type: 'bull', text: 'LLaMA 开源模型建立生态优势', date: '03-25' }
    ]
  },
  'TSLA': {
    score: 4.5,
    bullCount: 5,
    bearCount: 8,
    neutralCount: 5,
    opinions: [
      { bloggerId: 1, type: 'bear', text: '需求疲软，中国市场竞争激烈', date: '03-27' },
      { bloggerId: 2, type: 'neutral', text: 'FSD 进展缓慢， Robotaxi 遥远', date: '03-27' },
      { bloggerId: 3, type: 'bear', text: '电动车行业产能过剩，价格战', date: '03-26' },
      { bloggerId: 4, type: 'bull', text: '储能业务增长亮眼，毛利率高', date: '03-26' },
      { bloggerId: 6, type: 'neutral', text: 'Model 2 若成功将改变格局', date: '03-25' }
    ]
  }
};

// 更新时间
let lastUpdateTime = new Date().toISOString();
