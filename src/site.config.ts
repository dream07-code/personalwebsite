export const site = {
  name: 'Dream',
  title: 'Dream — Java 后端 & AI 全栈开发者',
  description: '一名来自山东潍坊的 Java 后端 / AI 全栈开发者，记录后端工程、AI 应用与持续构建的过程。',
  // 域名待定：Cloudflare Pages 地址确定后替换这里即可（影响 canonical / RSS / sitemap）
  url: 'https://dream.pages.dev',
  role: 'Java 后端 / AI 全栈开发者',
  location: '山东 · 潍坊',
  email: 'dream20070116@gmail.com',
  github: 'https://github.com/dream07-code',
  nav: [
    { label: '首页', href: '/' },
    { label: '文章', href: '/blog' },
    { label: '项目', href: '/projects' },
    { label: '关于', href: '/about' },
  ],
  stack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Linux', 'C++', 'Android', 'Agent'],
} as const;

export function absoluteUrl(path: string, base: string = site.url): string {
  const normalizedBase = base.replace(/\/+$/, '');
  if (path === '/' || path === '') return `${normalizedBase}/`;
  return `${normalizedBase}/${path.replace(/^\/+/, '')}`;
}

export function githubLabel(github: string): string {
  const segment = github.replace(/\/+$/, '').split('/').pop();
  return segment && segment !== 'github.com' ? segment : 'GitHub';
}
