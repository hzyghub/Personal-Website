> **已废弃 / Superseded** — 本文档已被 v3.0 全面重设计取代。请参考 `docs/superpowers/specs/2026-04-17-site-v3-full-redesign.md`。

# 视觉风格重设计 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将暗色科技风简历网站重设计为温和质感浅色卡片流风格

**Architecture:** 全站从 7 个传统 section 板块重构为卡片流布局。重写 CSS 颜色系统和组件样式，重构 HTML 为卡片结构，简化 JS 删除粒子和雷达图代码，同步更新 PRD。

**Tech Stack:** 纯 HTML5 + CSS3 + Vanilla JS（零依赖、零 CDN、零构建工具）

**Design Spec:** `docs/superpowers/specs/2026-04-16-visual-redesign-design.md`

---

## File Structure

| 文件 | 操作 | 职责 |
|------|------|------|
| `css/style.css` | 重写 | 新配色变量、卡片系统、所有组件样式、响应式 |
| `index.html` | 重写 | 卡片流 HTML 结构，保留所有中英双语内容 |
| `js/main.js` | 重写 | 仅保留语言切换、导航、滚动 reveal，删除粒子和雷达图 |
| `docs/PRD.md` | 修改 | 更新 §2.1 配色和 §3 板块结构描述 |

---

### Task 1: CSS 完全重写

**Files:**
- Rewrite: `css/style.css`

这是最大的任务。重写整个 CSS 文件，基于设计文档的配色系统和卡片流布局。

- [ ] **Step 1: 写新的 CSS Variables + Reset + Base**

```css
/* ========================================
   黄朝阳个人网站 — 温和质感卡片流
   版本: v2.0
   ======================================== */

/* --- CSS Variables --- */
:root {
    /* 配色 */
    --bg: #fafaf8;
    --bg-alt: #f0efeb;
    --card: #ffffff;
    --card-hover: #fefefe;
    --accent: #2a9d8f;
    --accent-light: #e8f5f3;
    --accent-dark: #1f7a6e;
    --coral: #e76f51;
    --text: #2d3436;
    --text-muted: #636e72;
    --text-dim: #b2bec3;
    --border: rgba(0, 0, 0, 0.06);
    --border-hover: rgba(0, 0, 0, 0.12);
    --shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    --shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.1);
    --radius: 16px;
    --radius-sm: 10px;
    --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --font: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", sans-serif;
}

/* --- Reset --- */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
}

body {
    font-family: var(--font);
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }

/* --- Language Toggle --- */
.lang-zh .en,
.lang-en .zh {
    display: none !important;
}

.lang-zh .en-name,
.lang-en .en-name {
    display: block !important;
}

/* --- Container --- */
.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
}
```

- [ ] **Step 2: 写 Card 系统基础样式**

```css
/* --- Card System --- */
.card {
    background: var(--card);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    transition: transform var(--transition), box-shadow var(--transition);
    position: relative;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.card-full { width: 100%; }
.card-half { flex: 1; min-width: 0; }
.card-small { flex: 1; min-width: 0; }

/* --- Reveal Animation --- */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}
```

- [ ] **Step 3: 写 Navigation 样式**

```css
/* ========================================
   Navigation
   ======================================== */
#navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    transition: var(--transition);
}

#navbar.scrolled {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.nav-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-logo {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.08em;
}

.nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
}

.nav-links a {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: color var(--transition);
    position: relative;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent);
    transition: width var(--transition);
}

.nav-links a:hover,
.nav-links a.active {
    color: var(--text);
}

.nav-links a:hover::after,
.nav-links a.active::after {
    width: 100%;
}

.lang-switcher {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
}

.lang-btn {
    background: none;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
    font-family: var(--font);
    font-size: 0.85rem;
    font-weight: 600;
    padding: 4px 6px;
    border-radius: 4px;
    transition: var(--transition);
}

.lang-btn.active {
    color: var(--accent);
}

.lang-btn:hover {
    color: var(--text);
}

.lang-sep {
    color: var(--text-dim);
    font-size: 0.7rem;
}

.hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    flex-direction: column;
    gap: 5px;
    padding: 4px;
}

.hamburger span {
    width: 22px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: var(--transition);
}

.hamburger.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.open span:nth-child(2) {
    opacity: 0;
}

.hamburger.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}
```

- [ ] **Step 4: 写 Hero 卡片样式**

