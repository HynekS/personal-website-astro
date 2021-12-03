import Highlight, { defaultProps, Language } from "prism-react-renderer"
import nightOwl from "prism-react-renderer/themes/nightOwl"
import rangeParser from "parse-numeric-range"

// To pass Lighthouse accessibility check
const nightOwlWithEnhancedCommentsContrast = {
  plain: { ...nightOwl.plain },
  styles: nightOwl.styles.map(record =>
    record.types.includes("comment")
      ? {
          ...record,
          style: {
            ...record["style"],
            color: "rgb(147, 165, 165)",
          },
        }
      : record,
  ),
}

type HighlightProps = {
  language: Language
  codeString: string
  lines: string
}

const HighlightedCode = ({ codeString = "", language, lines = "" }: HighlightProps) => {
  const highlightedLines = rangeParser(lines)
  const linesToHighlight = new Set(highlightedLines)
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={nightOwlWithEnhancedCommentsContrast}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i })
            return (
              <div
                key={i}
                {...lineProps}
                className={
                  linesToHighlight.has(i + 1)
                    ? `${lineProps.className} line_highlight`
                    : lineProps.className
                }
              >
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}

export default HighlightedCode
