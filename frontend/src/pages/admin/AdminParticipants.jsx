import { useState } from 'react'
import { CheckCircle2, CircleDollarSign, Clock4, Search, Users } from 'lucide-react'
import EmptyState from '../../components/EmptyState'
import FilterTabs from '../../components/FilterTabs'
import ParticipantsTable from '../../components/ParticipantsTable'
import StatCard from '../../components/StatCard'
import { Field, Input } from '../../components/Field'
import { useCampaigns } from '../../hooks/useCampaigns'
import { formatCurrency, formatInteger } from '../../utils/format'

export default function AdminParticipants() {
  const { participants, getCampaignById, campaigns } = useCampaigns()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const withValue = participants.map((participant) => {
    const campaign = campaigns.find((item) => item.id === participant.campaignId)
    return {
      participant,
      campaignName: campaign?.name ?? '',
      value: (campaign?.pricePerNumber ?? 0) * participant.quantity,
    }
  })

  const filtered = withValue.filter((item) => {
    const matchesStatus = status === 'all' || item.participant.status === status
    const term = search.trim().toLowerCase()
    const matchesSearch =
      !term ||
      item.participant.name.toLowerCase().includes(term) ||
      item.campaignName.toLowerCase().includes(term)
    return matchesStatus && matchesSearch
  })

  const totalValue = withValue.reduce((sum, item) => sum + item.value, 0)
  const paidCount = withValue.filter((item) => item.participant.status === 'paid').length
  const reservedCount = withValue.filter((item) => item.participant.status === 'reserved').length

  const options = [
    { key: 'all', label: 'Todos', count: participants.length },
    { key: 'paid', label: 'Pagos', count: paidCount },
    { key: 'reserved', label: 'Reservados', count: reservedCount },
  ]

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Participantes" value={formatInteger(participants.length)} icon={Users} tone="brand" hint="Registros fictícios" />
        <StatCard label="Pagamentos confirmados" value={formatInteger(paidCount)} icon={CheckCircle2} tone="grass" />
        <StatCard label="Reservas pendentes" value={formatInteger(reservedCount)} icon={Clock4} tone="gold" />
        <StatCard label="Valor ilustrativo" value={formatCurrency(totalValue)} icon={CircleDollarSign} tone="slate" hint="Somatório simulado" />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterTabs options={options} value={status} onChange={setStatus} ariaLabel="Filtrar participantes" />
        <Field htmlFor="participant-search" className="lg:w-72">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <Input
              id="participant-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome ou campanha"
              className="pl-9"
            />
          </div>
        </Field>
      </div>

      <section className="card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState
              title="Nenhum participante encontrado"
              description="Ajuste a busca ou os filtros para visualizar outros registros."
            />
          </div>
        ) : (
          <ParticipantsTable
            participants={filtered.map((item) => item.participant)}
            getCampaignById={getCampaignById}
            className="px-2 pb-2 pt-1"
          />
        )}
      </section>

      <p className="text-xs text-slate-400">
        Todos os nomes, telefones e CPFs são fictícios e exibidos parcialmente. Nenhuma informação
        pessoal real é utilizada neste protótipo.
      </p>
    </div>
  )
}
