import { cssVars } from '@/lib/css';

interface SplitTextProps {
  lines: ReadonlyArray<{ text: string; className?: string }>;
  lineClassName: string;
  charClassName: string;
}

export function SplitText({ lines, lineClassName, charClassName }: SplitTextProps) {
  let index = 0;
  return (
    <>
      {lines.map(({ text, className }) => (
        <span key={text} className={[lineClassName, className].filter(Boolean).join(' ')} aria-hidden="true">
          {[...text].map((ch, i) =>
            ch === ' ' ? ' ' : (
              <span key={i} className={charClassName} style={cssVars({ '--c': index++ })}>{ch}</span>
            ),
          )}
        </span>
      ))}
    </>
  );
}
