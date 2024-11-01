// src/theme/theme.js
import { createTheme } from '@mui/material/styles';
import typography from './typography';
import spacing from './spacing';
import "@fontsource/inter";

const getTheme = (mode) => createTheme({
  palette: {
    mode: mode === 'dark' ? 'dark' : 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5',
      paper: mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.05)'  // Transparent overlay for most paper surfaces
        : '#ffffff',
    },
  },
  typography: {
    ...typography,
    fontFamily: 'Inter, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    body1: { fontWeight: 400, fontSize: '1rem', lineHeight: 1.5 },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 3px 6px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.12)',
  ],
  spacing: 8,
  customSpacing: spacing,
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'pointsValue' },
          style: {
            fontSize: '0.875rem',
            fontWeight: 500,
          },
        },
      ],
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#121212' : '#ffffff', // Solid color for Drawer background
        },
      },
    },
  },
  utils: {
    giveOuterPadding: {
      px: {
        xs: spacing.outerAppPadding.xs,
        sm: spacing.outerAppPadding.sm,
        md: spacing.outerAppPadding.md,
      },
    },
  },
});

export default getTheme;
