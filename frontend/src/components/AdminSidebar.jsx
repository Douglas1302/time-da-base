import { NavLink } from 'react-router-dom'
import { ArrowLeft, LayoutDashboard, Megaphone, Ticket, Users } from 'lucide-react'
import { cx } from '../utils/format'

const items = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Campanhas', to: '/admin/campanhas', icon: Megaphone },
  { label: 'Números', to: '/admin/numeros', icon: Ticket },
  { label: 'Participantes', to: '/admin/participantes', icon: Users },
]

export default function AdminSidebar({ variant = 'desktop' }) {
  const isMobile = variant === 'mobile'

  return (
    <nav
      aria-label="Menu administrativo"
      className={cx(
        isMobile
          ? 'no-scrollbar flex gap-1.5 overflow-x-auto pb-1'
          : 'flex flex-col gap-1',
      )}
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            cx(
              'focus-ring flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
              isActive
                ? 'bg-ink-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-ink-900',
            )
          }
        >
          <item.icon className="h-4 w-4" aria-hidden="true" />
          {item.label}
        </NavLink>
      ))}

      {!isMobile && (
        <NavLink
          to="/"
          className="focus-ring mt-4 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-ink-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar ao site
        </NavLink>
      )}
    </nav>
  )
}
