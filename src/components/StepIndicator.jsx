import { Check } from 'lucide-react'
import { cx } from '../utils/format'

export default function StepIndicator({ steps, current }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
      {steps.map((step, index) => {
        const isCurrent = step.key === current
        const isDone = steps.findIndex((item) => item.key === current) > index

        return (
          <li key={step.key} className="flex items-center gap-2">
            <span
              className={cx(
                'flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold',
                isDone && 'bg-grass-500 text-white',
                isCurrent && 'bg-ink-900 text-white',
                !isDone && !isCurrent && 'bg-slate-200 text-slate-500',
              )}
              aria-hidden="true"
            >
              {isDone ? <Check className="h-3.5 w-3.5" /> : index + 1}
            </span>
            <span
              className={cx(
                'font-semibold',
                isCurrent ? 'text-ink-900' : isDone ? 'text-grass-700' : 'text-slate-400',
              )}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <span className="mx-1 hidden h-px w-6 bg-slate-300 sm:block" aria-hidden="true" />
            )}
          </li>
        )
      })}
    </ol>
  )
}
