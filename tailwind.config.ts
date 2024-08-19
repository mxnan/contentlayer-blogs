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
      // ... for custom animations
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear", // border beam
        grid: "grid 15s linear infinite", // bg grid
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        }, // border beam animations
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        }, // bg grid animations
      },

      // ...
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
        lightone: "#36816C", // english violet
        darkone: "#3A0CA3", // zaffre
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
} satisfies Config;

export default config;
