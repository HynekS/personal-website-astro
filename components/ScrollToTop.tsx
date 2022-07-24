import React, { useEffect, useState } from "react"
import tw from "twin.macro"

interface ScrollToTopProps {
  treshold: number
  scrollContainer: HTMLElement | Window | null
}

const ScrollToTop = ({ treshold, scrollContainer }: ScrollToTopProps) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", throttle(toggleVisible, 300))
      return () => {
        scrollContainer.removeEventListener("scroll", throttle(toggleVisible, 300))
      }
    }
  }, [scrollContainer])

  const throttle = (cb, timeout = 0) => {
    let inProgress = false
    return (...args) => {
      if (!inProgress) {
        cb(...args)
        inProgress = true
        setTimeout(() => {
          inProgress = false
        }, timeout)
      }
    }
  }

  const toggleVisible = () => {
    const scrolled =
      scrollContainer instanceof Window ? scrollContainer?.scrollY : scrollContainer.scrollTop

    if (scrolled > treshold) {
      setVisible(true)
    } else if (scrolled <= treshold) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    scrollContainer.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      css={[
        tw`fixed bottom-6 right-10 bg-primary origin-center transition-transform shadow-xl rounded-full text-primary flex items-center justify-center border-2 p-3 focus:(outline-none ring-0) dark:(border-coolGray-600)`,
        visible ? tw`scale-100` : tw`scale-0`,
      ]}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        tw="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}

export default ScrollToTop