```css
/* ========================================
   Hero Card
   ======================================== */
#hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 100px 24px 60px;
    background: var(--bg);
}

.hero-inner {
    text-align: center;
    max-width: 640px;
    margin: 0 auto;
}

.hero-avatar {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto 32px;
    border: 3px solid var(--accent-light);
}

.hero-subtitle {
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
}

.hero-name {
    font-size: clamp(2.4rem, 6vw, 3.6rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: var(--text);
    margin-bottom: 8px;
}

.en-name {
    display: none;
    font-size: 0.4em;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    margin-top: 4px;
}

.lang-en .en-name {
    display: block !important;
}

.hero-tagline {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--text-muted);
    margin-bottom: 28px;
}

.hero-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 36px;
}

.tag {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    background: var(--accent-light);
    color: var(--accent);
}

.tag-coral {
    background: rgba(231, 111, 81, 0.1);
    color: var(--coral);
}

.hero-cta {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    display: inline-block;
    padding: 12px 28px;
    border-radius: var(--radius-sm);
    font-family: var(--font);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    border: none;
    text-align: center;
}

.btn-primary {
    background: var(--accent);
    color: #fff;
}

.btn-primary:hover {
    background: var(--accent-dark);
    transform: translateY(-2px);
}

.btn-outline {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border-hover);
}

.btn-outline:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
}
```

- [ ] **Step 5: 写 About + Skills 卡片样式**

```css
/* ========================================
   About + Skills Row
   ======================================== */
.row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    max-width: 1100px;
    margin: -40px auto 0;
    padding: 0 24px;
    position: relative;
    z-index: 1;
}

.card-about {
    padding: 36px;
}

.card-about h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--text);
}

.card-about p {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.8;
    margin-bottom: 16px;
}

.card-about .about-footer {
    font-size: 0.9rem;
    font-style: italic;
    color: var(--accent);
    padding-top: 12px;
    border-top: 1px solid var(--border);
}

.card-skills {
    padding: 36px;
}

.card-skills h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 24px;
    color: var(--text);
}

.skill-group {
    margin-bottom: 20px;
}

.skill-group:last-child {
    margin-bottom: 0;
}

.skill-group-label {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-tag {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 500;
    background: var(--accent-light);
    color: var(--accent-dark);
    transition: var(--transition);
}

.skill-tag:hover {
    background: var(--accent);
    color: #fff;
    transform: translateY(-1px);
}
```

- [ ] **Step 6: 写 Project 卡片样式**

```css
/* ========================================
   Project Cards
   ======================================== */
.projects-section {
    padding: 80px 0;
}

.projects-section .container {
    max-width: 1100px;
}

.section-title {
    font-size: clamp(1.6rem, 3.5vw, 2rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 40px;
    text-align: center;
    color: var(--text);
}

/* AFC 大卡 */
.card-project-main {
    padding: 36px;
    margin-bottom: 24px;
}

.project-header {
    margin-bottom: 20px;
}

.project-header h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 4px;
}

.project-sub {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 12px;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}

.project-tags span {
    padding: 3px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    background: var(--accent-light);
    color: var(--accent);
}

.project-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 20px;
}

.stat {
    text-align: center;
}

.stat-num {
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--accent);
    line-height: 1.2;
}

.stat-label {
    display: block;
    font-size: 0.72rem;
    color: var(--text-muted);
    margin-top: 2px;
}

.project-desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 16px;
}

.project-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.hl-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 600;
    background: rgba(231, 111, 81, 0.1);
    color: var(--coral);
}

/* 两个并排小卡 */
.row-2-projects {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
}

.card-project-sm {
    padding: 28px;
}

.card-project-sm h3 {
    font-size: 1.15rem;
    font-weight: 600;
    margin-bottom: 4px;
}

.card-project-sm .project-tags {
    margin-bottom: 16px;
}

.metric-val {
    display: block;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 4px;
}

.metric-note {
    font-size: 0.78rem;
    color: var(--text-muted);
}

.card-project-sm .project-desc {
    margin-top: 12px;
}

/* IntentBridge 横卡 */
.card-project-wide {
    padding: 36px;
}

.card-project-wide .project-header h3 {
    font-size: 1.3rem;
}

.card-project-wide .project-stats {
    grid-template-columns: repeat(4, 1fr);
}
```

- [ ] **Step 7: 写 Timeline + Contact + Footer 样式**

```css
/* ========================================
   Timeline Cards (Horizontal Years)
   ======================================== */
.timeline-section {
    padding: 80px 0;
    background: var(--bg-alt);
}

.timeline-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
}

.timeline-card {
    padding: 24px;
}

.timeline-card .year {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.05em;
    margin-bottom: 8px;
    display: block;
}

.timeline-card h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 6px;
}

.timeline-card p {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.6;
}

/* ========================================
   Contact + Footer
   ======================================== */
.contact-section {
    padding: 80px 0;
}

.contact-inner {
    text-align: center;
}

.contact-email {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    background: var(--card);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    font-size: 1rem;
    color: var(--text);
    transition: var(--transition);
    margin-bottom: 20px;
}

.contact-email:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-hover);
    color: var(--accent);
}

.contact-icon {
    width: 20px;
    height: 20px;
    color: var(--accent);
}

.contact-cta {
    font-size: 1rem;
    color: var(--text-muted);
}

.footer {
    text-align: center;
    padding: 32px 24px;
    font-size: 0.82rem;
    color: var(--text-dim);
    border-top: 1px solid var(--border);
    background: var(--bg);
}
```

