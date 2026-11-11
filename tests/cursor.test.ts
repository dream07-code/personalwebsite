import assert from 'node:assert/strict';
import test from 'node:test';
import { getCursorMode, getGlowPosition, getNearestTarget, lerp } from '../src/lib/cursor.ts';

test('cursor mode keeps the full animated cursor regardless of motion settings', () => {
  assert.equal(getCursorMode(true, false), 'full');
  assert.equal(getCursorMode(true, true), 'full');
});

test('cursor mode is off for coarse pointers', () => {
  assert.equal(getCursorMode(false, false), 'off');
  assert.equal(getCursorMode(false, true), 'off');
});

test('glow position converts pointer coordinates to card percentages', () => {
  assert.deepEqual(
    getGlowPosition(150, 100, { left: 50, top: 40, width: 200, height: 120 }),
    { x: 50, y: 50 },
  );
});

test('glow position stays inside the card at and beyond its edges', () => {
  const rect = { left: 50, top: 40, width: 200, height: 120 };
  assert.deepEqual(getGlowPosition(-100, 900, rect), { x: 0, y: 100 });
  assert.deepEqual(getGlowPosition(900, -100, rect), { x: 100, y: 0 });
});

test('lerp approaches the target without overshooting at the endpoints', () => {
  assert.equal(lerp(0, 100, 0.18), 18);
  assert.equal(lerp(10, 20, 0), 10);
  assert.equal(lerp(10, 20, 1), 20);
});

test('proximity selection chooses only the nearest component', () => {
  const targets = [
    { left: 220, top: 80, width: 100, height: 100 },
    { left: 130, top: 80, width: 40, height: 100 },
  ];
  assert.equal(getNearestTarget(50, 100, targets, 120), 1);
});

test('proximity selection activates a component when the pointer is inside it', () => {
  const targets = [{ left: 100, top: 100, width: 200, height: 100 }];
  assert.equal(getNearestTarget(150, 150, targets, 120), 0);
});

test('proximity selection prefers the closest of multiple nearby components', () => {
  const targets = [
    { left: 70, top: 60, width: 40, height: 80 },
    { left: 115, top: 60, width: 40, height: 80 },
    { left: 200, top: 60, width: 40, height: 80 },
  ];
  assert.equal(getNearestTarget(50, 100, targets, 120), 0);
});

test('proximity selection ignores components outside the activation radius', () => {
  const targets = [{ left: 300, top: 300, width: 100, height: 100 }];
  assert.equal(getNearestTarget(0, 0, targets, 120), null);
});
