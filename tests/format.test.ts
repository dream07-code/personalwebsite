import assert from 'node:assert/strict';
import test from 'node:test';
import { formatDate, readingTime } from '../src/lib/format.ts';

test('formatDate uses a stable UTC calendar date', () => {
  assert.equal(formatDate(new Date('2026-01-05T12:00:00Z')), '2026.01.05');
});

test('readingTime returns at least one minute for empty or short content', () => {
  assert.equal(readingTime(''), 1);
  assert.equal(readingTime('hello world'), 1);
});

test('readingTime accounts for Chinese characters and English words', () => {
  assert.equal(readingTime('中'.repeat(600)), 2);
  assert.equal(readingTime(`${'中'.repeat(300)} ${'word '.repeat(200)}`), 2);
});
