import restart from "vite-plugin-restart";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default {
  root: "src/", // Sources files (typically where index.html is)
  publicDir: "../static/", // Path from "root" to static assets (files that are served as they are)
  server: {
    host: true, // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
    fs: {
      allow: [".."], // Allow serving files from parent directory
    },
  },
  build: {
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
    target: "esnext", // Support for top-level await
  },
  optimizeDeps: {
    exclude: ["@dimforge/rapier3d"], // Exclude Rapier from pre-bundling
  },
  plugins: [
    restart({ restart: ["../static/**"] }), // Restart server on static file change
    wasm(), // Support for WebAssembly
    topLevelAwait(), // Support for top-level await
  ],
};
