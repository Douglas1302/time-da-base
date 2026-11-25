import { useState } from 'react'
import { Info, Save, X } from 'lucide-react'
import Button from './Button'
import ImageUploader from './ImageUploader'
import { Field, Input, Select, Textarea } from './Field'
import { campaignStatusOptions } from '../data/campaigns'
import { formatCurrency } from '../utils/format'

function toFormState(campaign) {
  if (!campaign) {
    return {
      name: '',
      beneficiary: '',
      tagline: '',
      description: '',
      pricePerNumber: '5',
      totalNumbers: '1000',
      drawDate: '',
      status: 'active',
      image: '',
      regulation: '',
      prizeDetailsText: '',
    }
  }

  return {
    name: campaign.name ?? '',
    beneficiary: campaign.beneficiary ?? '',
    tagline: campaign.tagline ?? '',
    description: campaign.description ?? '',
    pricePerNumber: String(campaign.pricePerNumber ?? ''),
    totalNumbers: String(campaign.totalNumbers ?? 1000),
    drawDate: campaign.drawDate ?? '',
    status: campaign.status ?? 'active',
    image: campaign.image ?? '',
    regulation: campaign.regulation ?? '',
    prizeDetailsText: (campaign.prizeDetails ?? []).join('\n'),
  }
}

function validate(form) {
  const errors = {}
  if (form.name.trim().length < 5) {
    errors.name = 'Informe um nome com pelo menos 5 caracteres.'
  }
  if (form.description.trim().length < 20) {
    errors.description = 'Descreva a campanha com pelo menos 20 caracteres.'
  }
  const price = Number(form.pricePerNumber)
  if (!form.pricePerNumber || Number.isNaN(price) || price <= 0) {
    errors.pricePerNumber = 'Informe um valor maior que zero.'
  }
  const total = Number(form.totalNumbers)
  if (!Number.isInteger(total) || total < 10 || total > 1000) {
    errors.totalNumbers = 'Use um número inteiro entre 10 e 1.000.'
  }
  if (!form.drawDate) {
    errors.drawDate = 'Informe a data prevista.'
  }
  return errors
}

