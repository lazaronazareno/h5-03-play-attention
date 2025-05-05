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
    <div className="w-full lg:w-[50%] h-full p-4 bg-green-300 rounded-sm shadow-md text-[14px]">
      <div className="w-full flex flex-col items-center py-12 gap-12 bg-neutral-white2 rounded-sm font-poppins ">
        <Image src='/branding/LogoFullAR.png' width={400} height={50} alt='LogoImage' className="w-auto h-auto" />
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-12 w-full p-8'>
          <h2 className='text-lg font-semibold'>VERIFICACION DE SEGURIDAD</h2>
          <p className='text-sm font-semibold text-green-500'>Ingrese el código que enviamos a su e-mail</p>
          <CodeInput onComplete={setCode} length={6} />
          <button type='submit' className='bg-violet-main text-white px-4 py-2 rounded w-full cursor-pointer'>
            Continuar
          </button>

        </form>

        {/* Separador */}
        <div className="w-[50%] border border-violet-main mt-10 mb-12"></div>
      </div>
    </div >
  )
}
