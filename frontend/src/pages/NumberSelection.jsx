import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Ban, CheckCircle2, Clock4, Dices, Hash, RotateCcw, Ticket } from 'lucide-react'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import FilterTabs from '../components/FilterTabs'
import NumberGrid from '../components/NumberGrid'
import NumberLegend from '../components/NumberLegend'
import NotFoundState from '../components/NotFoundState'
import SelectionBar from '../components/SelectionBar'
import SelectionSummary from '../components/SelectionSummary'
import StatCard from '../components/StatCard'
import StepIndicator from '../components/StepIndicator'
import { useCampaigns } from '../hooks/useCampaigns'
import { numberFilterOptions, useNumberFilters } from '../hooks/useNumberFilters'
import { useSelection, useSelectionTotals } from '../hooks/useSelection'
import { formatInteger, NUMBER_STATUS } from '../utils/format'

const steps = [
  { key: 'numbers', label: 'Números' },
  { key: 'summary', label: 'Resumo' },
  { key: 'payment', label: 'Pagamento' },
]

export default function NumberSelection() {
  const { slug } = useParams()
  const { getCampaignBySlug } = useCampaigns()
  const campaign = getCampaignBySlug(slug)

  const { filter, setFilter, stats, visibleNumbers, counts } = useNumberFilters(campaign)
  const { selection, toggleNumber, addNumbers, clearSelection } = useSelection()
  const { numbers, quantity } = useSelectionTotals(campaign)

  const selectedSet = new Set(numbers)
  const campaignId = campaign?.id

  const isDisabled = useCallback(
    (index, status) => status !== NUMBER_STATUS.available && !selectedSet.has(index),
    [selectedSet],
  )

  const handleToggle = useCallback(
    (index) => {
      if (!campaign) return
      const status = campaign.numbers[index]
      if (status === NUMBER_STATUS.available || selectedSet.has(index)) {
        toggleNumber(campaign.id, index)
      }
    },
    [campaign, selectedSet, toggleNumber],
  )

  const handleRandom = () => {
    if (!campaign) return
    const pool = []
    campaign.numbers.forEach((status, index) => {
      if (status === NUMBER_STATUS.available && !selectedSet.has(index)) pool.push(index)
    })
    const picks = []
    while (picks.length < 5 && pool.length > 0) {
      const position = Math.floor(Math.random() * pool.length)
      picks.push(pool.splice(position, 1)[0])
    }
    if (picks.length > 0) addNumbers(campaign.id, picks)
  }

  if (!campaign) {
    return (
      <NotFoundState
        code="—"
        title="Campanha não encontrada"
        description="Não foi possível carregar a grade de números desta campanha."
      />
    )
  }

  const filterOptions = numberFilterOptions.map((option) => ({ ...option, count: counts[option.key] }))

  return (
    <div className="pb-24 lg:pb-16">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page py-4">
          <Link
            to={`/campanhas/${campaign.slug}`}
            className="focus-ring inline-flex items-center gap-1.5 rounded text-sm font-semibold text-slate-500 transition hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {campaign.name}
          </Link>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">Escolha seus números</h1>
              <p className="mt-1 text-sm text-slate-500">
                Grade de {formatInteger(stats.total)} números · {formatInteger(stats.available)} disponíveis
              </p>
            </div>
            <StepIndicator steps={steps} current="numbers" />
          </div>
        </div>
      </div>

      <div className="container-page pt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total de números" value={formatInteger(stats.total)} icon={Hash} tone="brand" />
          <StatCard label="Disponíveis" value={formatInteger(stats.available)} icon={Ticket} tone="grass" />
          <StatCard label="Reservados" value={formatInteger(stats.reserved)} icon={Clock4} tone="gold" />
          <StatCard label="Pagos" value={formatInteger(stats.paid)} icon={Ban} tone="slate" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="card p-4 sm:p-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <FilterTabs
                options={filterOptions}
                value={filter}
                onChange={setFilter}
                ariaLabel="Filtrar números por situação"
              />
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Dices}
                  onClick={handleRandom}
                  disabled={stats.available === 0}
                >
                  Surpreenda-me
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={RotateCcw}
                  onClick={clearSelection}
                  disabled={quantity === 0}
                >
                  Limpar
                </Button>
              </div>
            </div>

            <NumberLegend className="mt-3 border-t border-slate-100 pt-3" />

            <div className="mt-4">
              {visibleNumbers.length === 0 ? (
                <EmptyState
                  icon={CheckCircle2}
                  title="Nenhum número nesta situação"
                  description="Escolha outro filtro para visualizar a grade."
                  action={
                    <Button variant="outline" size="sm" onClick={() => setFilter('all')}>
                      Ver todos os números
                    </Button>
                  }
                />
              ) : (
                <NumberGrid
                  items={visibleNumbers}
                  selected={selectedSet}
                  isDisabled={isDisabled}
                  onToggle={handleToggle}
                />
              )}
            </div>

            <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] leading-relaxed text-slate-400">
              Exibindo {formatInteger(visibleNumbers.length)} de {formatInteger(stats.total)} números.
              Números reservados e pagos ficam bloqueados. A seleção é mantida enquanto você navega
              pelo fluxo desta campanha.
            </p>
          </section>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <SelectionSummary campaign={campaign} />
              <Link
                to={`/campanhas/${campaign.slug}`}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-slate-500 transition hover:text-brand-700"
              >
                Voltar para os detalhes
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SelectionBar campaign={campaign} />
      {selection.campaignId && selection.campaignId !== campaign.id && (
        <p className="container-page mt-4 text-xs text-amber-700">
          Você tem números selecionados em outra campanha. A seleção atual será substituída ao escolher
          números desta campanha.
        </p>
      )}
    </div>
  )
}
