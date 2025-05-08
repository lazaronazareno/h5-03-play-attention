'use client'
import { useState } from 'react'
import CodeVerificationForm from '../components/CodeVerificationForm';
import ResetPasswordForm from '../components/ResetPassForm';
import ForgotPassForm from '../components/ForgotPassForm';

export default function RecoveryPasswordPage() {
	const [step, setStep] = useState(1);
	const [email, setEmail] = useState('');


	return (
		<main className='flex min-h-screen w-full flex-col items-center gap-12 bg-white px-8 py-20 text-black'>
			<section className='flex w-full flex-col items-center gap-12'>
				{step === 1 && <ForgotPassForm onNext={(email) => { setEmail(email); setStep(2) }} />}
				{step === 2 && <CodeVerificationForm email={email} onSuccess={() => setStep(3)} />}
				{step === 3 && <ResetPasswordForm email={email} />}
			</section>
		</main>
	)
}
