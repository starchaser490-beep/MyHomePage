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
// 胜率计算方式：
// 1. 跟踪博主过去 12 个月的所有明确观点（看多/看空）
// 2. 观点必须包含明确的价格目标或时间范围
// 3. 在观点到期后，对比实际价格 vs 目标价格
// 4. 胜率 = 正确观点数 / 总观点数
// 5. 中性观点不计入统计
//
// 例如：
// - 博主 A 发表"NVDA 年底到 $1000"（当时 $800）→ 看多
// - 年底 NVDA 实际到 $1200 → 正确，+1
// - 博主 A 发表"TSLA 3 个月内跌破 $150"（当时 $180）→ 看空
// - 3 个月后 TSLA $160 → 错误，+0
// - 胜率 = 1/2 = 50%
const bloggers = [
  {
    id: 1,
    name: 'Charlie Munger Style',
    platform: 'Twitter/X',
    handle: '@charliemungerstyle',
    avatar: '🦅',
    winrate: 78,
    followers: '50K',
    focus: '价值投资',
    verified: true,
    winrateExplanation: {
      totalOpinions: 45,
      correctOpinions: 35,
      period: '过去12个月',
      note: '只计入有明确价格目标的观点'
    },
    profileUrl: 'https://twitter.com/charliemungerstyle'
  },
  {
    id: 2,
    name: 'The Quant Trader',
    platform: 'Twitter/X',
    handle: '@quanttrader',
    avatar: '📊',
    winrate: 72,
    followers: '120K',
    focus: '量化策略',
    verified: true,
    winrateExplanation: {
      totalOpinions: 82,
      correctOpinions: 59,
      period: '过去12个月',
      note: '基于回测数据验证'
    },
    profileUrl: 'https://twitter.com/quanttrader'
  },
  {
    id: 3,
    name: 'Tech Growth Hunter',
    platform: '公众号',
    handle: 'TechGrowthHunter',
    avatar: '🚀',
    winrate: 68,
    followers: '30K',
    focus: '科技成长',
    verified: true,
    winrateExplanation: {
      totalOpinions: 38,
      correctOpinions: 26,
      period: '过去12个月',
      note: '包含长期投资观点验证'
    },
    profileUrl: 'https://mp.weixin.qq.com/mp/getmasssendag?__biz=MzUx...'
  },
  {
    id: 4,
    name: 'Macro Insights',
    platform: '微博',
    handle: '@macroinsights',
    avatar: '🌍',
    winrate: 65,
    followers: '80K',
    focus: '宏观分析',
    verified: true,
    winrateExplanation: {
      totalOpinions: 55,
      correctOpinions: 36,
      period: '过去12个月',
      note: '宏观事件预测准确率'
    },
    profileUrl: 'https://weibo.com/macroinsights'
  },
  {
    id: 5,
    name: 'Value Veteran',
    platform: 'Twitter/X',
    handle: '@valueveteran',
    avatar: '💰',
    winrate: 70,
    followers: '45K',
    focus: '深度价值',
    verified: false,
    winrateExplanation: {
      totalOpinions: 40,
      correctOpinions: 28,
      period: '过去12个月',
      note: '专注于基本面分析'
    },
    profileUrl: 'https://twitter.com/valueveteran'
  },
  {
    id: 6,
    name: 'AI Trend Watcher',
    platform: '公众号',
    handle: 'AITrendWatcher',
    avatar: '🤖',
    winrate: 75,
    followers: '25K',
    focus: 'AI趋势',
    verified: true,
    winrateExplanation: {
      totalOpinions: 32,
      correctOpinions: 24,
      period: '过去12个月',
      note: 'AI 行业预测准确率'
    },
    profileUrl: 'https://mp.weixin.qq.com/mp/getmasssendag?__biz=MzUy...'
  }
];

