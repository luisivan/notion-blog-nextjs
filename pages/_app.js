import { useTheme, ThemeProvider } from 'next-themes'
import { Layout } from '../components/layout'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

export default function Blog({ Component, pageProps }) {
  const { theme } = useTheme()

  return (
    <ThemeProvider>
      <Layout theme={theme}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
