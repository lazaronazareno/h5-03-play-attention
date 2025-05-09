import PaymentCard from '@/components/landing/cards/PaymentCard';
import HeroSection from '@/components/landing/HeroSection'
import ImpactSection from '@/components/landing/ImpactSection'
import TestimonySection from '@/components/landing/TestimonySection';
import Typography from '@/components/ui/Typography';

const HEROSECTION_PROPS = {
	imageUrl: '/landing/individuals/heroInd.png',
	title: 'Descubre tu potencial,sin importar tu edad ni tu diagnóstico',
	description:
		'Acompañamos a personas de todas las edades que buscan desarrollar su capacidad de concentración, autorregulación y enfoque mental. Nuestro sistema de entrenamiento cerebral está diseñado para adaptarse tanto a niños y adolescentes con desafíos atencionales, como a adultos que desean mejorar su rendimiento en el trabajo, los estudios o su vida personal.',
	button1Text: 'Realizar test de TDAH',
	button2Text: 'Reserva tu demostración',
}

const IMPACTSECTION_PROPS = {
	title: 'Para Niños y Adolescentes',
	description: 'La empatía es el motor de nuestra innovación',
	imageUrl: '/landing/individuals/indiv1.png',
	imageUrl2: '/landing/individuals/indiv2.png',
	aditionalDescription: 'Play Attention fue creado para abordar el comportamiento impulsivo, tratado con medicación para el TDAH que causaba s efectos secundarios indeseados, y de esta manera, ha ayudado a muchas familias a obtener resultados de forma segura.',
	listItems: [
		{
			title: 'Resistencia Atencional',
			description: 'Sostén su atención en el aula y con sus amigos y familia.',
		},
		{
			title: 'Coordinación Mano-Ojo',
			description: 'Mejora su motricidad fina como la escritura y el dibujo.',
		},
		{
			title: 'Conciencia Plena',
			description: 'Silencia su mente agitada, promoviendo la calma, la regulación emocional y el enfoque.',
		},
		{
			title: 'Seguimiento Visual',
			description: 'Te permite mantener tu enfoque visual y aprende más rápido.',
		},
		{
			title: 'Modelado del Comportamiento',
			description: 'Ajusta comportamientos impulsivos o inapropiados sin castigos.',
		},
		{
			title: 'Habilidades sociales',
			description: 'Mejora su relación con los demás.',
		},
	]
}

const IMPACTSECTION_PROPS2 = {
	title: 'Para Adultos',
	description: 'Renueva tu vida',
	imageUrl: '/landing/individuals/indiv3.png',
	imageUrl2: '/landing/individuals/indiv4.png',
	aditionalDescription: 'Play Attention te ayuda a mejorar en aspectos como la planificación, la concentración y la toma de decisiones inteligentes, gestionar tareas y resolver problemas, todo ello parte de la Función Ejecutiva. Los resultados muestran que las personas experimentan mejoras significativas.',
	listItems: [
		{
			title: 'Conciencia Plena',
			description: 'Silencia su mente agitada, promoviendo la calma, la regulación emocional y el enfoque.',
		},
		{
			title: 'Seguimiento Visual',
			description: 'Te permite mantener tu enfoque visual y aprende más rápido.',
		},
		{
			title: 'Modelado del Comportamiento',
			description: 'Ajusta comportamientos impulsivos o inapropiados sin castigos.',
		},
		{
			title: 'Habilidades sociales',
			description: 'Mejora su relacion con los demás.',
		},
		{
			title: 'Modelado del Comportamiento',
			description: 'Ajusta comportamientos impulsivos o inapropiados sin castigos.',
		},
		{
			title: 'Habilidades sociales',
			description: 'Mejora su relacion con los demás.',
		}
	]
}

const PAYMENTCARD_PROPS = [
	{
		title: 'Plan Mensual',
		price: '50.000',
		checkList: ['Acceso a un profesional.', 'Plan personalizado.', 'Actividades digitales y en papel para niños y adultos.', 'Ejercicios divididos por procesos cognitivos.', 'Programador de sesiones.', 'Graficas de evolución'],
	},
	{
		title: 'Plan Anual',
		price: '45.000',
		description: 'Facturacion anual $540.000',
		checkList: ['Acceso a un profesional.', 'Posibilidad de incluir profesionales', 'Plan personalizado.', 'Actividades digitales y en papel para niños y adultos.', 'Ejercicios divididos por procesos cognitivos.', 'Acceso prioritario a eventos', 'Programador de sesiones.', 'Graficas de evolución.', 'Descarga de informe de seguimiento.'],
	}
]


export default function IndividualsPage() {
	return (
		<main className='min-h-screen bg-white text-black'>
			<HeroSection title={HEROSECTION_PROPS.title} description={HEROSECTION_PROPS.description} imageUrl={HEROSECTION_PROPS.imageUrl} button1Text={HEROSECTION_PROPS.button1Text} button2Text={HEROSECTION_PROPS.button2Text} />

			<div id='children'>
				<ImpactSection title={IMPACTSECTION_PROPS.title} description={IMPACTSECTION_PROPS.description} aditionalDescription={IMPACTSECTION_PROPS.aditionalDescription} imageUrl={IMPACTSECTION_PROPS.imageUrl} imageUrl2={IMPACTSECTION_PROPS.imageUrl2} listItems={IMPACTSECTION_PROPS.listItems} color='green' titlePosition='down' titleAlignament='center' type='list' imagesPosition='left' bgColor='green' />
			</div>


			<Typography text='Tres veces más efectivo para mejorar el comportamiento, representando una alternativa reducir la dependencia a la medicación.' variant='h3' size='subtitle' color='violet' weight='semibold' className='mx-auto p-20 text-center' />

			<div id='adults'>
				<ImpactSection title={IMPACTSECTION_PROPS2.title} description={IMPACTSECTION_PROPS2.description} aditionalDescription={IMPACTSECTION_PROPS2.aditionalDescription}
					imageUrl={IMPACTSECTION_PROPS2.imageUrl} imageUrl2={IMPACTSECTION_PROPS2.imageUrl2} listItems={IMPACTSECTION_PROPS2.listItems} color='violet' titlePosition='down' titleAlignament='center' type='list' imagesPosition='right' bgColor='violet' />
			</div>

			<TestimonySection title='Testimonios' type='people' />

			<Typography text='Planes de pago' variant='h3' size='subtitle' color='violet' weight='medium' className='mx-auto p-20 text-center' />

			<div id='plans' className='gap-30 mx-auto flex flex-col items-center justify-center p-8 lg:flex-row lg:items-start'>
				{PAYMENTCARD_PROPS.map((item, index) => (
					<PaymentCard key={index} {...item} />)
				)
				}
			</div>
		</main>
	)
}