- [ ] **Step 8: 写响应式样式**

```css
/* ========================================
   Responsive — Tablet (768-1199px)
   ======================================== */
@media (max-width: 1199px) {
    .row-2 {
        grid-template-columns: 1fr 1fr;
    }

    .project-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .card-project-wide .project-stats {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* ========================================
   Responsive — Mobile (< 768px)
   ======================================== */
@media (max-width: 767px) {
    .hamburger {
        display: flex;
    }

    .nav-links {
        position: fixed;
        top: 64px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        flex-direction: column;
        gap: 0;
        padding: 16px 24px;
        border-bottom: 1px solid var(--border);
        transform: translateY(-120%);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-links.open {
        transform: translateY(0);
    }

    .nav-links li {
        padding: 10px 0;
    }

    .lang-switcher {
        position: fixed;
        top: 72px;
        right: 24px;
        z-index: 1001;
    }

    #hero {
        padding: 100px 24px 60px;
    }

    .hero-avatar {
        width: 120px;
        height: 120px;
    }

    .row-2 {
        grid-template-columns: 1fr;
        margin-top: -24px;
    }

    .row-2-projects {
        grid-template-columns: 1fr;
    }

    .timeline-grid {
        grid-template-columns: 1fr;
    }

    .project-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .card-project-wide .project-stats {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ========================================
   Utility
   ======================================== */
::selection {
    background: rgba(42, 157, 143, 0.2);
    color: var(--text);
}

:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--bg);
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.12);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
}
```

- [ ] **Step 9: 验证 CSS 完整性**

检查所有设计文档中提到的配色值、圆角、阴影、字体粗细都已正确使用。确认无残留的暗色变量（如 `#0a0a14`、`#00c8ff`、`#00e5ff`）。

---

### Task 2: HTML 重构为卡片流

**Files:**
- Rewrite: `index.html`

将 7 个传统 section 重构为卡片流布局。保留所有中英双语内容不变，仅改变结构。

- [ ] **Step 1: 重写完整的 index.html**

新 HTML 结构要点：
- `<head>` 不变（meta、title、stylesheet 引用）
- `<nav>` 结构不变，仅删除内容无关变化
- `<section id="hero">` 改为居中布局：头像在上，文字在下，删除 canvas 和几何装饰
- 新增 `row-2` div 包裹 About + Skills 两个并排卡片
- `<section id="projects">` 内部改为：AFC 大卡 → 两个并排小卡 → IntentBridge 横卡
- `<section id="timeline">` 改为横向年份卡片网格
- `<section id="contact">` 简化为居中邮箱 + CTA
- `<footer>` 基本不变

完整 HTML 见实施时直接写入。

- [ ] **Step 2: 确认所有中英双语内容完整**

逐条对照 PRD §3 的内容清单，确认无遗漏：
- [ ] Hero: 名字、副标题、一句话定位、5个标签、2个CTA
- [ ] About: INTP 叙事段落、底部总结句
- [ ] Skills: 4组标签（数据6、AI6、开发6、产品5）
- [ ] AFC: 项目名、副标题、5个技术标签、4个数据指标、描述、3个亮点
- [ ] 二手车: 项目名、副标题、4个标签、MAE数据、描述
- [ ] 资金流: 项目名、副标题、4个标签、得分、描述
- [ ] IntentBridge: 项目名、副标题、4个标签、4个数据指标、描述
- [ ] Timeline: 6条经历（2025至今、2025×3、2018-2024、2013-2017）
- [ ] Contact: 邮箱链接、CTA 文案

---

### Task 3: JS 简化

**Files:**
- Rewrite: `js/main.js`

删除粒子系统和雷达图代码，保留语言切换、导航、滚动 reveal。

- [ ] **Step 1: 重写 main.js**

