import Constants from 'expo-constants';

// Product analytics (Vexo). Free tier covers early usage.
export async function initAnalytics() {
  const key = Constants.expoConfig?.extra?.vexoApiKey;
  if (!key) return;
  try {
    const { vexo } = await import('vexo-analytics');
    vexo(key);
  } catch (e) {
    // analytics is non-critical — never crash the app over it
  }
}
