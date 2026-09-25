/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0B0221',
        dusk: '#1A0536',
        panel: '#22094A',
        magenta: '#FF2EC4',
        cyan: '#00F0FF',
        sun: '#FFD319',
        orange: '#FF6B35',
        ink: '#F6F0FF',
        haze: '#CBB9F2',
      },
      fontFamily: {
        chrome: ['Monoton', 'Righteous', 'Impact', 'sans-serif'],
        display: ['Righteous', 'Trebuchet MS', 'Arial Black', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
