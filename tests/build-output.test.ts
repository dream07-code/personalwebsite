import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('Cloudflare caches hashed Astro assets as immutable', () => {
  const headers = readFileSync(new URL('dist/_headers', root), 'utf8');
  assert.match(headers, /\/_astro\/\*/);
});

test('build generates a public tag page containing only matching posts', () => {
  const tagPage = new URL('dist/blog/tags/后端/index.html', root);
  assert.ok(existsSync(tagPage), 'expected /blog/tags/后端/ to be generated');
  const html = readFileSync(tagPage, 'utf8');
  assert.match(html, /从一份 Spring Boot 骨架说起/);
  assert.doesNotMatch(html, /我给自己建了一座数字花园/);
});
