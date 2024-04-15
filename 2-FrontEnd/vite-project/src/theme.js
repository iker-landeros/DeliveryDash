import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    white: '#fff',
    black: '#000',
    steelblue100: '#4177b6',
    gray: '#787878',
  },
  space: {
    mini: '15px',
    '11xl': '30px',
  },
  radii: {
    '11xl': '30px',
  },
});

export default theme;