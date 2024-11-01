// src/theme/theme.js
import { createTheme } from '@mui/material/styles';
import typography from './typography';
import spacing from './spacing';

const getTheme = (mode) => createTheme({
  palette: {
    mode: mode === 'dark' ? 'dark' : 'light', // Ensure mode is a string ('light' or 'dark')
    primary: {
      main: '#1976d2', // Default MUI primary color
    },
    secondary: {
      main: '#dc004e', // Default MUI secondary color
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5', // Set default backgrounds for light/dark modes
    },
  },
  typography: typography,
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
