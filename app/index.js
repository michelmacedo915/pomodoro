import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../stores/useAppStore';
import { useTimer } from '../hooks/useTimer';
import { useSession } from '../hooks/useSession';
import { TimerTile } from '../components/tiles/TimerTile';
import { ActionTile } from '../components/tiles/ActionTile';
import { ProgressTile } from '../components/tiles/ProgressTile';
import { StreakTile } from '../components/tiles/StreakTile';
import { AmbientTile } from '../components/tiles/AmbientTile';

// Screen 1 — Hero / Dashboard. Bento grid of 6 tiles (POMODORO_SPEC §2, see mockup).
export default function Hero() {
  const duration = useAppStore((s) => s.sessionDuration);
  const { saveSession } = useSession();
  const t = useTimer(duration, () => saveSession(duration, true));

  return (
    <SafeAreaView className="bg-shell flex-1">
      <View className="flex-1 gap-3 px-4 py-3">
        <TimerTile
          secondsLeft={t.secondsLeft}
          isRunning={t.isRunning}
          onStart={t.start}
          onPause={t.pause}
        />
        <View className="flex-row gap-3">
          <ActionTile label="+5" tone="plus" onPress={() => t.addTime(300)} />
          <ActionTile label="↺" tone="reset" onPress={t.reset} />
        </View>
        <ProgressTile completed={6} total={8} />
        <View className="flex-row gap-3">
          <StreakTile days={useAppStore.getState().streak.current} />
          <AmbientTile />
        </View>
      </View>
    </SafeAreaView>
  );
}
