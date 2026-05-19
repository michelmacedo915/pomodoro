import { motion, type Variants } from 'framer-motion';
import TimerTile from './tiles/TimerTile';
import ActionTile from './tiles/ActionTile';
import ProgressTile from './tiles/ProgressTile';
import StreakTile from './tiles/StreakTile';
import AmbientTile from './tiles/AmbientTile';

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Hero() {
  return (
    <div
      data-testid="hero-screen"
      style={{
        minHeight: '100dvh',
        background: 'var(--shell)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px env(safe-area-inset-bottom, 16px)',
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          width: '100%',
          maxWidth: '370px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
        }}
      >
        <motion.div variants={item} style={{ gridColumn: '1 / -1' }}>
          <TimerTile />
        </motion.div>

        <motion.div variants={item}>
          <ActionTile type="plus" />
        </motion.div>

        <motion.div variants={item}>
          <ActionTile type="reset" />
        </motion.div>

        <motion.div variants={item} style={{ gridColumn: '1 / -1' }}>
          <ProgressTile />
        </motion.div>

        <motion.div variants={item}>
          <StreakTile />
        </motion.div>

        <motion.div variants={item}>
          <AmbientTile />
        </motion.div>
      </motion.div>
    </div>
  );
}
