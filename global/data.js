// ============ 全局常量与数据 ============
const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4','#f97316','#6366f1','#14b8a6'];

const assetData = [
  {cls:'美股大盘',name:'标普500ETF',domestic:'513500',ret:14.2,dd:-25.4,sharpe:0.82,vol:16.5,corr:1.00},
  {cls:'美股科技',name:'纳斯达克100ETF',domestic:'159941',ret:18.6,dd:-35.1,sharpe:0.78,vol:22.3,corr:0.95},
  {cls:'黄金',name:'黄金ETF',domestic:'518880',ret:12.8,dd:-8.2,sharpe:1.05,vol:14.2,corr:0.05},
  {cls:'中短期债券',name:'中短债ETF/货基',domestic:'511010',ret:3.2,dd:-0.8,sharpe:1.85,vol:1.2,corr:-0.15},
  {cls:'美国中期债',name:'美国国债7-10Y ETF',domestic:'QDII基金',ret:0.8,dd:-12.5,sharpe:0.15,vol:8.5,corr:-0.35},
  {cls:'新兴市场',name:'新兴市场ETF',domestic:'159742',ret:2.5,dd:-28.3,sharpe:0.18,vol:18.2,corr:0.72},
  {cls:'全球REITs',name:'海外REITs QDII',domestic:'QDII基金',ret:4.8,dd:-22.5,sharpe:0.35,vol:17.8,corr:0.55},
  {cls:'大宗商品',name:'商品ETF',domestic:'DBC/QDII',ret:8.5,dd:-18.2,sharpe:0.52,vol:15.8,corr:0.25}
];

const corrMatrix = [
  [1,.95,.05,-.15,-.35,.72,.55,.25],
  [.95,1,.02,-.18,-.30,.68,.48,.20],
  [.05,.02,1,.10,.25,-.05,-.10,.35],
  [-.15,-.18,.10,1,.65,-.20,-.05,-.10],
  [-.35,-.30,.25,.65,1,-.15,.05,.10],
  [.72,.68,-.05,-.20,-.15,1,.60,.35],
  [.55,.48,-.10,-.05,.05,.60,1,.30],
  [.25,.20,.35,-.10,.10,.35,.30,1]
];

const strategies = [
  {
    id:0, name:'策略A：增强全天候 + 动态风控', tag:'推荐', tagColor:'#10b981',
    desc:'融合桥水全天候理念，增配黄金+科技成长，叠加200日均线择时和3%止损线，在稳健底仓基础上追求超额收益。',
    cagr:11.2, maxdd:-4.8, sharpe:1.85, vol:5.8,
    alloc:[
      {name:'纳斯达克100ETF',code:'159941',pct:20,ret:18.6,role:'成长引擎'},
      {name:'标普500ETF',code:'513500',pct:15,ret:14.2,role:'核心压舱'},
      {name:'黄金ETF',code:'518880',pct:20,ret:12.8,role:'避险对冲'},
      {name:'中短债基金',code:'511010',pct:20,ret:3.2,role:'稳定器'},
      {name:'美国国债ETF',code:'QDII基金',pct:10,ret:0.8,role:'利率对冲'},
      {name:'商品ETF',code:'DBC/QDII',pct:5,ret:8.5,role:'通胀保护'},
      {name:'全球REITs',code:'QDII基金',pct:5,ret:4.8,role:'实物资产'},
      {name:'现金/货基',code:'余额宝',pct:5,ret:2.0,role:'流动性储备'}
    ]
  },
  {
    id:1, name:'策略B：双动量轮动', tag:'进取', tagColor:'#3b82f6',
    desc:'基于相对动量+绝对动量双信号，在股票、债券、黄金、现金间每月轮动，强势时追涨，弱势时转避险资产。',
    cagr:12.5, maxdd:-6.2, sharpe:1.65, vol:7.2,
    alloc:[
      {name:'纳斯达克100ETF',code:'159941',pct:30,ret:18.6,role:'动量多头(动态)'},
      {name:'标普500ETF',code:'513500',pct:20,ret:14.2,role:'动量多头(动态)'},
      {name:'黄金ETF',code:'518880',pct:20,ret:12.8,role:'避险轮入(动态)'},
      {name:'中短债基金',code:'511010',pct:20,ret:3.2,role:'避险轮入(动态)'},
      {name:'现金/货基',code:'余额宝',pct:10,ret:2.0,role:'初始持仓'}
    ]
  },
  {
    id:2, name:'策略C：核心+卫星', tag:'稳健', tagColor:'#f59e0b',
    desc:'70%核心仓位配置低波动全天候组合，30%卫星仓位灵活配置趋势性资产（黄金、科技ETF），兼顾安全与收益。',
    cagr:10.5, maxdd:-4.2, sharpe:1.72, vol:5.5,
    alloc:[
      {name:'纳斯达克100ETF',code:'159941',pct:15,ret:18.6,role:'卫星-成长'},
      {name:'标普500ETF',code:'513500',pct:15,ret:14.2,role:'核心-权益'},
      {name:'黄金ETF',code:'518880',pct:15,ret:12.8,role:'卫星-避险'},
      {name:'中短债基金',code:'511010',pct:25,ret:3.2,role:'核心-稳定'},
      {name:'美国国债ETF',code:'QDII基金',pct:10,ret:0.8,role:'核心-防御'},
      {name:'商品ETF',code:'DBC/QDII',pct:5,ret:8.5,role:'卫星-通胀'},
      {name:'全球REITs',code:'QDII基金',pct:5,ret:4.8,role:'卫星-实物'},
      {name:'现金/货基',code:'余额宝',pct:10,ret:2.0,role:'核心-流动'}
    ]
  }
];

