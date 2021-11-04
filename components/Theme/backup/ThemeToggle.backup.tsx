// @ts-nocheck
import { useState, useEffect, useContext } from "react"

import { ThemeContext } from "./themeContext"
import MoonIcon from "../MoonIcon"
import SunIcon from "../SunIcon"

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme => theme === "dark"

  return mounted ? (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      tw="rounded-full text-accent flex items-center justify-center border border-2 p-1 focus:(outline-none ring-4) dark:(border-gray-500)"
      onClick={() => setTheme(isDark(theme) ? "light" : "dark")}
    >
      {isDark(theme) ? <SunIcon /> : <MoonIcon />}
    </button>
  ) : null
}

export default ThemeToggle
