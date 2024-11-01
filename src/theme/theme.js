// src/theme/theme.js
import { createTheme } from '@mui/material/styles';
import typography from './typography';
import spacing from './spacing';

import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode: mode === 'dark' ? 'dark' : 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

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
