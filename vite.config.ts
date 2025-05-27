import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueDevTools(), tailwindcss()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		port: 3000,
		open: true,
		proxy: {
			"/admin": {
				target: "https://5bd4-58-96-252-202.ngrok-free.app",
				changeOrigin: true,
			},
			"/user_images": {
				target: "https://5bd4-58-96-252-202.ngrok-free.app",
				changeOrigin: true,
			},
		},
	},
});
