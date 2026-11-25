import { Link } from 'react-router-dom'
import { cx } from '../utils/format'

export default function Logo({ to = '/', inverted = false, compact = false }) {
  return (
    <Link to={to} className="flex items-center gap-2.5 focus-ring rounded-lg" aria-label="Time da Base — página inicial">
      <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center">
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
          <defs>
            <linearGradient id="crest" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#12B76A" />
              <stop offset="100%" stopColor="#244FE0" />
            </linearGradient>
          </defs>
          <path d="M32 4 L56 13 V33 Q56 49 32 60 Q8 49 8 33 V13 Z" fill="url(#crest)" />
          <path d="M32 4 L56 13 V33 Q56 49 32 60 Z" fill="#040C18" opacity="0.18" />
          <text
            x="32"
            y="39"
            textAnchor="middle"
            fontFamily="Outfit, Inter, sans-serif"
            fontSize="21"
            fontWeight="700"
            fill="#040C18"
          >
            TB
          </text>
        </svg>
      </span>
      <span className="flex min-w-0 flex-col">
        <span
          className={cx(
            'font-display text-[15px] font-extrabold uppercase leading-none tracking-[0.16em]',
            inverted ? 'text-white' : 'text-ink-900',
          )}
        >
          Time da Base
        </span>
        {!compact && (
          <span
            className={cx(
              'mt-1 text-[10px] font-semibold uppercase leading-none tracking-[0.14em]',
              inverted ? 'text-brand-200' : 'text-slate-400',
            )}
          >
            Campanhas das categorias de base
          </span>
        )}
      </span>
    </Link>
  )
}
