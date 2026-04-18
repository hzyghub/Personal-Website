# 个人网站 v3.0 全面重设计 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于已批准的设计规范，从零重建个人网站——多页架构、活文档美学、设计大奖水准。

**Architecture:** 纯 HTML/CSS/JS 静态站，零依赖。CSS 拆分为 3 文件（style + layout + animations），JS 单文件。多页：主站 index.html + 方法论页 intentbridge.html + 3个项目页。

**Tech Stack:** HTML5 + CSS3 (custom properties, grid, flex, @keyframes, View Transitions) + Vanilla JS (IntersectionObserver, scroll spy, language toggle)

**Design Spec:** `docs/superpowers/specs/2026-04-17-site-v3-full-redesign.md`

---

## Phase 1: 基础设施

### Task 1: CSS 设计系统 (style.css)

**Files:**
- Create: `css/style.css`（替换现有文件）
- Delete: 旧 style.css 内容全部清除重写

- [ ] **Step 1: 写入 CSS 自定义属性和排版系统**

```css
:root {
  /* Colors */
  --bg: #f7f5f0;
  --bg-card: #ffffff;
  --accent: #2a9d8f;
  --accent-light: #e8f5f3;
  --accent-dark: #1f7a6e;
  --coral: #e76f51;
  --coral-light: #fef3f0;
  --text: #2d3436;
  --text-muted: #636e72;
  --text-dim: #b2bec3;
  --border: #e8e4de;
  --border-warm: #d4cec4;
  --bg-alt: #f0efeb;

  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", sans-serif;
  --font-serif: Georgia, serif;

  /* Spacing */
  --sp-xs: 8px;
  --sp-sm: 16px;
  --sp-md: 32px;
  --sp-lg: 64px;
  --sp-xl: 96px;
  --sp-2xl: 128px;

  /* Layout */
  --max-width: 1120px;
  --nav-height: 60px;
  --radius: 8px;
  --radius-sm: 4px;

  /* Transition */
  --ease-out: cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* Reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; scroll-padding-top: var(--nav-height); }
body {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; border: none; background: none; }

/* Typography */
.display {
  font-size: 2.2rem;
  font-weight: 200;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
h1, .h1 {
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
}
h2, .h2 {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.3;
}
.caption { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }
.label {
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Language toggle */
.lang-zh .en, .lang-en .zh { display: none !important; }

/* Container */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

/* Section label (§ markers) */
.section-label {
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--sp-xs);
}

/* Tags */
.tag {
  display: inline-block;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  background: var(--bg-alt);
  color: var(--text-muted);
}
.tag--accent { background: var(--accent-light); color: var(--accent); }
.tag--coral { background: var(--coral-light); color: var(--coral); }
.tag--fill { background: var(--accent); color: #fff; border-radius: 3px; }
.tag--outline { border: 1px solid var(--border); background: transparent; color: var(--text-muted); }

/* Buttons */
.btn {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  border-radius: var(--radius-sm);
  transition: all 250ms var(--ease-out);
}
.btn--primary { background: var(--accent); color: #fff; }
.btn--primary:hover { background: var(--accent-dark); }
.btn--outline { border: 1px solid var(--border); color: var(--text-muted); }
.btn--outline:hover { border-color: var(--accent); color: var(--accent); }

/* Divider */
.divider {
  width: 40px;
  height: 1px;
  background: var(--border-warm);
  margin: var(--sp-md) auto;
}

/* Metadata bar */
.metadata {
  display: flex;
  gap: 1.2rem;
  padding: var(--sp-sm) 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.metadata__item {}
.metadata__label {
  font-size: 0.45rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.metadata__value { font-size: 0.7rem; color: var(--text); margin-top: 2px; }

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: var(--sp-md);
}
.breadcrumb__item { font-size: 0.6rem; color: var(--text-dim); }
.breadcrumb__sep { font-size: 0.5rem; color: var(--border); }
.breadcrumb__current { font-size: 0.6rem; color: var(--accent); }

/* Footer */
.site-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--sp-sm) 0;
  border-top: 1px solid var(--border);
  margin-top: var(--sp-xl);
}
.site-footer__copy { font-size: 0.5rem; color: var(--text-dim); }
.site-footer__meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.site-footer__version {
  font-size: 0.45rem;
  padding: 0.1rem 0.3rem;
  background: var(--bg-alt);
  color: var(--text-dim);
  border-radius: 2px;
}
.site-footer__date { font-size: 0.45rem; color: var(--text-dim); }

/* Focus & accessibility */
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
::selection { background: var(--accent-light); color: var(--accent); }

/* Import layout and animations */
@import url("layout.css");
@import url("animations.css");
```

