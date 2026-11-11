import assert from 'node:assert/strict';
import test from 'node:test';
import { githubLabel } from '../src/site.config.ts';

test('githubLabel follows the configured profile instead of a hard-coded demo name', () => {
  assert.equal(githubLabel('https://github.com/alice'), 'alice');
  assert.equal(githubLabel('https://github.com/alice/'), 'alice');
});

test('githubLabel remains useful when no profile is configured yet', () => {
  assert.equal(githubLabel('https://github.com/'), 'GitHub');
});
