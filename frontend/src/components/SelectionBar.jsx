import { ArrowRight } from 'lucide-react'
import Button from './Button'
import { useSelectionTotals } from '../hooks/useSelection'
import { formatCurrency, formatInteger } from '../utils/format'

export default function SelectionBar({ campaign }) {
  const { quantity, total } = useSelectionTotals(campaign)

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 shadow-[0_-8px_24px_-16px_rgba(7,20,38,0.5)] backdrop-blur lg:hidden">
      <div className="container-page flex items-center justify-between gap-3 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {formatInteger(quantity)} {quantity === 1 ? 'número' : 'números'}
          </p>
          <p className="font-display text-lg font-extrabold leading-tight text-ink-900">
            {formatCurrency(total)}
          </p>
        </div>
        <Button
          to={`/campanhas/${campaign.slug}/resumo`}
          disabled={quantity === 0}
          iconRight={ArrowRight}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
