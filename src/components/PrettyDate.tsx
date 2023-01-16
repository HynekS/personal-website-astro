import indicator from "ordinal/indicator";

type Unit = keyof typeof units;

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  week: 24 * 60 * 60 * 1000 * 7,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const getRelativeTime = (
  timestamp: number,
  limit = units.week,
  locale = "en-GB"
): string | null => {
  const rtf: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  const elapsed = timestamp - new Date().getTime();

  if (Math.abs(elapsed) > limit) return null;

  for (const u of Object.keys(units)) {
    if (Math.abs(elapsed) > units[u as Unit] || u == "second")
      return rtf.format(Math.round(elapsed / units[u as Unit]), u as Unit);
  }
  return null;
};

type PrettyDateProps = {
  date: Date;
  locale?: string;
  dateStyles?: string;
  prepositionStyles?: string;
  relativePreposition?: string;
  absolutePreposition?: string;
};

const PrettyDate = ({
  date,
  locale = "en-GB",
  dateStyles,
  prepositionStyles,
  relativePreposition = "",
  absolutePreposition = "on",
}: PrettyDateProps): JSX.Element => {
  const timestamp = new Date(date).getTime();
  const relativeDate = getRelativeTime(timestamp);
  const [dd, mmmm, yy] = new Date(timestamp)
    .toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .split(" ");

  return relativeDate ? (
    <>
      <span className={prepositionStyles}>{relativePreposition} </span>
      <span className={dateStyles}>
        <>{relativeDate}</>
      </span>
    </>
  ) : (
    <>
      <span className={prepositionStyles}>{absolutePreposition} </span>
      <span className={dateStyles}>
        <>
          {dd}
          <sup>{indicator(+dd)}</sup>
          {` ${mmmm} ${yy}`}
        </>
      </span>
    </>
  );
};

export default PrettyDate;
