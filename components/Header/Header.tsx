import Link from "next/link"

import { ThemeToggle } from "../Theme"

const Header = (): JSX.Element => {
  return (
    <header tw="flex justify-between px-6 pt-6 pb-4">
      <Link href="/">
        <a>
          <img tw="w-6 h-auto" src={require("public/assets/images/logo.svg")} alt="logo" />
        </a>
      </Link>
      <div>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
