export const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

let tracking = false;

export function trackPointer(): void {
  if (tracking) return;
  tracking = true;
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    },
    { passive: true },
  );
}
