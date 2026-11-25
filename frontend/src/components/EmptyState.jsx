import { Inbox } from 'lucide-react'
import { cx } from '../utils/format'

export default function EmptyState({ icon: Icon = Inbox, title, description, action, className }) {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center',
        className,
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-base font-semibold text-ink-900">{title}</p>
        {description && <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  )
}
