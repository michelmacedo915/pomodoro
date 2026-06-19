import { useEffect, useRef, useState } from 'react';

// Countdown logic (POMODORO_SPEC §7). Returns controls for the hero + session screens.
export function useTimer(duration, onComplete) {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    ref.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(ref.current);
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => { setIsRunning(false); setSecondsLeft(duration); };
  const addTime = (s = 300) => setSecondsLeft((p) => p + s);

  return { secondsLeft, isRunning, start, pause, reset, addTime };
}
