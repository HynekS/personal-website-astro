import React, { useState } from "react"
import BlockContent from "@sanity/block-content-to-react"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import tw, { css } from "twin.macro"

import { urlFor } from "@/sanity/index"
import HighlightedCode from "@/components/HighlightedCode"
import LazyImage from "@/components/LazyImage"
import { Tweet } from "@/components/react-static-tweets/src/index"

const serializers = {
  types: {
    code: (props): JSX.Element => {
      const { code, language, highlightedLines } = props.node
      return <HighlightedCode code={code} language={language} highlightedLines={highlightedLines} />
    },

    twitter: (props): JSX.Element => {
      const { id, ast } = props.node
      return <Tweet id={id} ast={ast} />
    },

    figure: (props): JSX.Element => {
      const { asset, alt, caption, lqip, aspectRatio } = props.node
      const src = urlFor(asset).width(800).auto("format").url()

      return (
        <figure>
          <LazyImage src={src} alt={alt} lqip={lqip} aspectRatio={aspectRatio} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    },

    blockQuote: (props): JSX.Element => {
      const { simplePortableText = [], citation = [] } = props.node
      return (
        <figure>
          <blockquote>
            <BlockContent blocks={simplePortableText} serializers={serializers} />
          </blockquote>
          <figcaption
            tw="pl-4"
            css={css`
              display: flex;
              &::before {
                content: "—";
                align-self: center;
                margin-right: 1ch;
              }
            `}
          >
            <BlockContent blocks={citation} serializers={serializers} />
          </figcaption>
        </figure>
      )
    },

    gallery: (props): JSX.Element => {
      const [isPopupOpen, setIsPopupOpen] = useState(false)
      const [currentIndex, setCurrentIndex] = useState(0)
      const { images = [] } = props.node

      // https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
      const rotateIndexIfOutOfLimits = (i: number, len: number = images.length) =>
        ((i % len) + len) % len

      const onPreload = (asset: string, resolution: number) => {
        let img = new Image()
        img.src = urlFor(asset).width(resolution).auto("format").url()
      }

      return images.length ? (
        <section tw="grid gap-2 md:(grid-cols-2) lg:(grid-cols-3)">
          {images.map(image => {
            const { asset, alt, _key } = image

            return (
              <figure tw="flex justify-center rounded cursor-pointer bg-secondary" key={_key}>
                <img
                  src={urlFor(asset).width(300).auto("format").url()}
                  alt={alt}
                  onMouseEnter={() => {
                    onPreload(asset, 800)
                  }}
                  onClick={() => {
                    let i = images.findIndex(image => image._key === _key)
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
            onClose={() => setIsPopupOpen(false)}
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
            {close => (
              <div tw="relative flex items-center justify-center rounded" className="group">
                <button
                  tw="invisible group-hover:visible absolute top[0.5rem] right[0.5rem] text-3xl h-8 w-8 bg-primary rounded-full flex items-center justify-center shadow-md"
                  onClick={close}
                >
                  ×
                </button>
                <button
                  onMouseEnter={() => {
                    onPreload(images[rotateIndexIfOutOfLimits(currentIndex - 1)].asset, 800)
                  }}
                  onClick={() => {
                    setCurrentIndex(rotateIndexIfOutOfLimits(currentIndex - 1))
                  }}
                >
                  Prev
                </button>
                <img
                  src={urlFor(images[currentIndex % images.length].asset)
                    .width(800)
                    .auto("format")
                    .url()}
                />

                <button
                  onMouseEnter={() => {
                    onPreload(images[rotateIndexIfOutOfLimits(currentIndex + 1)].asset, 800)
                  }}
                  onClick={() => {
                    setCurrentIndex(rotateIndexIfOutOfLimits(currentIndex - 1))
                  }}
                >
                  Next
                </button>
                {images[currentIndex % images.length].caption && (
                  <figcaption>{images[currentIndex % images.length].caption}</figcaption>
                )}
              </div>
            )}
          </Popup>
        </section>
      ) : null
    },

    // give headers some IDs to allow anchoring
    block: (props): JSX.Element => {
      const { _key, style = "normal" } = props.node
      if (/^h\d/.test(style)) {
        return React.createElement(style, { id: _key }, props.children)
      }
      return BlockContent.defaultSerializers.types.block(props)
    },
  },

  marks: {
    sup: ({ children }): JSX.Element => <sup>{children}</sup>,
    sub: ({ children }): JSX.Element => <sub>{children}</sub>,
    cite: ({ children }): JSX.Element => <cite>{children}</cite>,
  },
}

export default serializers