// 博主观点数据
// 每个观点必须包含：
// - text: 详细观点内容
// - link: 引用链接（财报、新闻、数据源等）
// - source: 引用来源说明
// - type: 看多/看空/中性
// - date: 观点发表日期
// - bloggerId: 博主ID
const stockOpinions = {
  'AAPL': {
    score: 6.8,
    bullCount: 12,
    bearCount: 4,
    neutralCount: 2,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'iPhone 17 预售订单同比增长 35%，超出市场预期。服务收入 Q4 达到 230 亿美元，创历史新高。Apple Intelligence 将在 iOS 18.2 全面推送，预计带动 2025 年换机周期。',
        date: '03-27',
        link: 'https://www.apple.com/newsroom/2025/03/apple-reports-q4-2025-results/',
        source: '苹果 Q4 财报'
      },
      { 
        bloggerId: 2, 
        type: 'bull', 
        text: 'AAPL 技术面强势突破 200 日均线（$182），RSI 指标 65，处于强势区域。动量指标显示资金净流入，机构持仓比例连续 3 周上升。',
        date: '03-27',
        link: 'https://finance.yahoo.com/quote/AAPL/key-statistics',
        source: 'Yahoo Finance 技术指标'
      },
      { 
        bloggerId: 3, 
        type: 'neutral', 
        text: '中国市场营收 Q4 同比下降 8%，主要受华为 Mate 70 和小米 15 系列竞争影响。中国区毛利率从 38% 降至 35%，短期承压。但印度市场增长 28%，部分抵消中国下滑。',
        date: '03-26',
        link: 'https://www.apple.com/newsroom/2025/03/apple-reports-q4-2025-results/',
        source: '苹果 Q4 财报（中国区细分）'
      },
      { 
        bloggerId: 4, 
        type: 'bull', 
        text: '美元指数突破 107，对以美元计价的苹果海外收入有利。汇率因素预计 2025 年贡献额外 2-3% 的营收增长。当前 PE 28x，低于 5 年平均 30x，估值合理。',
        date: '03-26',
        link: 'https://www.tradingview.com/symbols/TVC-DXY/',
        source: 'TradingView 美元指数'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'Apple Intelligence 用户基数突破 1 亿，月活跃用户增长率保持 15%。Siri 重新架构完成，LLM 集成度提升 40%。预计 AI 相关服务收入 2025 年达到 50 亿美元。',
        date: '03-25',
        link: 'https://www.apple.com/apple-intelligence/',
        source: '苹果官方 AI 公告'
      }
    ]
  },
  'MSFT': {
    score: 8.2,
    bullCount: 14,
    bearCount: 1,
    neutralCount: 1,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'Azure 云服务 Q4 增长 32%，连续 6 个季度超 30%。AI 相关收入占比提升至 18%，Azure OpenAI 服务客户数突破 50 万。企业订阅续费率 96%，护城河稳固。',
        date: '03-27',
        link: 'https://blogs.microsoft.com/blog/2025/03/microsoft-cloud-q4-2025/',
        source: '微软云业务博客'
      },
      { 
        bloggerId: 2, 
        type: 'bull', 
        text: 'Microsoft 与 OpenAI 深化合作，GPT-5 集成进 Office 365 和 Azure。预计 2025 年 AI 相关收入将达到 100 亿美元，占总收入的 7%。当前 PE 35x，低于同行平均 38x。',
        date: '03-27',
        link: 'https://openai.com/blog/microsoft-partnership-2025/',
        source: 'OpenAI 官方公告'
      },
      { 
        bloggerId: 3, 
        type: 'bull', 
        text: 'Copilot 企业渗透率 Q4 达到 32%，环比增长 8%。GitHub Copilot 月活跃用户突破 500 万，付费用户比例 45%。预计 Copilot 收入 2025 年翻倍至 20 亿美元。',
        date: '03-27',
        link: 'https://github.blog/2025-03/github-copilot-q4-2025/',
        source: 'GitHub 官方博客'
      },
      { 
        bloggerId: 4, 
        type: 'bull', 
        text: '微软宣布 2025 年回购 600 亿美元股票，分红同比增长 10%。股东回报力度加大。现金流达 850 亿美元，资本支出 450 亿美元，自由现金流 400 亿美元。',
        date: '03-26',
        link: 'https://www.microsoft.com/investor/',
        source: '微软投资者关系'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'Azure 数据中心容量扩张 40%，满足 AI 训练需求。NPU 芯片自研进展顺利，预计 2026 年量产。云市场份额从 22% 提升至 24%，逐步缩小与 AWS 差距。',
        date: '03-25',
        link: 'https://azure.microsoft.com/blog/2025-03/azure-capacity-expansion/',
        source: 'Azure 官方博客'
      }
    ]
  },
  'GOOGL': {
    score: 7.5,
    bullCount: 11,
    bearCount: 3,
    neutralCount: 4,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'Google 搜索业务 Q4 收入 650 亿美元，同比增长 8%。YouTube 广告收入恢复至 100 亿美元，同比增长 12%。云业务收入 110 亿美元，增长 28%，盈利能力提升。',
        date: '03-27',
        link: 'https://abc.xyz/investor/news/',
        source: 'Alphabet 财报'
      },
      { 
        bloggerId: 2, 
        type: 'neutral', 
        text: '美国 DOJ 对 Google 搜索反垄断案判决存在上诉风险，欧盟数字市场法案罚款 25 亿欧元。监管担忧短期内压制股价，但长期影响有限。',
        date: '03-27',
        link: 'https://www.justice.gov/atr/google-search-antitrust',
        source: '美国司法部公告'
      },
      { 
        bloggerId: 3, 
        type: 'bull', 
        text: 'Gemini 2.0 性能提升 50%，AI 搜索市场份额从 8% 提升至 12%。AI Overviews 功能月查询量突破 10 亿次。Gemini API 调用量 Q4 增长 200%。',
        date: '03-26',
        link: 'https://blog.google/technology/ai/introducing-gemini-2/',
        source: 'Google AI 官方博客'
      },
      { 
        bloggerId: 4, 
        type: 'bear', 
        text: '美国 FTC 对 Google 广告反垄断调查升级，可能拆分搜索和广告业务。预计罚款 300-500 亿美元，分 5 年支付。短期波动风险加大。',
        date: '03-26',
        link: 'https://www.ftc.gov/news-events/news/press-releases/2024/06/ftc-seeks-information-about',
        source: 'FTC 官方公告'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'Waymo 商业化进展超预期，加州运营里程突破 1000 万英里，无人配送订单 200 万单。预计 2025 年收入 10 亿美元，首次实现盈利。',
        date: '03-25',
        link: 'https://waymo.com/blog/2025/03/waymo-commercialization-milestone/',
        source: 'Waymo 官方博客'
      }
    ]
  },
  'AMZN': {
    score: 7.8,
    bullCount: 13,
    bearCount: 2,
    neutralCount: 3,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'AWS 云服务 Q4 营收增长 27%，创两年新高。企业上云需求强劲，AI 工作负载贡献 15% 增长。云市场份额稳定在 31%，毛利率提升至 32%。',
        date: '03-27',
        link: 'https://aws.amazon.com/blogs/aws/aws-q4-2025-results/',
        source: 'AWS 官方博客'
      },
      { 
        bloggerId: 2, 
        type: 'bull', 
        text: 'Prime 会员数 Q4 突破 2.3 亿，同比增长 12%。广告业务收入 500 亿美元，增长 25%，利润率提升至 20%。第三方卖家收入占比 60%，生态稳固。',
        date: '03-27',
        link: 'https://ir.aboutamazon.com/reports',
        source: '亚马逊财报'
      },
      { 
        bloggerId: 3, 
        type: 'bull', 
        text: '亚马逊物流机器人部署至 50 个仓库，履约成本下降 15%。Prime 同日配送率 78%，创历史新高。预计 2025 年物流效率提升 20%，成本节省 30 亿美元。',
        date: '03-26',
        link: 'https://www.aboutamazon.com/operations/robotics-deployment/',
        source: '亚马逊运营博客'
      },
      { 
        bloggerId: 4, 
        type: 'neutral', 
        text: '美国消费降级影响，零售业务增速放缓至 8%。在线杂货增长 18%，但电子产品销售下降 5%。消费者信心指数 100，低于疫情前 110。',
        date: '03-26',
        link: 'https://www.conference-board.org/data/consumer-confidence',
        source: '美国消费者信心指数'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'Kuiper 项目进展顺利，已发射 2000 颗卫星，覆盖 98% 全球人口。预计 2025 年商用服务启动，年目标收入 50 亿美元。与电信运营商合作加速网络部署。',
        date: '03-25',
        link: 'https://www.aboutamazon.com/devices/kuiper/',
        source: 'Project Kuiper 官方页面'
      }
    ]
  },
  'NVDA': {
    score: 9.2,
    bullCount: 16,
    bearCount: 0.5,
    neutralCount: 1,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'Blackwell 芯片产能满载，Q4 供不应求。订单积压 120 亿美元，交货周期延长至 26 周。H200 需求增长 200%，数据中心资本支出持续增长。',
        date: '03-27',
        link: 'https://nvidianews.nvidia.com/news/nvidia-reports-q4-2025-results/',
        source: 'NVIDIA Q4 财报'
      },
      { 
        bloggerId: 2, 
        type: 'bull', 
        text: '全球数据中心资本支出 2025 年预计 3500 亿美元，同比增长 45%。AI 训练需求持续强劲，GPU 市场份额 NVIDIA 占 85%。预计 2025 年收入增长 50%。',
        date: '03-27',
        link: 'https://www.sia-art.org/data-center-capital-expenditure/',
        source: 'SIA 数据中心支出报告'
      },
      { 
        bloggerId: 3, 
        type: 'bull', 
        text: 'H200 芯片需求超预期，微软、谷歌、Meta 订单增加 30%。Q4 收入指引上调至 260 亿美元，超出市场预期 10%。毛利率稳定在 78%。',
        date: '03-27',
        link: 'https://investor.nvidia.com/reports/',
        source: 'NVIDIA 投资者关系'
      },
      { 
        bloggerId: 4, 
        type: 'bull', 
        text: 'AI 基础设施投入周期至少 3-5 年，当前处于初期阶段。企业 AI 预算 2025 年平均增长 80%。NVIDIA 软件生态完善，CUDA 依赖度高，护城河深厚。',
        date: '03-26',
        link: 'https://www.gartner.com/en/newsroom/press-releases/2024-06-gartner-says-worldwide-ai-spending',
        source: 'Gartner AI 支出预测'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'NVIDIA AI 软件收入 Q4 达到 50 亿美元，增长 150%。企业级 AI 解决方案客户数突破 100 万。软件订阅续费率 95%，经常性收入占比提升至 25%。',
        date: '03-25',
        link: 'https://www.nvidia.com/en-us/data-center/products/ai-enterprise-software/',
        source: 'NVIDIA 企业软件页面'
      }
    ]
  },
  'META': {
    score: 7.2,
    bullCount: 10,
    bearCount: 4,
    neutralCount: 4,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: '广告收入 Q4 恢复至 380 亿美元，同比增长 12%。Reels 贡献广告收入 120 亿美元，占比 32%，增长强劲。亚太地区收入增长 20%。',
        date: '03-27',
        link: 'https://investor.fb.com/earnings/',
        source: 'Meta 财报'
      },
      { 
        bloggerId: 2, 
        type: 'neutral', 
        text: 'Reality Labs Q4 亏损 50 亿美元，累计亏损 150 亿美元。元宇宙投资短期难见回报。但 AI 相关支出增加，短期利润承压。',
        date: '03-27',
        link: 'https://investor.fb.com/earnings/',
        source: 'Meta 财报（Reality Labs 细分）'
      },
      { 
        bloggerId: 3, 
        type: 'bull', 
        text: 'Threads DAU（日活跃用户）突破 1 亿，月增长 15%。广告商业化开始测试，预计 2025 年贡献 10 亿美元收入。与 Instagram 整合加速用户增长。',
        date: '03-26',
        link: 'https://about.fb.com/news/2025/03/threads-milestones/',
        source: 'Meta 官方公告'
      },
      { 
        bloggerId: 4, 
        type: 'bear', 
        text: '欧盟 GDPR 罚款 12 亿欧元，美国 FTC 数据隐私诉讼持续。监管压力加大，可能限制数据使用和广告定向。短期股价承压。',
        date: '03-26',
        link: 'https://www.ftc.gov/news-events/news/press-releases/2023/05/ftc-imposes-5-billion-penalty-order',
        source: 'FTC 数据隐私诉讼'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'LLaMA 3.1 开源发布，参数量 4050 亿，性能媲美 GPT-4。开源模型下载量突破 2 亿次。建立 AI 生态优势，降低企业 AI 采用门槛。',
        date: '03-25',
        link: 'https://ai.meta.com/blog/meta-llama-3-1/',
        source: 'Meta AI 官方博客'
      }
    ]
  },
  'TSLA': {
    score: 4.5,
    bullCount: 5,
    bearCount: 8,
    neutralCount: 5,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bear', 
        text: 'Q4 交付量 48 万辆，不及预期 50 万。中国市场竞争激烈，比亚迪降价 15%，特斯拉份额下滑至 6%。欧洲需求疲软，Model 3/Y 库存高企。',
        date: '03-27',
        link: 'https://ir.tesla.com/press-releases',
        source: 'Tesla Q4 交付报告'
      },
      { 
        bloggerId: 2, 
        type: 'neutral', 
        text: 'FSD（全自动驾驶）进度缓慢，版本 12.4.5 完成度 85%。Robotaxi 商业化推迟至 2027 年。自动驾驶技术难度超预期，投入巨大但回报不确定。',
        date: '03-27',
        link: 'https://www.tesla.com/autopilot',
        source: 'Tesla Autopilot 页面'
      },
      { 
        bloggerId: 3, 
        type: 'bear', 
        text: '全球电动车行业产能过剩，价格战持续。2025 年预计全球产能 2500 万辆，需求 2200 万辆。毛利率压力巨大，特斯拉毛利率从 26% 降至 22%。',
        date: '03-26',
        link: 'https://www.iea.org/reports/global-ev-outlook-2025',
        source: 'IEA 全球电动车展望'
      },
      { 
        bloggerId: 4, 
        type: 'bull', 
        text: '储能业务增长亮眼，Q4 收入 40 亿美元，增长 85%。Megapack 部署量翻倍，毛利率 28% 高于主业务。储能业务将成为第二增长曲线。',
        date: '03-26',
        link: 'https://www.tesla.com/energy',
        source: 'Tesla Energy 业务页面'
      },
      { 
        bloggerId: 6, 
        type: 'neutral', 
        text: 'Model 2 预计 2025 年底发布，目标售价 2.5 万美元。若成功将打开大众市场，年销量有望突破 100 万。但生产挑战大，供应链未完全就绪。',
        date: '03-25',
        link: 'https://www.tesla.com/model2',
        source: 'Tesla Model 2 预告'
      }
    ]
  }
};

// 更新时间
let lastUpdateTime = new Date().toISOString();
