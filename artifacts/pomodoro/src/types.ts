export type Screen = 'onboarding' | 'hero' | 'in-progress' | 'break';
export type Theme = 'midnight' | 'energy' | 'sunset' | 'break';
export type AmbientTrack = 'rain' | 'lofi' | 'wind' | null;

export interface Session {
  id: string;
  startedAt: string;
  completedAt: string;
  duration: number;
  completed: boolean;
  label: string | null;
}

export interface AppState {
  screen: Screen;
  theme: Theme;
  sessionDuration: number;
  breakDuration: number;
  ambientTrack: AmbientTrack;
  secondsLeft: number;
  isRunning: boolean;
  sessionNumber: number;
  sessions: Session[];
  streak: { current: number; longest: number; lastSessionDate: string };
}
