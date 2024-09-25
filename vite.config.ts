import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sass from "sass"; // Import Dart Sass

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass, // Use the imported Dart Sass
        // Add your SCSS options here
      },
    },
  },
});
