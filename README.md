# Dream — 个人网站

暗色技术风的个人网站，包含首页、文章、项目、关于我，以及带四角定位框和局部辉光的光标互动。使用 Astro 静态生成，可部署到 Cloudflare Pages。

> 身份信息、邮箱、GitHub 与两个项目已替换为真实内容。站点线上地址为 **https://dream07.cn**（已在 `src/site.config.ts` 的 `url` 中配置，影响 canonical / RSS / sitemap）；三篇文章仍是示例，可随时替换为真实笔记。

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

当前线上地址：**https://dream07.cn**（Pages 项目名 `dream`，生产分支 `main`）。

- 域名注册在腾讯云，**DNS 已托管到 Cloudflare**（nameserver 为 `konnor.ns.cloudflare.com` / `sloan.ns.cloudflare.com`），日常解析改动都在 Cloudflare 控制台完成；
- `www.dream07.cn` 同样指向本站，`canonical` 统一到裸域；
- Pages 默认域名 `dream-12g.pages.dev` 仍然可用，可作备份入口。

### 手动部署（当前使用的方式）

```bash
npm run build
npx wrangler pages deploy dist --project-name=dream --branch=main
```

首次使用需要 `npx wrangler login` 完成浏览器授权。这条命令上传的是本地 `dist/`，改完代码必须重新构建再上传。

### Git 自动部署（推荐，配好后只需 push）

1. 在 Cloudflare 控制台进入 **Workers & Pages → dream → Settings → Build**，点击 **Connect to Git** 关联本仓库。
2. 使用以下构建设置：

| 配置项 | 值 |
| --- | --- |
| Framework preset | Astro |
| Production branch | main |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION=22`（仓库也已包含 `.nvmrc`） |

3. 保存后推送 `main` 分支即自动构建上线，其他分支和 PR 会生成预览部署。

### 自定义域名

已完成绑定，无需重复操作。记录一下流程备查：

1. Cloudflare 添加站点（Connect your domain，不是 Transfer）；
2. 在注册商处把 NS 换成 Cloudflare 分配的两个 nameserver；
3. 站点 Active 后，在 Pages 项目的 **Custom domains** 里添加 `dream07.cn` 与 `www.dream07.cn`，CNAME 会自动创建；
4. 证书由 Cloudflare 自动签发（本次约 4 分钟，CA 为 Google Trust Services）；
5. 最后把 `src/site.config.ts` 的 `url` 改成新域名并重新部署。

更换域名时，第 5 步最容易漏——漏了会导致 canonical、RSS 和 sitemap 仍指向旧地址。

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
