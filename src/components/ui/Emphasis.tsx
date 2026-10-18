/**
 * Renderiza "texto <em>destacado</em>" como JSX, sin innerHTML.
 * Para líneas cortas de títulos que vienen de los archivos de traducción.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/<em>(.*?)<\/em>/);
  return <>{parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))}</>;
}
