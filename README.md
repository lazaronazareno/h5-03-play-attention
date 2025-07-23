# Plataforma de Entrenamiento Cerebral

> **⚠️ IMPORTANTE - AVISO LEGAL**: Este proyecto fue desarrollado como parte del Hackathon No Country H5-03 bajo estrictas normas de confidencialidad. La publicación de este código es con fines educativos y de portafolio personal únicamente. No constituye una violación del reglamento del hackathon ya que NO incluye links de despliegue en producción. El desarrollador se deslinda de cualquier responsabilidad sobre el uso de este código fuera del contexto educativo.

## 📋 Descripción del Proyecto

Está es una plataforma integral de entrenamiento cerebral desarrollada durante el **Hackathon No Country H5-03** que combina una **landing page**, **plataforma de usuarios**, **módulo de administración** y **sistema CRM**. El proyecto está diseñado para mejorar habilidades cognitivas y funciones ejecutivas, especialmente en personas con TDAH, utilizando la tecnología innovadora de la banda BrainAware™ inspirada en tecnología de la NASA.

### 🏆 Contexto del Desarrollo

- **Hackathon**: No Country H5-03
- **Duración**: 5 semanas (MVP completo)
- **Sector**: Healthtech
- **Tipo**: Web Application
- **Equipo**: Multidisciplinario (Front-End, Back-End, UX/UI, QA, PM)

## 🎯 Objetivos Principales

- **Informar y vender**: Landing page persuasiva que destaca los beneficios del producto
- **Captura de leads**: Formularios optimizados para diferentes perfiles de usuarios
- **Plataforma de recursos**: Portal completo con materiales educativos y soporte
- **Administración de contenido**: Módulo super admin para gestión integral
- **Seguimiento comercial**: CRM para gestión de leads y clientes

## 👥 Público Objetivo

### 🩺 Profesionales

- Psicólogos, psicopedagogos, neurólogos
- Terapeutas y profesionales de salud mental
- Educadores especializados

### 👤 Personas Individuales

- Usuarios finales (adultos, adolescentes)
- Padres de familia
- Personas que buscan mejorar atención y funciones ejecutivas

### 🏢 Empresas

- Instituciones educativas (escuelas, colegios, universidades)
- Empresas tecnológicas (bienestar laboral)
- Organizaciones deportivas (mejora de concentración)

## 🏗️ Arquitectura del Sistema

### Frontend (Client)

- **Framework**: Next.js con TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Componentes reutilizables
- **Estado**: Zustand para manejo de estado global

### Estructura de Módulos

```
📁 Landing Page
├── Presentación del producto
├── Segmentación por audiencia
├── Formularios de captura
└── Integraciones (WhatsApp, Calendar)

📁 Plataforma de Usuarios
├── Autenticación y autorización
├── Material educativo
├── Tutoriales y videos
├── Soporte al cliente
└── Sistema de traducción

📁 Super Admin
├── Gestión de contenido
├── Administración de usuarios
├── Configuración de eventos
└── Panel de soporte

📁 CRM
├── Gestión de leads
├── Pipeline de ventas
├── Reportes y métricas
└── Seguimiento comercial
```

## 🚀 Características Principales

### Landing Page

- ✅ Sección hero con propuesta de valor
- ✅ Segmentación por tipo de usuario
- ✅ Videos demostrativos
- ✅ Formularios de captura optimizados
- ✅ Integración con WhatsApp
- ✅ Sistema de agendado de reuniones
- ✅ Llamados a la acción estratégicos

### Plataforma de Usuarios

- ✅ Sistema de autenticación seguro
- ✅ Dashboard personalizado
- ✅ Biblioteca de recursos educativos
- ✅ Tutoriales interactivos
- ✅ Material de marketing
- ✅ Centro de soporte
- ✅ Sistema de traducción (ES/EN)

### Super Admin

- ✅ Gestión completa de contenido
- ✅ Subida y organización de archivos
- ✅ Administración de usuarios
- ✅ Panel de soporte integrado

### CRM

- ✅ Captura automática de leads
- ✅ Clasificación por tipo de usuario
- ✅ Historial de interacciones
- ✅ Reportes de conversión
- ✅ Seguimiento automatizado

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS
- **UI/UX**: Componentes personalizados, Responsive Design
- **Estado**: Zustand
- **Validación**: Esquemas de validación
- **APIs**: Integración con servicios externos
- **Traducción**: Sistema de internacionalización

## 📦 Instalación y Configuración

> **📝 NOTA**: Este proyecto fue desarrollado bajo las normativas del Hackathon No Country H5-03. La instalación local es posible para fines educativos y de desarrollo, pero no se proporcionan configuraciones de producción en cumplimiento con el reglamento del hackathon.

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Git

### Instalación para Desarrollo Local

1. **Clonar el repositorio**

```bash
git clone https://github.com/lazaronazareno/h5-03-play-attention.git
cd h5-03-play-attention
```

2. **Instalar dependencias**

```bash
cd client
npm install
```

3. **Configurar variables de entorno (Desarrollo)**

```bash
cp .env.example .env.local
# Editar .env.local con configuraciones de desarrollo
# NOTA: No se incluyen configuraciones de producción
```

4. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

5. **Abrir en el navegador (Solo desarrollo local)**

```
http://localhost:3000
```

