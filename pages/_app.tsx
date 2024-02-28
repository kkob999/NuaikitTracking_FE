import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import '../styles/globals.css'
import Navbar from './View/Navbar'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <AppCacheProvider {...pageProps}><Component {...pageProps} /></AppCacheProvider>)
}