- [ ] **Step 2: 验证** — 在浏览器中打开一个空白 HTML 引入此 CSS，检查变量是否生效（用 DevTools 查看 computed styles）

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: v3.0 CSS design system — variables, typography, components"
```

---

### Task 2: 布局系统 (layout.css)

**Files:**
- Create: `css/layout.css`

- [ ] **Step 1: 写入布局 CSS**

```css
/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background: var(--bg);
  z-index: 100;
  border-bottom: 1px solid transparent;
  transition: border-color 300ms ease;
}
.navbar.scrolled { border-bottom-color: var(--border); }
.navbar__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar__logo {
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.navbar__links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}
.navbar__link {
  font-size: 0.7rem;
  color: var(--text-muted);
  position: relative;
  transition: color 200ms ease;
}
.navbar__link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 300ms ease;
}
.navbar__link:hover { color: var(--accent); }
.navbar__link:hover::after { width: 100%; }
.navbar__link.active { color: var(--accent); }
.navbar__lang {
  font-size: 0.65rem;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 200ms ease;
}
.navbar__lang:hover { background: var(--accent); color: #fff; }
.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 4px;
}
.navbar__hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text);
  transition: all 300ms ease;
}
.navbar__hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.navbar__hamburger.open span:nth-child(2) { opacity: 0; }
.navbar__hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* Hero */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: calc(var(--nav-height) + var(--sp-2xl)) var(--sp-md) var(--sp-2xl);
}
.hero__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid rgba(42, 157, 143, 0.3);
  margin: 0 auto var(--sp-lg);
  object-fit: cover;
}
.hero__name {
  font-size: 2.2rem;
  font-weight: 200;
  letter-spacing: -0.02em;
  margin-bottom: var(--sp-lg);
  line-height: 1.2;
}
.hero__text {
  max-width: 500px;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.9;
}
.hero__highlight { color: var(--coral); font-weight: 600; }
.hero__subtitle {
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-top: var(--sp-md);
}
.hero__cta {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  margin-top: var(--sp-lg);
}

/* Project list */
.project-list { max-width: 600px; }
.project-item {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.2rem;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 250ms var(--ease-out), background 250ms var(--ease-out);
  cursor: pointer;
}
.project-item:hover {
  border-color: var(--accent);
  background: rgba(42, 157, 143, 0.02);
}
.project-item--core {
  border-color: var(--accent);
  background: rgba(42, 157, 143, 0.02);
}
.project-item__header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
}
.project-item__num {
  font-size: 0.5rem;
  letter-spacing: 0.15em;
  color: var(--accent);
}
.project-item__title { font-size: 0.9rem; font-weight: 600; }
.project-item__desc { font-size: 0.85rem; color: var(--text); line-height: 1.6; margin-bottom: 0.4rem; }
.project-item__meta { font-size: 0.6rem; color: var(--text-dim); }
.project-item__link {
  font-size: 0.7rem;
  color: var(--accent);
  white-space: nowrap;
  margin-left: 1rem;
  transition: transform 250ms var(--ease-out);
}
.project-item:hover .project-item__link { transform: translateX(4px); }

/* Timeline */
.timeline {
  border-left: 1px solid var(--border-warm);
  padding-left: 1.2rem;
}
.timeline__item {
  margin-bottom: var(--sp-md);
  position: relative;
}
.timeline__item:last-child { margin-bottom: 0; }
.timeline__dot {
  position: absolute;
  left: -1.2rem;
  top: 0.2rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-warm);
}
.timeline__dot--accent { background: var(--accent); }
.timeline__dot--coral { background: var(--coral); }
.timeline__dot--active { background: var(--accent); box-shadow: 0 0 0 3px rgba(42, 157, 143, 0.2); }
.timeline__date { font-size: 0.5rem; color: var(--text-dim); letter-spacing: 0.1em; }
.timeline__date--coral { color: var(--coral); font-weight: 600; }
.timeline__date--accent { color: var(--accent); font-weight: 600; }
.timeline__text { font-size: 0.85rem; color: var(--text); margin-top: 2px; }

