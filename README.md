# 黄朝阳 — 个人网站

> 用数据理解世界，用AI重构产品，用规范桥接人机意图

## 关于这个网站

这是我的个人网站，一个综合在线名片。你可以在这里了解我是谁、做了什么、在想什么。

**在线访问**：[hzyghub.github.io/Personal-Website](https://hzyghub.github.io/Personal-Website)

## 网站内容

| 板块 | 说明 |
|------|------|
| 关于我 | 我是谁，什么驱动我，我的独特视角 |
| 项目展示 | AFC数据智能分析平台、阿里天池数据竞赛、IntentBridge 达意方法论 |
| IntentBridge | 人机协同思想——意图-执行差距、活标准双环审查 |
| 履历 | 从DBA到数据智能的成长路径 |

## 项目亮点

### AFC数据智能分析平台

基于 DuckDB + FastAPI + React 的地铁客流数据分析平台。四种格式各异的支付渠道统一入仓，二维码OD配对成功率>80%，9家LLM厂商通过工厂模式统一适配。Claude Code 250h+ / 20亿 Tokens 独立开发。

### 阿里天池数据竞赛

- **二手车价格预测**：Top 1%（205 / 33,814），MAE从650降至486（-25.2%）。六层特征工程管线 + 4方法融合选择 + 5模型scipy优化集成
- **蚂蚁金服资金预测**：核心创新双周期因子乘性分解模型，发现"10号效应"（每月10日申购因子1.248）

### IntentBridge 达意

人机协同的思想/哲学——解决AI协作的根本问题：意图-执行差距。六维质量框架 + 活标准双环审查，8轮活标准审查发现29个标准盲点全部修复，外部AI评分10.9/12。在AFC项目上验证：冷启动定向成功率40%→95%，token消耗-71%。

## 技术栈

- **前端**：纯 HTML5 + CSS3 + Vanilla JS
- **部署**：GitHub Pages
- **设计**：杂志风格多页面，暖白+青绿+珊瑚配色
- **特性**：中英双语、响应式、滚动动画、零外部依赖

## 本地运行

```bash
# 克隆仓库
git clone https://github.com/hzyghub/Personal-Website.git

# 直接打开
open index.html
```

纯静态站，无需构建工具或本地服务器。

## 文件结构

```
├── index.html                      # 主页（Hero + 项目列表 + 设计过程 + 旅程 + 联系）
├── intentbridge.html               # IntentBridge 方法论旗舰页（活文档）
├── projects/
│   ├── afc.html                    # AFC 数据智能平台详情页
│   ├── tianchi-prediction.html     # 天池二手车预测详情页
│   └── fund-flow.html              # 蚂蚁金服资金预测详情页
├── css/
│   ├── style.css                   # 设计系统（变量、排版、组件）
│   ├── layout.css                  # 布局（导航、Hero、项目列表、时间线、响应式）
│   └── animations.css              # 动画（滚动入场、视图过渡、减少动效）
├── js/
│   └── main.js                     # 语言切换（持久化）、导航、汉堡菜单、滚动动画
├── assets/images/                  # 头像图片
├── docs/
│   └── superpowers/specs/          # 设计规格文档
└── CLAUDE.md                       # AI协作规范
```

## 联系我

邮箱：hzymicro@outlook.com

无论是岗位机会、项目合作还是方法论交流，都欢迎联系。