## 🗂️ Estructura del Proyecto

```
├── client/                 # Aplicación Next.js
│   ├── public/            # Archivos estáticos
│   │   ├── branding/      # Logos y marca
│   │   ├── landing/       # Imágenes de landing
│   │   ├── dashboard/     # Iconos del dashboard
│   │   └── icons/         # Iconografía general
│   ├── src/
│   │   ├── app/           # App Router de Next.js
│   │   │   ├── (home)/    # Landing page
│   │   │   ├── (dashboard)/ # Plataforma usuarios
│   │   │   ├── (crm)/     # Sistema CRM
│   │   │   └── api/       # API routes
│   │   ├── components/    # Componentes reutilizables
│   │   │   ├── landing/   # Componentes de landing
│   │   │   ├── dashboard/ # Componentes del dashboard
│   │   │   ├── admin/     # Componentes de admin
│   │   │   └── ui/        # Componentes base
│   │   ├── constants/     # Constantes y configuraciones
│   │   ├── interfaces/    # Tipos TypeScript
│   │   ├── services/      # Servicios y APIs
│   │   └── store/         # Estado global
├── README.md
└── LICENSE
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting del código
npm run type-check   # Verificación de tipos
```

## 🎨 Diseño y UX

- **Responsive Design**: Optimizado para móviles, tablets y desktop
- **Accesibilidad**: Cumple con estándares WCAG
- **Performance**: Optimizado para velocidad de carga
- **SEO**: Optimización para motores de búsqueda
- **Metodología**: Desarrollo bajo Sprint de 5 semanas con feedback continuo

## 📊 Funcionalidades Implementadas (MVP Completo)

> **✅ FUNCIONALIDADES OBLIGATORIAS COMPLETADAS**: Todas las funcionalidades requeridas en el documento técnico del hackathon fueron implementadas exitosamente en el tiempo establecido.

### Landing Page

- ✅ Presentación del producto BrainAware™
- ✅ Segmentación automática de audiencia (Profesionales, Individuos, Empresas)
- ✅ Formularios inteligentes de captura con validación
- ✅ Integración directa con WhatsApp Business
- ✅ Sistema de agendado automatizado (Google Calendar)
- ✅ Videos demostrativos y testimoniales
- ✅ Optimización SEO y performance

### Dashboard de Usuarios (Portal Post-venta)

- ✅ Sistema de autenticación seguro con JWT
- ✅ Acceso personalizado por licencia/compra
- ✅ Biblioteca multimedia organizada por categorías
- ✅ Material educativo descargable
- ✅ Centro de soporte con tickets
- ✅ Sistema de traducción automática (ES/EN)

### Panel de Super Admin

- ✅ CRUD completo de todos los contenidos
- ✅ Gestión avanzada de usuarios y permisos
- ✅ Sistema de notificaciones masivas
- ✅ Gestión de eventos y calendario
- ✅ Backup automático de datos
- ✅ Moderación de soporte y tickets

### CRM Integrado

- ✅ Captura automática de leads desde formularios
- ✅ Clasificación por tipo de usuario (Profesional/Individual/Empresa)
- ✅ Automatización de seguimiento por email
- ✅ Integración con WhatsApp para contacto directo
- ✅ Historial completo de interacciones

## 🔐 Seguridad

- Autenticación JWT
- Validación de datos en frontend y backend
- Encriptación de datos sensibles

## 🌐 Integraciones

- **Email Services**: Notificaciones automáticas
- **Translation APIs**: Soporte multiidioma

## 📈 Métricas y Analytics

- Conversión de leads por canal
- Uso de recursos educativos
- ROI por tipo de usuario

## 🤝 Sobre el Desarrollo y Contribuciones

### 🏆 Calidad del Proyecto

Este proyecto representa un **trabajo de altísima calidad técnica** desarrollado en **solo 5 semanas** bajo las exigentes condiciones de un hackathon profesional. Independientemente del resultado del concurso, la **calidad del código, arquitectura y funcionalidades implementadas** demuestran un nivel de desarrollo enterprise.

### 📈 Logros Técnicos Destacados

- ✅ **100% de funcionalidades obligatorias** implementadas en tiempo record
- ✅ **Arquitectura escalable** con Next.js 14 y TypeScript
- ✅ **Código limpio** con patrones de diseño profesionales
- ✅ **UI/UX excepcional** con Tailwind CSS y componentes reutilizables
- ✅ **Seguridad robusta** con autenticación JWT y validaciones
- ✅ **Integrations complejas** (WhatsApp, Translation APIs)
- ✅ **Performance optimizada** para producción

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto y Disclaimer

**⚠️ AVISO IMPORTANTE SOBRE DESPLIEGUE**

- El código se publica exclusivamente con fines educativos y de demostración técnica
- No se viola ninguna norma de confidencialidad al compartir el código fuente sin deployment
- La calidad técnica del proyecto habla por sí misma sin necesidad de links externos

**Proyecto Original**

- **Cliente**: Confidencial (Hackathon No Country)
- **Objetivo**: MVP para entrenamiento cerebral con tecnología BrainAware™
- **Estado**: Completado según requerimientos técnicos obligatorios

---

**Desarrollado con ❤️ durante el Hackathon No Country H5-03**  
_Código publicado con fines educativos - Sin links de despliegue en cumplimiento con normativas_
