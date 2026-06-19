import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Complex-backend client. Only used when an app outgrows on-device storage
// + API Routes. (ARCHITECTURE.md §1 "Backend - complex")
const { supabaseUrl, supabaseAnonKey } = Constants.expoConfig?.extra ?? {};

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
