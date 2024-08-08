import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/invoice-G5H9L3P7X1R2T8WQ/',
  build: {
    outDir: 'invoice-G5H9L3P7X1R2T8WQ',
  },
  plugins: [react()],
})
