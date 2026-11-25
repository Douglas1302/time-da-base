import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { cx } from '../utils/format'

const variants = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800',
  accent: 'bg-grass-500 text-white shadow-sm hover:bg-grass-600 active:bg-grass-700',
  dark: 'bg-ink-900 text-white shadow-sm hover:bg-ink-800 active:bg-ink-950',
  outline:
    'border border-slate-300 bg-white text-ink-700 hover:border-brand-300 hover:text-brand-700',
  ghost: 'text-ink-600 hover:bg-slate-100 hover:text-ink-900',
  danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
  subtle: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
}

const sizes = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  full = false,
  to,
  href,
  as,
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon,
  iconRight: IconRight,
  ...rest
}) {
  const Component = as ?? (to ? Link : href ? 'a' : 'button')
  const isDisabled = disabled || loading

  const props = {
    ...(to ? { to } : {}),
    ...(href ? { href } : {}),
    ...(Component === 'button' ? { type, disabled: isDisabled } : { 'aria-disabled': isDisabled || undefined }),
    ...rest,
  }

  return (
    <Component
      {...props}
      className={cx(
        'focus-ring inline-flex select-none items-center justify-center gap-2 rounded-xl font-semibold transition',
        'disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60',
        variants[variant],
        sizes[size],
        full && 'w-full',
        className,
      )}
    >
      {loading ? (
        <Loader2 className={cx(iconSizes[size], 'animate-spin')} aria-hidden="true" />
      ) : Icon ? (
        <Icon className={iconSizes[size]} aria-hidden="true" />
      ) : null}
      {children}
      {IconRight ? <IconRight className={iconSizes[size]} aria-hidden="true" /> : null}
    </Component>
  )
}