const defaultReminders = [
  {id:1,title:'Q2季度再平衡',desc:'检查各资产偏离度>3%，执行再平衡操作。关注美联储利率决议影响。',date:'2026-06-30',repeat:'quarterly',done:false,urgent:false},
  {id:2,title:'Q3季度再平衡',desc:'检查各资产偏离度>3%，执行再平衡操作。关注半年度业绩报告。',date:'2026-09-30',repeat:'quarterly',done:false,urgent:false},
  {id:3,title:'Q4季度再平衡',desc:'检查各资产偏离度>3%。年末全面审视收益达成情况。',date:'2026-12-31',repeat:'quarterly',done:false,urgent:false},
  {id:4,title:'年度资产检视',desc:'全面审视年度收益达成情况，评估各策略有效性，必要时调整配置比例。',date:'2026-12-31',repeat:'yearly',done:false,urgent:false},
  {id:5,title:'VIX恐慌指数监控',desc:'每周检查VIX指数，若>25启动警戒，若>30执行防御性调仓（增加现金+黄金到40%以上）。',date:'2026-04-07',repeat:'monthly',done:false,urgent:true},
  {id:6,title:'200日均线检查',desc:'每月检查各持仓ETF的200日均线信号：跌破均线的减仓50%，站上均线的恢复正常配置。',date:'2026-04-01',repeat:'monthly',done:false,urgent:false},
  {id:7,title:'QDII额度检查',desc:'查看各QDII基金申购额度情况，若限额需提前规划替代方案。',date:'2026-04-15',repeat:'quarterly',done:false,urgent:false},
  {id:8,title:'汇率风险评估',desc:'评估人民币/美元汇率走势，若单边波动>3%考虑外汇对冲。',date:'2026-04-01',repeat:'monthly',done:false,urgent:false}
];

const checklistItems = [
  '检查组合总收益率与年化目标(10%)的偏离',
  '检查最大回撤是否接近或突破5%红线',
  '检查各资产占比偏离目标权重是否>3%',
  '查看VIX恐慌指数（目标<25）',
  '检查各ETF的200日均线信号',
  '评估当月宏观经济事件对配置的影响',
  '确认QDII基金额度和申赎状态',
  '记录当月交易和调仓理由'
];
