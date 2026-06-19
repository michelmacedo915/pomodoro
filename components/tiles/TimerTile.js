import { View, Text, Pressable } from 'react-native';
import { formatTime } from '../../utils/time';

// Hero tile — 25:00 + Start. Brand colour at full saturation (SPECS §2, mockup).
export function TimerTile({ secondsLeft, isRunning, onStart, onPause }) {
  return (
    <View className="bg-timer rounded-tile w-full p-6 items-center">
      <Text className="text-timerText text-[96px] font-extrabold leading-none">
        {formatTime(secondsLeft)}
      </Text>
      <Pressable
        className="bg-shell/15 mt-4 rounded-full px-8 py-3"
        onPress={isRunning ? onPause : onStart}
      >
        <Text className="text-timerText font-bold">{isRunning ? 'Pause' : 'Start'}</Text>
      </Pressable>
    </View>
  );
}
