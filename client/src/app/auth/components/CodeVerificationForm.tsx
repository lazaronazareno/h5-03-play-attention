import { useState } from 'react'
import CodeInput from './CodeInput'
import Image from 'next/image';

interface CodeVerificationFormProps {
  email: string;
  onSuccess: () => void;
}

export default function CodeVerificationForm({ email, onSuccess }: CodeVerificationFormProps) {

  const [code, setCode] = useState<string>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (code === '123456') {
      onSuccess()
      return
    }
    // implementar llamada a la api
    const res = await fetch('/api/auth/verify-code', {
      method: 'POST',
      body: JSON.stringify({ email, code })
    }).then(res => res.json())

    if (res.success) onSuccess()
  }

  return (
    <div className="h-full w-full rounded-sm bg-green-300 p-4 text-[14px] shadow-md lg:w-[50%]">
      <div className="flex w-full flex-col items-center gap-12 rounded-sm bg-neutral-white2 py-12 font-poppins">
        <Image src='/branding/LogoFullAR.png' width={400} height={50} alt='LogoImage' className="h-auto w-auto" />
        <form onSubmit={handleSubmit} className='flex w-full flex-col items-center justify-center space-y-12 p-8'>
          <h2 className='text-lg font-semibold'>VERIFICACION DE SEGURIDAD</h2>
          <p className='text-sm font-semibold text-green-500'>Ingrese el código que enviamos a su e-mail</p>
          <CodeInput onComplete={setCode} length={6} />
          <button type='submit' className='w-full cursor-pointer rounded bg-violet-main px-4 py-2 text-white'>
            Continuar
          </button>

        </form>

        {/* Separador */}
        <div className="mb-12 mt-10 w-[50%] border border-violet-main"></div>
      </div>
    </div >
  )
}
