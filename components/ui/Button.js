import { Pressable, Text } from 'react-native';

// Reusable component (Reuse mindset). Variants map to theme tokens.
export function Button({ label, onPress, variant = 'primary' }) {
  const bg = { primary: 'bg-primary', accent: 'bg-accent', surface: 'bg-surface' }[variant];
  return (
    <Pressable className={`${bg} rounded-tile px-6 py-3 active:opacity-80`} onPress={onPress}>
      <Text className="text-ink text-center font-bold">{label}</Text>
    </Pressable>
  );
}
