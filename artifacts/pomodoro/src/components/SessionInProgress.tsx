import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { formatTime } from '@/utils/time';
import Ring from './ui/Ring';

const RING_SIZE = 288;

export default function SessionInProgress() {
  const secondsLeft = useAppStore(s => s.secondsLeft);
  const sessionDuration = useAppStore(s => s.sessionDuration);
  const isRunning = useAppStore(s => s.isRunning);
  const sessionNumber = useAppStore(s => s.sessionNumber);
  const ambientTrack = useAppStore(s => s.ambientTrack);
  const pauseTimer = useAppStore(s => s.pauseTimer);
  const startTimer = useAppStore(s => s.startTimer);
  const addTime = useAppStore(s => s.addTime);
  const setScreen = useAppStore(s => s.setScreen);

  const progress = (sessionDuration - secondsLeft) / sessionDuration;
  const touchStartY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientY - touchStartY.current;
    if (delta > 80) {
      pauseTimer();
      setScreen('hero');
    }
  };

  const handlePauseResume = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  return (
    <div
      data-testid="in-progress-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        minHeight: '100dvh',
        background: 'var(--shell)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '52px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span
          data-testid="session-badge"
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.04em',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Session {sessionNumber} of 8
        </span>
        {ambientTrack && (
          <div
            className="ambient-pulse"
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--progress-dot)',
            }}
          />
        )}
      </div>

      <div
        style={{
          position: 'relative',
          width: RING_SIZE,
          height: RING_SIZE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ring progress={progress} size={RING_SIZE} strokeWidth={8} color="var(--timer)" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        >
          <div
            data-testid="in-progress-timer"
            style={{
              fontSize: '80px',
              fontWeight: 800,
              lineHeight: 1,
              color: 'var(--timer-text)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.03em',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {formatTime(secondsLeft)}
          </div>
        </motion.div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '48px' }}>
        <motion.button
          data-testid="button-pause-resume"
          whileTap={{ scale: 0.94 }}
          onClick={handlePauseResume}
          style={{
            width: '120px',
            height: '48px',
            borderRadius: '24px',
            border: '2px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: 'rgba(255,255,255,0.9)',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.01em',
          }}
        >
          {isRunning ? 'Pause' : 'Resume'}
        </motion.button>

        <motion.button
          data-testid="button-add-time"
          whileTap={{ scale: 0.94 }}
          onClick={() => addTime(300)}
          style={{
            width: '72px',
            height: '48px',
            borderRadius: '24px',
            border: 'none',
            background: 'var(--plus)',
            color: 'var(--plus-text)',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          +5
        </motion.button>
      </div>

      <motion.button
        data-testid="button-back-hero"
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          pauseTimer();
          setScreen('hero');
        }}
        style={{
          marginTop: '14px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.25)',
          fontSize: '12px',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.03em',
        }}
      >
        Back to home
      </motion.button>

      <p
        style={{
          position: 'absolute',
          bottom: '40px',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.2)',
          textAlign: 'center',
          letterSpacing: '0.02em',
          fontFamily: "'Inter', sans-serif",
          margin: 0,
        }}
      >
        Swipe down to pause
      </p>
    </div>
  );
}
