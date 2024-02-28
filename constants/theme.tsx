import { PaletteColorOptions, createTheme } from '@mui/material'
const { palette } = createTheme()
const { augmentColor } = palette

const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } })

declare module '@mui/material/styles' {
  interface CustomPalette {
    accent: PaletteColorOptions
    black: PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true
    black: true
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'Sarabun'].join(','),
    h1: {
      // DISPLAY LARGE
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '72px',
    },
    h2: {
      // DISPLAY MEDIUM
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '56px',
    },
    h3: {
      // DISPLAY SMALL
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '48px',
    },
    h4: {
      // HEADLINE LARGE
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '32px',
    },
    h5: {
      // HEADLINE SMALL
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '24px',
    },
    subtitle1: {
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: '24px',
    },
    subtitle2: {
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: '18px',
    },
    body1: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '18px',
    },
    body2: {
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: '16px',
    },
  },
  palette: {
    primary: {
      main: '#EE6457',
      light:'#F9C4BA'
    },
    secondary: {
      main: '#FDF5F4',
    },
    error: {
      main: '#FF0038',
    },
    
    grey: {
      200: '#C7C7C7',
      600: '#808080',
    },
    text: {
      primary: '##313131',
      secondary:'#9B9B9B'
    },
    success: {
      main: '#34CC25',
    },
    accent: createColor('#153E90'),
    black: createColor('#000000'),
  },
})
