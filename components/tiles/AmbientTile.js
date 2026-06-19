import { View, Text, Pressable } from 'react-native';
import { useAppStore } from '../../stores/useAppStore';

const CHIPS = [
  { key: 'rain', label: 'R' },
  { key: 'lofi', label: 'L' },
  { key: 'wind', label: 'W' },
];

// Ambient sound chips (Rain / Lo-fi / Wind). Audio loops are sourced separately — TODO.
export function AmbientTile() {
  const active = useAppStore((s) => s.ambientTrack);
  const setAmbient = useAppStore((s) => s.setAmbient);
  return (
    <View className="bg-ambient rounded-tile flex-1 aspect-square justify-end p-3">
      <Text className="text-timerText/60 mb-2 text-[10px] font-bold uppercase">Ambient</Text>
      <View className="flex-row justify-between">
        {CHIPS.map((c) => (
          <Pressable
            key={c.key}
            onPress={() => setAmbient(active === c.key ? null : c.key)}
            className={`h-9 w-9 items-center justify-center rounded-chip ${active === c.key ? 'bg-ambientActive' : 'bg-timerText/10'}`}
          >
            <Text className="text-timerText text-xs font-bold">{c.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
