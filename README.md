# 金融仪表板 | Finance Dashboard

统一金融可视化平台入口。

## 访问地址

主页：https://starchaser490-beep.github.io/MyHomePage/

## 模块

- 📈 [Meta 估值模型](meta/index.html) - Meta Platforms 估值分析
- 🌍 [全球均衡投资](global/index.html) - 全球资产配置策略
- 💰 [QDII 基金监控](qdii/index.html) - QDII 实时溢价率监控

## 架构

```
展示层（本仓库 - 公开）
├── index.html          # 统一入口
├── meta/               # Meta 估值可视化
├── global/             # 全球均衡投资可视化
└── qdii/               # QDII 展示页面
    └── qdii_data.json  # 数据文件（自动更新）

核心逻辑层（私有仓库）
├── meta-valuation       # Meta 估值核心计算
├── global_balanced_invest # 投资策略核心代码
└── qdii_stock           # 数据抓取、更新脚本
```

## 数据更新

QDII 数据通过 GitHub Actions 自动从私有仓库 `qdii_stock` 同步到本仓库。

---

**免责声明**：数据仅供参考，不构成投资建议。投资有风险，入市需谨慎。
