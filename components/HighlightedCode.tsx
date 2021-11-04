import Highlight, { defaultProps } from "prism-react-renderer"
import nightOwl from "prism-react-renderer/themes/nightOwl"

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

const HighlightedCode = ({ code, language, highlightedLines }) => {
  const linesToHighlight = new Set(highlightedLines)
  return (
    <Highlight
      {...defaultProps}
      code={code}
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
