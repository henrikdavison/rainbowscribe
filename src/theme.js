// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF', // Similar to MUI's blue color
    },
    secondary: {
      main: '#FF4081', // Pink accent color
    },
    background: {
      default: '#F5F5F5', // Light grey background
    },
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h5: {
      fontWeight: 500,
      color: '#007FFF',
    },
    subtitle1: {
      fontWeight: 400,
      color: '#616161',
    },
    body1: {
      fontWeight: 400,
      color: '#424242',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
});

export default theme;
