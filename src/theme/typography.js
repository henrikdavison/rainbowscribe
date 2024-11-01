// src/theme/typography.js
const typography = {
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
    // Custom typography variants
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
          // Add more custom variants here as needed
        ],
      },
    },
  };
  
  export default typography;
  