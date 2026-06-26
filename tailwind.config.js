/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#001845",
          50: "#F4F7FB",
          100: "#E8EEF8",
          200: "#C9D7F0",
          300: "#A9C0E8",
          400: "#6F93D4",
          500: "#3567C0",
          600: "#00306B",
          700: "#00285A",
          800: "#001F4D",
          900: "#001845",
        },

        success: {
          DEFAULT: "#16A34A",
          light: "#DCFCE7",
        },

        warning: {
          DEFAULT: "#F59E0B",
          light: "#FEF3C7",
        },

        info: {
          DEFAULT: "#2563EB",
          light: "#DBEAFE",
        },

        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8F9FC",
          tertiary: "#F1F5F9",
        },

        border: {
          DEFAULT: "#E2E8F0",
          light: "#F1F5F9",
        },
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,24,69,0.06)",
        cardHover: "0 10px 30px rgba(0,24,69,0.10)",
        primary: "0 8px 30px rgba(0,24,69,0.25)",
      },

      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
