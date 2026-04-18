[English](#english) | 中文

# 黄朝阳 — 个人网站

> 人和AI之间，怎么才能真正协作起来？

## 关于这个网站

这是我的个人数字资产和对外展示窗口。长期迭代——展示实践探索、项目经验和个人叙事，而非传统简历。你可以在这里了解我是谁、做了什么、在想什么。

**在线访问**：[hzyghub.github.io/Personal-Website](https://hzyghub.github.io/Personal-Website)

## 网站内容

| 板块 | 说明 |
|------|------|
| Hero | 核心问题：人和AI之间，怎么协作？8年地铁一线+3年AI深度协作的洞察 |
| 项目展示 | AFC数据智能平台、阿里天池数据竞赛 |
| IntentBridge 达意 | 人和AI之间怎么真正协作起来——两层规格架构、活标准双环审查、知识规格化 |
| 旅程 | 从地铁运营一线到AI深度协作实践者的成长路径 |

## 项目亮点

### AFC 数据智能分析平台

地铁有成熟的AFC/ACC系统，但数据只是沉睡在数据库里。我在这些基础设施之上搭建了智能分析层——多源数据融合，9家LLM接入，目标是能自主跨表推理的Level 4智能体。一个人+AI，14天完成MVP。

### 阿里天池数据竞赛

- **二手车价格预测**：Top 1%（205/33,814），MAE从650降至486（-25.2%）。系统化特征工程+多模型集成，靠数据源融合和业务规则编码突围
- **蚂蚁金服资金预测**：51维特征工程，多模型集成，得分121.87。核心发现：收益确认延迟编码

### IntentBridge 达意

从几年和AI协作的实践中提炼出的方法——不是提示词的问题，人和AI之间缺的是一套系统化的协作思维。两层规格架构（协作规格告诉AI怎么工作，知识规格告诉AI判断所需的领域依据），9轮活标准审查，4份指南已完成。

## 技术栈

- **前端**：纯 HTML5 + CSS3 + Vanilla JS
- **部署**：GitHub Pages
- **设计**：杂志风格多页面，暖白+青绿+珊瑚配色
- **特性**：中英双语、响应式、滚动动画、回到顶部、零外部依赖

## 本地运行

```bash
git clone https://github.com/hzyghub/Personal-Website.git
```

双击 `index.html` 即可在浏览器打开，无需构建工具或本地服务器。

## 文件结构

```
├── index.html                      # 主页（Hero + 项目列表 + 旅程 + 联系）
├── intentbridge.html               # IntentBridge 达意旗舰页（活文档）
├── projects/
│   ├── afc.html                    # AFC 数据智能平台详情页
│   ├── tianchi-prediction.html     # 天池二手车预测详情页
│   └── fund-flow.html              # 蚂蚁金服资金预测详情页
├── css/
│   ├── style.css                   # 设计系统（变量、排版、组件）
│   ├── layout.css                  # 布局（导航、Hero、项目列表、时间线、响应式）
│   └── animations.css              # 动画（滚动入场、视图过渡、减少动效）
├── js/
│   └── main.js                     # 语言切换、导航、汉堡菜单、滚动动画、回到顶部
├── assets/images/                  # 头像图片
├── docs/
│   ├── multi-agent-review-framework.md  # 多角色AI审查框架
│   └── superpowers/
│       ├── specs/                  # 设计规格文档
│       └── reviews/                # 六角色审查报告
└── CLAUDE.md                       # AI协作规范
```

## 联系我

邮箱：huangzhaoyang1994@gmail.com

AI协作经验交流、项目合作、创业想法——都欢迎。

---

<a id="english"></a>

中文 | [English](#english)

# Zhaoyang Huang — Personal Website

> How do humans and AI truly collaborate?

## About

My personal digital showcase. Long-term iteration — presenting practical explorations, project experience, and personal narrative, not a traditional resume. Here you can learn who I am, what I've done, and what I'm thinking about.

**Live site**: [hzyghub.github.io/Personal-Website](https://hzyghub.github.io/Personal-Website)

## Site Sections

| Section | Description |
|---------|-------------|
| Hero | Core question: how to collaborate with AI? Insights from 8 years in metro operations + 3 years of deep AI collaboration |
| Projects | AFC Data Intelligence Platform, Alibaba Tianchi Competitions |
| IntentBridge | How humans and AI can truly collaborate — two-layer spec architecture, living standard dual-loop review, knowledge specification |
| Journey | Growth path from metro operations frontline to AI collaboration practitioner |

## Highlights

### AFC Data Intelligence Platform

Metro has mature AFC/ACC systems, but data just sits dormant in databases. I built an intelligent analysis layer on top of this infrastructure — multi-source data fusion, 9 LLM providers integrated, targeting a Level 4 agent with autonomous cross-table reasoning. Solo + AI, MVP in 14 days.

### Alibaba Tianchi Competitions

- **Used Car Price Prediction**: Top 1% (205/33,814), MAE optimized from 650 to 486 (-25.2%). Systematic feature engineering + multi-model ensemble
- **Ant Financial Fund Prediction**: 51-dimension feature engineering, multi-model ensemble, score 121.87. Key finding: yield confirmation delay encoding

### IntentBridge

A method distilled from years of AI collaboration practice — it's not a prompt problem, what's missing between humans and AI is a systematic collaboration mindset. Two-layer spec architecture (collaboration specs tell AI how to work, knowledge specs provide the domain basis for AI's judgments), 9 rounds of living standard review, 4 guides completed.

## Tech Stack

- **Frontend**: Pure HTML5 + CSS3 + Vanilla JS
- **Hosting**: GitHub Pages
- **Design**: Magazine-style multi-page, warm white + teal + coral palette
- **Features**: Bilingual (zh/en), responsive, scroll animations, back-to-top, zero dependencies

## Run Locally

```bash
git clone https://github.com/hzyghub/Personal-Website.git
```

Double-click `index.html` to open in browser. No build tools or local server needed.

## Contact

Email: huangzhaoyang1994@gmail.com

AI collaboration experience sharing, project collaboration, startup ideas — all welcome.
