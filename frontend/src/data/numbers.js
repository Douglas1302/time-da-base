import { NUMBER_STATUS } from '../utils/format'

function hashSeed(text) {
  let hash = 2166136261
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed) {
  let state = seed
  return function next() {
    state = (state + 0x6d2b79f5) | 0
    let result = Math.imul(state ^ (state >>> 15), 1 | state)
    result = (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^ result
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Gera os 1.000 números iniciais de uma campanha com distribuição determinística,
 * para que a demonstração fique igual a cada recarregamento da página.
 */
export function buildNumbers(seedKey, { total = 1000, paidRatio = 0.35, reservedRatio = 0.08 } = {}) {
  const random = mulberry32(hashSeed(seedKey))
  const numbers = []

  for (let index = 0; index < total; index += 1) {
    const roll = random()
    if (roll < paidRatio) numbers.push(NUMBER_STATUS.paid)
    else if (roll < paidRatio + reservedRatio) numbers.push(NUMBER_STATUS.reserved)
    else numbers.push(NUMBER_STATUS.available)
  }

  return numbers
}

export function buildEmptyNumbers(total = 1000) {
  return Array.from({ length: total }, () => NUMBER_STATUS.available)
}

export function resizeNumbers(numbers, total) {
  if (numbers.length === total) return numbers
  const next = buildEmptyNumbers(total)
  const limit = Math.min(numbers.length, total)
  for (let index = 0; index < limit; index += 1) {
    next[index] = numbers[index]
  }
  return next
}
