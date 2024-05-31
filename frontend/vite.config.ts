import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  host: true, // これでホストを指定します
    port: 5137  // デフォルトのポートを3000に変更します
})
