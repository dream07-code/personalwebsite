import assert from 'node:assert/strict';
import test from 'node:test';
import { getCursorFrame, getParticleCount } from '../src/lib/motion.ts';

test('cursor frame follows the pointer while it is away from components', () => {
  assert.deepEqual(
    getCursorFrame(120, 80, null, { active: false, pressed: false }),
    { x: 120, y: 80, width: 30, height: 30, radius: 9, snapped: false },
  );
});

test('cursor frame snaps around a nearby component and keeps its radius language', () => {
  assert.deepEqual(
    getCursorFrame(80, 100, { left: 40, top: 40, width: 120, height: 100, radius: 22 }, { active: true, pressed: false }),
    { x: 100, y: 90, width: 132, height: 112, radius: 28, snapped: true },
  );
});

test('pressed cursor frame becomes compact without losing its target', () => {
  assert.deepEqual(
    getCursorFrame(0, 0, { left: 0, top: 0, width: 100, height: 50, radius: 20 }, { active: true, pressed: true }),
    { x: 50, y: 25, width: 106, height: 56, radius: 26, snapped: true },
  );
});

test('particle field density stays useful on small screens and capped on desktop', () => {
  assert.equal(getParticleCount(375, 800), 18);
  assert.equal(getParticleCount(1440, 900), 72);
});
