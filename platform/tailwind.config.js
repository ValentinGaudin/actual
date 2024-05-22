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
				'dark-blue': {
					DEFAULT: '#10172a',
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
