/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        // LeetCode Dark Mode Color Palette - Flattened structure
        'lc-bg-primary': '#1a1a1a',
        'lc-bg-secondary': '#282828',
        'lc-bg-elevated': '#303030',
        'lc-bg-hover': '#3c3c3c',
        'lc-text-primary': '#eff1f6',
        'lc-text-secondary': '#9ca3af',
        'lc-text-tertiary': '#6b7280',
        'lc-accent': '#ffa116',
        'lc-accent-hover': '#ffb84d',
        'lc-accent-muted': 'rgba(255, 161, 22, 0.15)',
        'lc-easy': '#00b8a3',
        'lc-medium': '#ffc01e',
        'lc-hard': '#ff375f',
        'lc-success': '#2cbb5d',
        'lc-error': '#ef4743',
        'lc-border': '#3c3c3c',
        'lc-border-hover': '#505050',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  safelist: [
    "bg-lc-easy",
    "bg-lc-medium",
    "bg-lc-hard",
    "bg-lc-success",
    "bg-lc-error",
    "text-lc-easy",
    "text-lc-medium",
    "text-lc-hard",
    "text-lc-success",
    "text-lc-accent",
    "border-lc-easy",
    "border-lc-medium",
    "border-lc-hard",
    "border-lc-accent",
    "border-l-lc-success",
    "border-l-lc-medium",
    "border-l-lc-error",
    "border-l-lc-easy",
    "border-l-lc-accent",
  ],
  plugins: [],
};
