import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { absoluteUrl, site } from '../site.config';

export async function GET() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return rss({
    title: site.title,
    description: site.description,
    site: site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: absoluteUrl(`/blog/${post.id}`),
    })),
    customData: '<language>zh-cn</language>',
  });
}
