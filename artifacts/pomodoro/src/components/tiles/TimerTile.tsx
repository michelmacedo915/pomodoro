import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { formatTime } from '@/utils/time';

export default function TimerTile() {
  const secondsLeft = useAppStore(s => s.secondsLeft);
  const isRunning = useAppStore(s => s.isRunning);
  const startTimer = useAppStore(s => s.startTimer);
  const pauseTimer = useAppStore(s => s.pauseTimer);
  const setScreen = useAppStore(s => s.setScreen);

  const handleStartPause = () => {
    if (isRunning) {
      pauseTimer();
      setScreen('hero');
    } else {
      startTimer();
      setScreen('in-progress');
    }
  };

  return (
    <motion.div
      data-testid="timer-tile"
      whileTap={{ scale: 0.98 }}
      style={{
        background: 'var(--timer)',
        color: 'var(--timer-text)',
        borderRadius: '24px',
        height: '312px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '18px',
          left: '22px',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: 0.5,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Focus
      </span>

      <div
        data-testid="timer-display"
        style={{
          fontSize: '96px',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          fontVariantNumeric: 'tabular-nums',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {formatTime(secondsLeft)}
      </div>

      <motion.button
        data-testid="button-start-pause"
        whileTap={{ scale: 0.93 }}
        onClick={handleStartPause}
        style={{
          marginTop: '28px',
          width: '104px',
          height: '48px',
          borderRadius: '24px',
          border: 'none',
          background: 'rgba(0,0,0,0.18)',
          color: 'var(--timer-text)',
          fontSize: '14px',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.01em',
        }}
      >
        {isRunning ? 'Pause' : 'Start'}
      </motion.button>
    </motion.div>
  );
}
