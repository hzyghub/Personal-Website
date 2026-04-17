# CLAUDE.md

> 版本：v3.0 | 最后更新：2026-04-17 | 审查触发条件：技术栈变更 / 新阶段启动 / 内容信息变更

## 项目概述

黄朝阳（Huang Chaoyang）的个人简历/作品集网站。综合在线名片，面向HR、技术面试官、行业同行。中英双语，杂志风格多页面设计。

## 技术栈

- **前端**：纯 HTML5 + CSS3 + Vanilla JS（零依赖、零CDN、零构建工具）
- **部署**：GitHub Pages（静态托管）
- **字体**：系统字体栈（不加载外部字体）
- ~~不使用 React / Vue / 任何框架~~（纯静态站）
- ~~不使用 Bootstrap / Tailwind CDN~~（手写CSS）

## 架构概述

```
多页面应用（杂志风格）
├── index.html          # 主页（Hero + 项目列表 + 设计过程 + 旅程 + 联系）
├── intentbridge.html   # IntentBridge 方法论旗舰页（活文档）
├── projects/
│   ├── afc.html        # AFC 数据智能平台
│   ├── tianchi-prediction.html  # 天池二手车预测
│   └── fund-flow.html  # 余额宝资金流预测
├── css/
│   ├── style.css       # 设计系统（变量、排版、组件）
│   ├── layout.css      # 布局（导航、Hero、项目列表、时间线、响应式）
│   └── animations.css  # 动画（滚动入场、视图过渡、减少动效）
├── js/
│   └── main.js         # 语言切换（持久化）、导航、汉堡菜单、滚动动画
└── assets/images/      # 头像
```

### 文件结构

```
/
├── index.html                  # 主页
├── intentbridge.html           # IntentBridge 方法论旗舰页
├── projects/
│   ├── afc.html                # AFC 项目详情页
│   ├── tianchi-prediction.html # 天池二手车预测详情页
│   └── fund-flow.html          # 余额宝资金流预测详情页
├── css/
│   ├── style.css               # 设计系统（变量、排版、组件）
│   ├── layout.css              # 布局（导航、Hero、项目列表、时间线、响应式）
│   └── animations.css          # 动画（滚动入场、视图过渡、减少动效）
├── js/
│   └── main.js                 # 语言切换（持久化）、导航、汉堡菜单、滚动动画
├── assets/
│   └── images/                 # 头像照片
└── docs/
    └── superpowers/specs/      # 设计规格文档
```

## 当前状态

- 阶段：v3.0 全面重设计完成
- 设计文档：`docs/superpowers/specs/2026-04-17-site-v3-full-redesign.md`

## 关键约束

### 设计约束（不可妥协）
- 配色：暖白 `#f7f5f0`，青绿 `#2a9d8f`，珊瑚 `#e76f51`
- 所有动态效果必须用纯 CSS 或轻量 JS 实现，禁止引入动画库
- 首屏加载 < 2s，总大小 < 500KB（不含图片）
- 零外部依赖——不加载任何 CDN 资源

### 内容约束
- 中英双语，默认中文，右上角切换
- 所有中文内容必须有对应英文翻译
- 联系方式：邮箱 hzymicro@outlook.com（已确认）
- 头像：使用 `assets/images/avatar.jpg`（圆形裁剪，青绿浅色边框）

### 无障碍
- 色彩对比度满足 WCAG AA
- 键盘可导航
- 合理的 alt 文本和 aria 标签

## 范围边界（v3.0）

**范围内**：
- 多页面杂志风格布局（主页、IntentBridge旗舰页、项目详情页）
- 中英双语切换（持久化到 localStorage）
- 响应式（桌面/平板/手机）
- 滚动入场动画 + 视图过渡
- SEO meta标签 + Open Graph

**范围外**：
- 博客/文章系统
- 暗色/亮色主题切换
- 简历PDF在线预览
- Google Analytics
- 自定义域名配置

**遇到范围外需求**：告知用户属于范围外，不实现。用户坚持则标注后可实现。

**遇到灰色地带需求**：暂停，向用户确认是否属于当前范围。

## 术语一致性

| 术语 | 标准写法 | 说明 |
|------|---------|------|
| 活标准审查 | Living Standard Review | 达意项目的核心审查方法 |

> 注意：IntentBridge 不是 Spec Engineering，是人机协同的思想/哲学。

## 按任务类型的文件触发规则

| 任务类型 | 必读文件 |
|---------|---------|
| 实现任何板块 | `docs/superpowers/specs/2026-04-17-site-v3-full-redesign.md` |
| 修改配色/样式 | `css/style.css`（设计系统变量）+ `docs/superpowers/specs/2026-04-17-site-v3-full-redesign.md` |
| 添加/修改项目内容 | 对应项目详情页 + `docs/superpowers/specs/2026-04-17-site-v3-full-redesign.md` |
| 修改简历信息 | `docs/superpowers/specs/2026-04-17-site-v3-full-redesign.md` |

## AI 协作规则

### 规则优先级（冲突时按此顺序）
1. **零外部依赖**：不引入任何CDN或npm包
2. **Spec一致性**：内容以 `docs/superpowers/specs/2026-04-17-site-v3-full-redesign.md` 为准，不自行编造
3. **性能优先**：动画和效果不能影响首屏加载速度
4. **最小改动**：只改当前任务涉及的文件

### 启动任务时
1. 读取 `docs/superpowers/specs/2026-04-17-site-v3-full-redesign.md` 对应板块
2. 确认当前任务的范围
3. 不做范围外扩展

### 实现要求
- CSS 按职责分离：`style.css`（设计系统）、`layout.css`（布局）、`animations.css`（动画）
- JS写在 `js/main.js` 中，按功能模块组织
- HTML结构语义化，使用 `<section>` + `id` 做锚点
- 响应式用 `@media` 断点：1200px / 768px
