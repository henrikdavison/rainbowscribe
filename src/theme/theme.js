// src/theme/theme.js
import { createTheme } from '@mui/material/styles';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';

const theme = createTheme({
  palette: colors,
  typography: typography,
  spacing: 8, // Base unit for spacing
  customSpacing: spacing, // Custom reusable spacing values
});

export default theme;
