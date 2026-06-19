// Pomodoro theme tokens. Same bento layout — only colours swap.
// Values verified WCAG AA in POMODORO_SPEC §3. RGB triples match global.css vars.
export const themes = {
  midnight: { // Deep Focus
    shell: '15 23 41', timer: '28 80 216', timerText: '255 255 255',
    plus: '255 149 0', reset: '15 23 41', resetText: '255 149 0',
    progress: '10 26 63', progressDot: '255 149 0',
    streak: '255 149 0', streakText: '10 10 10',
    ambient: '10 26 63', ambientActive: '28 80 216',
  },
  energy: { // High Alert
    shell: '10 10 10', timer: '255 215 0', timerText: '10 10 10',
    plus: '255 59 48', reset: '255 149 0', resetText: '10 10 10',
    progress: '31 31 31', progressDot: '255 215 0',
    streak: '255 215 0', streakText: '10 10 10',
    ambient: '31 31 31', ambientActive: '255 215 0',
  },
  sunset: { // Wind-Down
    shell: '26 14 14', timer: '255 107 53', timerText: '255 245 225',
    plus: '255 245 225', reset: '199 62 29', resetText: '255 245 225',
    progress: '45 27 27', progressDot: '255 107 53',
    streak: '255 107 53', streakText: '26 14 14',
    ambient: '45 27 27', ambientActive: '255 107 53',
  },
  break: { // Rest Mode
    shell: '10 31 26', timer: '82 183 136', timerText: '255 255 255',
    plus: '232 232 232', reset: '93 173 226', resetText: '255 255 255',
    progress: '30 58 50', progressDot: '82 183 136',
    streak: '82 183 136', streakText: '10 31 26',
    ambient: '30 58 50', ambientActive: '82 183 136',
  },
};

export const themeOrder = ['midnight', 'energy', 'sunset', 'break'];
export const defaultTheme = 'midnight';
