export const NUMBER_STATUS = {
  available: 'available',
  reserved: 'reserved',
  paid: 'paid',
}

export const NUMBER_STATUS_LABELS = {
  [NUMBER_STATUS.available]: 'Disponível',
  [NUMBER_STATUS.reserved]: 'Reservado',
  [NUMBER_STATUS.paid]: 'Pago',
}

export const CAMPAIGN_STATUS_LABELS = {
  active: 'Em andamento',
  draft: 'Rascunho',
  closed: 'Encerrada',
}

export function formatNumber(value) {
  return String(value).padStart(3, '0')
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value) || 0)
}

export function formatDate(isoDate) {
  if (!isoDate) return '—'
  const [year, month, day] = String(isoDate).split('-')
  if (!year || !month || !day) return isoDate
  return `${day}/${month}/${year}`
}

export function formatInteger(value) {
  return new Intl.NumberFormat('pt-BR').format(Number(value) || 0)
}

export function maskPhone(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function maskCpf(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

export function maskCpfPartial(value) {
  const digits = String(value).replace(/\D/g, '')
  if (digits.length < 11) return maskCpf(digits)
  return `${digits.slice(0, 3)}.***.***-${digits.slice(9)}`
}

export function toSlug(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}
