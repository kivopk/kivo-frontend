/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        amazon_yellow: "#F3A847",
        amazon_orange: "#F2711C",
        // Gaming Theme Colors
        cyber_cyan: "#00F2FF",
        neon_purple: "#7000FF",
        neon_pink: "#FF00E5",
        deep_void: "#050505",
        matrix_green: "#00FF41",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scroll-left': 'scroll-left 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.5, filter: 'brightness(1)' },
          '50%': { opacity: 1, filter: 'brightness(1.5)' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      backgroundImage: {
        'gaming-gradient': 'linear-gradient(135deg, #050505 0%, #1a0b2e 100%)',
        'neon-border': 'linear-gradient(90deg, #00F2FF, #7000FF, #FF00E5)',
      }
    },
  },
  plugins: [],
}


