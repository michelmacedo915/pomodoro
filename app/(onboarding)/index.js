import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAppStore } from '../../stores/useAppStore';
import { applyTheme } from '../../lib/applyTheme';
import { themeOrder } from '../../theme/themes';

// Onboarding — 1 screen, ~30s: welcome + theme pick (POMODORO_SPEC §2).
export default function Onboarding() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const done = useAppStore((s) => s.completeOnboarding);

  return (
    <View className="bg-shell flex-1 justify-center px-6">
      <Text className="text-timerText text-3xl font-extrabold">Stay focused.</Text>
      <Text className="text-timerText/60 mt-1">One timer. Zero distractions.</Text>

      <Text className="text-timerText/60 mt-8 mb-2 text-xs font-bold uppercase">Pick your theme</Text>
      <View className="flex-row flex-wrap gap-3">
        {themeOrder.map((name) => (
          <Pressable
            key={name}
            onPress={() => { setTheme(name); applyTheme(name); }}
            className={`rounded-tile px-4 py-3 ${theme === name ? 'bg-timer' : 'bg-progress'}`}
          >
            <Text className="text-timerText font-bold capitalize">{name}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        className="bg-plus mt-10 rounded-tile px-6 py-3"
        onPress={() => { done(); router.replace('/'); }}
      >
        <Text className="text-shell text-center font-bold">Done</Text>
      </Pressable>
    </View>
  );
}
