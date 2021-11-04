// @ts-nocheck
import { createContext, useState, useEffect } from "react"

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPref = window.localStorage.getItem("color-theme")
    if (storedPref === "light" || storedPref === "dark") {
      return storedPref
    }

    const userPref = window.matchMedia("(prefers-color-scheme: dark)")
    if (userPref.matches) {
      return "dark"
    }
  }
  return "light"
}

type Theme = "dark" | "light"
type SetTheme = React.Dispatch<React.SetStateAction<Theme>>
type ThemeContextT = {
  theme?: Theme
  setTheme?: SetTheme
}

const ThemeContext = createContext<ThemeContextT>({})

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const updateTheme = theme => {
    const root = window.document.documentElement
    const isDark = theme === "dark"

    root.classList.remove(isDark ? "light" : "dark")
    root.classList.add(theme)

    localStorage.setItem("color-theme", theme)
  }

  useEffect(() => {
    updateTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider }
