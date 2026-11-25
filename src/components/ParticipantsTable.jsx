import { CalendarDays, Ticket } from 'lucide-react'
import Badge from './Badge'
import { formatCurrency, formatDate, formatInteger, maskCpfPartial, maskPhone } from '../utils/format'

export default function ParticipantsTable({ participants, getCampaignById, className }) {
  return (
    <div className={className}>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-500">
              <th scope="col" className="px-4 py-3 font-bold">Participante</th>
              <th scope="col" className="px-4 py-3 font-bold">Contato</th>
              <th scope="col" className="px-4 py-3 font-bold">Campanha</th>
              <th scope="col" className="px-4 py-3 text-center font-bold">Números</th>
              <th scope="col" className="px-4 py-3 text-right font-bold">Valor</th>
              <th scope="col" className="px-4 py-3 font-bold">Situação</th>
              <th scope="col" className="px-4 py-3 font-bold">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {participants.map((participant) => {
              const campaign = getCampaignById(participant.campaignId)
              const value = (campaign?.pricePerNumber ?? 0) * participant.quantity
              return (
                <tr key={participant.id} className="transition hover:bg-slate-50/80">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink-900">{participant.name}</p>
                    <p className="text-xs text-slate-400">{maskCpfPartial(participant.cpf)}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{maskPhone(participant.phone)}</td>
                  <td className="px-4 py-3 text-slate-600">{campaign?.name ?? 'Campanha removida'}</td>
                  <td className="px-4 py-3 text-center font-semibold tabular-nums text-ink-900">
                    {formatInteger(participant.quantity)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-ink-900">
                    {formatCurrency(value)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={participant.status === 'paid' ? 'grass' : 'gold'} dot>
                      {participant.status === 'paid' ? 'Pago' : 'Reservado'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(participant.createdAt)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 md:hidden">
        {participants.map((participant) => {
          const campaign = getCampaignById(participant.campaignId)
          const value = (campaign?.pricePerNumber ?? 0) * participant.quantity
          return (
            <li key={participant.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink-900">{participant.name}</p>
                  <p className="text-xs text-slate-400">
                    {maskCpfPartial(participant.cpf)} · {maskPhone(participant.phone)}
                  </p>
                </div>
                <Badge tone={participant.status === 'paid' ? 'grass' : 'gold'} dot>
                  {participant.status === 'paid' ? 'Pago' : 'Reservado'}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-slate-600">{campaign?.name ?? 'Campanha removida'}</p>
              <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Ticket className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatInteger(participant.quantity)} números
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatDate(participant.createdAt)}
                </span>
                <span className="text-ink-900">{formatCurrency(value)}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
