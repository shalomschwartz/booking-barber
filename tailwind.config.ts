import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        surface: "#141414",
        card: "#1c1c1c",
        border: "#2a2a2a",
        gold: "#D4AF37",
        "gold-light": "#F0C83A",
        "gold-dim": "#9A7D20",
        muted: "#71717a",
        "text-base": "#f4f4f5",
      },
      fontFamily: {
        sans: ["var(--font-rubik)", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
