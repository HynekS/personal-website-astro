import indicator from "ordinal/indicator"

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  week: 24 * 60 * 60 * 1000 * 7,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
}

const getRelativeTime = (timestamp: number, limit = units.week, locale = "en-GB"): string => {
  const rtf: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  })

  const elapsed = timestamp - new Date().getTime()

  if (Math.abs(elapsed) > limit) return ""

  for (let u in units) {
    if (Math.abs(elapsed) > units[u] || u == "second")
      return rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit)
  }
}

const PublishDate = ({ createdAt, locale = "en-GB" }): JSX.Element => {
  const timestamp = new Date(createdAt).getTime()
  const relativeDate = getRelativeTime(timestamp)
  const [dd, mmmm, yy] = new Date(timestamp)
    .toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .split(" ")

  return (
    <div>
      {relativeDate ? (
        <div>{relativeDate}</div>
      ) : (
        <div>
          {dd}
          <sup>{indicator(+dd)}</sup>
          {` ${mmmm} ${yy}`}
        </div>
      )}
    </div>
  )
}

export default PublishDate
