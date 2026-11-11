export interface CursorRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export type CursorMode = 'full' | 'off';

// Motion settings never downgrade the cursor: the site keeps its animated
// identity (same policy as the reference site kanin.cn).
export function getCursorMode(pointerFine: boolean, _reducedMotion: boolean): CursorMode {
  return pointerFine ? 'full' : 'off';
}

export function getGlowPosition(clientX: number, clientY: number, rect: CursorRect) {
  const clamp = (value: number) => Math.min(100, Math.max(0, value));
  return {
    x: clamp(((clientX - rect.left) / rect.width) * 100),
    y: clamp(((clientY - rect.top) / rect.height) * 100),
  };
}

export function getNearestTarget(
  clientX: number,
  clientY: number,
  targets: CursorRect[],
  activationRadius: number,
): number | null {
  let nearestIndex: number | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  targets.forEach((rect, index) => {
    const closestX = Math.min(Math.max(clientX, rect.left), rect.left + rect.width);
    const closestY = Math.min(Math.max(clientY, rect.top), rect.top + rect.height);
    const distance = Math.hypot(clientX - closestX, clientY - closestY);
    if (distance <= activationRadius && distance < nearestDistance) {
      nearestIndex = index;
      nearestDistance = distance;
    }
  });

  return nearestIndex;
}

export function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}
