import Link from "next/link"
import Logo from "@/components/Logo"

import { ThemeToggle } from "@/components/Theme"

const Header = (): JSX.Element => {
  return (
    <header tw="sticky top-0 flex justify-between pr-6 pl-4 lg:(pl-[2.25rem]) pt-6 pb-4">
      <Link href="/" passHref>
        <a aria-label="Link to homepage">
          <Logo />
        </a>
      </Link>
      <div>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
