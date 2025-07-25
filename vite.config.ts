import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
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
