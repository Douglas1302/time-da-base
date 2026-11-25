import { useMemo, useState } from 'react'
import { NUMBER_STATUS } from '../utils/format'
import { getCampaignStats } from '../utils/stats'

export const numberFilterOptions = [
  { key: 'all', label: 'Todos' },
  { key: NUMBER_STATUS.available, label: 'Disponíveis' },
  { key: NUMBER_STATUS.reserved, label: 'Reservados' },
  { key: NUMBER_STATUS.paid, label: 'Pagos' },
]

export function useNumberFilters(campaign) {
  const [filter, setFilter] = useState('all')
  const stats = useMemo(() => getCampaignStats(campaign), [campaign])

  const visibleNumbers = useMemo(() => {
    const numbers = campaign?.numbers ?? []
    if (filter === 'all') {
      return numbers.map((status, index) => ({ index, status }))
    }
    const items = []
    numbers.forEach((status, index) => {
      if (status === filter) items.push({ index, status })
    })
    return items
  }, [campaign, filter])

  const counts = {
    all: stats.total,
    [NUMBER_STATUS.available]: stats.available,
    [NUMBER_STATUS.reserved]: stats.reserved,
    [NUMBER_STATUS.paid]: stats.paid,
  }

  return { filter, setFilter, stats, visibleNumbers, counts }
}
