import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: resolve(__dirname, '/src/assets'),
      components: resolve(__dirname, '/src/components'),
      context: resolve(__dirname, '/src/context'),
      hooks: resolve(__dirname, '/src/hooks')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
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
