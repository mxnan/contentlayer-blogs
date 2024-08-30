import type { Config } from "tailwindcss";
import plugin from "tailwindcss";

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
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      }, // for input shadow
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
        sans: ["var(--font-sans)"],
      },
      colors: {
        black: "#090A0B",
        white: "#F8F9FA",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
