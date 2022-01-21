import { useState, useRef, useEffect } from "react"
import Popup from "reactjs-popup"
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import tw, { css } from "twin.macro"

type LightboxProps = {
  images: Array<{ src: string; alt: string }>
  slug: string
}

const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth

const Lightbox = (props: LightboxProps): JSX.Element | null => {
  const { images = [], slug } = props

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const previousButtonRef = useRef(null)
  const nextButtonRef = useRef(null)

  // https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
  const rotateIndexIfOutOfLimits = (i: number, len: number = images.length) =>
    ((i % len) + len) % len

  // This hacky way is used because on opening popup, the state is stale and can't be properly updated
  const handleKeyUp = (e: KeyboardEvent) => {
    const mouseClick = () =>
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    const nextKeys = ["ArrowRight", "ArrowDown", "PageDown", "D", "X", "6", "2"]
    const previousKeys = ["ArrowLeft", "ArrowUp", "PageUp", "A", "W", "4", "8"]
    if (nextKeys.includes(e.key) && previousButtonRef.current) {
      previousButtonRef.current.dispatchEvent(mouseClick())
    }
    if (previousKeys.includes(e.key) && nextButtonRef.current) {
      nextButtonRef.current.dispatchEvent(mouseClick())
    }
  }

  return images.length ? (
    <section css={[images.length > 1 && tw`grid gap-2 md:(grid-cols-2) lg:(grid-cols-3)`]}>
      {images.map((image, index) => {
        const { alt = "", src } = image

        return (
          <figure
            tw="flex justify-center mb-0 rounded cursor-pointer bg-secondary"
            key={src + index}
          >
            <img
              src={require(`_mdx_/${slug}/${image.src}`)}
              alt={alt}
              onClick={() => {
                const i = images.findIndex(image => image.src === src)
                setCurrentIndex(i)
                setIsPopupOpen(true)
              }}
            />
          </figure>
        )
      })}
      <Popup
        open={isPopupOpen}
        modal
        nested
        onOpen={() => {
          document.getElementById("__next").style.width =
            String(document.getElementById("__next").clientWidth) + "px"
          document.body.style.overflowY = "hidden"

          window.addEventListener("keyup", handleKeyUp)
        }}
        onClose={() => {
          document.getElementById("__next").style.removeProperty("width")
          document.body.style.removeProperty("overflow-y")

          window.removeEventListener("keyup", handleKeyUp)
          return setIsPopupOpen(false)
        }}
        css={css`
          @keyframes enlarge {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          &-content {
            ${tw`w-auto p-4 m-auto rounded bg-primary`}
            animation: enlarge .3s cubic-bezier(0.175, 0.885, 0.32, 1.175) forwards;
          }
          &-overlay {
            background: rgba(0, 0, 0, 0.5);
          }
        `}
      >
        {(close: () => void) => (
          <div
            tw="relative flex items-center justify-center max-w-full max-h-screen rounded"
            className="group"
          >
            <button
              tw="invisible group-hover:visible absolute top[0.5rem] right[0.5rem] text-3xl h-8 w-8 bg-primary rounded-full flex items-center justify-center shadow-md"
              onClick={close}
            >
              <XIcon tw="w-4 h-4" />
            </button>
            {images.length > 1 ? (
              <button
                ref={previousButtonRef}
                onClick={() => {
                  setCurrentIndex(rotateIndexIfOutOfLimits(currentIndex - 1))
                }}
              >
                <ChevronLeftIcon tw="w-4 h-4" />
              </button>
            ) : null}

            <img
              src={require(`_mdx_/${slug}/${images[currentIndex % images.length].src}`)}
              tw="max-w-full max-h-screen"
            />

            {images.length > 1 ? (
              <button
                ref={nextButtonRef}
                onClick={() => {
                  setCurrentIndex(rotateIndexIfOutOfLimits(currentIndex - 1))
                }}
              >
                <ChevronRightIcon tw="w-4 h-4" />
              </button>
            ) : null}
            {/*images[currentIndex % images.length].caption && (
              <figcaption>{images[currentIndex % images.length].caption}</figcaption>
            )*/}
          </div>
        )}
      </Popup>
    </section>
  ) : null
}

export default Lightbox
