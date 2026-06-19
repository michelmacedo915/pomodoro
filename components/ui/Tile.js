import { View } from 'react-native';

// Generic bento tile placeholder. Size/colour via className props.
export function Tile({ children, className = '' }) {
  return <View className={`rounded-tile p-4 ${className}`}>{children}</View>;
}
