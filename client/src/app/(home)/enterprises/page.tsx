import ItemInfo from "@/components/dashboard/ItemInfo";
import HeroSection from "@/components/landing/HeroSection"
import ImpactSection from "@/components/landing/ImpactSection"
import TestimonySection from "@/components/landing/TestimonySection";
import Typography from "@/components/ui/Typography"
import { CheckCircle2Icon } from "lucide-react";

const HEROSECTION_PROPS = {
	imageUrl: "/landing/companies/heroComp.png",
	title: "Neuroentrenamiento para el alto rendimiento laboraly deportivo",
	description:
		"Play Attention ofrece soluciones avanzadas de neuroentrenamiento adaptadas a los desafíos del entorno empresarial moderno. Nuestra tecnología ha sido utilizada por profesionales que buscan aumentar su productividad, foco y autocontrol, así como por empresas deportivas que desean optimizar el rendimiento mental de sus atletas.",
	button1Text: "Reserva tu demostración",
}

const IMPACTSECTION_PROPS = {
	title: "PARA EMPRESAS TECNOLOGICAS",
	description: "Mejora la funcion ejecutiva",
	imageUrl: "/landing/companies/comp1.png",
	imageUrl2: "/landing/companies/comp2.png",
	text1: "El Neurofeedback ofrece a las empresas una herramienta para mejorar el rendimiento y bienestar de sus empleados, reduciendo el estrés, mejorando la concentración y la toma de decisiones, teniendo beneficios en la gestión emocional, la resiliencia, y potenciando la creatividad.",
	text2: "Un plan de RSE basado en neurofeedback para empresas permite mejorar el bienestar de los empleados a través de la potenciación cerebral, lo que genera una mayor productividad y satisfacción laboral.",
}

const IMPACTSECTION_PROPS2 = {
	title: "PARA EMPRESAS DEPORTIVAS",
	description: "Potencia el rendimiento deportivo",
	imageUrl: "/landing/companies/comp3.png",
	imageUrl2: "/landing/companies/comp4.png",
	text1: "El Neurofeedback para deportistas mejora los estados mentales y emocionales que permiten tener mayor control del enfoque y la concentración,  desarrollando pautas y señales mentales que ayudan a eliminar las distracciones, y a tener autocontrol emocional en momentos críticos.",
	text2: "A su vez, permite tener un mayor control emocional para lidiar con la presión y las situaciones estresantes del deporte, dejando de lado pensamientos y juicios, el cerebro aprende ese estado óptimo, generando una nueva forma de respuesta o funcionamiento cerebral más adecuada y satisfactoria.",
}

const ITEMS_PROPS = [
	{
		title: "Memoria a Corto Plazo",
		description: "Te permite mejorar tu capacidad para recordar información en el momento.",
	},
	{
		title: "Procesamiento Discriminatorio",
		description: "Te permite eliminar distracciones y centrarse en lo importante.",
	},
	{
		title: "Habilidades Motoras",
		description: "Mejorar las habilidades motoras gruesas, para aumentar la coordinación y reducir la torpeza.",
	},
	{
		title: "Memoria de trabajo",
		description: "Te permite retener y manipular información para completar una tarea.",
	},
	{
		title: "Procesamiento Auditivo",
		description: "Te permite seguir instrucciones verbales de múltiples pasos.",
	},
	{
		title: "Habilidades Sociales",
		description: "Te permite mejorar tu relación con los demás.",
	},
	{
		title: "Tiempo en Tarea",
		description: "Te permite comenzar y terminar tareas de forma oportuna.",
	},
	{
		title: "Modelado del comportamiento",
		description: "Ajusta comportamientos impulsivos o inapropiados sin castigos.",
	},
	{
		title: "Concincia Plena",
		description: "Silencia tu mente agitada, promoviendo la calma, la regulación emocional y el enfoque.",
	},
	{
		title: "Seguimiento visual",
		description: "Te permite mantener tu enfoque visual y aprende más rápido.",
	},
	{
		title: "Puente Academico",
		description: "Te permite monitorear tu atención mientras realizas tareas para completarlas a tiempo.",
	}
]


export default function EnterprisesPage() {
	return (
		<main className='min-h-screen bg-white text-black'>
			<HeroSection
				imageUrl={HEROSECTION_PROPS.imageUrl}
				title={HEROSECTION_PROPS.title}
				description={HEROSECTION_PROPS.description}
				button1Text={HEROSECTION_PROPS.button1Text}
			/>

			<ImpactSection title={IMPACTSECTION_PROPS.title} titlePosition="down" titleAlignament="center" description={IMPACTSECTION_PROPS.description} imageUrl={IMPACTSECTION_PROPS.imageUrl} imageUrl2={IMPACTSECTION_PROPS.imageUrl2} imagesPosition={"left"} color={"green"} bgColor="green" type={"text"} text1={IMPACTSECTION_PROPS.text1} text2={IMPACTSECTION_PROPS.text2} />

			<Typography variant="h3" size="4xl" color="violet" weight="semibold" text="Play Attention es la solución más efectiva, clínicamente comprobada para mejorar la función ejecutiva 5 veces más." className="text-center p-8 lg:py-12 mx-auto" />

			<ImpactSection title={IMPACTSECTION_PROPS2.title} titlePosition="down" titleAlignament="center" description={IMPACTSECTION_PROPS2.description} color="violet" bgColor="violet" imageUrl={IMPACTSECTION_PROPS2.imageUrl} imageUrl2={IMPACTSECTION_PROPS2.imageUrl2} imagesPosition={"right"} type={"text"} text1={IMPACTSECTION_PROPS2.text1} text2={IMPACTSECTION_PROPS2.text2} />

			<div className="w-full p-8 space-y-8">
				<Typography variant="p" size="3xl" color="violet" weight="semibold" text="Beneficios del NEUROFEEDBACK en el rendimiento laboral y deportivo" className="text-center p-8 lg:py-12 mx-auto" />
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-4">
					{ITEMS_PROPS.map((item, index) => (
						<ItemInfo title={item.title} description={item.description} icon={<CheckCircle2Icon fill="#198D9D" color="#ffffff" size={28} />} key={index} />
					))}
				</div>
			</div>

			<TestimonySection title="Testimonio de usuarios" type="professionals" />
		</main>
	)
}
