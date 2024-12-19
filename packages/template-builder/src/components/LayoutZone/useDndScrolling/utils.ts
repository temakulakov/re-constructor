export function noop() {}

export function intBetween(min: number, max: number, val: number) {
  return Math.floor(Math.min(max, Math.max(min, val)));
}

export function getCoords(evt: TouchEvent | DragEvent) {
  if (evt.type === 'touchmove') {
    return {
      x: (evt as TouchEvent).changedTouches[0].clientX,
      y: (evt as TouchEvent).changedTouches[0].clientY,
    };
  }

  return { x: (evt as DragEvent).clientX, y: (evt as DragEvent).clientY };
}
