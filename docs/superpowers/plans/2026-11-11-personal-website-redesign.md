# Personal Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 从零构建暗色技术风个人网站，包含文章、项目、关于页和截图风格的卡片光标互动，并可部署到 Cloudflare Pages。

**Architecture:** Astro 静态生成所有页面，Markdown 内容集合驱动文章与项目；原生 CSS 提供设计系统，独立光标脚本只在适合的设备上加载交互。站点身份集中在配置文件，核心纯函数由 Node 测试覆盖。

**Tech Stack:** Astro 6.4.8、TypeScript、原生 CSS、Node test runner + tsx、Cloudflare Pages。

**Spec:** `docs/superpowers/specs/2026-11-11-personal-website-redesign-design.md`

## Global Constraints

- 旧 `src/`、`public/`、`dist/` 已按用户授权清理，不恢复废案。
- NOVA 与所有项目、文章均为可替换示例，不冒充用户真实资料。
- 不引入 React、后端、数据库或在线字体依赖。
- 尊重精确指针、触屏、键盘和减少动态效果设置。
- 未经用户要求不提交 Git、不执行外部发布。

## Review Focus

- 触屏或减少动态效果：不得隐藏原生光标，测试 `canUseCustomCursor` 的全部组合。
- 指针靠近卡片边缘：辉光坐标不得跑出 0–100%，测试边界与外部坐标。
- 空内容集合：列表页应显示空状态而不是崩溃，构建验证示例与空数组渲染路径。
- 移动端导航：375px 下无横向滚动，链接和焦点仍可使用，构建后浏览器检查。
- 示例身份误用：README 明确上线前替换 `src/site.config.ts` 和示例内容。

---

### Task 1: 项目骨架与站点配置

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/site.config.ts`, `src/content.config.ts`
- Create: `public/favicon.svg`, `public/_headers`
- Test: `tests/site-config.test.ts`

**Interfaces:**
- Produces: `site: SiteConfig`，内容集合 `blog` 与 `projects`，构建脚本 `dev/build/preview/test`。

- [ ] 写站点配置测试，断言名称、导航、示例域名与必填社交链接结构。
- [ ] 运行 `npm run test` 确认因实现缺失而失败。
- [ ] 建立 Astro/TypeScript 配置、内容 schema 和静态安全响应头。
- [ ] 安装依赖并运行测试，确认配置测试通过。

### Task 2: 内容页面与设计系统

**Files:**
- Create: `src/styles/global.css`, `src/layouts/BaseLayout.astro`
- Create: `src/components/{Header,Footer,Icon,ProjectCard,PostRow,SectionHeading}.astro`
- Create: `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/404.astro`
- Create: `src/pages/blog/index.astro`, `src/pages/blog/[id].astro`, `src/pages/projects/index.astro`, `src/pages/projects/[id].astro`
- Create: `src/pages/rss.xml.ts`, `src/pages/robots.txt.ts`
- Create: `src/lib/format.ts`, `src/content/blog/*.md`, `src/content/projects/*.md`
- Test: `tests/format.test.ts`

**Interfaces:**
- Consumes: `site` 与内容集合。
- Produces: `formatDate(date: Date): string`、`readingTime(body: string): number`、全部静态路由。

- [ ] 写日期与中英文混合正文阅读时长测试并确认失败。
- [ ] 实现工具函数、设计系统、共用布局和组件。
- [ ] 添加三篇示例文章、三个示例项目及全部页面。
- [ ] 运行测试和 `astro build`，确认路由与 RSS/sitemap 生成成功。

### Task 3: 自定义光标与卡片互动

**Files:**
- Create: `src/components/Cursor.astro`, `src/lib/cursor.ts`
- Modify: `src/layouts/BaseLayout.astro`, `src/styles/global.css`
- Test: `tests/cursor.test.ts`

**Interfaces:**
- Produces: `canUseCustomCursor(pointerFine: boolean, reducedMotion: boolean): boolean`、`getGlowPosition(clientX: number, clientY: number, rect: Rect): {x: number, y: number}`、`lerp(current: number, target: number, factor: number): number`。

- [ ] 写精确指针/减少动态效果组合、辉光边界和插值测试，确认失败。
- [ ] 实现纯函数和 DOM 控制器，以 rAF 跟随指针并更新卡片局部坐标。
- [ ] 实现默认光点/圆角描边、链接放大、卡片四角定位框与辉光。
- [ ] 运行测试和构建，确认触屏及减少动态效果时无自定义光标。

### Task 4: 整站验收与部署准备

**Files:**
- Create: `README.md`
- Modify: 验收中发现的问题文件

**Interfaces:**
- Consumes: 完整静态站与测试套件。
- Produces: 可部署 `dist/` 与 Cloudflare Pages 操作说明。

- [ ] 运行 `npm run test` 和 `npm run build`，修复所有失败。
- [ ] 启动本地预览，检查首页、文章、项目、关于页和 404。
- [ ] 检查 375px 与桌面布局、键盘焦点、卡片光标及减少动态效果。
- [ ] 写明身份内容替换、本地开发、Cloudflare Pages 构建参数与自定义域名步骤。
