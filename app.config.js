// Dynamic config: extends app.json and exposes public env vars to the app at runtime.
// Read these in code via expo-constants: Constants.expoConfig.extra.*
import appJson from './app.json';

export default ({ config }) => ({
  ...appJson.expo,
  ...config,
  extra: {
    ...(appJson.expo.extra || {}),
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    revenueCatKeyIos: process.env.EXPO_PUBLIC_REVENUECAT_KEY_IOS,
    revenueCatKeyAndroid: process.env.EXPO_PUBLIC_REVENUECAT_KEY_ANDROID,
    vexoApiKey: process.env.EXPO_PUBLIC_VEXO_API_KEY,
    sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    streamApiKey: process.env.EXPO_PUBLIC_STREAM_API_KEY,
    eas: { projectId: process.env.EAS_PROJECT_ID },
  },
});
