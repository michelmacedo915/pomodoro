import { Pressable, Text } from 'react-native';

// 181x176 action tile — used for +5 and Reset (mockup row 2).
export function ActionTile({ label, onPress, tone = 'plus' }) {
  const bg = tone === 'plus' ? 'bg-plus' : 'bg-reset';
  const fg = tone === 'plus' ? 'text-shell' : 'text-resetText';
  return (
    <Pressable className={`${bg} rounded-tile flex-1 aspect-square items-center justify-center`} onPress={onPress}>
      <Text className={`${fg} text-3xl font-extrabold`}>{label}</Text>
    </Pressable>
  );
}
