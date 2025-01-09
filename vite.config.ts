import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Enable polyfills for specific globals and modules
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true, // Polyfill node: protocol imports
    }),
  ],
  resolve: {
    alias: {
      // Polyfill Node.js core modules
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      os: "os-browserify/browser",
      path: "path-browserify",
    },
  },
  build: {
    outDir: "dist", // Output directory
  },
  server: {
    open: false,
  },
});
