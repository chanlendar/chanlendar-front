import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	// const sourcemap = command === "serve" || !!process.env.VSCODE_DEBUG;

	return {
		resolve: {
			alias: {
				"@": path.join(__dirname, "src"),
			},
		},
		plugins: [
			react({
				jsxImportSource: "@emotion/react",
				babel: {
					plugins: ["@emotion/babel-plugin"],
				},
			}),
			tsConfigPaths(),
		],
		// 	server: !!process.env.VSCODE_DEBUG
		// 		? (() => {
		// 				const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
		// 				return {
		// 					host: url.hostname,
		// 					port: +url.port,
		// 				};
		// 		  })()
		// 		: undefined,
		// 	clearScreen: false,
		// };
	};
});

// function debounce<Fn extends (...args: any[]) => void>(fn: Fn, delay = 299): Fn {
// 	let t: NodeJS.Timeout;
// 	return ((...args: Parameters<Fn>) => {
// 		clearTimeout(t);
// 		t = setTimeout(() => fn(...args), delay);
// 	}) as Fn;
// }
