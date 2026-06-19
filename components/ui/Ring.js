import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Animated progress ring placeholder (Reanimated). Pass progress 0..1.
export function Ring({ progress = 0, size = 120 }) {
  const p = useSharedValue(0);
  useEffect(() => { p.value = withTiming(progress, { duration: 400 }); }, [progress]);
  const style = useAnimatedStyle(() => ({ transform: [{ rotate: `${p.value * 360}deg` }] }));
  return (
    <Animated.View
      style={[{ width: size, height: size, borderRadius: size / 2, borderWidth: 8 }, style]}
      className="border-accent"
    />
  );
}
