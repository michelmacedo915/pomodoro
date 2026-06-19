import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Monetisation (RevenueCat). Free under ~US$2.5k MTR, then ~1%.
export async function initPurchases() {
  const extra = Constants.expoConfig?.extra ?? {};
  const apiKey = Platform.OS === 'ios' ? extra.revenueCatKeyIos : extra.revenueCatKeyAndroid;
  if (!apiKey) return;
  try {
    const Purchases = (await import('react-native-purchases')).default;
    Purchases.configure({ apiKey });
  } catch (e) {
    // no-op in environments without the native module (e.g. web)
  }
}
