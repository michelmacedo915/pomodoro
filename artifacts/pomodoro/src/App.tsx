import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { useAudio } from '@/hooks/useAudio';
import { useTimer } from '@/hooks/useTimer';
import Onboarding from '@/components/Onboarding';
import Hero from '@/components/Hero';
import SessionInProgress from '@/components/SessionInProgress';
import BreakScreen from '@/components/BreakScreen';

export default function App() {
  const screen = useAppStore(s => s.screen);
  const theme = useAppStore(s => s.theme);
  const ambientTrack = useAppStore(s => s.ambientTrack);

  useAudio(ambientTrack);
  useTimer();

  useEffect(() => {
    const applied = screen === 'break' ? 'break' : theme;
    document.documentElement.setAttribute('data-theme', applied);
  }, [theme, screen]);

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding': return <Onboarding />;
      case 'hero': return <Hero />;
      case 'in-progress': return <SessionInProgress />;
      case 'break': return <BreakScreen />;
      default: return <Hero />;
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--shell)' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ minHeight: '100dvh' }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
