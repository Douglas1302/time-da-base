import { Link } from 'react-router-dom'
import { Instagram, Mail, MessageCircle } from 'lucide-react'
import Logo from './Logo'

const columns = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Campanhas em andamento', to: '/#campanhas' },
      { label: 'Como funciona', to: '/#como-funciona' },
      { label: 'Transparência', to: '/#transparencia' },
      { label: 'Painel administrativo', to: '/admin' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre o Time da Base', to: '/#sobre' },
      { label: 'Regulamentos ilustrativos', to: '/#transparencia' },
      { label: 'Categorias de base', to: '/#campanhas' },
      { label: 'Dúvidas frequentes', to: '/#como-funciona' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink-950 text-slate-300">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
            Protótipo visual de uma plataforma de campanhas e sorteios para apoiar as categorias de
            base. Todos os dados, valores e participantes exibidos são fictícios.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
              <Mail className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-xs text-slate-500">canais ilustrativos</span>
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-slate-400 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Time da Base — protótipo visual. Nenhum dado pessoal real é utilizado.</p>
          <p className="max-w-xl md:text-right">
            A modalidade da campanha e sua conformidade legal devem ser verificadas antes de qualquer
            lançamento. Este projeto não realiza sorteios nem arrecadação financeira.
          </p>
        </div>
      </div>
    </footer>
  )
}
