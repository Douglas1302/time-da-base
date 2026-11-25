import { cx } from '../utils/format'

const tones = {
  brand: 'bg-brand-600',
  grass: 'bg-grass-500',
  gold: 'bg-gold-400',
  slate: 'bg-slate-400',
}

const trackTones = {
  brand: 'bg-brand-100',
  grass: 'bg-grass-100',
  gold: 'bg-gold-100',
  slate: 'bg-slate-200',
}

const heights = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-2.5',
}

export default function ProgressBar({
  value = 0,
  total = 100,
  label,
  hint,
  tone = 'brand',
  size = 'md',
  showPercentage = true,
  className,
}) {
  const percentage = total > 0 ? Math.min(100, Math.max(0, Math.round((value / total) * 100))) : 0

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          {label && <span className="text-xs font-semibold text-slate-500">{label}</span>}
          {showPercentage && (
            <span className="font-display text-xs font-bold text-ink-800">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className={cx('w-full overflow-hidden rounded-full', trackTones[tone], heights[size])}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progresso da campanha'}
      >
        <div
          className={cx('h-full rounded-full transition-all duration-500', tones[tone])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}
