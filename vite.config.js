import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiKey = env.AUTOMATION_API_KEY || "";

  const configuredBase = process.env.VITE_BASE || env.VITE_BASE || "/";
  const base = configuredBase === "/" ? "/" : `/${configuredBase.replace(/^\/|\/$/g, "")}/`;

  return {
    base,
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        "/api/automation": {
          target: env.AUTOMATION_API_URL || "https://analytics-gamma-wheat.vercel.app",
          changeOrigin: true,
          secure: true,
          configure(proxy) {
            proxy.on("proxyReq", (proxyReq) => {
              if (apiKey) proxyReq.setHeader("authorization", `Bearer ${apiKey}`);
            });
          },
        },
      },
    },
  };
});
