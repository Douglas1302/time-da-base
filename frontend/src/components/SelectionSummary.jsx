import { ArrowRight, Lock, ShoppingBag, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useSelection, useSelectionTotals } from '../hooks/useSelection'
import { cx, formatCurrency, formatNumber, formatInteger } from '../utils/format'

export default function SelectionSummary({ campaign, className }) {
  const { numbers, quantity, unitPrice, total } = useSelectionTotals(campaign)
  const { removeNumber, clearSelection } = useSelection()
  const checkoutPath = `/campanhas/${campaign.slug}/resumo`

  return (
    <div className={cx('card overflow-hidden', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-5 py-4">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink-900">
          <ShoppingBag className="h-4 w-4 text-brand-600" aria-hidden="true" />
          Sua seleção
        </h2>
        <span className="rounded-lg bg-ink-900 px-2 py-1 font-display text-xs font-bold text-white tabular-nums">
          {formatInteger(quantity)} {quantity === 1 ? 'número' : 'números'}
        </span>
      </div>

      <div className="p-5">
        {quantity === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
            <p className="text-sm font-semibold text-ink-800">Nenhum número selecionado</p>
            <p className="mt-1 text-xs text-slate-500">
              Toque nos números verdes para montar sua participação.
            </p>
          </div>
        ) : (
          <>
            <div className="scrollbar-thin flex max-h-40 flex-wrap gap-1.5 overflow-y-auto pr-1">
              {numbers.map((index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 rounded-lg bg-brand-50 py-1 pl-2 pr-1 font-display text-xs font-bold text-brand-700 ring-1 ring-inset ring-brand-200"
                >
                  {formatNumber(index)}
                  <button
                    type="button"
                    onClick={() => removeNumber(index)}
                    className="focus-ring rounded p-0.5 text-brand-500 transition hover:bg-brand-200/60 hover:text-brand-800"
                    aria-label={`Remover o número ${formatNumber(index)}`}
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={clearSelection}
              className="focus-ring mt-3 inline-flex items-center gap-1.5 rounded text-xs font-semibold text-slate-500 transition hover:text-red-600"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Limpar seleção
            </button>
          </>
        )}

        <dl className="mt-5 space-y-2.5 border-t border-slate-200 pt-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Valor por número</dt>
            <dd className="font-semibold text-ink-900">{formatCurrency(unitPrice)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Quantidade</dt>
            <dd className="font-semibold text-ink-900">{formatInteger(quantity)}</dd>
          </div>
          <div className="flex items-end justify-between border-t border-dashed border-slate-200 pt-3">
            <dt className="text-sm font-bold text-ink-900">Total</dt>
            <dd className="font-display text-2xl font-extrabold leading-none text-ink-900">
              {formatCurrency(total)}
            </dd>
          </div>
        </dl>

        <Button
          to={checkoutPath}
          full
          size="lg"
          className="mt-4"
          disabled={quantity === 0}
          iconRight={ArrowRight}
        >
          Continuar
        </Button>

        <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-snug text-slate-400">
          <Lock className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
          Reserva demonstrativa: nada é cobrado e nenhum dado é enviado para servidores.
        </p>

        <Link
          to={`/campanhas/${campaign.slug}`}
          className="mt-3 inline-flex text-xs font-semibold text-brand-700 transition hover:text-brand-800"
        >
          Ver detalhes da campanha
        </Link>
      </div>
    </div>
  )
}
