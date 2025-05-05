'use client'
import { useState } from 'react'
import CodeVerificationForm from '../components/CodeVerificationForm';
import ResetPasswordForm from '../components/ResetPassForm';
import ForgotPassForm from '../components/ForgotPassForm';

export default function RecoveryPasswordPage() {
	const [step, setStep] = useState(1);
	const [email, setEmail] = useState('');


	return (
		<main className='w-full min-h-screen flex flex-col items-center gap-12 bg-white text-black py-20 px-8'>
			<section className='w-full flex flex-col items-center gap-12'>
				{step === 1 && <ForgotPassForm onNext={(email) => { setEmail(email); setStep(2) }} />}
				{step === 2 && <CodeVerificationForm email={email} onSuccess={() => setStep(3)} />}
				{step === 3 && <ResetPasswordForm email={email} />}
			</section>
		</main>
	)
}
