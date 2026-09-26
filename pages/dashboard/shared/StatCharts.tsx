export function BarBreakdown({ title, data, colorClass = 'bg-[rgb(var(--intern-blue))]' }: {
  title: string
  data: { label: string; count: number }[]
  colorClass?: string
}) {
  const total = data.reduce((sum, d) => sum + d.count, 0) || 1
  return (
    <div>
      <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{title}</h2>
      <div className="mt-4 space-y-3">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-foreground">{d.label}</span>
              <span className="text-muted-foreground">{d.count} ({Math.round((d.count / total) * 100)}%)</span>
            </div>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${(d.count / total) * 100}%` }} />
            </div>
          </div>
        ))}
        {data.length === 0 && <p className="text-sm text-muted-foreground">Aucune donnée.</p>}
      </div>
    </div>
  )
}

export function MonthlyBarChart({ title, series }: { title: string; series: { month: string; values: { label: string; count: number }[] }[] }) {
  const max = Math.max(...series.flatMap((s) => s.values.map((v) => v.count)), 1)
  return (
    <div>
      <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{title}</h2>
      <div className="mt-6 flex h-40 items-end justify-around gap-4 border-b border-l pb-0 pl-2">
        {series.map((s) => (
          <div key={s.month} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end justify-center gap-1">
              {s.values.map((v, i) => (
                <div
                  key={i}
                  className="w-3 rounded-t bg-[rgb(var(--intern-blue))]"
                  style={{ height: `${(v.count / max) * 100}%`, opacity: 1 - i * 0.25 }}
                  title={`${v.label}: ${v.count}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {new Date(s.month).toLocaleDateString('fr-FR', { month: 'short' })}
            </span>
          </div>
        ))}
        {series.length === 0 && <p className="text-sm text-muted-foreground">Aucune donnée.</p>}
      </div>
    </div>
  )
}