// @ts-nocheck
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { useState, useEffect, useRef } from "react"
import tw from "twin.macro"

const LazyImage = ({ src, alt, lqip, aspectRatio = 2 / 3 }): ReactJSXElement => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>()
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true)
    }
  }, [])
  return (
    <div tw="relative overflow-hidden">
      <div style={{ paddingBottom: `${100 / aspectRatio}%` }} />
      {lqip && (
        <img
          src={lqip}
          alt=""
          aria-hidden="true"
          tw="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full mt-0!"
        />
      )}
      <img
        css={[
          tw`absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full opacity-0 transition-opacity -o-transition-duration[800ms] mt-0!`,
          loaded && tw`opacity-100`,
        ]}
        loading="lazy"
        src={src}
        alt={alt}
        ref={imgRef}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default LazyImage
