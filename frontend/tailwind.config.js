// tailwind.config.js (for ESM projects)
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#222260",
        accent: "#F56692",
        green: "#42AD00",
        grey: "#aaa",
        delete: "#FF0000",
        textLight: "rgba(34, 34, 96, 0.6)",
        textLighter: "rgba(34, 34, 96, 0.4)",
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      keyframes: {
        shake: {
          '0%': { transform: "translateX(0)" },
          '25%': { transform: "translateX(10px)" },
          '50%': { transform: "translateX(-10px)" },
          '75%': { transform: "translateX(10px)" },
          '100%': { transform: "translateX(0)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
