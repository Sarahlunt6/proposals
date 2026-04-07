import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          gold: "#c5a059",
          "gold-light": "#d4b77a",
          "gold-dark": "#a8864a",
          navy: "#2d4a6f",
          "navy-light": "#3d5a7f",
          "navy-dark": "#1d3a5f",
        },
      },
    },
  },
  plugins: [],
};
export default config;
