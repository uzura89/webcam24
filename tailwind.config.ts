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
    // colors: {
    //   tahiti: {
    //     100: "#cffafe",
    //     200: "#a5f3fc",
    //     300: "#67e8f9",
    //     400: "#22d3ee",
    //     500: "#06b6d4",
    //     600: "#0891b2",
    //     700: "#0e7490",
    //     800: "#155e75",
    //     900: "#164e63",
    //   },
    // },
  },
  plugins: [],
};
export default config;
