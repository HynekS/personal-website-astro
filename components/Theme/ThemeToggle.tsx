import { useState, useEffect } from "react"

import { useTheme, Theme } from "./ThemeContext"
import MoonIcon from "../MoonIcon"
import SunIcon from "../SunIcon"

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = (theme: Theme | undefined) => theme === "dark"

  return mounted ? (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      tw="rounded-full text-accent flex items-center justify-center border-2 p-1 focus:(outline-none ring-0) dark:(border-gray-500)"
      onClick={toggleTheme}
    >
      {isDark(theme) ? <SunIcon /> : <MoonIcon />}
    </button>
  ) : null
}

export default ThemeToggle
