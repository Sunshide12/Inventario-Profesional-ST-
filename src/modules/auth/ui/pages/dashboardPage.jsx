
import { Button, Container, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../shared/ui/hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * DashboardPage - Dashboard Principal (Primary Adapter - UI)
 * 
 * Página protegida que solo pueden ver usuarios autenticados.
 */

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        px: { xs: 1, sm: 2 },
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 600,
              }}
            >
              Dashboard
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              disabled={loading}
            >
              Cerrar Sesión
            </Button>
          </Box>

          {/* Contenido */}
          <Typography variant="body1" sx={{ mb: 2 }}>
            Bienvenido al dashboard, <strong>{user?.email || 'Usuario'}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Aquí puedes ver tu información y gestionar tu cuenta.
          </Typography>

          {/* Placeholder para más contenido */}
          <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #e0e0e0' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Secciones disponibles
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Más contenido del dashboard vendrá aquí...
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DashboardPage;