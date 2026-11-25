import { useMemo } from 'react'

const GRID = 29

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
 * Desenha um padrão que imita um QR Code apenas para fins visuais.
 * Não é um código Pix válido: nenhuma cobrança é gerada nesta etapa.
 */
export default function PixQrCode({ value = 'time-da-base-pix-demonstrativo', size = 208, className }) {
  const cells = useMemo(() => {
    const random = mulberry32(hashSeed(value))
    const grid = Array.from({ length: GRID }, () =>
      Array.from({ length: GRID }, () => random() > 0.48),
    )

    const setFinder = (row, col) => {
      for (let rowOffset = -1; rowOffset <= 7; rowOffset += 1) {
        for (let colOffset = -1; colOffset <= 7; colOffset += 1) {
          const targetRow = row + rowOffset
          const targetCol = col + colOffset
          if (targetRow < 0 || targetCol < 0 || targetRow >= GRID || targetCol >= GRID) continue

          const inside = rowOffset >= 0 && rowOffset <= 6 && colOffset >= 0 && colOffset <= 6
          if (!inside) {
            grid[targetRow][targetCol] = false
            continue
          }
          const border =
            rowOffset === 0 || rowOffset === 6 || colOffset === 0 || colOffset === 6
          const core = rowOffset >= 2 && rowOffset <= 4 && colOffset >= 2 && colOffset <= 4
          grid[targetRow][targetCol] = border || core
        }
      }
    }

    setFinder(0, 0)
    setFinder(0, GRID - 7)
    setFinder(GRID - 7, 0)

    for (let index = 8; index < GRID - 8; index += 1) {
      grid[6][index] = index % 2 === 0
      grid[index][6] = index % 2 === 0
    }

    const rects = []
    grid.forEach((row, rowIndex) => {
      row.forEach((filled, colIndex) => {
        if (filled) {
          rects.push(<rect key={`${rowIndex}-${colIndex}`} x={colIndex} y={rowIndex} width="1" height="1" />)
        }
      })
    })
    return rects
  }, [value])

  return (
    <svg
      viewBox={`0 0 ${GRID} ${GRID}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="QR Code ilustrativo de pagamento Pix, sem validade real"
    >
      <rect width={GRID} height={GRID} fill="#ffffff" />
      <g fill="#071426" shapeRendering="crispEdges">
        {cells}
      </g>
    </svg>
  )
}
