import { AlertCircle } from 'lucide-react'
import { cx } from '../utils/format'

export function Field({ label, htmlFor, required = false, hint, error, children, className }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="field-label">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="field-error">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p className="field-hint">{hint}</p>
      ) : null}
    </div>
  )
}

export function Input({ className, invalid = false, ...props }) {
  return (
    <input
      className={cx('field-input', invalid && 'border-red-400 focus:border-red-500 focus:ring-red-500/15', className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}

export function Textarea({ className, invalid = false, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cx('field-input resize-y', invalid && 'border-red-400 focus:border-red-500 focus:ring-red-500/15', className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}

export function Select({ className, invalid = false, children, ...props }) {
  return (
    <select
      className={cx('field-input appearance-none bg-white pr-9', invalid && 'border-red-400', className)}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {children}
    </select>
  )
}
