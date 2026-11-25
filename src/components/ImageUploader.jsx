import { useId, useRef, useState } from 'react'
import { ImagePlus, Trash2, UploadCloud } from 'lucide-react'
import Button from './Button'
import { Field } from './Field'

const MAX_SIZE = 5 * 1024 * 1024

export default function ImageUploader({ value, onChange, error }) {
  const inputId = useId()
  const inputRef = useRef(null)
  const [localError, setLocalError] = useState('')

  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setLocalError('Selecione um arquivo de imagem (PNG, JPG ou SVG).')
      return
    }
    if (file.size > MAX_SIZE) {
      setLocalError('A imagem deve ter no máximo 5 MB.')
      return
    }

    setLocalError('')
    onChange?.(URL.createObjectURL(file))
  }

  const clear = () => {
    setLocalError('')
    onChange?.('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <Field label="Imagem do prêmio" htmlFor={inputId} hint="Demonstrativo: a imagem fica apenas no navegador e não é enviada a nenhum servidor." error={error || localError}>
      <div className="mt-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        {value ? (
          <img src={value} alt="Pré-visualização da imagem do prêmio" className="h-44 w-full object-cover" />
        ) : (
          <div className="flex h-44 flex-col items-center justify-center gap-2 text-slate-400">
            <UploadCloud className="h-8 w-8" aria-hidden="true" />
            <p className="text-xs font-semibold">Nenhuma imagem selecionada</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" icon={ImagePlus} onClick={() => inputRef.current?.click()}>
          Selecionar imagem
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" icon={Trash2} onClick={clear}>
            Remover
          </Button>
        )}
      </div>
    </Field>
  )
}
