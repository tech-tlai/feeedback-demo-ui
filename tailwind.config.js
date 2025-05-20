/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontSize: {
				'3xl': '36px'
			},

			screens: {
				'bp-420px': '420px',
				'bp-900px': '900px',

			},

			colors: {
				white: '#FFFFFF',
				black: '#0E0B40',
				link:"#5CA2FE",
				orange: {
					light: '#FFFBAF',
					dark: '#FF8800',
					
				},
				red: {
					light: '#FFF2F2',
					dark: '#A20B0B',
					
				},
				green: {
					light: '#F5FFEB',
					dark: '#076414',
					
				},
				
				gray: {
					dark: '#7B7B7B',
					light: '#F0F0F0',
					
				},
				graph:{
					green:"#36FB18",
					blue:"#18A0FB",
					purple:"#A70A78"
				},
				"accent-blue": '#2B4BDE',
				purple:"#AB7DFE",				

				fontFamily: {
					noto: "'Roboto', Inter"
				}
			}
		},
		plugins: []
	}
};
