import { useAppStore } from '@/stores/appStore';

export default function StreakTile() {
  const streak = useAppStore(s => s.streak);

  return (
    <div
      data-testid="streak-tile"
      style={{
        background: 'var(--streak)',
        color: 'var(--streak-text)',
        borderRadius: '24px',
        height: '184px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '18px',
          left: '20px',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: 0.45,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Streak
      </span>

      <span
        data-testid="streak-count"
        style={{
          fontSize: '64px',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {streak.current}
      </span>
      <span
        style={{
          fontSize: '12px',
          fontWeight: 500,
          marginTop: '6px',
          opacity: 0.6,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        day streak
      </span>
    </div>
  );
}
