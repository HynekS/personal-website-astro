import { useState } from "react"
import Popup from "reactjs-popup"
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import tw, { css } from "twin.macro"

type LightboxProps = {
  images: Array<{ src: string; alt: string }>
  slug: string
}

const Lightbox = (props: LightboxProps): JSX.Element | null => {
  const { images = [], slug } = props

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
  const rotateIndexIfOutOfLimits = (i: number, len: number = images.length) =>
    ((i % len) + len) % len

  const handleKeyUp = (e: KeyboardEvent, idx: number) => {
    console.log(e.key, idx)

    const nextKeys = ["ArrowRight", "ArrowDown", "PageDown", "D", "X"]
    const previousKeys = ["ArrowLeft", "ArrowUp", "PageUp", "A", "W"]
    if (nextKeys.includes(e.key)) {
      console.log("next", idx)

      setCurrentIndex(rotateIndexIfOutOfLimits(idx + 1))
      console.log(idx)
    }
    if (previousKeys.includes(e.key)) {
      console.log("prev", idx)
      setCurrentIndex(rotateIndexIfOutOfLimits(idx - 1))
      console.log(idx)
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
                let i = images.findIndex(image => image.src === src)
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
        lockScroll
        onOpen={() => {
          window?.addEventListener("keyup", e => handleKeyUp(e, currentIndex))
        }}
        onClose={() => {
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
