import { Link, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, ShieldAlert } from 'lucide-react'
import AdminSidebar from '../components/AdminSidebar'
import Logo from '../components/Logo'
import { cx } from '../utils/format'

const titles = {
  '/admin': { title: 'Dashboard', description: 'Visão geral das campanhas demonstrativas.' },
  '/admin/campanhas': { title: 'Campanhas', description: 'Gerencie as campanhas do protótipo.' },
  '/admin/numeros': { title: 'Gestão de números', description: 'Simule a disponibilidade dos números.' },
  '/admin/participantes': { title: 'Participantes', description: 'Lista fictícia de participantes.' },
}

function resolveTitle(pathname) {
  if (titles[pathname]) return titles[pathname]
  if (pathname.startsWith('/admin/campanhas/')) {
    if (pathname.endsWith('/editar')) {
      return { title: 'Editar campanha', description: 'Atualize as informações da campanha.' }
    }
    return { title: 'Nova campanha', description: 'Preencha os dados para criar uma campanha.' }
  }
  return { title: 'Painel administrativo', description: '' }
}

export default function AdminLayout() {
  const { pathname } = useLocation()
  const heading = resolveTitle(pathname)

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo to="/admin" />
            <span className="hidden rounded-full bg-ink-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:inline-flex">
              Admin
            </span>
          </div>
          <Link
            to="/"
            className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-500 transition hover:text-brand-700"
          >
            Ver site
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="container-page py-6 lg:py-8">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-6 space-y-4">
              <AdminSidebar />
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-800">
                  <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                  Dados fictícios
                </p>
                <p className="mt-1 text-xs leading-snug text-amber-700">
                  Painel demonstrativo: alterações ficam apenas no navegador.
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 lg:hidden">
              <AdminSidebar variant="mobile" />
            </div>

            <div className="mb-6 flex flex-col gap-1 border-b border-slate-200 pb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
                Time da Base · Administração
              </p>
              <h1 className={cx('font-display text-2xl font-bold text-ink-900')}>{heading.title}</h1>
              {heading.description && <p className="text-sm text-slate-500">{heading.description}</p>}
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
