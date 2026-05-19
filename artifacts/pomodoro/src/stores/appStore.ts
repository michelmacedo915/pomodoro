import { create } from 'zustand';
import { AppState, Screen, Theme, AmbientTrack } from '../types';
import { loadState, saveState, saveSession } from '../utils/storage';

interface AppActions {
  setScreen: (screen: Screen) => void;
  setTheme: (theme: Theme) => void;
  setAmbientTrack: (track: AmbientTrack) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  addTime: (seconds: number) => void;
  tickTimer: () => void;
  completeSession: () => void;
  startBreak: () => void;
  endBreak: () => void;
  setSecondsLeft: (seconds: number) => void;
}

const DEFAULT_SESSION = 1500; // 25 min
const DEFAULT_BREAK = 300; // 5 min

const initialState: AppState = {
  screen: 'onboarding',
  theme: 'midnight',
  sessionDuration: DEFAULT_SESSION,
  breakDuration: DEFAULT_BREAK,
  ambientTrack: null,
  secondsLeft: DEFAULT_SESSION,
  isRunning: false,
  sessionNumber: 1,
  sessions: [],
  streak: { current: 0, longest: 0, lastSessionDate: '' }
};

const loadedState = loadState();

export const useAppStore = create<AppState & AppActions>((set, get) => ({
  ...initialState,
  ...(loadedState || {}),
  screen: loadedState?.theme ? 'hero' : 'onboarding',
  secondsLeft: loadedState?.sessionDuration || DEFAULT_SESSION,
  isRunning: false,

  setScreen: (screen) => {
    set({ screen });
    saveState(get());
  },
  
  setTheme: (theme) => {
    set({ theme });
    saveState(get());
  },
  
  setAmbientTrack: (ambientTrack) => {
    set({ ambientTrack });
    saveState(get());
  },
  
  startTimer: () => {
    set({ isRunning: true });
    saveState(get());
  },
  
  pauseTimer: () => {
    set({ isRunning: false });
    saveState(get());
  },
  
  resetTimer: () => {
    const { screen, sessionDuration, breakDuration } = get();
    set({ 
      isRunning: false, 
      secondsLeft: screen === 'break' ? breakDuration : sessionDuration 
    });
    saveState(get());
  },
  
  addTime: (seconds) => {
    set((state) => ({ secondsLeft: state.secondsLeft + seconds }));
    saveState(get());
  },
  
  tickTimer: () => {
    const state = get();
    if (state.secondsLeft <= 1) {
      if (state.screen === 'in-progress') {
        state.completeSession();
      } else if (state.screen === 'break') {
        state.endBreak();
      }
    } else {
      set({ secondsLeft: state.secondsLeft - 1 });
    }
  },
  
  completeSession: () => {
    const state = get();
    const newState = saveSession(state.sessionDuration, true, state);
    
    set({
      ...newState,
      isRunning: true,
      screen: 'break',
      secondsLeft: state.breakDuration,
      sessionNumber: (state.sessionNumber % 8) + 1
    });
  },
  
  startBreak: () => {
    const { breakDuration } = get();
    set({ screen: 'break', secondsLeft: breakDuration, isRunning: true });
  },
  
  endBreak: () => {
    const { sessionDuration } = get();
    set({ screen: 'hero', secondsLeft: sessionDuration, isRunning: false });
    saveState(get());
  },

  setSecondsLeft: (seconds: number) => set({ secondsLeft: seconds })
}));
