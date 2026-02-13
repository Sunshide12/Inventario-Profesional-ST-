import { createTheme } from '@mui/material/styles';

const palette = {
  mode: 'light',
  primary: {
    main: '#1565c0',
    light: '#42a5f5',
    dark: '#0d47a1',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#455a64',
    light: '#78909c',
    dark: '#263238',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f5f7fa',
    paper: '#ffffff',
  },
  text: {
    primary: '#1a237e',
    secondary: '#455a64',
    disabled: '#90a4ae',
  },
  error: {
    main: '#c62828',
    light: '#ef5350',
    dark: '#b71c1c',
  },
  warning: {
    main: '#f57c00',
    light: '#ffb74d',
    dark: '#e65100',
  },
  success: {
    main: '#2e7d32',
    light: '#66bb6a',
    dark: '#1b5e20',
  },
  info: {
    main: '#0277bd',
    light: '#03a9f4',
    dark: '#01579b',
  },
};

const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontWeight: 600 },
  h2: { fontWeight: 600 },
  h3: { fontWeight: 600 },
  h4: { fontWeight: 600 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  button: { fontWeight: 600, textTransform: 'none' },
};

const shape = { borderRadius: 8 };

const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 600,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { borderRadius: 12 },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
  },
};

const theme = createTheme({
  palette,
  typography,
  shape,
  components,
});

export default theme;
