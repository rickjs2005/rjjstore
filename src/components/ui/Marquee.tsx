export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div className="flex shrink-0 animate-marquee gap-12 pr-12">
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="eyebrow text-stone">{it}</span>
            <span className="text-stone/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
