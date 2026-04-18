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
# 克隆仓库
git clone https://github.com/hzyghub/Personal-Website.git

# 直接打开
start index.html
```

纯静态站，无需构建工具或本地服务器。

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
│   └── main.js                     # 语言切换（持久化）、导航、汉堡菜单、滚动动画、回到顶部
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

无论是AI协作经验交流、项目合作还是创业想法，都欢迎联系。
