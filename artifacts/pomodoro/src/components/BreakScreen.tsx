import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { formatTime } from '@/utils/time';

export default function BreakScreen() {
  const secondsLeft = useAppStore(s => s.secondsLeft);
  const endBreak = useAppStore(s => s.endBreak);
  const resetTimer = useAppStore(s => s.resetTimer);
  const setScreen = useAppStore(s => s.setScreen);

  const handleNextFocus = () => {
    endBreak();
  };

  const handleSkipBreak = () => {
    resetTimer();
    setScreen('hero');
  };

  return (
    <div
      data-testid="break-screen"
      style={{
        minHeight: '100dvh',
        background: 'var(--shell)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '40px',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.01em',
          }}
        >
          Great work! Take a breath.
        </p>

        <div
          data-testid="break-timer"
          style={{
            fontSize: '96px',
            fontWeight: 800,
            color: 'var(--timer-text)',
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.03em',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {formatTime(secondsLeft)}
        </div>

        <p
          style={{
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.35)',
            marginTop: '12px',
            marginBottom: '56px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Break
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            maxWidth: '260px',
          }}
        >
          <motion.button
            data-testid="button-next-focus"
            whileTap={{ scale: 0.95 }}
            onClick={handleNextFocus}
            style={{
              width: '100%',
              height: '52px',
              borderRadius: '26px',
              border: 'none',
              background: 'var(--timer)',
              color: 'var(--timer-text)',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.01em',
            }}
          >
            Next Focus
          </motion.button>

          <motion.button
            data-testid="button-skip-break"
            whileTap={{ scale: 0.95 }}
            onClick={handleSkipBreak}
            style={{
              width: '100%',
              height: '52px',
              borderRadius: '26px',
              border: '2px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.01em',
            }}
          >
            Skip Break
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
