/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F172A',
          container: '#131B2E',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          container: '#FEF3C7',
          dim: '#FFBF57',
        },
        tertiary: {
          DEFAULT: '#334155',
          container: '#0D1C2F',
        },
        neutral: {
          DEFAULT: '#F9FAFB',
          dim: '#E2E8F0',
          100: '#F1F5F9',
          200: '#CBD5E1',
          900: '#1E293B',
        },
        surface: {
          DEFAULT: '#F8F9FA',
          container: '#EDEEEF',
          high: '#E7E8E9',
        },
        outline: {
          DEFAULT: '#E2E8F0',
          variant: '#CBD5E1',
        },
        error: {
          DEFAULT: '#BA1A1A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'mono-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      spacing: {
        18: '4.5rem',
        'container': '64px',
        'gutter': '24px',
      },
    },
  },
  plugins: [],
}
