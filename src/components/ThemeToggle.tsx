import { signal, effect } from "@preact/signals";
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";

export default function ThemeToggle() {
  const theme = signal(localStorage.getItem("theme") ?? "light");

  const handleClick = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  effect(() => {
    if (!globalThis.document) return;

    if (theme.value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme.value);
  });

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle Dark Mode"
      type="button"
      className="rounded-full border-2 p-1 focus:outline-none focus:ring-0 dark:border-gray-600"
    >
      {theme.value === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
