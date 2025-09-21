/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-purple': '#8B5CF6',
        'neon-pink': '#EC4899',
        'aqua-blue': '#22D3EE',
        'rich-black': '#0A0A0A',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            textShadow: '0 0 20px #8B5CF6, 0 0 30px #8B5CF6, 0 0 40px #8B5CF6' 
          },
          '100%': { 
            textShadow: '0 0 30px #EC4899, 0 0 40px #EC4899, 0 0 50px #EC4899' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
          },
          '50%': {
            opacity: '.8',
            boxShadow: '0 0 40px rgba(236, 72, 153, 0.8)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};