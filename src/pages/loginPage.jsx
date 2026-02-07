import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
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
import { Link as RouterLink } from 'react-router-dom';

const LoginPage = () => {
  const handleSubmit = () => console.log('submit');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 },
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
          <Typography
            component="h1"
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 2,
              mt: 1,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Bienvenido A La Aplicación
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              placeholder="Enter Username"
              fullWidth
              required
              autoFocus
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              placeholder="Enter Password"
              fullWidth
              required
              type="password"
              size="small"
              sx={{ mb: 1.5 }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" size="small" />}
              label="Remember me"
              sx={{ mb: 1 }}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1.5, py: 1.25 }}>
              Sign in
            </Button>
          </Box>
          <Grid
            container
            justifyContent="space-between"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'center', sm: 'flex-start' }}
            gap={{ xs: 1, sm: 0 }}
            sx={{ mt: 2 }}
          >
            <Grid>
              <Link component={RouterLink} to="/forgot" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid>
              <Link component={RouterLink} to="/signup" variant="body2">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
export default LoginPage;
