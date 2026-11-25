import { cx } from '../utils/format'

const items = [
  { key: 'available', label: 'Disponível', className: 'bg-grass-50 border-grass-300 text-grass-700' },
  { key: 'reserved', label: 'Reservado', className: 'bg-gold-100 border-amber-300 text-amber-800' },
  { key: 'paid', label: 'Pago', className: 'bg-slate-200 border-slate-300 text-slate-500' },
  { key: 'selected', label: 'Selecionado', className: 'bg-brand-600 border-brand-700 text-white' },
]

export default function NumberLegend({ className }) {
  return (
    <div className={cx('flex flex-wrap items-center gap-x-4 gap-y-2', className)}>
      {items.map((item) => (
        <span key={item.key} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <span className={cx('h-4 w-4 rounded border', item.className)} aria-hidden="true" />
          {item.label}
        </span>
      ))}
    </div>
  )
}
