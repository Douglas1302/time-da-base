import { memo } from 'react'
import { cx, formatNumber, NUMBER_STATUS, NUMBER_STATUS_LABELS } from '../utils/format'

const statusStyles = {
  [NUMBER_STATUS.available]:
    'border-grass-200 bg-grass-50 text-grass-700 hover:-translate-y-0.5 hover:border-grass-400 hover:bg-grass-100 hover:shadow-sm',
  [NUMBER_STATUS.reserved]: 'cursor-not-allowed border-amber-300 bg-gold-100 text-amber-800',
  [NUMBER_STATUS.paid]: 'cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400',
}

const selectedStyle =
  'border-brand-700 bg-brand-600 text-white shadow-md ring-2 ring-brand-300 ring-offset-1'

function NumberCell({ index, status, selected = false, disabled = false, onToggle, title }) {
  const label = formatNumber(index)
  const statusLabel = NUMBER_STATUS_LABELS[status] ?? status

  return (
    <button
      type="button"
      onClick={() => onToggle?.(index)}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Número ${label} — ${selected ? 'selecionado por você' : statusLabel}`}
      title={title ?? `${label} · ${statusLabel}`}
      className={cx(
        'focus-ring flex h-9 select-none items-center justify-center rounded-lg border font-display text-[13px] font-bold tabular-nums transition sm:h-10',
        selected ? selectedStyle : statusStyles[status],
        disabled && !selected && 'opacity-80',
      )}
    >
      {label}
    </button>
  )
}

export default memo(NumberCell)
