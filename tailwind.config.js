/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ========================================
        // PREMIUM DESIGN SYSTEM - Electric Indigo
        // Inspired by Linear, Stripe, Vercel
        // ========================================
        primary: {
          DEFAULT: '#6366F1',  // Electric Indigo
          hover: '#818CF8',
          light: '#A5B4FC',
          dark: '#4F46E5',
          muted: '#4338CA',
        },
        secondary: {
          DEFAULT: '#38BDF8',  // Aurora Blue
          hover: '#7DD3FC',
          dark: '#0EA5E9',
        },
        background: {
          dark: '#09090B',     // True dark (richer)
          DEFAULT: '#09090B',
          card: '#121218',     // Elevated surface
          elevated: '#18181F',
        },
        surface: {
          DEFAULT: '#121218',
          hover: '#1A1A22',
          light: '#222230',
          border: '#27272A',
        },
        accent: {
          indigo: '#6366F1',   // Primary accent
          violet: '#8B5CF6',   // Secondary accent
          sky: '#38BDF8',      // Tertiary accent
          rose: '#FB7185',     // Highlight
          emerald: '#34D399',  // Success
          amber: '#FBBF24',    // Warning
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#A1A1AA',
          muted: '#71717A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid Premium Typography
        'display': ['clamp(2.5rem, 5vw + 1rem, 4.5rem)', {
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          fontWeight: '700'
        }],
        'headline': ['clamp(2rem, 4vw + 0.5rem, 3.5rem)', {
          lineHeight: '1.2',
          letterSpacing: '-0.01em',
          fontWeight: '600'
        }],
        'title': ['clamp(1.5rem, 2vw + 0.5rem, 2rem)', {
          lineHeight: '1.3',
          fontWeight: '600'
        }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.75' }],
      },
      spacing: {
        // Luxury spacing scale
        '18': '4.5rem',    // 72px
        '22': '5.5rem',    // 88px
        '26': '6.5rem',    // 104px
        '30': '7.5rem',    // 120px
        '36': '9rem',      // 144px
        '44': '11rem',     // 176px
        '52': '13rem',     // 208px
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, rgba(9, 9, 11, 0) 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(9, 9, 11, 0) 100%)',
        'gradient-accent': 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
        'gradient-cta': 'linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)',
        'gradient-premium': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #38BDF8 100%)',
      },
      boxShadow: {
        'glow': '0 0 50px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 80px rgba(99, 102, 241, 0.4)',
        'glow-sm': '0 0 25px rgba(99, 102, 241, 0.2)',
        'glow-sky': '0 0 50px rgba(56, 189, 248, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'elevated': '0 16px 48px rgba(0, 0, 0, 0.6)',
        'premium': '0 24px 64px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll': 'scroll 40s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'magnetic': 'magnetic 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.02)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.2)' },
          '50%': { boxShadow: '0 0 60px rgba(99, 102, 241, 0.4)' },
        },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}