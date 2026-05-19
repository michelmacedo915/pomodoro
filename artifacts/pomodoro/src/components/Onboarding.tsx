import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import type { Theme } from '@/types';

const themeOptions: {
  id: Theme;
  name: string;
  mood: string;
  colors: { shell: string; timer: string; plus: string; reset: string };
}[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    mood: 'Deep focus',
    colors: { shell: '#0F1729', timer: '#1C50D8', plus: '#FF9500', reset: '#0F1729' },
  },
  {
    id: 'energy',
    name: 'Energy',
    mood: 'High alert',
    colors: { shell: '#0A0A0A', timer: '#FFD700', plus: '#FF3B30', reset: '#FF9500' },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    mood: 'Wind-down',
    colors: { shell: '#1A0E0E', timer: '#FF6B35', plus: '#FFF5E1', reset: '#C73E1D' },
  },
  {
    id: 'break',
    name: 'Break',
    mood: 'Rest mode',
    colors: { shell: '#0A1F1A', timer: '#52B788', plus: '#E8E8E8', reset: '#5DADE2' },
  },
];

export default function Onboarding() {
  const [selected, setSelected] = useState<Theme>('midnight');
  const setTheme = useAppStore(s => s.setTheme);
  const setScreen = useAppStore(s => s.setScreen);

  const selectedTheme = themeOptions.find(t => t.id === selected)!;

  const handleDone = () => {
    setTheme(selected);
    setScreen('hero');
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#0A0A14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: '370px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              margin: 0,
              marginBottom: '10px',
            }}
          >
            Stay focused.
          </h1>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              margin: 0,
              letterSpacing: '0.01em',
            }}
          >
            One timer. Zero distractions.
          </p>
        </div>

        <p
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '14px',
          }}
        >
          Pick your theme
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '28px',
          }}
        >
          {themeOptions.map((theme, index) => (
            <motion.div
              key={theme.id}
              data-testid={`theme-card-${theme.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelected(theme.id)}
              style={{
                background: theme.colors.shell,
                borderRadius: '20px',
                padding: '14px',
                cursor: 'pointer',
                border: `2px solid ${selected === theme.id ? theme.colors.timer : 'transparent'}`,
                transition: 'border-color 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: theme.colors.timer,
                  borderRadius: '10px',
                  height: '44px',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    color: theme.id === 'energy' ? '#0A0A0A' : '#FFFFFF',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  25:00
                </span>
              </div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                <div
                  style={{
                    flex: 1,
                    background: theme.colors.plus,
                    borderRadius: '7px',
                    height: '20px',
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    background: theme.colors.reset === theme.colors.shell
                      ? 'rgba(255,255,255,0.08)'
                      : theme.colors.reset,
                    borderRadius: '7px',
                    height: '20px',
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: 0,
                  marginBottom: '2px',
                }}
              >
                {theme.name}
              </p>
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.4)',
                  margin: 0,
                }}
              >
                {theme.mood}
              </p>

              {selected === theme.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: theme.colors.timer,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: theme.id === 'energy' ? '#0A0A0A' : '#FFFFFF',
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.button
          data-testid="button-done"
          whileTap={{ scale: 0.96 }}
          onClick={handleDone}
          style={{
            width: '100%',
            height: '56px',
            borderRadius: '28px',
            border: 'none',
            background: selectedTheme.colors.timer,
            color: selectedTheme.id === 'energy' ? '#0A0A0A' : '#FFFFFF',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.3s ease',
          }}
        >
          Done
        </motion.button>
      </motion.div>
    </div>
  );
}
