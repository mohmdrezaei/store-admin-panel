import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const paths = [
  "src",
  "assets",
  "components",
  "configs",
  "layots",
  "pages",
  "router",
  "services",
  "styles",
  "utils",
  "hooks",
  "provider"
];
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...paths.reduce((acc, cur) => ({
        ...acc,
        [cur]: `/${cur === "src" ? cur : "src/" + cur}`,
      })),
    },
  },
});
