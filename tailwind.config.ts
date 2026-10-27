import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif']
      },
      colors: {
        lan: {
          50: '#f0f5fa',
          100: '#dce8f3',
          200: '#bfd6ea',
          300: '#93badc',
          400: '#6096ca',
          500: '#3b77b6',
          600: '#295d99',
          700: '#1f497b',
          800: '#193b63',
          900: '#112846',
          950: '#0a192f'
        },
        gold: {
          50: '#fbf8eb',
          100: '#f6eec8',
          200: '#eedb94',
          300: '#e4c258',
          400: '#dba92e',
          500: '#c68e1f',
          600: '#a66d17',
          700: '#845016',
          800: '#6f4018',
          900: '#5f3619'
        }
      }
    }
  },
  plugins: []
}
