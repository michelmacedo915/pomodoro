import { useAppStore } from '../stores/useAppStore';

// Persists a completed focus session and recalculates the streak (SPECS §5).
export function useSession() {
  const addSession = useAppStore((s) => s.addSession);

  function saveSession(duration, completed = true) {
    const now = new Date();
    addSession({
      id: `${now.getTime()}`,
      startedAt: new Date(now.getTime() - duration * 1000).toISOString(),
      completedAt: now.toISOString(),
      duration,
      completed,
    });
    // TODO: recalcStreak() — see utils/streak in POMODORO_SPEC §7
  }

  return { saveSession };
}
