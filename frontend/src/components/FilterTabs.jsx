import { cx, formatInteger } from '../utils/format'

export default function FilterTabs({ options, value, onChange, ariaLabel = 'Filtros' }) {
  return (
    <div
      className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1"
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const active = option.key === value
        return (
          <button
            key={option.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.key)}
            className={cx(
              'focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition',
              active
                ? 'border-ink-900 bg-ink-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-ink-900',
            )}
          >
            {option.label}
            {typeof option.count === 'number' && (
              <span
                className={cx(
                  'rounded-md px-1.5 py-0.5 text-[11px] font-bold tabular-nums',
                  active ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500',
                )}
              >
                {formatInteger(option.count)}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
