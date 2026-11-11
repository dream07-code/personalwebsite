# Dream — 个人网站

暗色技术风的个人网站，包含首页、文章、项目、关于我，以及带四角定位框和局部辉光的光标互动。使用 Astro 静态生成，可部署到 Cloudflare Pages。

> 身份信息、邮箱、GitHub 与两个项目已替换为真实内容。站点线上地址为 **https://dream-12g.pages.dev**（已在 `src/site.config.ts` 的 `url` 中配置，如绑定自定义域名需同步修改）；三篇文章仍是示例，可随时替换为真实笔记。

## 本地开发

要求 Node.js 22。

```bash
npm install
npm run dev       # http://localhost:4321
npm run test      # 工具函数与光标边界测试
npm run build     # 生产文件输出到 dist/
npm run preview   # 预览生产构建
```

## 先改成你自己的网站

主要编辑 `src/site.config.ts`：

- `name`：网站中显示的名字或网名；
- `title` / `description`：浏览器标题和 SEO 描述；
- `url`：最终域名，会影响 canonical、RSS 和 sitemap；
- `role`、`location`、`email`、`github`：个人资料与联系方式；
- `stack`：首页技术栈。

然后替换 `src/content/blog/` 和 `src/content/projects/` 里的示例内容，以及 `public/favicon.svg`。首页“当前关注”和关于页的文字分别在 `src/pages/index.astro`、`src/pages/about.astro` 中修改。

## 发布文章

在 `src/content/blog/` 新建 `.md` 文件，文件名就是 URL：

```md
---
title: 文章标题
description: 一句话摘要
date: 2026-11-11
tags: ['前端', '学习笔记']
draft: false
---

正文从这里开始。
```

访问 `/blog/文件名/`。设置 `draft: true` 后不会生成公开页面，也不会进入 RSS。

## 添加项目

在 `src/content/projects/` 新建 `.md` 文件：

```md
---
title: 项目名
summary: 这个项目解决什么问题
year: 2026
stack: ['TypeScript', 'Astro']
repo: https://github.com/yourname/project
link: https://project.example.com
featured: true
order: 1
---

在这里写项目背景、技术取舍和复盘。
```

`link` 和 `repo` 可省略；`featured: true` 才会显示在首页，`order` 越小越靠前。

## 光标互动、动效与可访问性

- 首页包含轻量粒子连线背景、滚动进度条、渐变标题、打字机角色和滚动提示；
- 内容卡片进入视口时以 3D、模糊和缩放组合浮入，悬停时有扫光、抬升和轨道加速；
- 主要按钮和页脚联系入口具有轻微磁吸位移；
- 鼠标进入卡片周围约 120px 时，白色圆角框会先扩展罩住最近的一张卡片（任意时刻最多一张）；
- 真正悬停到卡片上时瞬间锁定：青色发光描边、外侧四角 L 形定位角标、底部胶囊动作标签；
- 按 Tab 键会停用自定义光标并恢复系统光标，再次移动鼠标即恢复自定义光标；
- 精确指针设备上显示青色光点和带较强拖尾的圆角描边；
- 悬停链接时描边扩大；
- 触屏设备不启用自定义光标；
- 动效默认常开（与参考站 kanin.cn 一致）：`prefers-reduced-motion` 不作为总开关，粒子、打字机、滚动入场、磁吸和完整光标在任何系统设置下都正常播放；
- JS 被禁用时，卡片 `:hover`/`:focus-within` 仍有纯 CSS 的青色边框、四角角标和标签兜底；
- 键盘 `:focus-visible` 焦点样式保留，卡片在 `:focus-within` 时也有清晰反馈。

核心逻辑位于 `src/components/Cursor.astro` 和 `src/lib/cursor.ts`，视觉样式集中在 `src/styles/global.css` 末尾。

## 部署到 Cloudflare Pages

### Git 集成（推荐）

1. 将仓库推送到 GitHub 或 GitLab。
2. 在 Cloudflare 控制台进入 **Workers & Pages**，创建 Pages 项目并连接仓库。
3. 使用以下构建设置：

| 配置项 | 值 |
| --- | --- |
| Framework preset | Astro |
| Production branch | main |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION=22`（仓库也已包含 `.nvmrc`） |

4. 点击 **Save and Deploy**。之后推送生产分支会自动构建，其他分支和 PR 可使用预览部署。
5. 获得 `xxx.pages.dev` 地址后，把 `src/site.config.ts` 的 `url` 改成该地址并再次部署。

### Wrangler 直接上传

```bash
npm run build
npx wrangler login
npx wrangler pages deploy dist --project-name=nova-personal-website
```

登录和发布会操作你的 Cloudflare 账号，请在确认项目名与内容后自行执行。

### 自定义域名

在 Pages 项目的 **Custom domains** 中添加域名，按控制台提示完成 DNS 记录。证书由 Cloudflare 自动处理。别忘了同步更新 `src/site.config.ts` 的 `url`。

## 目录速览

```text
src/
├── components/       # 导航、页脚、卡片、图标和光标
├── content/          # Markdown 文章与项目
├── layouts/          # 全站 HTML 布局
├── lib/              # 日期、阅读时长和光标纯函数
├── pages/            # 路由、RSS、robots 和 404
├── styles/global.css # 设计系统、响应式和交互样式
└── site.config.ts    # 身份、域名与社交链接
public/               # favicon 与 Cloudflare 响应头
tests/                # Node 原生测试
```

## 依赖说明

本站部署的是纯 HTML、CSS 和少量浏览器 JavaScript，不在 Cloudflare 上运行 Astro 或 Node 服务。当前 Astro 6 构建依赖的 `npm audit` 可能报告漏洞；升级大版本前请先检查对应 Node.js 版本要求，不要直接执行 `npm audit fix --force`。
