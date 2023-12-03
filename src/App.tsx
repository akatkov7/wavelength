import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { ReactElement } from 'react';
import 'typeface-roboto';
import HeaderNav from './components/HeaderNav';
import Wavelength from './components/Wavelength';

const theme = createTheme();

/**
 * @returns {ReactElement} - Main App JSX
 */
function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <HeaderNav />
      <Wavelength />
    </ThemeProvider>
  );
}

export default App;
