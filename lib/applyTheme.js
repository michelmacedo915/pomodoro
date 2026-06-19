import { vars } from 'nativewind';
import { themes } from '../theme/themes';

// Maps a theme's RGB triples to the CSS variables in global.css.
// Apply the returned style to a top-level View, or use NativeWind's vars() at the root.
export function applyTheme(name) {
  const t = themes[name] ?? themes.midnight;
  return vars({
    '--shell': t.shell,
    '--timer': t.timer,
    '--timer-text': t.timerText,
    '--plus': t.plus,
    '--reset': t.reset,
    '--reset-text': t.resetText,
    '--progress': t.progress,
    '--progress-dot': t.progressDot,
    '--streak': t.streak,
    '--streak-text': t.streakText,
    '--ambient': t.ambient,
    '--ambient-active': t.ambientActive,
  });
}
