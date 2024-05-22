import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
		'./storage/framework/views/*.php',
		'./resources/views/**/*.blade.php',
		'./resources/js/**/*.tsx',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Figtree', ...defaultTheme.fontFamily.sans],
				title: ['Abang', 'monospace'],
			},
			backgroundImage: {},
			colors: {
				marble: {
					DEFAULT: '#F2F8FC',
				},
				'cold-steel': {
					DEFAULT: '#F8F7F4',
				},
				'dark-blue': {
					DEFAULT: '#0A2342',
				},
				dark: {
					light: '#111015',
					DEFAULT: '#151623',
				},
			},
			animation: {
				fillError: 'fillBackground 4s linear forwards',
			},
			keyframes: {
				fillBackground: {
					'0%': { width: '0%' },
					'100%': { width: '100.8%' },
				},
			},
		},
	},
	plugins: [forms],
};
