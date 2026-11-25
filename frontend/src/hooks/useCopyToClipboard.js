import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopyToClipboard(resetDelay = 2200) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const copy = useCallback(
    async (value) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value)
        } else {
          const helper = document.createElement('textarea')
          helper.value = value
          helper.setAttribute('readonly', '')
          helper.style.position = 'fixed'
          helper.style.opacity = '0'
          document.body.appendChild(helper)
          helper.select()
          document.execCommand('copy')
          document.body.removeChild(helper)
        }
        setCopied(true)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopied(false), resetDelay)
        return true
      } catch {
        setCopied(false)
        return false
      }
    },
    [resetDelay],
  )

  return { copied, copy }
}