```js
(function () {
    'use strict';

    /* ---- Language Toggle ---- */
    var langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var lang = btn.dataset.lang;
            document.body.className = 'lang-' + lang;
            langBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
        });
    });

    /* ---- Navigation ---- */
    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    var navItems = document.querySelectorAll('.nav-links a');
    var sections = document.querySelectorAll('section[id]');

    // Scroll shadow
    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Hamburger toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navItems.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // Scroll spy
    function updateActiveNav() {
        var scrollY = window.scrollY + 120;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    navItems.forEach(function (l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    /* ---- Scroll Reveal (IntersectionObserver) ---- */
    var reveals = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var parent = entry.target.parentElement;
                var siblings = parent.querySelectorAll('.reveal');
                var delay = 0;
                siblings.forEach(function (sib, idx) {
                    if (sib === entry.target) delay = idx * 80;
                });
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) { revealObserver.observe(el); });
})();
```

从 329 行缩减到约 70 行。删除了：
- 粒子系统（canvas、createParticles、drawParticles、initParticles）
- 雷达图（radarCanvas、drawRadar、radarObserver、animateRadar）

- [ ] **Step 2: 确认 JS 功能正常**

验证项：
- [ ] 中/EN 切换正常工作
- [ ] 导航栏滚动出现阴影
- [ ] 汉堡菜单在手机端正常开关
- [ ] Scroll spy 高亮当前板块
- [ ] 滚动 reveal 动画正常触发

---

### Task 4: PRD 同步更新

**Files:**
- Modify: `docs/PRD.md`

更新 PRD 的 §2.1 配色和 §3 板块结构，使其与新的设计实现一致。

- [ ] **Step 1: 更新 PRD §2.1 视觉风格**

将：
```
### 2.1 视觉风格：创意个性风 —「数据织网」
- **概念**：非对称数据艺术风格，大胆配色，动态微效果
- **配色**：暗底(#0a0a14) + 电光蓝(#00c8ff) + 珊瑚橙(#ff6b4a) + 冰蓝(#00e5ff)
```

替换为：
```
### 2.1 视觉风格：温和质感卡片流
- **概念**：浅色温暖基调，卡片流布局，通过卡片大小表达信息优先级
- **配色**：暖白(#fafaf8) + 青绿(#2a9d8f) + 珊瑚(#e76f51)
```

- [ ] **Step 2: 更新 PRD §3 板块结构**

将 7 个独立板块（3.1-3.7）的描述替换为新的卡片流结构，与设计文档 §3 一致。

- [ ] **Step 3: 更新 PRD §5.1 文件结构**

将雷达图和粒子效果的文件引用移除，确认文件结构与实际一致。

---

### Task 5: CLAUDE.md 同步更新

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: 更新配色和架构描述**

将设计约束中的配色：
```
- 配色：暗底 `#0a0a14`，电光蓝 `#00c8ff`，珊瑚橙 `#ff6b4a`，冰蓝 `#00e5ff`
```

替换为：
```
- 配色：暖白 `#fafaf8`，青绿 `#2a9d8f`，珊瑚 `#e76f51`
```

更新架构概述从 7 板块改为卡片流结构。

---

### Task 6: 视觉验证

- [ ] **Step 1: 在浏览器中打开 `index.html`**

检查项：
- [ ] 全站浅色基调，无暗色区域残留
- [ ] 导航栏白底，Logo 青绿色
- [ ] Hero 居中，头像圆形，无发光边框
- [ ] About + Skills 并排显示
- [ ] AFC 大卡全宽，两个小卡并排，IntentBridge 横卡
- [ ] Timeline 横向年份卡片
- [ ] Contact 居中邮箱
- [ ] 中/EN 切换正常
- [ ] 滚动 reveal 动画正常
- [ ] hover 卡片微上浮 + 阴影加深

- [ ] **Step 2: 测试响应式**

在浏览器 DevTools 中测试：
- [ ] 1200px+ 桌面版正常
- [ ] 768-1199px 平板版正常
- [ ] < 768px 手机版：汉堡菜单、所有卡片单列

- [ ] **Step 3: 修复发现的问题**

记录并修复视觉或功能问题。

---

## Self-Review Checklist

**1. Spec coverage:**
- 配色系统 → Task 1 Step 1
- 卡片流布局 → Task 1 Steps 4-7, Task 2
- Hero 白底居中 → Task 1 Step 4, Task 2
- About + Skills 并排 → Task 1 Step 5, Task 2
- 项目卡片层级 → Task 1 Step 6, Task 2
- Timeline 横向卡片 → Task 1 Step 7, Task 2
- Contact 简化 → Task 1 Step 7, Task 2
- 导航白底 → Task 1 Step 3
- 动效白名单 → Task 1 Steps 4-7 (hover), Task 3 (reveal)
- 响应式断点 → Task 1 Step 8
- JS 简化 → Task 3
- PRD 同步 → Task 4
- 无暗色残留 → Task 6 Step 1

**2. Placeholder scan:** 无 TBD/TODO。

**3. Type consistency:** CSS class 名在 Task 1（样式定义）和 Task 2（HTML 引用）之间一致。
