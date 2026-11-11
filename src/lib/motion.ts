export interface CursorFrameTarget {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: number;
}

export interface CursorFrameState {
  active: boolean;
  pressed: boolean;
}

export interface CursorFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  snapped: boolean;
}

export function getCursorFrame(
  clientX: number,
  clientY: number,
  target: CursorFrameTarget | null,
  state: CursorFrameState,
): CursorFrame {
  if (!target) {
    return {
      x: clientX,
      y: clientY,
      width: state.pressed ? 26 : state.active ? 46 : 30,
      height: state.pressed ? 26 : state.active ? 46 : 30,
      radius: state.pressed ? 8 : state.active ? 14 : 9,
      snapped: false,
    };
  }

  const compact = state.pressed ? 6 : 0;
  return {
    x: target.left + target.width / 2,
    y: target.top + target.height / 2,
    width: target.width + 12 - compact,
    height: target.height + 12 - compact,
    radius: target.radius + 6,
    snapped: true,
  };
}

export function getParticleCount(width: number, height: number): number {
  return Math.min(72, Math.max(18, Math.floor(width * height * 0.00006)));
}
