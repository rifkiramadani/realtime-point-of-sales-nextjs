import { environment } from "@/configs/environment";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Buat variabel global untuk menampung instance tunggal
let supabaseInstance: SupabaseClient | null = null;

export function createClientSupabase() {
  // Jika instance sudah pernah dibuat, gunakan kembali (tidak bikin baru)
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // Jika belum ada, buat baru sekali saja
  supabaseInstance = createClient(
    environment.SUPABASE_URL!,
    environment.SUPABASE_PUBLISHABLE_KEY!,
  );

  return supabaseInstance;
}
