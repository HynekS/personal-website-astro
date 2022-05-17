import type { AppProps } from "next/app"
import { Global } from "@emotion/react"
import { GlobalStyles } from "twin.macro"
import { MDXProvider } from "@mdx-js/react"
import { MDXEmbedProvider } from "mdx-embed"

import Lightbox from "@/components/Lightbox"
import { ThemeProvider } from "../components/Theme"
import baseStyles from "./../components/baseStyles"

import "html5-device-mockups/dist/device-mockups.min.css"

const components = {
  Lightbox,
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <GlobalStyles />
        <Global styles={baseStyles} />
        <MDXProvider components={components}>
          <MDXEmbedProvider>
            <Component {...pageProps} />
          </MDXEmbedProvider>
        </MDXProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
