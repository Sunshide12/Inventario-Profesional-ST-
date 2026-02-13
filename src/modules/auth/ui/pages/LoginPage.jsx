import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../shared/ui/hooks/useAuth';

/**
 * LoginPage - Página de Login (Primary Adapter - UI)
 * 
 * Consumidor del contexto de autenticación.
 * Solo maneja:
 * - Estados de UI (email, password, error)
 * - Interacción con el usuario
 * - Validaciones de presentación
 * 
 * La lógica de negocio (login propiamente) está en el caso de uso.
 */

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error: contextError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  /**
   * Valida antes de hacer submit
   */
  const validateForm = () => {
    if (!email.trim()) {
      setLocalError('El email es requerido');
      return false;
    }
    if (!password) {
      setLocalError('La contraseña es requerida');
      return false;
    }
    return true;
  };

  /**
   * Maneja el submit del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // Validación de presentación
    if (!validateForm()) {
      return;
    }

    try {
      // El contexto ejecuta el caso de uso
      await login(email, password);

      // Si el login fue exitoso, limpiar y redirigir
      setEmail('');
      setPassword('');
      // TODO: Reemplazar por ruta correcta del dashboard
      navigate('/dashboard');
    } catch (err) {
      // El error ya está en el contexto, pero también lo mostramos localmente
      setLocalError(err.message);
    }
  };

  const displayError = localError || contextError;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 },
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="sm" disableGutters sx={{ width: '100%' }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            mx: { xs: 0, sm: 1 },
            width: '100%',
          }}
        >
          {/* Avatar */}
          <Avatar
            sx={{
              m: 'auto',
              bgcolor: 'primary.main',
              width: { xs: 40, sm: 56 },
              height: { xs: 40, sm: 56 },
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.75rem' } }} />
          </Avatar>

          {/* Título */}
          <Typography
            component="h1"
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 3,
              mt: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 600,
            }}
          >
            Iniciar Sesión
          </Typography>

          {/* Error Alert */}
          {displayError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {displayError}
            </Alert>
          )}

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            {/* Email Input */}
            <TextField
              placeholder="Correo Electrónico"
              type="email"
              fullWidth
              required
              autoFocus
              size="small"
              sx={{ mb: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              inputProps={{ 'aria-label': 'email' }}
            />

            {/* Password Input */}
            <TextField
              placeholder="Contraseña"
              type="password"
              fullWidth
              required
              size="small"
              sx={{ mb: 1.5 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              inputProps={{ 'aria-label': 'password' }}
            />

            {/* Remember Me */}
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Recuérdame"
              sx={{ mb: 2 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.25, fontWeight: 600 }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </Box>

          {/* Links */}
          <Grid
            container
            justifyContent="space-between"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'center', sm: 'flex-start' }}
            gap={{ xs: 1, sm: 0 }}
            sx={{ mt: 3 }}
          >
            <Grid >
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid >
              <Link component={RouterLink} to="/signup" variant="body2">
                Crear cuenta
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
