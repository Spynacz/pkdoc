import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true
            }
        },
        host: "0.0.0.0"
    },
    resolve: {
        alias: {
            // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
            "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs"
        }
    }
});
