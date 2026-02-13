import { useContext } from 'react';
import { AuthContext } from '../../../modules/auth/ui/contexts/AuthContext';

/**
 * useAuth - Custom Hook
 * 
 * Proporciona acceso seguro al contexto de autenticación.
 * Lanza error si se usa fuera del AuthProvider.
 */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
