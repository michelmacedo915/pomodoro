import Constants from 'expo-constants';

// Chat / video (Stream) — ONLY wire this up if the app's user stories need
// messaging. Add 'stream-chat-react-native' to package.json first.
export function getStreamKey() {
  return Constants.expoConfig?.extra?.streamApiKey ?? null;
}
