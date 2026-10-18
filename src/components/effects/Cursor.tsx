import { useEffect, useRef } from 'react';
import { lerp } from '@/lib/math';
import { hasFinePointer } from '@/lib/media';
import { pointer, trackPointer } from '@/lib/pointer';
import styles from './Cursor.module.css';

const INTERACTIVE = 'a, button, [data-cursor]';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const text = textRef.current;
    if (!dot || !text || !hasFinePointer()) return;

    trackPointer();
    document.documentElement.classList.add('has-cursor');

    let x = pointer.x, y = pointer.y, id = 0;
    const loop = () => {
      x = lerp(x, pointer.x, 0.2);
      y = lerp(y, pointer.y, 0.2);
      dot.style.transform = `translate(${x}px, ${y}px)`;
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);

    const onOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest<HTMLElement>('[data-cursor="label"]');
      const interactive = target?.closest(INTERACTIVE);
      dot.classList.toggle(styles.label, Boolean(labelled));
      dot.classList.toggle(styles.big, Boolean(interactive) && !labelled);
      text.textContent = labelled?.dataset.label ?? '';
    };
    document.addEventListener('pointerover', onOver);

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div ref={dotRef} className={styles.cursor} aria-hidden="true">
      <span ref={textRef} className={styles.text} />
    </div>
  );
}
