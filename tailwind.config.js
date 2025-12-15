/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Professional Dark + Violet Theme
        // Inspired by Linear, Stripe, Vercel
        primary: {
          DEFAULT: '#8B5CF6', // Vibrant Violet
          hover: '#A78BFA',   // Lighter violet on hover
          light: '#C4B5FD',
          dark: '#7C3AED',
          muted: '#6D28D9',
        },
        secondary: {
          DEFAULT: '#06B6D4', // Cyan accent for variety
          hover: '#22D3EE',
          dark: '#0891B2',
        },
        background: {
          dark: '#0F0F14',    // Rich charcoal (not pure black)
          DEFAULT: '#0F0F14',
          card: '#18181F',    // Elevated surface
          elevated: '#1F1F28', // Cards and modals
        },
        surface: {
          DEFAULT: '#18181F', // Card backgrounds
          hover: '#1F1F28',
          light: '#25252F',
          border: '#2A2A35',
        },
        accent: {
          violet: '#8B5CF6',  // Primary accent
          purple: '#A855F7',  // Secondary accent
          cyan: '#06B6D4',    // Tertiary accent
          pink: '#EC4899',    // Highlight
          emerald: '#10B981', // Success states
        },
        text: {
          primary: '#FAFAFA',   // Almost white
          secondary: '#A1A1AA', // Muted text (zinc-400)
          muted: '#71717A',     // Very muted (zinc-500)
        },
        // Legacy mappings
        navy: {
          primary: '#0F0F14',
          secondary: '#18181F',
          dark: '#09090B',
        },
        neutral: {
          slate: '#A1A1AA',
          light: '#D4D4D8',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
        logo: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(15, 15, 20, 0) 70%)',
        'card-gradient': 'linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, rgba(15, 15, 20, 0) 100%)',
        'gradient-accent': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        'gradient-cta': 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(139, 92, 246, 0.25)',
        'glow-lg': '0 0 60px rgba(139, 92, 246, 0.35)',
        'glow-sm': '0 0 20px rgba(139, 92, 246, 0.15)',
        'glow-cyan': '0 0 40px rgba(6, 182, 212, 0.25)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'elevated': '0 8px 40px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll': 'scroll 40s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}