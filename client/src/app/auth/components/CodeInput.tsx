
import { useEffect, useRef } from 'react'

interface CodeInputProps {
  onComplete: (value: string) => void
  length?: number
}

export default function CodeInput({ onComplete, length = 6 }: CodeInputProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const inputs = containerRef.current?.querySelectorAll('input') ?? []

    inputs.forEach((input, idx) => {
      input.addEventListener('input', () => {
        const value = input.value.replace(/\D/g, '')
        input.value = value

        if (value && idx < inputs.length - 1) {
          ;(inputs[idx + 1] as HTMLInputElement).focus()
        }

        const values = Array.from(inputs).map((i) => (i as HTMLInputElement).value)
        const isComplete = values.every((v) => v !== '')

        if (isComplete) {
          onComplete(values.join('')) // ahora es string, no number[]
        }
      })

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && idx > 0) {
          ;(inputs[idx - 1] as HTMLInputElement).focus()
        }
      })
    })

    return () => {
      inputs.forEach((input) => {
        input.replaceWith(input.cloneNode(true))
      })
    }
  }, [onComplete, length])

  return (
    <div className='flex gap-2' ref={containerRef}>
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          maxLength={1}
          inputMode='numeric'
          className='w-10 h-10 text-center bg-white border border-violet-main rounded focus:border-violet-main'
        />
      ))}
    </div>
  )
}
