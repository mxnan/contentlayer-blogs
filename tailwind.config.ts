import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "4xl": "2000px",
      },
    },
    extend: {
      screens: {
        sm: "500px",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        title: ["var(--font-title)"],
      },
      colors: {
        black: "#090A0B",
        white: "#F8F9FA",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
