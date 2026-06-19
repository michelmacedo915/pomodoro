import { View, Text } from 'react-native';

// Progress dots — completed sessions of total (mockup: 6 of 8).
export function ProgressTile({ completed = 6, total = 8 }) {
  return (
    <View className="bg-progress rounded-tile w-full flex-row items-center px-4 py-3">
      <Text className="text-progressDot mr-3 text-lg font-extrabold">{completed}</Text>
      <View className="flex-row flex-1 flex-wrap">
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            className={`mr-1 h-3 w-3 rounded-sm ${i < completed ? 'bg-progressDot' : 'bg-progressDot/25'}`}
          />
        ))}
      </View>
    </View>
  );
}
