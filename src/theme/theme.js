// src/theme/theme.js
import { createTheme } from '@mui/material/styles';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';

const theme = createTheme({
  palette: colors,
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
            color: '#FF4081',
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

export default theme;
