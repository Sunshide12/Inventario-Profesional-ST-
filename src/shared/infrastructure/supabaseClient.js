import { createClient } from '@supabase/supabase-js';

/**
 * supabaseClient - Cliente compartido de Supabase
 * 
 * Centralizado en shared para ser el único punto de inicialización.
 * Los repositorios de infraestructura lo importan desde aquí.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variables de entorno de Supabase no configuradas');
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
