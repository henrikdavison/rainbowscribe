// src/theme/typography.js
const typography = {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h5: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 400,
    },
    body1: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 700,
    },
    // Custom typography variants
    components: {
      MuiTypography: {
        variants: [
          {
            props: { variant: 'pointsValue' },
            style: {
              fontSize: '0.875rem',
              fontWeight: 500
            },
          },
          // Add more custom variants here as needed
        ],
      },
    },
  };
  
  export default typography;
  