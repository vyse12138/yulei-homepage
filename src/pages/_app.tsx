import { createContext, useState } from 'react'
import { grey, orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { Box, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import contents from '../contents'
import '../index.css'
import Scene from '../components/Scene'
import Navigation from '../components/Navigation'
import { AnimatePresence } from 'framer-motion'

export const GlobalContext = createContext({
  toggleTheme: () => {},
  toggleLanguage: () => {},
  contents,
  english: true
})

export default function App({ Component, pageProps, router }: AppProps) {
  // Global theme
  const [dark, setDark] = useState<boolean>(true)
  const theme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
      background: {
        default: dark ? grey[900] : orange[50],
        paper: dark ? '#191919' : orange[100]
      }
    },
    breakpoints: {
      values: {
        xs: 366,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536
      }
    },
    typography: {
      fontFamily: 'Avenir, ZCOOL KuaiLe'
    }
  })

  // Global language
  const [english, setEnglish] = useState<boolean>(
    // /^en\b/.test(navigator.language),
    true
  )

  // Global context
  const globalContext = {
    toggleTheme: () => {
      setDark(dark => !dark)
    },
    toggleLanguage: () => {
      setEnglish(english => !english)
    },
    contents,
    english
  }

  return (
    <>
      <GlobalContext.Provider value={globalContext}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'background.default',
              color: 'text.primary',
              transition: 'all 0.3s linear'
            }}
          >
            <Navigation />
            <Scene />
            <AnimatePresence exitBeforeEnter initial={false}>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </Box>
        </ThemeProvider>
      </GlobalContext.Provider>
    </>
  )
}