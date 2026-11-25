import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, CheckCircle2, Edit3, Plus, Search, X } from 'lucide-react'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'
import FilterTabs from '../../components/FilterTabs'
import ProgressBar from '../../components/ProgressBar'
import { Field, Input } from '../../components/Field'
import { useCampaigns } from '../../hooks/useCampaigns'
import { CAMPAIGN_STATUS_LABELS, formatCurrency, formatDate, formatInteger } from '../../utils/format'
import { getCampaignStats } from '../../utils/stats'

const statusTone = { active: 'grass', draft: 'gold', closed: 'slate' }

export default function AdminCampaigns() {
  const { campaigns } = useCampaigns()
  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const flash = location.state?.flash

  const filtered = campaigns.filter((campaign) => {
    const matchesStatus = status === 'all' || campaign.status === status
    const term = search.trim().toLowerCase()
    const matchesSearch =
      !term ||
      campaign.name.toLowerCase().includes(term) ||
      campaign.beneficiary.toLowerCase().includes(term)
    return matchesStatus && matchesSearch
  })

  const options = [
    { key: 'all', label: 'Todas', count: campaigns.length },
    { key: 'active', label: 'Em andamento', count: campaigns.filter((item) => item.status === 'active').length },
    { key: 'draft', label: 'Rascunhos', count: campaigns.filter((item) => item.status === 'draft').length },
    { key: 'closed', label: 'Encerradas', count: campaigns.filter((item) => item.status === 'closed').length },
  ]

  return (
    <div className="space-y-5">
      {flash && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-grass-200 bg-grass-50 px-4 py-3 text-sm text-grass-800">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            {flash}
          </span>
          <button
            type="button"
            onClick={() => navigate(location.pathname, { replace: true, state: null })}
            className="focus-ring rounded p-0.5 text-grass-600 transition hover:text-grass-800"
            aria-label="Fechar aviso"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterTabs options={options} value={status} onChange={setStatus} ariaLabel="Filtrar campanhas" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Field htmlFor="campaign-search" className="sm:w-64">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <Input
                id="campaign-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar campanha"
                className="pl-9"
              />
            </div>
          </Field>
          <Button to="/admin/campanhas/nova" icon={Plus}>
            Nova campanha
          </Button>
        </div>
      </div>

      <section className="card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState
              title="Nenhuma campanha encontrada"
              description="Ajuste os filtros ou crie uma nova campanha para o protótipo."
              action={
                <Button to="/admin/campanhas/nova" variant="outline" icon={Plus}>
                  Criar campanha
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-500">
                    <th scope="col" className="px-5 py-3 font-bold">Campanha</th>
                    <th scope="col" className="px-4 py-3 font-bold">Status</th>
                    <th scope="col" className="px-4 py-3 text-center font-bold">Disponíveis</th>
                    <th scope="col" className="px-4 py-3 font-bold">Ocupação</th>
                    <th scope="col" className="px-4 py-3 font-bold">Data prevista</th>
                    <th scope="col" className="px-5 py-3 text-right font-bold">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((campaign) => {
                    const stats = getCampaignStats(campaign)
                    return (
                      <tr key={campaign.id} className="transition hover:bg-slate-50/70">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={campaign.image}
                              alt=""
                              className="h-10 w-14 shrink-0 rounded-lg object-cover"
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-ink-900">{campaign.name}</p>
                              <p className="text-xs text-slate-400">
                                {campaign.beneficiary} · {formatCurrency(campaign.pricePerNumber)} / número
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge tone={statusTone[campaign.status] ?? 'slate'} dot>
                            {CAMPAIGN_STATUS_LABELS[campaign.status] ?? campaign.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center font-semibold tabular-nums text-ink-900">
                          {formatInteger(stats.available)}
                          <span className="text-xs font-normal text-slate-400"> / {formatInteger(stats.total)}</span>
                        </td>
                        <td className="w-40 px-4 py-3">
                          <ProgressBar value={stats.taken} total={stats.total} size="sm" showPercentage />
                        </td>
                        <td className="px-4 py-3 text-slate-600">{formatDate(campaign.drawDate)}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              to={`/admin/campanhas/${campaign.id}/editar`}
                              variant="ghost"
                              size="sm"
                              icon={Edit3}
                            >
                              Editar
                            </Button>
                            <Link
                              to={`/campanhas/${campaign.slug}`}
                              className="focus-ring inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-[13px] font-semibold text-brand-700 transition hover:bg-brand-50"
                            >
                              Ver
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-slate-100 lg:hidden">
              {filtered.map((campaign) => {
                const stats = getCampaignStats(campaign)
                return (
                  <li key={campaign.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={campaign.image}
                        alt=""
                        className="h-12 w-16 shrink-0 rounded-lg object-cover"
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-ink-900">{campaign.name}</p>
                        <p className="text-xs text-slate-400">{campaign.beneficiary}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <Badge tone={statusTone[campaign.status] ?? 'slate'} dot>
                            {CAMPAIGN_STATUS_LABELS[campaign.status] ?? campaign.status}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {formatInteger(stats.available)} disponíveis · {formatDate(campaign.drawDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <ProgressBar value={stats.taken} total={stats.total} size="sm" label="Ocupação" />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button to={`/admin/campanhas/${campaign.id}/editar`} variant="outline" size="sm" full icon={Edit3}>
                        Editar
                      </Button>
                      <Button to={`/campanhas/${campaign.slug}`} variant="ghost" size="sm" full>
                        Ver página
                      </Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </section>

      <p className="text-xs text-slate-400">
        {filtered.length} de {campaigns.length} campanhas exibidas. Alterações existem apenas neste
        navegador.
      </p>
    </div>
  )
}
