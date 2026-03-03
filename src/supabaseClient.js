import { createClient } from '@supabase/supabase-js';

// credentials may be provided via environment variables (at build time)
// or can be stored in localStorage for runtime configuration.
let url = process.env.REACT_APP_SUPABASE_URL;
let anonKey = process.env.REACT_APP_SUPABASE_KEY || process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabaseUrl = url || '';
export const supabaseKey = anonKey || '';

let _supabase;
export const supabaseConfigured = !!(supabaseUrl && supabaseKey);

if (supabaseConfigured) {
  _supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn(
    'Supabase URL or KEY not set. Please define REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY or use the configuration form in the app.'
  );
  // create a stub with same interface used by App to avoid runtime errors
  _supabase = {
    from: () => ({
      select: () => ({ order: async () => ({ data: [], error: null }) }),
      update: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
      insert: () => ({ single: async () => ({ data: null, error: null }) }),
      on: () => ({ subscribe: () => ({}) }),
    }),
    channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
    removeChannel: () => { },
    removeSubscription: () => { },
  };
}

export const supabase = _supabase;
