import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "rgb(var(--border-rgb))",
        foreLight: "rgb(var(--foreground-light-rgb))",
      },
    },
  },
  plugins: [],
};
export default config;
