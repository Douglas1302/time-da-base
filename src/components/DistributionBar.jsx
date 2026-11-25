import { cx, formatInteger } from '../utils/format'

export default function DistributionBar({ stats, showLegend = true, className }) {
  const total = stats.total || 1
  const segments = [
    { key: 'paid', label: 'Pagos', value: stats.paid, className: 'bg-slate-400' },
    { key: 'reserved', label: 'Reservados', value: stats.reserved, className: 'bg-gold-400' },
    { key: 'available', label: 'Disponíveis', value: stats.available, className: 'bg-grass-500' },
  ]

  return (
    <div className={className}>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        {segments.map((segment) => (
          <div
            key={segment.key}
            className={cx('h-full transition-all duration-500', segment.className)}
            style={{ width: `${(segment.value / total) * 100}%` }}
          />
        ))}
      </div>
      {showLegend && (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-500">
          {segments.map((segment) => (
            <span key={segment.key} className="inline-flex items-center gap-1.5">
              <span className={cx('h-2 w-2 rounded-full', segment.className)} aria-hidden="true" />
              {segment.label}
              <span className="text-ink-800">{formatInteger(segment.value)}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
