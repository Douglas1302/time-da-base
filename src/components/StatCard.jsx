import { cx } from '../utils/format'

const tones = {
  brand: { icon: 'bg-brand-50 text-brand-600', value: 'text-ink-900' },
  grass: { icon: 'bg-grass-50 text-grass-600', value: 'text-ink-900' },
  gold: { icon: 'bg-gold-100 text-amber-600', value: 'text-ink-900' },
  slate: { icon: 'bg-slate-100 text-slate-500', value: 'text-ink-900' },
  dark: { icon: 'bg-white/10 text-white', value: 'text-white' },
  red: { icon: 'bg-red-50 text-red-600', value: 'text-ink-900' },
}

export default function StatCard({ label, value, hint, icon: Icon, tone = 'brand', className }) {
  const palette = tones[tone] ?? tones.brand

  return (
    <div className={cx('card flex items-center gap-3.5 p-4', className)}>
      {Icon && (
        <span className={cx('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', palette.icon)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <p className={cx('font-display text-xl font-bold leading-tight', palette.value)}>{value}</p>
        {hint && <p className="truncate text-[11px] text-slate-400">{hint}</p>}
      </div>
    </div>
  )
}
