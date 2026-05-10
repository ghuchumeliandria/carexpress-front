type Level = 'minor' | 'moderate' | 'severe';

const LEVELS: Level[] = ['minor', 'moderate', 'severe'];

const COLOR: Record<Level, string> = {
  minor: 'bg-yellow-300',
  moderate: 'bg-orange-400',
  severe: 'bg-red-500',
};

export function SeverityScale({ level }: { level?: Level }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs">
      <span className="font-medium text-slate-600">Damage Severity Scale:</span>
      <div className="flex overflow-hidden rounded">
        {LEVELS.map((l) => (
          <span
            key={l}
            className={`px-2 py-0.5 capitalize ${
              level === l ? `${COLOR[l]} text-slate-900` : 'bg-slate-100 text-slate-400'
            }`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DamageLocation({ location }: { location?: 'front' | 'rear' | 'left' | 'right' }) {
  const positions: Array<{ key: 'front' | 'rear' | 'left' | 'right'; label: string; cls: string }> = [
    { key: 'front', label: 'FRONT', cls: 'top-0 left-1/2 -translate-x-1/2' },
    { key: 'left', label: 'LEFT', cls: 'left-0 top-1/2 -translate-y-1/2' },
    { key: 'right', label: 'RIGHT', cls: 'right-0 top-1/2 -translate-y-1/2' },
    { key: 'rear', label: 'REAR', cls: 'bottom-0 left-1/2 -translate-x-1/2' },
  ];
  return (
    <div className="relative h-32 w-48 rounded border border-slate-200 bg-slate-50">
      {positions.map((p) => (
        <span
          key={p.key}
          className={`absolute ${p.cls} rounded px-2 py-0.5 text-[10px] font-bold tracking-wide ${
            location === p.key ? 'bg-red-500 text-white' : 'bg-white text-slate-400'
          }`}
        >
          {p.label}
        </span>
      ))}
    </div>
  );
}
