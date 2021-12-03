import indicator from "ordinal/indicator"
import { TwStyle } from "twin.macro"

type Unit = keyof typeof units

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  week: 24 * 60 * 60 * 1000 * 7,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
}

const getRelativeTime = (
  timestamp: number,
  limit = units.week,
  locale = "en-GB",
): string | null => {
  const rtf: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  })

  const elapsed = timestamp - new Date().getTime()

  if (Math.abs(elapsed) > limit) return null

  for (let u of Object.keys(units)) {
    if (Math.abs(elapsed) > units[u as Unit] || u == "second")
      return rtf.format(Math.round(elapsed / units[u as Unit]), u as Unit)
  }
  return null
}

type PublishDateProps = {
  createdAt: Date
  locale?: string
  dateStyles?: TwStyle | string
  prepositionStyles?: TwStyle | string
  relativePreposition?: string
  absolutePreposition?: string
}

const PublishDate = ({
  createdAt,
  locale = "en-GB",
  dateStyles,
  prepositionStyles,
  relativePreposition = "posted",
  absolutePreposition = "posted on",
}: PublishDateProps): JSX.Element => {
  const timestamp = new Date(createdAt).getTime()
  const relativeDate = getRelativeTime(timestamp)
  const [dd, mmmm, yy] = new Date(timestamp)
    .toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .split(" ")

  return relativeDate ? (
    <>
      <span css={[prepositionStyles]}>{relativePreposition} </span>
      <span css={[dateStyles]}>
        <>{relativeDate}</>
      </span>
    </>
  ) : (
    <>
      <span css={[prepositionStyles]}>{absolutePreposition} </span>
      <span css={[dateStyles]}>
        <>
          {dd}
          <sup>{indicator(+dd)}</sup>
          {` ${mmmm} ${yy}`}
        </>
      </span>
    </>
  )
}

export default PublishDate
