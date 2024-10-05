import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
	const config: UserConfig = {
		plugins: [vue()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	}

	if (mode === 'production') {
		config.build = {
			lib: {
				entry: resolve(__dirname, 'src/main.ts'),
				fileName: 'index',
				formats: ['es'],
			},
		}

		config.define = {
			'process.env.NODE_ENV': '"production"',
		}
	}

	return config
})
