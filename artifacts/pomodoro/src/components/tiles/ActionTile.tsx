import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

interface ActionTileProps {
  type: 'plus' | 'reset';
}

export default function ActionTile({ type }: ActionTileProps) {
  const addTime = useAppStore(s => s.addTime);
  const resetTimer = useAppStore(s => s.resetTimer);
  const setScreen = useAppStore(s => s.setScreen);

  const handleAction = () => {
    if (type === 'plus') {
      addTime(300);
    } else {
      resetTimer();
      setScreen('hero');
    }
  };

  const bg = type === 'plus' ? 'var(--plus)' : 'var(--reset)';
  const color = type === 'plus' ? 'var(--plus-text)' : 'var(--reset-text)';
  const testId = type === 'plus' ? 'tile-plus' : 'tile-reset';

  return (
    <motion.div
      data-testid={testId}
      whileTap={{ scale: 0.94 }}
      onClick={handleAction}
      style={{
        background: bg,
        color,
        borderRadius: '24px',
        height: '176px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        gap: '6px',
      }}
    >
      {type === 'plus' ? (
        <>
          <span
            style={{
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            +5
          </span>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              opacity: 0.55,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            min
          </span>
        </>
      ) : (
        <RotateCcw size={44} strokeWidth={2} />
      )}
    </motion.div>
  );
}
