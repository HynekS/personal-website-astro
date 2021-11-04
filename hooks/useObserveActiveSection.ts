import { MutableRefObject, useEffect } from "react"

export default function useObserveActiveSection(
  navRef: MutableRefObject<HTMLElement>,
  articleRef: MutableRefObject<HTMLElement>,
): void {
  return useEffect(() => {
    let observer = null
    if (articleRef.current && navRef.current) {
      let currentActiveElement = null
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute("id")
          if (entry.intersectionRatio > 0) {
            currentActiveElement && currentActiveElement.classList.remove("active")
            currentActiveElement = navRef.current.querySelector(`li a[href="#${id}"]`).parentElement
            currentActiveElement.classList.add("active")
          }
        })
      })
      articleRef.current.querySelectorAll("h2, h3, h4, h5, h6").forEach(heading => {
        observer.observe(heading)
      })
    }
    return () => {
      observer = null
    }
  }, [navRef, articleRef])
}
