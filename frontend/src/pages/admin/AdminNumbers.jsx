import { useState } from 'react'
import { CheckCircle2, Clock4, Hash, Info, MousePointerClick, Ticket } from 'lucide-react'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'
import FilterTabs from '../../components/FilterTabs'
import NumberGrid from '../../components/NumberGrid'
import NumberLegend from '../../components/NumberLegend'
import StatCard from '../../components/StatCard'
import { Field, Select } from '../../components/Field'
import { useCampaigns } from '../../hooks/useCampaigns'
import { numberFilterOptions, useNumberFilters } from '../../hooks/useNumberFilters'
import { cx, formatInteger, NUMBER_STATUS, NUMBER_STATUS_LABELS } from '../../utils/format'

const tools = [
  {
    value: NUMBER_STATUS.available,
    label: 'Disponível',
    dot: 'bg-grass-500',
    activeClass: 'border-grass-500 bg-grass-50 text-grass-700',
  },
  {
    value: NUMBER_STATUS.reserved,
    label: 'Reservado',
    dot: 'bg-gold-400',
    activeClass: 'border-amber-400 bg-gold-100 text-amber-800',
  },
  {
    value: NUMBER_STATUS.paid,
    label: 'Pago',
    dot: 'bg-slate-400',
    activeClass: 'border-slate-400 bg-slate-100 text-slate-700',
  },
]

export default function AdminNumbers() {
  const { campaigns, setNumbersStatus } = useCampaigns()
  const [campaignId, setCampaignId] = useState(() => campaigns[0]?.id ?? '')
  const [tool, setTool] = useState(NUMBER_STATUS.reserved)

  const campaign = campaigns.find((item) => item.id === campaignId) ?? null
  const { filter, setFilter, stats, visibleNumbers, counts } = useNumberFilters(campaign)

  if (!campaign) {
    return (
      <EmptyState
        title="Nenhuma campanha cadastrada"
        description="Crie uma campanha para gerenciar a disponibilidade dos números."
        action={<Button to="/admin/campanhas/nova">Criar campanha</Button>}
      />
    )
  }

  const filterOptions = numberFilterOptions.map((option) => ({ ...option, count: counts[option.key] }))
  const activeTool = tools.find((item) => item.value === tool)

  const applyToAllVisible = () => {
    setNumbersStatus(
      campaign.id,
      visibleNumbers.map((item) => item.index),
      tool,
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <Field label="Campanha" htmlFor="admin-campaign" className="lg:w-80">
          <Select id="admin-campaign" value={campaignId} onChange={(event) => setCampaignId(event.target.value)}>
            {campaigns.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Field>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNumbersStatus(campaign.id, campaign.numbers.map((_, index) => index), NUMBER_STATUS.available)}
          >
            Liberar todos
          </Button>
          <Button variant="outline" size="sm" onClick={applyToAllVisible}>
            Aplicar “{activeTool?.label}” aos visíveis
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total" value={formatInteger(stats.total)} icon={Hash} tone="brand" />
        <StatCard label="Disponíveis" value={formatInteger(stats.available)} icon={Ticket} tone="grass" />
        <StatCard label="Reservados" value={formatInteger(stats.reserved)} icon={Clock4} tone="gold" />
        <StatCard label="Pagos" value={formatInteger(stats.paid)} icon={CheckCircle2} tone="slate" />
      </div>

      <section className="card p-4 sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <FilterTabs options={filterOptions} value={filter} onChange={setFilter} ariaLabel="Filtrar números" />

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
            <span className="pl-1.5 pr-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Pincel
            </span>
            {tools.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setTool(item.value)}
                aria-pressed={tool === item.value}
                className={cx(
                  'focus-ring inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition',
                  tool === item.value
                    ? item.activeClass
                    : 'border-transparent bg-white text-slate-500 hover:text-ink-900',
                )}
              >
                <span className={cx('h-2 w-2 rounded-full', item.dot)} aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 rounded-xl bg-brand-50/60 p-3 text-xs text-brand-900 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
            Clique em um número para aplicar “{activeTool?.label}”. A grade pública reflete as mudanças
            imediatamente.
          </span>
          <span className="font-semibold">
            Exibindo {formatInteger(visibleNumbers.length)} de {formatInteger(stats.total)}
          </span>
        </div>

        <NumberLegend className="mt-3" />

        <div className="mt-4">
          {visibleNumbers.length === 0 ? (
            <EmptyState
              title="Nenhum número nesta situação"
              description="Selecione outro filtro para gerenciar a grade."
              action={
                <Button variant="outline" size="sm" onClick={() => setFilter('all')}>
                  Ver todos
                </Button>
              }
            />
          ) : (
            <NumberGrid
              items={visibleNumbers}
              onToggle={(index) => setNumbersStatus(campaign.id, [index], tool)}
              titleFor={(index, status) => `${String(index).padStart(3, '0')} · ${NUMBER_STATUS_LABELS[status]}`}
            />
          )}
        </div>

        <p className="mt-4 flex items-start gap-1.5 border-t border-slate-100 pt-3 text-[11px] leading-relaxed text-slate-400">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Gerenciamento visual para demonstração. Em produção, esta rotina exigiria autenticação,
          auditoria e controle transacional de reservas.
        </p>
      </section>
    </div>
  )
}
