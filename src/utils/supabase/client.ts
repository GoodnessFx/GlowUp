import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a singleton Supabase client to avoid multiple instances
let supabaseClient: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );
  }
  return supabaseClient;
};

// Export the client instance
export const supabase = getSupabaseClient();