import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui"],
        display: ["var(--font-display)", "system-ui"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        forest: {
          50: "#f0faf0",
          100: "#dcf5dc",
          200: "#b8eab8",
          300: "#84d684",
          400: "#4cbb4c",
          500: "#2d9e2d",
          600: "#1f7f1f",
          700: "#166316",
          800: "#104e10",
          900: "#0b380b",
          950: "#061f06",
        },
        moss: {
          50: "#f4f9f0",
          100: "#e3f2d8",
          200: "#c5e4af",
          300: "#9dcf7d",
          400: "#73b84e",
          500: "#539c32",
          600: "#3e7c23",
          700: "#31611d",
          800: "#294e1b",
          900: "#234219",
        },
        earth: {
          50: "#faf7f2",
          100: "#f3ede1",
          200: "#e5d9c1",
          300: "#d3be98",
          400: "#be9e6c",
          500: "#ae874e",
          600: "#a07243",
          700: "#855b39",
          800: "#6d4a33",
          900: "#5a3e2c",
        },
        sage: {
          50: "#f1f6f1",
          100: "#e0ecdf",
          200: "#c2d9c0",
          300: "#98bf96",
          400: "#699e66",
          500: "#4a8047",
          600: "#386537",
          700: "#2d512c",
          800: "#264225",
          900: "#1f361e",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "grow": "grow 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        grow: {
          "0%": { width: "0%" },
          "100%": { width: "var(--target-width)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
