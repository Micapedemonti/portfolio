export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/<em>(.*?)<\/em>/);
  return <>{parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))}</>;
}
