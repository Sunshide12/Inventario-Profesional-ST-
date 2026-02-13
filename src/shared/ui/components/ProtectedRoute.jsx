import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * ProtectedRoute - Route Guard (Adapter Pattern)
 * 
 * Valida autenticación antes de renderizar una ruta.
 * Si no hay usuario, redirige a login.
 * Si está cargando, muestra un loader.
 */

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Mientras verifica la sesión
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no hay usuario, redirige a login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si hay usuario, renderiza el componente
  return children;
}
