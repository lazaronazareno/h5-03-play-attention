import {
	Home,
	Video,
	BookOpen,
	GraduationCap,
	FileText,
	BadgePercent,
	Activity,
	Calendar,
	Settings,
	LifeBuoy,
	LogOut
} from 'lucide-react'

export const dashboardLinks = [
	{ title: 'Inicio', href: '/dashboard', icon: Home },
	{ title: 'Videos de Muestra', href: '/dashboard/videos', icon: Video },
	{ title: 'Material Educativo', href: '/dashboard/educational-material', icon: BookOpen },
	{ title: 'Tutoriales', href: '/dashboard/tutorials', icon: GraduationCap },
	{ title: 'Articulos Medicos', href: '/dashboard/medical-articles', icon: FileText },
	{ title: 'Material de Marketing', href: '/dashboard/marketing-material', icon: BadgePercent },
	{ title: 'Actividades', href: '/dashboard/activities', icon: Activity },
	{ title: 'Eventos', href: '/dashboard/events', icon: Calendar },
	{ title: 'Soporte', href: '/dashboard/support', icon: LifeBuoy },
	{ title: 'Configuración', href: '/dashboard/config', icon: Settings },
	{ title: 'Salir', href: '/' , icon: LogOut }
]
