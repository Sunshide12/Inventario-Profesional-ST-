import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './modules/auth/ui/pages/LoginPage';
import DashboardPage from './modules/auth/ui/pages/dashboardPage';
import { ProtectedRoute } from './shared/ui/components';

/**
 * App - Root Component
 * 
 * Configura las rutas de la aplicación.
 * Router y AuthProvider ya están en main.jsx
 */

function App() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<LoginPage />} />

      {/* Rutas protegidas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
