import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Info, Lock, ShieldCheck, Ticket, UserRound } from 'lucide-react'
import Button from '../components/Button'
import NotFoundState from '../components/NotFoundState'
import StepIndicator from '../components/StepIndicator'
import { Field, Input } from '../components/Field'
import { useCampaigns } from '../hooks/useCampaigns'
import { useSelection, useSelectionTotals } from '../hooks/useSelection'
import { formatCurrency, formatInteger, formatNumber, maskCpf, maskPhone } from '../utils/format'

const steps = [
  { key: 'numbers', label: 'Números' },
  { key: 'summary', label: 'Resumo' },
  { key: 'payment', label: 'Pagamento' },
]

export default function ParticipationSummary() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { getCampaignBySlug } = useCampaigns()
  const campaign = getCampaignBySlug(slug)
  const { selection, setBuyer, reserveSelection } = useSelection()
  const totals = useSelectionTotals(campaign)

  const [form, setForm] = useState(() => ({
    name: selection.buyer?.name ?? '',
    phone: selection.buyer?.phone ?? '',
    cpf: selection.buyer?.cpf ?? '',
    accepted: selection.buyer?.accepted ?? false,
  }))
  const [errors, setErrors] = useState({})

  if (!campaign) {
    return (
      <NotFoundState
        code="—"
        title="Campanha não encontrada"
        description="Não foi possível recuperar a campanha deste resumo."
      />
    )
  }

  if (!totals.belongsToCampaign || totals.quantity === 0) {
    return <Navigate to={`/campanhas/${campaign.slug}/numeros`} replace />
  }

  const update = (key) => (event) => {
    const value = event.target?.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((current) => ({
      ...current,
      [key]: key === 'phone' ? maskPhone(value) : key === 'cpf' ? maskCpf(value) : value,
    }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const phoneDigits = form.phone.replace(/\D/g, '')
    const cpfDigits = form.cpf.replace(/\D/g, '')
    const nextErrors = {}

    if (form.name.trim().length < 5 || !form.name.trim().includes(' ')) {
      nextErrors.name = 'Informe seu nome e sobrenome.'
    }
    if (phoneDigits.length < 10) {
      nextErrors.phone = 'Informe um telefone com DDD.'
    }
    if (cpfDigits.length !== 11) {
      nextErrors.cpf = 'Informe um CPF com 11 dígitos.'
    }
    if (!form.accepted) {
      nextErrors.accepted = 'É necessário aceitar o regulamento ilustrativo.'
    }

    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      document.getElementById(`buyer-${firstError}`)?.focus()
      return
    }

    setBuyer({
      name: form.name.trim(),
      phone: phoneDigits,
      cpf: cpfDigits,
      accepted: true,
    })
    reserveSelection()
    navigate(`/campanhas/${campaign.slug}/pagamento`)
  }

  return (
    <div className="pb-16">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page py-4">
          <Link
            to={`/campanhas/${campaign.slug}/numeros`}
            className="focus-ring inline-flex items-center gap-1.5 rounded text-sm font-semibold text-slate-500 transition hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Alterar números
          </Link>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">Resumo da participação</h1>
              <p className="mt-1 text-sm text-slate-500">
                Confira os números e preencha seus dados para continuar.
              </p>
            </div>
            <StepIndicator steps={steps} current="summary" />
          </div>
        </div>
      </div>

      <div className="container-page pt-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={handleSubmit} noValidate className="card p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <UserRound className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-base font-bold text-ink-900">Seus dados</h2>
                <p className="text-xs text-slate-500">Formulário ilustrativo — nada é enviado a servidores.</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Nome completo"
                htmlFor="buyer-name"
                required
                error={errors.name}
                className="sm:col-span-2"
              >
                <Input
                  id="buyer-name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Ex.: Maria Aparecida Santos"
                  invalid={Boolean(errors.name)}
                  autoComplete="name"
                />
              </Field>

              <Field label="Telefone com DDD" htmlFor="buyer-phone" required error={errors.phone}>
                <Input
                  id="buyer-phone"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="(11) 98888-7777"
                  inputMode="tel"
                  invalid={Boolean(errors.phone)}
                  autoComplete="tel"
                />
              </Field>

              <Field label="CPF" htmlFor="buyer-cpf" required error={errors.cpf} hint="Use um CPF fictício, por exemplo 000.000.000-00.">
                <Input
                  id="buyer-cpf"
                  value={form.cpf}
                  onChange={update('cpf')}
                  placeholder="000.000.000-00"
                  inputMode="numeric"
                  invalid={Boolean(errors.cpf)}
                />
              </Field>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label htmlFor="buyer-accepted" className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600">
                <input
                  id="buyer-accepted"
                  type="checkbox"
                  checked={form.accepted}
                  onChange={update('accepted')}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>
                  Li e aceito o regulamento ilustrativo desta campanha e entendo que este ambiente é
                  apenas demonstrativo.
                </span>
              </label>
              {errors.accepted && (
                <p className="field-error pl-6">
                  <Info className="h-3.5 w-3.5" aria-hidden="true" />
                  {errors.accepted}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse sm:items-center">
              <Button type="submit" size="lg" iconRight={ArrowRight}>
                Confirmar e ir para o pagamento
              </Button>
              <Button to={`/campanhas/${campaign.slug}/numeros`} variant="ghost" size="lg" icon={ArrowLeft}>
                Voltar e alterar números
              </Button>
            </div>

            <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-snug text-slate-400">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Nenhum pagamento real será processado. Ao confirmar, os números ficam reservados apenas
              no estado do navegador.
            </p>
          </form>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <div className="card overflow-hidden">
              <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/80 p-4">
                <img
                  src={campaign.image}
                  alt=""
                  className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-brand-600">
                    {campaign.beneficiary}
                  </p>
                  <p className="truncate font-display text-sm font-bold text-ink-900">{campaign.name}</p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Números selecionados
                </p>
                <div className="scrollbar-thin mt-2 flex max-h-44 flex-wrap gap-1.5 overflow-y-auto pr-1">
                  {totals.numbers.map((index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-brand-50 px-2 py-1 font-display text-xs font-bold text-brand-700 ring-1 ring-inset ring-brand-200"
                    >
                      {formatNumber(index)}
                    </span>
                  ))}
                </div>

                <dl className="mt-4 space-y-2.5 border-t border-slate-200 pt-4 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="inline-flex items-center gap-1.5 text-slate-500">
                      <Ticket className="h-3.5 w-3.5" aria-hidden="true" />
                      Quantidade
                    </dt>
                    <dd className="font-semibold text-ink-900">{formatInteger(totals.quantity)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-slate-500">Valor unitário</dt>
                    <dd className="font-semibold text-ink-900">{formatCurrency(totals.unitPrice)}</dd>
                  </div>
                  <div className="flex items-end justify-between border-t border-dashed border-slate-200 pt-3">
                    <dt className="font-bold text-ink-900">Valor total</dt>
                    <dd className="font-display text-2xl font-extrabold leading-none text-ink-900">
                      {formatCurrency(totals.total)}
                    </dd>
                  </div>
                </dl>

                <Link
                  to={`/campanhas/${campaign.slug}/numeros`}
                  className="mt-4 inline-flex text-xs font-semibold text-brand-700 transition hover:text-brand-800"
                >
                  Alterar seleção de números
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-grass-200 bg-grass-50 p-3 text-[11px] leading-snug text-grass-700">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Seus dados são mantidos apenas na memória do navegador durante esta demonstração.
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-grass-500" aria-hidden="true" />
              Próxima etapa: pagamento ilustrativo via Pix
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
