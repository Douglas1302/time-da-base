import NumberCell from './NumberCell'
import { cx } from '../utils/format'

export default function NumberGrid({ items, selected, isDisabled, onToggle, className, titleFor }) {
  return (
    <div
      className={cx(
        'grid grid-cols-6 gap-1.5 sm:grid-cols-8 sm:gap-2 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-[repeat(16,minmax(0,1fr))]',
        className,
      )}
    >
      {items.map(({ index, status }) => (
        <NumberCell
          key={index}
          index={index}
          status={status}
          selected={selected?.has(index)}
          disabled={isDisabled ? isDisabled(index, status) : false}
          onToggle={onToggle}
          title={titleFor ? titleFor(index, status) : undefined}
        />
      ))}
    </div>
  )
}
