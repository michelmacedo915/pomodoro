import { AppState, Session } from '../types';
import { calculateStreak } from './streak';

const STORAGE_KEY = 'pomodoro_v1_state';

export function loadState(): Partial<AppState> | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data);
    
    return {
      theme: parsed.preferences?.theme,
      sessionDuration: parsed.preferences?.sessionDuration,
      breakDuration: parsed.preferences?.breakDuration,
      ambientTrack: parsed.preferences?.ambientTrack,
      sessions: parsed.sessions || [],
      streak: parsed.streak || { current: 0, longest: 0, lastSessionDate: '' }
    };
  } catch (err) {
    console.error('Failed to load state from localStorage', err);
    return null;
  }
}

export function saveState(state: AppState) {
  try {
    const dataToSave = {
      preferences: {
        theme: state.theme,
        sessionDuration: state.sessionDuration,
        breakDuration: state.breakDuration,
        ambientTrack: state.ambientTrack,
        ambientEnabled: !!state.ambientTrack,
        ambientVolume: 0.5,
        audioOnSessionEnd: true
      },
      sessions: state.sessions,
      streak: state.streak
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (err) {
    console.error('Failed to save state to localStorage', err);
  }
}

export function saveSession(duration: number, completed: boolean, state: AppState): AppState {
  const session: Session = {
    id: crypto.randomUUID(),
    startedAt: new Date(Date.now() - duration * 1000).toISOString(),
    completedAt: new Date().toISOString(),
    duration,
    completed,
    label: null
  };
  
  const newSessions = [...state.sessions, session];
  const newStreak = calculateStreak(newSessions);
  
  const newState = {
    ...state,
    sessions: newSessions,
    streak: newStreak
  };
  
  saveState(newState);
  return newState;
}
