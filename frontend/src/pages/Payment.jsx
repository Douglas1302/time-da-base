import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock4, Copy, Info, Loader2, QrCode, ShieldCheck, Ticket, UserRound } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import NotFoundState from '../components/NotFoundState'
import PixQrCode from '../components/PixQrCode'
import StepIndicator from '../components/StepIndicator'
import { useCampaigns } from '../hooks/useCampaigns'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { useSelection, useSelectionTotals } from '../hooks/useSelection'
import { formatCurrency, formatInteger, formatNumber, maskCpfPartial, maskPhone } from '../utils/format'

const steps = [
  { key: 'numbers', label: 'Números' },
  { key: 'summary', label: 'Resumo' },
  { key: 'payment', label: 'Pagamento' },
]

export default function Payment() {
  const { slug } = useParams()
  const { getCampaignBySlug } = useCampaigns()
  const campaign = getCampaignBySlug(slug)
  const { selection, reserveSelection, confirmPayment } = useSelection()
  const totals = useSelectionTotals(campaign)
  const { copied, copy } = useCopyToClipboard()
  const [checking, setChecking] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  useEffect(() => {
    if (!campaign) return
    if (selection.paymentStatus === 'idle' && totals.quantity > 0) {
      reserveSelection()
    }
  }, [campaign, selection.paymentStatus, totals.quantity, reserveSelection])

  const pixCode = useMemo(() => {
    if (!campaign) return ''
    const reference = `${campaign.id}${totals.quantity}${totals.numbers.slice(0, 3).join('')}`
    return `00020126580014BR.GOV.BCB.PIX0136time-da-base-demo-${reference}5204000053039865406${Math.round(
      totals.total * 100,
    )}5802BR5913TIME DA BASE6009SAO PAULO62070503***6304DEMO`
  }, [campaign, totals.numbers, totals.quantity, totals.total])

  if (!campaign) {
    return (
      <NotFoundState
        code="—"
        title="Campanha não encontrada"
        description="Não foi possível recuperar os dados desta campanha."
      />
    )
  }

  if (!totals.belongsToCampaign || totals.quantity === 0) {
    return <Navigate to={`/campanhas/${campaign.slug}/numeros`} replace />
  }

  const confirmed = selection.paymentStatus === 'confirmed'
  const status = confirmed ? 'confirmed' : checking ? 'checking' : 'waiting'

  const handleSimulate = () => {
    setChecking(true)
    timeoutRef.current = setTimeout(() => {
      confirmPayment()
      setChecking(false)
    }, 1500)
  }

  const previewNumbers = totals.numbers.slice(0, 40)
  const hiddenCount = totals.numbers.length - previewNumbers.length

  return (
    <div className="pb-16">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page py-4">
          <Link
            to={`/campanhas/${campaign.slug}/resumo`}
            className="focus-ring inline-flex items-center gap-1.5 rounded text-sm font-semibold text-slate-500 transition hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao resumo
          </Link>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">Pagamento via Pix</h1>
              <p className="mt-1 text-sm text-slate-500">
                Tela demonstrativa — nenhuma cobrança real é gerada.
              </p>
            </div>
            <StepIndicator steps={steps} current="payment" />
          </div>
        </div>
      </div>

      <div className="container-page pt-6">
        {confirmed && (
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-grass-200 bg-grass-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-grass-600" aria-hidden="true" />
              <div>
                <p className="font-display text-base font-bold text-grass-800">
                  Pagamento aprovado (simulação)
                </p>
                <p className="mt-0.5 text-sm text-grass-700">
                  Seus {formatInteger(totals.quantity)} números foram marcados como pagos nesta
                  demonstração.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button to="/" variant="accent" size="sm">
                Voltar ao início
              </Button>
              <Button to="/#campanhas" variant="outline" size="sm">
                Ver outras campanhas
              </Button>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="space-y-5">
            <section className="card p-5 sm:p-6">
              <h2 className="font-display text-base font-bold text-ink-900">Resumo do pedido</h2>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
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
                  <p className="text-xs text-slate-500">
                    {formatInteger(campaign.totalNumbers)} números · valor unitário{' '}
                    {formatCurrency(campaign.pricePerNumber)}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Números reservados
              </p>
              <div className="scrollbar-thin mt-2 flex max-h-40 flex-wrap gap-1.5 overflow-y-auto pr-1">
                {previewNumbers.map((index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-brand-50 px-2 py-1 font-display text-xs font-bold text-brand-700 ring-1 ring-inset ring-brand-200"
                  >
                    {formatNumber(index)}
                  </span>
                ))}
                {hiddenCount > 0 && (
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">
                    +{hiddenCount}
                  </span>
                )}
              </div>

              <dl className="mt-5 space-y-2.5 border-t border-slate-200 pt-4 text-sm">
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
            </section>

            <section className="card p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink-900">
                <UserRound className="h-4 w-4 text-brand-600" aria-hidden="true" />
                Dados do participante
              </h2>
              {selection.buyer ? (
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Nome</dt>
                    <dd className="mt-0.5 font-semibold text-ink-900">{selection.buyer.name}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Telefone</dt>
                    <dd className="mt-0.5 font-semibold text-ink-900">{maskPhone(selection.buyer.phone)}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-400">CPF</dt>
                    <dd className="mt-0.5 font-semibold text-ink-900">{maskCpfPartial(selection.buyer.cpf)}</dd>
                  </div>
                </dl>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  Nenhum dado informado. Volte ao resumo para preencher o formulário.
                </p>
              )}
              <Link
                to={`/campanhas/${campaign.slug}/resumo`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 transition hover:text-brand-800"
              >
                Revisar dados e números
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </section>
          </div>

          <section className="card overflow-hidden lg:sticky lg:top-24 lg:h-fit">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink-900">
                <QrCode className="h-4 w-4 text-brand-600" aria-hidden="true" />
                QR Code Pix
              </h2>
              <Badge tone="gold">demonstrativo</Badge>
            </div>

            <div className="p-5">
              <div className="mx-auto flex w-fit items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <PixQrCode value={`${campaign.id}-${pixCode.length}-${totals.quantity}`} size={196} />
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold">
                {status === 'confirmed' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-grass-50 px-3 py-1.5 text-grass-700 ring-1 ring-inset ring-grass-200">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Pagamento aprovado
                  </span>
                )}
                {status === 'checking' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-brand-700 ring-1 ring-inset ring-brand-200">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    Verificando pagamento...
                  </span>
                )}
                {status === 'waiting' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1.5 text-amber-800 ring-1 ring-inset ring-amber-300">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse-soft" aria-hidden="true" />
                    Aguardando pagamento
                  </span>
                )}
              </div>

              <div className="mt-5">
                <label htmlFor="pix-code" className="field-label">
                  Pix copia e cola
                </label>
                <textarea
                  id="pix-code"
                  readOnly
                  value={pixCode}
                  rows={3}
                  className="field-input resize-none break-all font-mono text-[11px] leading-relaxed text-slate-600"
                  onFocus={(event) => event.target.select()}
                />
                <Button
                  variant={copied ? 'accent' : 'outline'}
                  full
                  className="mt-2"
                  icon={copied ? CheckCircle2 : Copy}
                  onClick={() => copy(pixCode)}
                >
                  {copied ? 'Código copiado!' : 'Copiar código Pix'}
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                {!confirmed ? (
                  <Button
                    variant="primary"
                    full
                    size="lg"
                    loading={checking}
                    onClick={handleSimulate}
                    iconRight={checking ? undefined : ArrowRight}
                  >
                    {checking ? 'Verificando...' : 'Simular pagamento aprovado'}
                  </Button>
                ) : (
                  <Button to="/" full size="lg" variant="accent" iconRight={ArrowRight}>
                    Concluir e voltar ao início
                  </Button>
                )}
              </div>

              <div className="mt-4 flex items-start gap-1.5 rounded-lg bg-slate-50 p-3 text-[11px] leading-snug text-slate-500">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                Este QR Code e o código copia e cola são gerados apenas para demonstração. Não realize
                pagamentos reais.
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400">
                <Clock4 className="h-3.5 w-3.5" aria-hidden="true" />
                Reserva simulada por 15 minutos
                <ShieldCheck className="ml-2 h-3.5 w-3.5 text-grass-500" aria-hidden="true" />
                Ambiente seguro (demo)
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
