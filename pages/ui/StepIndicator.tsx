import { Check } from 'lucide-react'
import { cn } from '../../lib/shadcn/utils'

export type StepItem = {
  number: number
  label: string
}

type StepIndicatorProps = {
  steps: StepItem[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((step, index) => {
        const completed = step.number < currentStep
        const active = step.number === currentStep

        return (
          <div key={step.number} className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-colors',
                completed && 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500',
                active && 'border-[rgb(var(--intern-navy))] bg-[rgb(var(--intern-navy))] text-white dark:border-primary dark:bg-primary dark:text-primary-foreground',
                !completed && !active && 'border-border bg-card text-muted-foreground',
              )}
            >
              {completed ? <Check className="h-4 w-4" /> : step.number}
            </div>

            <span
              className={cn(
                'text-xs',
                active
                  ? 'font-semibold text-[rgb(var(--intern-navy))] dark:text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              {step.label}
            </span>

            {index < steps.length - 1 ? <div className="h-px w-10 bg-border sm:w-16" /> : null}
          </div>
        )
      })}
    </div>
  )
}