import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

// Crash + error reporting. Call once from app/_layout.js.
export function initSentry() {
  const dsn = Constants.expoConfig?.extra?.sentryDsn;
  if (!dsn) return;
  Sentry.init({ dsn, tracesSampleRate: 0.2 });
}
