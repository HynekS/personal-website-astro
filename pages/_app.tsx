import type { AppProps } from "next/app"
import { Global } from "@emotion/react"
import { GlobalStyles } from "twin.macro"

import { ThemeProvider } from "../components/Theme"
import baseStyles from "./../components/baseStyles"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <GlobalStyles />
        <Global styles={baseStyles} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
