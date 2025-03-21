import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://dyc-api-tee-htwin.vercel.app/api",
        changeOrigin: true, // Add this to avoid CORS issues
        secure: true, // Ensure HTTPS is handled correctly
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: strips "/api" if your backend expects just "/something"
      },
      "/auth": {
        target: "https://auth-service-one.vercel.app/api/auth",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, ""),
      },
      "/upload": {
        target: "https://images-upload-tee-htwin.vercel.app/api", // Replace with your actual upload service URL
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/upload/, ""), // Optional: strips "/upload" if your backend expects just "/upload"
      },
    },
  },
});
