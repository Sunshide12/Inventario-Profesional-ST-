import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../shared/ui/hooks/useAuth";

/**
 * RegisterPage - Página de Registro (Primary Adapter - UI)
 *
 * Muy similar a `LoginPage.jsx`. Valida la entrada y usa el contexto
 * para ejecutar el caso de uso `register`.
 */

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error: contextError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const validateForm = () => {
    if (!email.trim()) {
      setLocalError("El email es requerido");
      return false;
    }
    if (!password) {
      setLocalError("La contraseña es requerida");
      return false;
    }
    if (password.length < 6) {
      setLocalError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    if (password !== confirmPassword) {
      setLocalError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!validateForm()) return;

    try {
      await register(email, password);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/dashboard");
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const displayError = localError || contextError;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 },
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="sm" disableGutters sx={{ width: "100%" }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            mx: { xs: 0, sm: 1 },
            width: "100%",
          }}
        >
          <Avatar
            sx={{
              m: "auto",
              bgcolor: "primary.main",
              width: { xs: 40, sm: 56 },
              height: { xs: 40, sm: 56 },
            }}
          >
            <PersonAddIcon
              sx={{ fontSize: { xs: "1.25rem", sm: "1.75rem" } }}
            />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 3,
              mt: 2,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              fontWeight: 600,
            }}
          >
            Crear Cuenta
          </Typography>

          {displayError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {displayError}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
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
              inputProps={{ "aria-label": "email" }}
            />

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
              inputProps={{ "aria-label": "password" }}
            />

            <TextField
              placeholder="Confirmar Contraseña"
              type="password"
              fullWidth
              required
              size="small"
              sx={{ mb: 2 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              inputProps={{ "aria-label": "confirm-password" }}
            />

            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.25, fontWeight: 600 }}
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </Box>

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Grid>
              <Link component={RouterLink} to="/login" variant="body2">
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
