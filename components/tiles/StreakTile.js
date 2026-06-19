import { View, Text } from 'react-native';

// Mirrors hero colour — creates the diagonal rhythm (SPECS §2).
export function StreakTile({ days = 7 }) {
  return (
    <View className="bg-streak rounded-tile flex-1 aspect-square justify-end p-4">
      <Text className="text-streakText text-4xl font-extrabold">{days}</Text>
      <Text className="text-streakText/70 text-[10px] font-bold uppercase">day streak</Text>
    </View>
  );
}
