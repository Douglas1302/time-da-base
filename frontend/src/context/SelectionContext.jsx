import { createContext, useCallback, useMemo, useState } from 'react'
import { useCampaigns } from '../hooks/useCampaigns'
import { NUMBER_STATUS } from '../utils/format'

export const SelectionContext = createContext(null)

const initialState = {
  campaignId: null,
  numbers: [],
  buyer: null,
  paymentStatus: 'idle',
}

export function SelectionProvider({ children }) {
  const { setNumbersStatus, registerParticipant } = useCampaigns()
  const [selection, setSelection] = useState(initialState)

  const toggleNumber = useCallback((campaignId, index) => {
    setSelection((current) => {
      const sameCampaign = current.campaignId === campaignId
      const base = sameCampaign ? current.numbers : []
      const alreadySelected = base.includes(index)
      const numbers = alreadySelected
        ? base.filter((item) => item !== index)
        : [...base, index].sort((a, b) => a - b)

      return {
        campaignId,
        numbers,
        buyer: sameCampaign ? current.buyer : null,
        paymentStatus: 'idle',
      }
    })
  }, [])

  const addNumbers = useCallback((campaignId, indexes) => {
    setSelection((current) => {
      const sameCampaign = current.campaignId === campaignId
      const base = sameCampaign ? current.numbers : []
      const merged = new Set([...base, ...indexes])
      return {
        campaignId,
        numbers: [...merged].sort((a, b) => a - b),
        buyer: sameCampaign ? current.buyer : null,
        paymentStatus: 'idle',
      }
    })
  }, [])

  const removeNumber = useCallback((index) => {
    setSelection((current) => ({
      ...current,
      numbers: current.numbers.filter((item) => item !== index),
      paymentStatus: 'idle',
    }))
  }, [])

  const clearSelection = useCallback(() => setSelection(initialState), [])

  const setBuyer = useCallback((buyer) => {
    setSelection((current) => ({ ...current, buyer }))
  }, [])

  const reserveSelection = useCallback(() => {
    if (!selection.campaignId || selection.numbers.length === 0) return
    setNumbersStatus(selection.campaignId, selection.numbers, NUMBER_STATUS.reserved)
    setSelection((current) => ({ ...current, paymentStatus: 'awaiting_payment' }))
  }, [selection, setNumbersStatus])

  const confirmPayment = useCallback(() => {
    if (!selection.campaignId || selection.numbers.length === 0) return
    setNumbersStatus(selection.campaignId, selection.numbers, NUMBER_STATUS.paid)
    if (selection.buyer) {
      registerParticipant({
        campaignId: selection.campaignId,
        name: selection.buyer.name,
        phone: selection.buyer.phone,
        cpf: selection.buyer.cpf,
        quantity: selection.numbers.length,
        status: 'paid',
      })
    }
    setSelection((current) => ({ ...current, paymentStatus: 'confirmed' }))
  }, [registerParticipant, selection, setNumbersStatus])

  const value = useMemo(
    () => ({
      selection,
      toggleNumber,
      addNumbers,
      removeNumber,
      clearSelection,
      setBuyer,
      reserveSelection,
      confirmPayment,
    }),
    [
      selection,
      toggleNumber,
      addNumbers,
      removeNumber,
      clearSelection,
      setBuyer,
      reserveSelection,
      confirmPayment,
    ],
  )

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
}
