import { create } from 'zustand';
import { defaultTheme } from '../theme/themes';

// Global app state for Pomodoro. On-device only — no accounts, no cloud (SPECS §4).
// Persistence (MMKV/AsyncStorage) is wired in lib/storage.js — TODO before launch.
export const useAppStore = create((set, get) => ({
  appName: 'Pomodoro',

  // preferences
  theme: defaultTheme,
  sessionDuration: 1500,        // 25 min in seconds
  breakDuration: 300,           // 5 min
  ambientTrack: null,           // 'rain' | 'lofi' | 'wind' | null
  onboarded: false,

  // session log + streak
  sessions: [],                 // { id, startedAt, completedAt, duration, completed }
  streak: { current: 7, longest: 12, lastSessionDate: null },

  setTheme: (theme) => set({ theme }),
  setAmbient: (ambientTrack) => set({ ambientTrack }),
  completeOnboarding: () => set({ onboarded: true }),

  addSession: (session) =>
    set((s) => ({ sessions: [...s.sessions, session] })),
}));
