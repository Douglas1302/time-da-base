import { Compass, SearchX } from 'lucide-react'
import Button from './Button'

export default function NotFoundState({
  title = 'Página não encontrada',
  description = 'O endereço acessado não existe neste protótipo ou a campanha foi removida.',
  code = '404',
  icon: Icon = SearchX,
}) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <p className="font-display text-5xl font-extrabold text-slate-200">{code}</p>
      <div>
        <h1 className="text-xl font-bold text-ink-900 sm:text-2xl">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button to="/" icon={Compass}>
          Ir para a página inicial
        </Button>
        <Button to="/#campanhas" variant="outline">
          Ver campanhas
        </Button>
      </div>
    </div>
  )
}
