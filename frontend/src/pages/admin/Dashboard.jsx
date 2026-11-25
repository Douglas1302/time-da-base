import { Link } from 'react-router-dom'
import { ArrowUpRight, CircleDollarSign, Megaphone, Plus, Ticket, TrendingUp, Users } from 'lucide-react'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import DistributionBar from '../../components/DistributionBar'
import EmptyState from '../../components/EmptyState'
import ParticipantsTable from '../../components/ParticipantsTable'
import StatCard from '../../components/StatCard'
import { useCampaigns } from '../../hooks/useCampaigns'
import { CAMPAIGN_STATUS_LABELS, formatCurrency, formatDate, formatInteger } from '../../utils/format'
import { aggregateCampaigns, getCampaignStats } from '../../utils/stats'

const statusTone = { active: 'grass', draft: 'gold', closed: 'slate' }

export default function Dashboard() {
  const { campaigns, participants, getCampaignById } = useCampaigns()
  const totals = aggregateCampaigns(campaigns)
  const activeCount = campaigns.filter((campaign) => campaign.status === 'active').length
  const rows = campaigns.map((campaign) => ({ campaign, stats: getCampaignStats(campaign) }))
  const paidParticipants = participants.filter((participant) => participant.status === 'paid').length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {formatInteger(campaigns.length)} campanhas cadastradas · {formatInteger(activeCount)} em andamento
        </p>
        <div className="flex flex-wrap gap-2">
          <Button to="/admin/campanhas/nova" icon={Plus} size="sm">
            Nova campanha
          </Button>
          <Button to="/admin/numeros" variant="outline" size="sm" icon={Ticket}>
            Gestão de números
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Campanhas" value={formatInteger(totals.campaigns)} hint={`${activeCount} em andamento`} icon={Megaphone} tone="brand" />
        <StatCard label="Total de números" value={formatInteger(totals.total)} hint="Todas as campanhas" icon={Ticket} tone="slate" />
        <StatCard label="Disponíveis" value={formatInteger(totals.available)} hint="Aptos para seleção" icon={Ticket} tone="grass" />
        <StatCard label="Reservados" value={formatInteger(totals.reserved)} hint="Aguardando pagamento" icon={Users} tone="gold" />
        <StatCard label="Pagos" value={formatInteger(totals.paid)} hint="Participações confirmadas" icon={Megaphone} tone="slate" />
        <StatCard
          label="Arrecadação ilustrativa"
          value={formatCurrency(totals.revenue)}
          hint="Somente simulação"
          icon={CircleDollarSign}
          tone="brand"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-display text-base font-bold text-ink-900">Campanhas e ocupação</h2>
              <p className="text-xs text-slate-500">Distribuição dos números por situação</p>
            </div>
            <Link to="/admin/campanhas" className="link-muted inline-flex items-center gap-1">
              Gerenciar
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="divide-y divide-slate-100">
            {rows.map(({ campaign, stats }) => (
              <li key={campaign.id} className="px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-3">
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
                  <div className="flex items-center gap-2">
                    <Badge tone={statusTone[campaign.status] ?? 'slate'} dot>
                      {CAMPAIGN_STATUS_LABELS[campaign.status] ?? campaign.status}
                    </Badge>
                    <Button to={`/admin/campanhas/${campaign.id}/editar`} variant="ghost" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
                <DistributionBar stats={stats} className="mt-3" />
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-4">
          <section className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-base font-bold text-ink-900">Participantes recentes</h2>
              <Link to="/admin/participantes" className="link-muted">
                Ver todos
              </Link>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {formatInteger(participants.length)} registros fictícios · {formatInteger(paidParticipants)} pagos
            </p>

            <ul className="mt-4 space-y-3">
              {participants.slice(0, 5).map((participant) => {
                const campaign = getCampaignById(participant.campaignId)
                return (
                  <li key={participant.id} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-xs font-bold text-brand-700">
                      {participant.name
                        .split(' ')
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join('')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-900">{participant.name}</p>
                      <p className="truncate text-xs text-slate-400">{campaign?.name ?? 'Campanha removida'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold tabular-nums text-ink-900">
                        {formatInteger(participant.quantity)}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">números</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className="card p-5">
            <h2 className="font-display text-base font-bold text-ink-900">Próximas datas</h2>
            <ul className="mt-3 space-y-3">
              {campaigns
                .filter((campaign) => campaign.status === 'active')
                .sort((a, b) => (a.drawDate > b.drawDate ? 1 : -1))
                .slice(0, 4)
                .map((campaign) => (
                  <li key={campaign.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate text-slate-600">{campaign.name}</span>
                    <span className="shrink-0 font-semibold text-ink-900">{formatDate(campaign.drawDate)}</span>
                  </li>
                ))}
            </ul>
            <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-slate-50 p-3 text-[11px] font-semibold text-slate-500">
              <TrendingUp className="h-3.5 w-3.5 text-grass-500" aria-hidden="true" />
              Ocupação média de {Math.round(rows.reduce((sum, row) => sum + row.stats.occupancy, 0) / (rows.length || 1))}%
            </div>
          </section>
        </div>
      </div>

      <section className="card overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <h2 className="font-display text-base font-bold text-ink-900">Últimos participantes</h2>
          <Link to="/admin/participantes" className="link-muted">
            Ver lista completa
          </Link>
        </div>
        {participants.length === 0 ? (
          <EmptyState title="Nenhum participante" description="As participações confirmadas aparecerão aqui." />
        ) : (
          <ParticipantsTable
            participants={participants.slice(0, 6)}
            getCampaignById={getCampaignById}
            className="px-2 pb-2"
          />
        )}
      </section>
    </div>
  )
}
