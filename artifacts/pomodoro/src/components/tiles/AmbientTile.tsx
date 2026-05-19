import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import type { AmbientTrack } from '@/types';

const tracks: { id: Exclude<AmbientTrack, null>; label: string }[] = [
  { id: 'rain', label: 'Rain' },
  { id: 'lofi', label: 'Lo-fi' },
  { id: 'wind', label: 'Wind' },
];

export default function AmbientTile() {
  const ambientTrack = useAppStore(s => s.ambientTrack);
  const setAmbientTrack = useAppStore(s => s.setAmbientTrack);

  const handleToggle = (id: Exclude<AmbientTrack, null>) => {
    setAmbientTrack(ambientTrack === id ? null : id);
  };

  return (
    <div
      data-testid="ambient-tile"
      style={{
        background: 'var(--ambient)',
        borderRadius: '24px',
        height: '184px',
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 16px',
        gap: '10px',
      }}
    >
      <span
        style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: 0.45,
          color: '#FFFFFF',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Ambient
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {tracks.map(track => {
          const isActive = ambientTrack === track.id;
          return (
            <motion.button
              key={track.id}
              data-testid={`button-ambient-${track.id}`}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleToggle(track.id)}
              style={{
                background: isActive ? 'var(--ambient-active)' : 'rgba(255,255,255,0.07)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                textAlign: 'left',
                transition: 'background 0.2s ease',
                flex: 1,
              }}
            >
              {track.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
