import { Check } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { cn } from '../../../lib/shadcn/utils'
import {
  internDashboardStats,
  internTimeline,
  internWeeklyTasks,
  internWeeklyActivities,
  internTimeRemainingPercent,
} from '../../data/dashboardMockData'

function BarChart({ title, data }: { title: string; data: { week: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1)
  return (
    <Card className="rounded-3xl p-6 shadow-retool-sm">
      <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{title}</h2>
      <div className="mt-6 flex h-40 items-end justify-around gap-3 border-b border-l pb-0 pl-2">
        {data.map((d) => (
          <div key={d.week} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-bold text-[rgb(var(--intern-navy))] dark:text-foreground">{d.count}</span>
            <div className="flex w-full flex-1 items-end">
              <div className="w-full rounded-t-lg bg-[rgb(var(--intern-blue))]" style={{ height: `${(d.count / max) * 100}%` }} />
            </div>
            <span className="text-xs font-semibold text-muted-foreground">{d.week}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function DonutChart({ title, percent, label }: { title: string; percent: number; label: string }) {
  return (
    <Card className="rounded-3xl p-6 shadow-retool-sm">
      <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{title}</h2>
      <div className="mt-6 flex items-center justify-center">
        <div
          className="flex h-36 w-36 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(rgb(var(--intern-blue)) ${percent * 3.6}deg, rgb(var(--intern-soft-blue)) 0deg)`,
          }}
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-card text-center">
            <div>
              <p className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{percent}%</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function DashboardTab() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tableau de bord</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {internDashboardStats.map((s) => (
          <Card key={s.label} className="rounded-2xl p-4 text-center shadow-retool-sm">
            <p className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <DonutChart title="Progression du stage" percent={65} label="complété" />
        <DonutChart title="Temps restant" percent={internTimeRemainingPercent} label="du stage restant" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <BarChart title="Tâches terminées par semaine" data={internWeeklyTasks} />
        <BarChart title="Activités réalisées" data={internWeeklyActivities} />
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">État du rapport / mémoire</h2>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/3 rounded-full bg-amber-500" />
          </div>
          <span className="text-sm font-semibold text-amber-600">En cours de révision</span>
        </div>
      </Card>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Parcours du stage</h2>
        <div className="mt-5 space-y-3">
          {internTimeline.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <div
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  step.done ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground',
                )}
              >
                {step.done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <p className={cn('text-sm', step.done ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
                {step.done ? '✓' : '→'} {step.label}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}