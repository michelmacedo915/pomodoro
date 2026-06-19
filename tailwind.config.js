/** @type {import('tailwindcss').Config} */
const c = (v) => `rgb(var(${v}) / <alpha-value>)`;
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        shell: c('--shell'),
        timer: c('--timer'),
        timerText: c('--timer-text'),
        plus: c('--plus'),
        reset: c('--reset'),
        resetText: c('--reset-text'),
        progress: c('--progress'),
        progressDot: c('--progress-dot'),
        streak: c('--streak'),
        streakText: c('--streak-text'),
        ambient: c('--ambient'),
        ambientActive: c('--ambient-active'),
      },
      borderRadius: { tile: '24px', chip: '14px', shell: '52px' },
    },
  },
  plugins: [],
};
