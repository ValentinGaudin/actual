import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

type ViteConfig = {
	mode: string;
};

export default ({ mode }: ViteConfig) => {
	const { VITE_SERVER_HMR_PORT: clientPort, VITE_SERVER_HMR_HOST: host } =
		loadEnv(mode, process.cwd());

	return defineConfig({
		server: {
			hmr: {
				clientPort: parseInt(clientPort),
				host,
			},
		},
		resolve: {
			alias: {
				'@': '/resources/js',
			},
		},
		plugins: [
			laravel({
				input: 'resources/js/main.tsx',
				refresh: true,
			}),
			react({
				jsxRuntime: 'classic',
			}),
		],
	});
};
