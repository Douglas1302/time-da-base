import { cx } from '../utils/format'

const tones = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-200',
  grass: 'bg-grass-50 text-grass-700 ring-grass-200',
  gold: 'bg-gold-100 text-amber-800 ring-amber-300',
  slate: 'bg-slate-100 text-slate-600 ring-slate-200',
  dark: 'bg-ink-900 text-white ring-ink-800',
  red: 'bg-red-50 text-red-700 ring-red-200',
  white: 'bg-white/15 text-white ring-white/25 backdrop-blur',
}

const dots = {
  brand: 'bg-brand-500',
  grass: 'bg-grass-500',
  gold: 'bg-amber-500',
  slate: 'bg-slate-400',
  dark: 'bg-grass-400',
  red: 'bg-red-500',
  white: 'bg-grass-300',
}

export default function Badge({ tone = 'brand', dot = false, children, className }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {dot && <span className={cx('h-1.5 w-1.5 rounded-full', dots[tone])} aria-hidden="true" />}
      {children}
    </span>
  )
}
