import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, LayoutDashboard, Menu, ShieldCheck, X } from 'lucide-react'
import Button from './Button'
import Logo from './Logo'
import { cx } from '../utils/format'

const navItems = [
  { label: 'Início', to: '/' },
  { label: 'Campanhas', to: '/#campanhas' },
  { label: 'Como funciona', to: '/#como-funciona' },
  { label: 'Transparência', to: '/#transparencia' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/' && !location.hash
    if (to.startsWith('/#')) {
      return location.pathname === '/' && location.hash === to.slice(1)
    }
    return location.pathname === to
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink-950 text-white/70">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-[11px] font-medium">
          <p className="flex items-center gap-2 truncate">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-grass-400 animate-pulse-soft" aria-hidden="true" />
            Ambiente demonstrativo — nenhuma cobrança real é processada.
          </p>
          <Link
            to="/admin"
            className="hidden shrink-0 items-center gap-1.5 font-semibold text-brand-200 transition hover:text-white sm:inline-flex"
          >
            <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
            Painel administrativo
          </Link>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cx(
                  'rounded-lg px-3 py-2 text-sm font-semibold transition',
                  isActive(item.to)
                    ? 'bg-slate-100 text-ink-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-ink-900',
                )}
                aria-current={isActive(item.to) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button to="/admin" variant="outline" size="sm" icon={ShieldCheck}>
              Área admin
            </Button>
            <Button to="/#campanhas" size="sm" iconRight={ArrowRight}>
              Ver campanhas
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-ink-800 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div id="menu-mobile" className="border-t border-slate-200 bg-white lg:hidden">
            <nav className="container-page flex flex-col gap-1 py-3" aria-label="Navegação principal (mobile)">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cx(
                    'rounded-lg px-3 py-2.5 text-sm font-semibold',
                    isActive(item.to) ? 'bg-slate-100 text-ink-900' : 'text-slate-600',
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <Button to="/admin" variant="outline" icon={ShieldCheck} full>
                  Painel administrativo
                </Button>
                <Button to="/#campanhas" iconRight={ArrowRight} full>
                  Ver campanhas
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