/* Contact */
.contact { text-align: center; padding: var(--sp-xl) 0; }
.contact__title { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
.contact__desc { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.6; }
.contact__emails { display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap; }
.contact__email { font-size: 0.85rem; color: var(--accent); }

/* Blockquote */
.quote-block {
  padding: 1.2rem 1.5rem;
  background: var(--bg-alt);
  border-left: 3px solid var(--coral);
  border-radius: 0 var(--radius) var(--radius) 0;
  margin: var(--sp-md) 0;
}
.quote-block__text { font-size: 0.95rem; line-height: 1.8; }
.quote-block__note { font-size: 0.7rem; color: var(--coral); margin-top: 0.5rem; }

/* Framework items (IntentBridge page) */
.framework-list { display: flex; flex-direction: column; gap: 0.8rem; max-width: 600px; }
.framework-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.framework-item__num {
  font-size: 0.55rem;
  color: var(--accent);
  letter-spacing: 0.1em;
  padding-top: 0.15rem;
  white-space: nowrap;
}
.framework-item__title { font-size: 0.9rem; font-weight: 600; margin-bottom: 0.3rem; }
.framework-item__desc { font-size: 0.8rem; color: var(--text-muted); line-height: 1.6; }

/* Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  margin-bottom: var(--sp-md);
}
.stat-card {
  text-align: center;
  padding: 1.2rem 0.8rem;
  background: var(--bg-alt);
  border-radius: var(--radius);
}
.stat-card__value { font-size: 1.5rem; font-weight: 200; color: var(--accent); }
.stat-card__value--coral { color: var(--coral); }
.stat-card__label { font-size: 0.65rem; color: var(--text-muted); margin-top: 0.3rem; }

/* Section spacing */
.section {
  padding: var(--sp-xl) 0;
}
.section + .section {
  border-top: 1px solid var(--border);
}

/* Responsive: Tablet */
@media (max-width: 1199px) {
  .stats-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Responsive: Mobile */
@media (max-width: 767px) {
  :root { --sp-2xl: 80px; --sp-xl: 64px; --sp-lg: 48px; }
  .container { padding: 0 1.2rem; }
  .navbar__links { display: none; }
  .navbar__hamburger { display: flex; }
  .navbar__links.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: var(--bg);
    padding: var(--sp-md);
    border-bottom: 1px solid var(--border);
    gap: var(--sp-sm);
  }
  .hero__name { font-size: 1.8rem; }
  .hero__text { font-size: 0.95rem; }
  .stats-grid { grid-template-columns: 1fr; gap: 0.5rem; }
  .contact__emails { flex-direction: column; align-items: center; }
  .project-item { flex-direction: column; align-items: flex-start; }
  .project-item__link { margin-left: 0; margin-top: 0.5rem; }
  .metadata { flex-wrap: wrap; gap: 0.8rem; }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/layout.css
git commit -m "feat: v3.0 layout system — navbar, hero, projects, timeline, responsive"
```

---

### Task 3: 动画系统 (animations.css)

**Files:**
- Create: `css/animations.css`

- [ ] **Step 1: 写入动画 CSS**

```css
/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Section marker line animation */
.section-marker {
  position: relative;
  padding-left: 1rem;
}
.section-marker::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 0;
  background: var(--accent);
  transition: height 400ms var(--ease-out) 200ms;
}
.reveal.visible .section-marker::before { height: 100%; }
.section-marker--coral::before { background: var(--coral); }
.section-marker--muted::before { background: var(--border-warm); }

/* Hero entry sequence */
.hero__avatar { animation: fadeIn 600ms var(--ease-out) 0ms both; }
.hero__name { animation: fadeIn 600ms var(--ease-out) 300ms both; }
.hero__text { animation: fadeSlideUp 600ms var(--ease-out) 700ms both; }
.hero__subtitle, .hero .divider { animation: fadeIn 600ms var(--ease-out) 1100ms both; }
.hero__cta { animation: fadeIn 600ms var(--ease-out) 1500ms both; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* View Transitions (MPA) */
@view-transition { navigation: auto; }
::view-transition-old(root) {
  animation: fadeOut 300ms ease;
}
::view-transition-new(root) {
  animation: fadeIn 300ms ease;
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .reveal { transition: none; opacity: 1; transform: none; }
  .hero__avatar, .hero__name, .hero__text,
  .hero__subtitle, .hero .divider, .hero__cta {
    animation: none;
    opacity: 1;
  }
  .section-marker::before { transition: none; height: 100%; }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/animations.css
git commit -m "feat: v3.0 animation system — reveal, hero sequence, view transitions"
```

---

### Task 4: 压缩头像

**Files:**
- Modify: `assets/images/avatar.jpg`

- [ ] **Step 1: 压缩头像到 < 300KB**

当前 8.7MB，需压缩。使用系统工具或在线工具将 avatar.jpg 压缩到 200-300KB，保持正方形裁剪，至少 400x400px。

- [ ] **Step 2: 删除重复文件**

```bash
rm "assets/images/2025-7-12黄朝阳2701.jpg"
```

- [ ] **Step 3: Commit**

```bash
git add assets/images/avatar.jpg
git rm "assets/images/2025-7-12黄朝阳2701.jpg"
git commit -m "perf: compress avatar (8.7MB → <300KB), remove duplicate"
```

---

## Phase 2: 主页

### Task 5: index.html — 完整主页

**Files:**
- Replace: `index.html`（完整重写）

- [ ] **Step 1: 写入完整 index.html**

关键结构：
- `<head>` 包含 meta 标签、OG 标签、View Transitions meta `<meta name="view-transition" content="same-origin">`、CSS 引入
- 导航栏：Logo + v3.0 徽章、4 个导航链接（项目/方法论/旅程/联系）、语言切换、汉堡按钮
- §0 Hero：头像、名字、核心对话段落（中英双语）、分隔线、副标题、两个 CTA
- §1 作品：项目引导语 + 3 个 project-item
- §1.5 设计过程：简要描述双环审查，链接到设计规范
- §2 旅程：5 个 timeline__item
- §3 联系：标题 + 引导语 + 两个邮箱
- Footer：版权 + 版本号 + 日期

所有文案使用 `.zh` / `.en` span 做双语切换。文案内容严格按设计规范 §4.1。

- [ ] **Step 2: 浏览器验证**

- 打开 index.html，检查：导航固定、Hero 全屏居中、§ 标记显示、项目列表布局、时间线竖线、联系居中
- 点击语言切换，验证中英双语
- 缩小窗口到 767px 以下，验证汉堡菜单、单列布局
- 验证 Hero 入场序列动画（刷新页面观察）

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: v3.0 main page — hero, projects, timeline, contact, bilingual"
```

---

### Task 6: main.js — 交互逻辑

**Files:**
- Replace: `js/main.js`（完整重写）

- [ ] **Step 1: 写入完整 main.js**

功能清单：
1. 语言切换：点击 `.navbar__lang` 按钮，切换 body class `.lang-zh` / `.lang-en`
2. 导航滚动：scrollY > 0 时添加 `.scrolled` 类
3. 汉堡菜单：切换 `.open` 类
4. Scroll spy：根据滚动位置高亮当前导航项
5. Scroll reveal：IntersectionObserver 触发 `.reveal` → `.visible`，同级交错 100ms
6. 移动端导航：点击链接后关闭菜单

```javascript
(function() {
  'use strict';

  // Language toggle
  var langBtns = document.querySelectorAll('.navbar__lang');
  langBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var lang = this.dataset.lang;
      document.body.className = 'lang-' + lang;
      langBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // Navbar scroll
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 0);
  }, { passive: true });

  // Hamburger
  var hamburger = document.querySelector('.navbar__hamburger');
  var navLinks = document.querySelector('.navbar__links');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Scroll spy
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.navbar__link');
  window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function(section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        var id = section.getAttribute('id');
        navItems.forEach(function(item) {
          item.classList.toggle('active', item.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { passive: true });

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var siblings = entry.target.parentElement.querySelectorAll('.reveal');
          var index = Array.prototype.indexOf.call(siblings, entry.target);
          var delay = index * 100;
          setTimeout(function() {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '-20px' });
    reveals.forEach(function(el) { observer.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('visible'); });
  }
})();
```

- [ ] **Step 2: 浏览器验证**

- 刷新页面，验证 Hero 入场序列正常
- 向下滚动，验证区块淡入 + 交错效果
- 点击导航链接，验证滚动到对应区块 + 高亮
- 切换到移动端，验证汉堡菜单功能

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: v3.0 interactions — language toggle, scroll spy, reveal, nav"
```

---

## Phase 3: 子页面

### Task 7: intentbridge.html — 方法论旗舰页

**Files:**
- Create: `intentbridge.html`

- [ ] **Step 1: 写入完整 intentbridge.html**

按设计规范 §4.2：
- 面包屑：H.Z.Y / IntentBridge
- 标题：IntentBridge + v0.3 徽章 + serif italic Bridge
- 副标题 + 元数据栏
- §1 问题：意图传递痛点 + 高亮引用框
- §2 框架：4 个 framework-item
- §3 验证：3 个 stat-card
- §4 进化：Changelog 时间线（v0.3/v0.4/v1.0）
- 页脚：返回主页 + 版本号
- 中英双语

- [ ] **Step 2: 浏览器验证**

- 从主页点击"了解 IntentBridge"，验证页面过渡动画
- 验证面包屑、元数据栏、Changelog 时间线
- 点击"返回主页"，验证回跳

- [ ] **Step 3: Commit**

```bash
git add intentbridge.html
git commit -m "feat: v3.0 IntentBridge methodology page — living document flagship"
```

---

### Task 8: 项目页模板

**Files:**
- Create: `projects/afc.html`
- Create: `projects/tianchi-prediction.html`
- Create: `projects/fund-flow.html`

- [ ] **Step 1: 创建 projects 目录**

```bash
mkdir -p projects
```

- [ ] **Step 2: 写入 3 个项目页**

每个页面使用统一模板（设计规范 §4.3）：
- 面包屑、标题、元数据栏
- §1 背景（简要占位内容）
- §2 方案（简要占位内容）
- §3 成果（已知数据）
- §4 反思（简要占位内容）
- 页脚

AFC 页：已知数据（8 模块、35 API、9 LLM、39 Widget）
天汽页：已知数据（Top 1%、MAE 486）
资金流页：已知数据（分数 121.87）

详细内容后续逐个细化。

- [ ] **Step 3: Commit**

```bash
git add projects/
git commit -m "feat: v3.0 project page templates with placeholder content"
```

---

## Phase 4: 收尾

### Task 9: 设计过程板块

**Files:**
- Modify: `index.html`（在 §1 和 §2 之间插入 §1.5）

- [ ] **Step 1: 在 index.html 的 §1 和 §2 之间插入设计过程区块**

内容按设计规范 §4.4：
- §1.5 标签：过程
- 标题：设计规范的双环审查
- 简要描述：这份网站的设计规范经过了 IntentBridge 活标准双环审查
- 关键发现摘要（3-4 条最有价值的发现）
- 链接到完整设计规范文档

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: v3.0 design process section — dual-loop review showcase"
```

---

### Task 10: 最终验证与打磨

**Files:**
- May modify: any file based on findings

- [ ] **Step 1: 响应式测试**

- 1920px：验证最大宽度 1120px 居中、留白充裕
- 1199px：验证缩窄容器
- 768px：验证单列、汉堡菜单
- 375px（iPhone SE）：验证最小屏幕可用

- [ ] **Step 2: Lighthouse 审计**

在 Chrome DevTools 中运行 Lighthouse：
- Performance > 95
- Accessibility > 90
- Best Practices > 90
- SEO > 90

修复发现的问题。

- [ ] **Step 3: 跨浏览器验证**

- Chrome（最新）
- Firefox（最新）
- Safari（如可用）
- Edge（最新）

- [ ] **Step 4: 无障碍验证**

- Tab 键遍历所有交互元素
- 验证 focus-visible 样式可见
- 检查 alt 文本和 aria 标签
- 验证色彩对比度

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: v3.0 polish — responsive fixes, accessibility, lighthouse optimization"
```

---

## 依赖关系

```
Task 1 (style.css) → Task 2 (layout.css) → Task 3 (animations.css)
                                              ↓
Task 4 (avatar) ─────────────────────→ Task 5 (index.html) → Task 6 (main.js)
                                                                    ↓
                                              Task 7 (intentbridge) → Task 8 (projects)
                                                                         ↓
                                                                  Task 9 (design process)
                                                                         ↓
                                                                  Task 10 (verification)
```

Task 4 可以与 Task 1-3 并行执行。
