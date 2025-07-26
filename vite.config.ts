import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr()
  ],
  resolve: {
    alias: {
      assets: resolve(__dirname, '/src/assets'),
      components: resolve(__dirname, '/src/components'),
      context: resolve(__dirname, '/src/context'),
      hooks: resolve(__dirname, '/src/hooks'),
      types: resolve(__dirname, '/src/types')
    }
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.spec.{ts,tsx}'],
    globals: true,
    mockReset: true,
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    },
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      cleanOnRerun: true,
      clean: true,
      reportOnFailure: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'dist'
      ]
    }
  }
})
