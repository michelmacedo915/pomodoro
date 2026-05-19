import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';

export default function ProgressTile() {
  const sessions = useAppStore(s => s.sessions);

  const today = new Date().toDateString();
  const todayCompleted = sessions.filter(
    s => s.completed && new Date(s.completedAt).toDateString() === today
  ).length;

  const total = 8;
  const filled = Math.min(todayCompleted, total);

  return (
    <div
      data-testid="progress-tile"
      style={{
        background: 'var(--progress)',
        borderRadius: '24px',
        height: '88px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 20px',
        gap: '6px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--progress-dot)',
            opacity: 0.85,
            minWidth: '14px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {filled}
        </span>
        <div style={{ flex: 1, display: 'flex', gap: '5px', alignItems: 'center' }}>
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                scaleX: 1,
                opacity: i < filled ? 1 : 0.2,
              }}
              transition={{ duration: 0.25, delay: i < filled ? i * 0.04 : 0 }}
              data-testid={`progress-dot-${i}`}
              style={{
                flex: 1,
                height: '9px',
                borderRadius: '5px',
                background: i < filled ? 'var(--progress-dot)' : 'rgba(255,255,255,0.15)',
                transformOrigin: 'left',
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            minWidth: '14px',
            textAlign: 'right',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {total}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'rgba(255,255,255,0.25)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Today
        </span>
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'rgba(255,255,255,0.25)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Sessions
        </span>
      </div>
    </div>
  );
}