export default function CampaignForm({ initialCampaign, submitLabel = 'Salvar campanha', onSubmit, onCancel }) {
  const [form, setForm] = useState(() => toFormState(initialCampaign))
  const [errors, setErrors] = useState({})

  const update = (key) => (event) => {
    const value = event.target?.value ?? event
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      document.getElementById(`campaign-${firstError}`)?.focus()
      return
    }

    onSubmit({
      name: form.name.trim(),
      beneficiary: form.beneficiary.trim(),
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      pricePerNumber: Number(form.pricePerNumber),
      totalNumbers: Number(form.totalNumbers),
      drawDate: form.drawDate,
      status: form.status,
      image: form.image,
      regulation: form.regulation.trim(),
      prizeDetails: form.prizeDetailsText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    })
  }

  const estimatedTotal = (Number(form.pricePerNumber) || 0) * (Number(form.totalNumbers) || 0)

  return (
    <form id="campaign-form" onSubmit={handleSubmit} noValidate className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        <section className="card p-5 sm:p-6">
          <h2 className="font-display text-base font-bold text-ink-900">Informações principais</h2>
          <p className="mt-1 text-sm text-slate-500">Dados exibidos na listagem e na página da campanha.</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Nome da campanha" htmlFor="campaign-name" required error={errors.name} className="sm:col-span-2">
              <Input
                id="campaign-name"
                value={form.name}
                onChange={update('name')}
                placeholder="Ex.: SUV 0km na Garagem"
                invalid={Boolean(errors.name)}
                autoComplete="off"
              />
            </Field>

            <Field label="Categoria beneficiada" htmlFor="campaign-beneficiary" hint="Aparece como etiqueta no card.">
              <Input
                id="campaign-beneficiary"
                value={form.beneficiary}
                onChange={update('beneficiary')}
                placeholder="Ex.: Categoria Sub-15"
              />
            </Field>

            <Field label="Chamada curta" htmlFor="campaign-tagline" hint="Resumo de uma linha para o card.">
              <Input
                id="campaign-tagline"
                value={form.tagline}
                onChange={update('tagline')}
                placeholder="Ex.: Apoie a viagem da Sub-15 e concorra a um SUV 0km."
              />
            </Field>

            <Field
              label="Descrição"
              htmlFor="campaign-description"
              required
              error={errors.description}
              className="sm:col-span-2"
            >
              <Textarea
                id="campaign-description"
                value={form.description}
                onChange={update('description')}
                rows={4}
                placeholder="Explique o objetivo da campanha e as condições do prêmio."
                invalid={Boolean(errors.description)}
              />
            </Field>
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="font-display text-base font-bold text-ink-900">Números e prêmio</h2>
          <p className="mt-1 text-sm text-slate-500">Valores são ilustrativos nesta etapa do projeto.</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Valor por número (R$)" htmlFor="campaign-pricePerNumber" required error={errors.pricePerNumber}>
              <Input
                id="campaign-pricePerNumber"
                type="number"
                min="0.01"
                step="0.01"
                value={form.pricePerNumber}
                onChange={update('pricePerNumber')}
                invalid={Boolean(errors.pricePerNumber)}
              />
            </Field>

            <Field
              label="Quantidade de números"
              htmlFor="campaign-totalNumbers"
              required
              error={errors.totalNumbers}
              hint="A grade vai de 000 a 999, então o máximo é 1.000."
            >
              <Input
                id="campaign-totalNumbers"
                type="number"
                min="10"
                max="1000"
                step="1"
                value={form.totalNumbers}
                onChange={update('totalNumbers')}
                invalid={Boolean(errors.totalNumbers)}
              />
            </Field>

            <Field label="Data prevista" htmlFor="campaign-drawDate" required error={errors.drawDate}>
              <Input
                id="campaign-drawDate"
                type="date"
                value={form.drawDate}
                onChange={update('drawDate')}
                invalid={Boolean(errors.drawDate)}
              />
            </Field>

            <Field label="Status da campanha" htmlFor="campaign-status">
              <Select id="campaign-status" value={form.status} onChange={update('status')}>
                {campaignStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              label="Informações do prêmio"
              htmlFor="campaign-prizeDetailsText"
              hint="Um item por linha. Cada linha vira um tópico na página da campanha."
              className="sm:col-span-2"
            >
              <Textarea
                id="campaign-prizeDetailsText"
                value={form.prizeDetailsText}
                onChange={update('prizeDetailsText')}
                rows={4}
                placeholder={'SUV 0km com um ano de seguro\nEntrega em até 30 dias após a apuração'}
              />
            </Field>
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="font-display text-base font-bold text-ink-900">Regulamento ilustrativo</h2>
          <p className="mt-1 text-sm text-slate-500">
            Texto exibido na página pública da campanha. A conformidade legal deve ser validada antes de
            qualquer lançamento real.
          </p>
          <Field htmlFor="campaign-regulation" label="Regulamento" className="mt-5">
            <Textarea
              id="campaign-regulation"
              value={form.regulation}
              onChange={update('regulation')}
              rows={6}
              placeholder="Descreva as regras, critérios de apuração e condições de entrega."
            />
          </Field>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="card p-5 sm:p-6">
          <h2 className="font-display text-base font-bold text-ink-900">Imagem do prêmio</h2>
          <p className="mt-1 mb-4 text-sm text-slate-500">Upload visual para a demonstração.</p>
          <ImageUploader value={form.image} onChange={update('image')} />
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="font-display text-base font-bold text-ink-900">Resumo</h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Números</dt>
              <dd className="font-semibold text-ink-900">{Number(form.totalNumbers) || 0}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Valor por número</dt>
              <dd className="font-semibold text-ink-900">{formatCurrency(Number(form.pricePerNumber) || 0)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-2.5">
              <dt className="font-semibold text-ink-900">Potencial ilustrativo</dt>
              <dd className="font-display text-lg font-extrabold text-ink-900">{formatCurrency(estimatedTotal)}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-col gap-2">
            <Button type="submit" icon={Save} full>
              {submitLabel}
            </Button>
            <Button type="button" variant="ghost" icon={X} onClick={onCancel} full>
              Cancelar
            </Button>
          </div>

          <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-snug text-slate-400">
            <Info className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
            Protótipo: as campanhas ficam apenas no estado do navegador e são perdidas ao recarregar.
          </p>
        </section>
      </aside>
    </form>
  )
}
