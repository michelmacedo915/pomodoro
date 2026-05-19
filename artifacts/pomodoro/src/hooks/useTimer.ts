import { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';

export function useTimer() {
  const isRunning = useAppStore(s => s.isRunning);
  const tickTimer = useAppStore(s => s.tickTimer);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tickTimer]);
}
