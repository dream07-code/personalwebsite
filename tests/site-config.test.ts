import assert from 'node:assert/strict';
import test from 'node:test';
import { absoluteUrl } from '../src/site.config.ts';

test('absoluteUrl joins routes without duplicate slashes', () => {
  assert.equal(absoluteUrl('/blog', 'https://nova.pages.dev/'), 'https://nova.pages.dev/blog');
  assert.equal(absoluteUrl('projects', 'https://nova.pages.dev'), 'https://nova.pages.dev/projects');
});

test('absoluteUrl preserves the site root', () => {
  assert.equal(absoluteUrl('/', 'https://nova.pages.dev/'), 'https://nova.pages.dev/');
});
