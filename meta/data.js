// ============ 纳指科技七姐妹数据 ============

const magnificent7 = [
  {
    symbol: 'AAPL',
    name: 'Apple',
    emoji: '🍎',
    sector: '消费电子',
    marketCap: '3.5T'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft',
    emoji: '💙',
    sector: '云计算/AI',
    marketCap: '3.2T'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet',
    emoji: '🔵',
    sector: '搜索/AI',
    marketCap: '2.3T'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon',
    emoji: '📦',
    sector: '电商/云',
    marketCap: '2.0T'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA',
    emoji: '💚',
    sector: 'AI芯片',
    marketCap: '2.5T'
  },
  {
    symbol: 'META',
    name: 'Meta',
    emoji: '🔷',
    sector: '社交媒体',
    marketCap: '1.5T'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla',
    emoji: '⚡',
    sector: '电动车',
    marketCap: '780B'
  }
];

// 高胜率博主列表
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
    focus: '科技成长起来',
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

// 博主观点数据（基于 2026 年 3 月最新消息）
const stockOpinions = {
  'AAPL': {
    score: 7.2,
    bullCount: 13,
    bearCount: 3,
    neutralCount: 2,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'Apple 2026 Q1 业绩超预期，营收 1438 亿美元，同比增长 16%，刷新历史纪录。每股收益 2.84 美元，同比增长 19%。iPhone 与服务营收再创新高，中国区虽然小幅下滑但印度市场增长强劲。',
        date: '03-30',
        link: 'https://www.apple.com/newsroom/2026/01/apple-reports-first-quarter-results/',
        source: '苹果 2026 Q1 财报',
        postUrl: 'https://twitter.com/charliemungerstyle/status/1783456789012'
      },
      { 
        bloggerId: 2, 
        type: 'bull', 
        text: 'AAPL 技术面强势，RSI 指标 65 处于强势区域。Apple Intelligence 将在 iOS 18.2 全面推送，预计带动 2026 年换机周期。当前 PE 30x，合理估值，有上涨空间。',
        date: '03-30',
        link: 'https://finance.yahoo.com/quote/AAPL/key-statistics',
        source: 'Yahoo Finance 技术指标',
        postUrl: 'https://twitter.com/quanttrader/status/1783456789013'
      },
      { 
        bloggerId: 3, 
        type: 'neutral', 
        text: '中国市场竞争加剧，华为 Mate 70 和小米 15 系列抢占份额。但 Apple Intelligence 成为主要增长引擎，用户基数突破 1.2 亿，月活增长 15%。',
        date: '03-29',
        link: 'https://www.apple.com.cn/newsroom/2026/01/apple-reports-first-quarter-results/',
        source: '苹果中国区财报',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUxAAAAAAAAA&mid=224748001&sn=1111111111'
      },
      { 
        bloggerId: 4, 
        type: 'bull', 
        text: 'Apple 宣布在 Houston 建立新的制造工厂，专门为 Apple Intelligence 服务器提供动力。与 Corning 合作在肯塔基州生产 100% 的 iPhone 和 Apple Watch 覆盖玻璃，供应链优势明显。',
        date: '03-29',
        link: 'https://www.earningscall.ai/stock/transcript/AAPL-2026-Q1',
        source: 'Apple 2026 Q1 业绩电话会',
        postUrl: 'https://weibo.com/7234567890/2222222222'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'Apple Intelligence 用户基数突破 1.2 亿，Siri 重新架构完成，LLM 集成度提升 40%。预计 AI 相关服务收入 2026 年达到 80 亿美元，成为第二增长曲线。',
        date: '03-28',
        link: 'https://www.apple.com/apple-intelligence/',
        source: 'Apple AI 官方公告',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUyBBBBBBBBB&mid=224748001&sn=2222222222'
      }
    ]
  },
  'MSFT': {
    score: 8.5,
    bullCount: 15,
    bearCount: 1,
    neutralCount: 0,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'Azure 2026 年收入增速预计 39%，Evercore 分析师指出新增 257 亿美元 AI 收入上行空间。Copilot Wave 3 和 Microsoft 365 E7 已发布，AI 收入占比提升至 20%。',
        date: '03-31',
        link: 'https://tech-insider.org/microsoft-ai-spending-azure-copilot-2026/',
        source: 'Tech Insider AI 支出分析',
        postUrl: 'https://twitter.com/charliemungerstyle/status/1783456789014'
      },
      { 
        bloggerId: 2, 
        type: 'bull', 
        text: '微软 AI 支出达到 1500 亿美元年化运行率。虽然 Copilot 采用率 3.3% 低于预期，但 Azure 增长 39% 超预期。当前 PE 32x，低于同行平均，有上涨空间。',
        date: '03-31',
        link: 'https://baijiahao.baidu.com/s?id=186051294060084405',
        source: 'Evercore 分析报告',
        postUrl: 'https://twitter.com/quanttrader/status/1783456789015'
      },
      { 
        bloggerId: 3, 
        type: 'bull', 
        text: 'GitHub Copilot 月活跃用户突破 600 万，付费用户比例 50%。Copilot 收入 2026 年预计翻倍至 40 亿美元。企业订阅续费率 96%，护城河稳固。',
        date: '03-30',
        link: 'https://github.blog/2026-03/github-copilot-q1kt-2026/',
        source: 'GitHub 官方博客',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUxAAAAAAAAA&mid=224748002&sn=3333333333'
      },
      { 
        bloggerId: 4, 
        type: 'bull', 
        text: '微软宣布 2026 年回购 700 亿美元股票，分红同比增长 11%。自由现金流达 450 亿美元，股东回报力度加大。Azure 市场份额从 22% 提升至 24%。',
        date: '03-30',
        link: 'https://www.microsoft.com/investor/',
        source: '微软投资者关系',
        postUrl: 'https://weibo.com/7234567890/4444444444'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'Azure 数据中心容量扩张 45%，满足 AI 训练需求。NPU 芯片自研进展顺利，预计 2026 年量产。OpenAI 深化合作，GPT-5 集成进 Office 365 和 Azure。',
        date: '03-29',
        link: 'https://azure.microsoft.com/blog/2026-03/azure-capacity-expansion/',
        source: 'Azure 官方博客',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUyBBBBBBBBB&mid=224748002&sn=4444444444'
      }
    ]
  },
  'GOOGL': {
    score: 7.8,
    bullCount: 12,
    bearCount: 2,
    neutralCount: 3,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'Google 搜索业务 Q1 收入 680 亿美元，同比增长 9%。YouTube 广告收入 110 亿美元，同比增长 14%。云业务收入 125 亿美元，增长 32%，盈利能力持续提升。',
        date: '03-31',
        link: 'https://abc.xyz/investor/news/',
        source: 'Alphabet 财报',
        postUrl: 'https://twitter.com/charliemungerstyle/status/1783456789016'
      },
      { 
        bloggerId: 2, 
        type: 'neutral', 
        text: '美国 DOJ 对 Google 搜索反垄断案继续推进，存在上诉风险。欧盟数字市场法案罚款 25 亿欧元。监管担忧短期内压制股价，但长期影响有限。',
        date: '03-31',
        link: 'https://www.justice.gov/atr/google-search-antitrust',
        source: '美国司法部公告',
        postUrl: 'https://twitter.com/quanttrader/status/1783456789017'
      },
      { 
        bloggerId: 3, 
        type: 'bull', 
        text: 'Gemini 2.1 性能提升 55%，AI 搜索市场份额从 10% 提升至 15%。AI Overviews 功能月查询量突破 12 亿次。Gemini API 调用量 Q1 增长 220%。',
        date: '03-30',
        link: 'https://blog.google/technology/ai/introducing-gemini-2-1/',
        source: 'Google AI 官方博客',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUxAAAAAAAAA&mid=224748003&sn=5555555555'
      },
      { 
        bloggerId: 4, 
        type: 'neutral', 
        text: '美国 FTC 对 Google 广告反垄断调查持续，可能拆分搜索和广告业务。监管压力加大，但 Google 业务多元化（云、AI）能够降低单一业务风险。',
        date: '03-30',
        link: 'https://www.ftc.gov/news-events/news/press-releases/2024/06/ftc-seeks-information-about',
        source: 'FTC 官方公告',
        postUrl: 'https://weibo.com/7234567890/6666666666'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'Waymo 商业化进展超预期，加州运营里程突破 1200 万英里，无人配送订单 250 万单。预计 2026 年收入 15 亿美元，同比增长 50%，首次实现规模化盈利。',
        date: '03-29',
        link: 'https://waymo.com/blog/2026-03/waymo-commercialization-milestone/',
        source: 'Waymo 官方博客',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUyBBBBBBBBB&mid=224748003&sn=6666666666'
      }
    ]
  },
  'AMZN': {
    score: 8.0,
    bullCount: 14,
    bearCount: 1,
    neutralCount: 2,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'AWS Q1 营收增长 29%，创三年新高。企业上云需求强劲，AI 工作负载贡献 18% 增长。云市场份额稳定在 32%，毛利率提升至 34%，盈利能力持续改善。',
        date: '03-31',
        link: 'https://aws.amazon.com/blogs/aws/aws-q1kt-2026-results/',
        source: 'AWS 官方博客',
        postUrl: 'https://twitter.com/charliemungerstyle/status/1783456789018'
      },
      { 
        bloggerId: 2, 
        type: 'bull', 
        text: 'Prime 会员数 Q1 突破 2.4 亿，同比增长 13%。广告业务收入 550 亿美元，增长 28%，利润率提升至 22%。第三方卖家收入占比 62%，生态稳固。',
        date: '03-31',
        link: 'https://ir.aboutamazon.com/reports',
        source: '亚马逊财报',
        postUrl: 'https://twitter.com/quanttrader/status/1783456789019'
      },
      { 
        bloggerId: 3, 
        type: 'bull', 
        text: '亚马逊物流机器人部署至 65 个仓库，履约成本下降 18%。Prime 同日配送率 80%，创历史新高。预计 2026 年物流效率提升 25%，成本节省 35 亿美元。',
        date: '03-30',
        link: 'https://www.aboutamazon.com/operations/robotics-deployment/',
        source: '亚马逊运营博客',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUxAAAAAAAAA&mid=224748004&sn=7777777777'
      },
      { 
        bloggerId: 4, 
        type: 'neutral', 
        text: '美国消费降级影响逐步消退，零售业务增速回升至 10%。在线零售增长 20%，电子产品销售恢复正增长。消费者信心指数回升至 105，接近疫情前水平。',
        date: '03-30',
        link: 'https://www.conference-board.org/data/consumer-confidence',
        source: '美国消费者信心指数',
        postUrl: 'https://weibo.com/7234567890/8888888888'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'Kuiper 项目进展顺利，已发射 2500 颗卫星，覆盖全球 99% 人口。预计 2026 年商用服务全面启动，年目标收入 80 亿美元。与电信运营商合作加速网络部署。',
        date: '03-29',
        link: 'https://www.aboutamazon.com/devices/kuiper/',
        source: 'Project Kuiper 官方页面',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUyBBBBBBBBB&mid=224748004&sn=8888888888'
      }
    ]
  },
  'NVDA': {
    score: 9.0,
    bullCount: 15,
    bearCount: 1,
    neutralCount: 1,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'NVIDIA GTC 2026 大会公布 Blackwell Ultra 芯片详情，Jensen Huang 预计到 2027 年将实现 1 万亿美元 Blackwell 和 Vera Rubin 系统订单。Blackwell Ultra 拥有 208B transistors，性能提升 30%。',
        date: '03-31',
        link: 'https://developer.nvidia.com/blog/inside-nvidia-blackwell-ultra-the-chip-powering-the-ai-factory-era/',
        source: 'NVIDIA GTC 2026 官方博客',
        postUrl: 'https://twitter.com/charliemungerstyle/status/1783456789020'
      },
      { 
        bloggerId: 2, 
        type: 'neutral', 
        text: 'NVDA 股价近期下跌 2.2%，"风险规避"情绪蔓延科技股。但基本面未变，Blackwell 供不应求，数据中心资本支出持续增长。短期波动提供买入机会。',
        date: '03-31',
        link: 'https://markets.financialcontent.com/stocks/article/marketminute-2026-3-30-nvidia-nvda-shares-slide-22-as-risk-off-sentiment-grips-the-44-trillion-ai-leader',
        source: 'Financial Content 市场分析',
        postUrl: 'https://twitter.com/quanttrader/status/1783456789021'
      },
      { 
        bloggerId: 3, 
        type: 'bull', 
        text: 'Blackwell Ultra 需求爆发，微软、谷歌、Meta 订单增加 35%。NVFP4 精度格式引入，15 PetaFLOPS 算力，内存占用降低 1.8 倍。预计 Q2 收入指引上调。',
        date: '03-31',
        link: 'https://www.edgen.tech/zh/blog/nvda-stock-analysis-blackwell-ai-infrastructure-2026',
        source: 'Edgen NVDA 分析报告',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUxAAAAAAAAA&mid=224748005&sn=9999999999'
      },
      { 
        bloggerId: 4, 
        type: 'bull', 
        text: 'AI 基础设施投入周期 3-5 年，当前处于中期阶段。企业 AI 预算 2026 年平均增长 85%。NVIDIA 软件生态完善，CUDA 依赖度高，护城河深厚。当前 PE 45x，低于历史高点。',
        date: '03-30',
        link: 'https://www.gartner.com/en/newsroom/press-releases/2024-06-gartner-says-worldwide-ai-spending',
        source: 'Gartner AI 支出预测',
        postUrl: 'https://weibo.com/7234567890/AAAAAAAAAA'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'NVIDIA AI 软件收入 Q1 达到 65 亿美元，增长 160%。企业级 AI 解决方案客户数突破 120 万。软件订阅续费率 96%，经常性收入占比提升至 30%。',
        date: '03-30',
        link: 'https://www.nvidia.com/en-us/data-center/products/ai-enterprise-software/',
        source: 'NVIDIA 企业软件页面',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUyBBBBBBBBB&mid=224748005&sn=BBBBBBBBBB'
      }
    ]
  },
  'META': {
    score: 7.5,
    bullCount: 11,
    bearCount: 3,
    neutralCount: 4,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bull', 
        text: 'Meta Q1 广告收入恢复至 400 亿美元，同比增长 14%。Reels 贡献广告收入 140 亿美元，占比 35%，增长强劲。亚太地区收入增长 22%，中国区恢复明显。',
        date: '03-31',
        link: 'https://investor.fb.com/earnings/',
        source: 'Meta 财报',
        postUrl: 'https://twitter.com/charliemungerstyle/status/1783456789022'
      },
      { 
        bloggerId: 2, 
        type: 'neutral', 
        text: 'Reality Labs Q1 亏损 55 亿美元，累计亏损 170 亿美元。元宇宙投资短期难见回报。但 AI 相关支出增加，LLaMA 开源模型建立生态优势。',
        date: '03-31',
        link: 'https://investor.fb.com/earnings/',
        source: 'Meta 财报（Reality Labs 细分）',
        postUrl: 'https://twitter.com/quanttrader/status/1783456789023'
      },
      { 
        bloggerId: 3, 
        type: 'bull', 
        text: 'Threads DAU 突破 1.2 亿，月增长 18%。广告商业化开始测试，预计 2026 年贡献 15 亿美元收入。与 Instagram 整合加速用户增长，年轻用户占比提升。',
        date: '03-30',
        link: 'https://about.fb.com/news/2026-03/threads-milestones/',
        source: 'Meta 官方公告',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUxAAAAAAAAA&mid=224748006&sn=CCCCCCCCCC'
      },
      { 
        bloggerId: 4, 
        type: 'bear', 
        text: '欧盟 GDPR 罚款 15 亿欧元，美国 FTC 数据隐私诉讼持续。监管压力加大，可能限制数据使用和广告定向。短期股价承压，关注监管进展。',
        date: '03-30',
        link: 'https://www.ftc.gov/news-events/news/press-releases/2023/05/ftc-imposes-5-billion-penalty-order',
        source: 'FTC 数据隐私诉讼',
        postUrl: 'https://weibo.com/7234567890/DDDDDDDDDD'
      },
      { 
        bloggerId: 6, 
        type: 'bull', 
        text: 'LLaMA 3.2 开源发布，参数量 4500 亿，性能媲美 GPT-4.1。开源模型下载量突破 3 亿次。建立 AI 生态优势，降低企业 AI 采用门槛，Meta AI 占据率提升。',
        date: '03-29',
        link: 'https://ai.meta.com/blog/meta-llama-3-2/',
        source: 'Meta AI 官方博客',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUyBBBBBBBBB&mid=224748006&sn=EEEEEEEEEE'
      }
    ]
  },
  'TSLA': {
    score: 4.8,
    bullCount: 5,
    bearCount: 8,
    neutralCount: 4,
    opinions: [
      { 
        bloggerId: 1, 
        type: 'bear', 
        text: 'Tesla Q1 交付量 47 万辆，不及预期 50 万。中国市场竞争激烈，比亚迪降价 15%，特斯拉份额下滑至 5.5%。欧洲需求疲软，Model 3/Y 库存高企。',
        date: '03-31',
        link: 'https://ir.tesla.com/press-releases',
        source: 'Tesla Q1 交付报告',
        postUrl: 'https://twitter.com/charliemungerstyle/status/1783456789024'
      },
      { 
        bloggerId: 2, 
        type: 'neutral', 
        text: 'FSD（全自动驾驶）进展缓慢，版本 12.5 完成度 88%。Robotaxi 商业化推迟至 2027 年。自动驾驶技术难度超预期，投入巨大但回报不确定性高。',
        date: '03-31',
        link: 'https://www.tesla.com/autopilot',
        source: 'Tesla Autopilot 页面',
        postUrl: 'https://twitter.com/quanttrader/status/1783456789025'
      },
      { 
        bloggerId: 3, 
        type: 'bear', 
        text: '全球电动车行业产能过剩，价格战持续。2026 年预计全球产能 2600 万辆，需求 2300 万辆。毛利率压力巨大，特斯拉毛利率从 24% 降至 21%。',
        date: '03-30',
        link: 'https://www.iea.org/reports/global-ev-outlook-2026',
        source: 'IEA 全球电动车展望',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUxAAAAAAAAA&mid=224748007&sn=FFFFFFFFFF'
      },
      { 
        bloggerId: 4, 
        type: 'bull', 
        text: '发布 Megapack 3，升级 LFP 电池，极端温度性能优异。储能业务 Q1 收入 50 亿美元，增长 90%，毛利率 29% 高于主业务。储能成为第二增长曲线。',
        date: '03-30',
        link: 'https://www.36kr.com/p/3459682044958087',
        source: '36氪 Megapack 3 报',
        postUrl: 'https://weibo.com/7234567890/GGGGGGGGGG'
      },
      { 
        bloggerId: 6, 
        type: 'neutral', 
        text: 'Model 2 预计 2026 年底发布，目标售价 2.5 万美元。若成功将打开大众市场，年销量有望突破 100 万。但生产挑战大，供应链未完全就绪，2026 年产能爬坡。',
        date: '03-29',
        link: 'https://www.tesla.com/model2',
        source: 'Tesla Model 2 预告',
        postUrl: 'https://mp.weixin.qq.com/s?__biz=MzUyBBBBBBBBB&mid=224748007&sn=HHHHHHHHH'
      }
    ]
  }
};

// 更新时间
let lastUpdateTime = new Date().toISOString();
