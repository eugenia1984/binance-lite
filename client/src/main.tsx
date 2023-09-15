import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { binanceTheme } from './theme/theme.ts'
import LoaderProvider from './context/LoaderProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={ binanceTheme }>
      <CssBaseline />
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
