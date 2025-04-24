import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'class',
	content: [
		'./app/**/*.{ts,tsx}',
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./layouts/**/*.{ts,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['var(--font-roboto)', 'sans-serif'],
				poppins: ['var(--font-poppins)', 'sans-serif'],
			},
			colors: {
				violet: {
					main: '#6A49F6',          // Violeta-Principal
					secondary: '#8266F6',     // Violeta-Secundario
					text: '#1D2041',          // Azul-Texto
					extra: '#261A2A',         // Morado-Extra
					darkblue: '#102C43'       // Azul-Verde-Extra
				},
				green: {
					100: '#D6F6FE',
					200: '#2EE0F9',
					300: '#23B6CA',
					main: '#198D9D',          // Verde-Principal
					500: '#0F6672',
					600: '#07424A',
					700: '#022126'
				},
				lightBlue: {
					100: '#C4D9FC',
					200: '#7CB4F9',
					main: '#2D8FE2',         // Celeste-Principal
					400: '#1F6AA9',
					500: '#124774',
					600: '#062743',
					700: '#021222'
				},
				neutral: {
					white: '#E7F0F0',        // Blanco
					white2: '#F5F4EB',       // Segundo Blanco
					gray: '#E8E7EE'          // Gris
				},
				blackNeutral: {
					100: '#D0DEDE',
					200: '#AAB6B6',
					300: '#869090',
					400: '#646B6B',
					500: '#434949',
					600: '#252929',
					main: '#060707'
				}
			},
		}
	},
	plugins: []
}

export default config

