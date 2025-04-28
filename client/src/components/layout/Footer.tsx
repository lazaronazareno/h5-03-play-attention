// import { Mail, Phone } from 'lucide-react';

// export default function Footer() {
//   return (
//     <footer className="bg-neutral-white2 text-blackneutral-main py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Logo/Título */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold"># p/ay attention</h1>
//         </div>

//         <div className="flex flex-col md:flex-row justify-between gap-8">
//           {/* Direcciones */}
//           <div className="space-y-4">
//             <div>
//               <p className="font-medium">R. Coamado 662, Oficho 1&_Hbu._Bs.Aa.</p>
//               <p>Las cometas 3324, Flor. Bs.Aa.</p>
//             </div>

//             {/* Teléfonos */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex items-center gap-2">
//                 <Phone className="h-4 w-4" />
//                 <span>+54 1850354541</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone className="h-4 w-4" />
//                 <span>+54 1854358121</span>
//               </div>
//             </div>
//           </div>

//           {/* Separador */}
//           <div className="border-t md:border-t-0 md:border-l border-gray-300 my-4 md:my-0"></div>

//           {/* Newsletter */}
//           <div className="space-y-4">
//             <h2 className="text-xl font-bold uppercase">NEWSLETTER</h2>
//             <p className="max-w-md">
//               Susceptible a nuestro bolsillo y montante actualizado con todo lo relacionado con el TOAM.
//             </p>

//             {/* Correo */}
//             <div className="flex items-center gap-2">
//               <Mail className="h-4 w-4" />
//               <span className="font-medium">Correo</span>
//             </div>
//           </div>
//         </div>

//         {/* Separador */}
//         <div className="border-t border-gray-300 my-6"></div>

//         {/* Copyright */}
//         <div className="text-center text-sm">
//           <p>Copyright 2025. PLAY ATTENTION. All Rights Reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

/* import { Mail, Phone, Instagram, Facebook, Youtube } from 'lucide-react'; */
import Image from 'next/image';

export default function Footer() {
	return (
		<footer className='w-full bg-neutral-white2 font-poppins text-blackneutral-main pb-[36px] pt-[200px] px-6 md:px-40 '>
			<div className='flex flex-col gap-4 md:flex-row md:justify-between md:gap-40'>
				{/* Direcciones */}
				<div className='flex flex-col justify-between gap-8'>
					<Image src='/branding/LogoFullAR.png' alt='Logo' width={283} height={56} />
					<div className='flex flex-col gap-1 text-blackneutral-main'>
						<p className='text-[16px]'>R. Caamaño 662. Oficina 114. Pilar. Bs.As.</p>
						<p className='text-[16px]'>Las camelias 3324. Pilar. Bs.As. </p>
						<p className='text-[16px]'>+1150535434 | +54 1154936121. </p>
					</div>

					{/* Redes */}
					<div>

					</div>
				</div>

				{/* Newsletter */}
				<div className='flex flex-col gap-8 max-w-[300px]'>
					<h3 className='text-2xl font-roboto text-violet-main font-bold'>NEWSLETTER</h3>
					<p className='text-[16px]'>Suscríbete a nuestro boletín y mantente actualizado con todo lo relacionado con el TDAH.</p>
				</div>

			</div>

			{/* Separador */}
			<div className='border-t border-violet-main my-6'></div>

			{/* Copyright */}
			<div className='text-center text-[12px] font-bold font-roboto'>
				<p>Copyright 2025. PLAY ATTENTION. All Rights Reserved.</p>
			</div>

		</footer>
	)
}

