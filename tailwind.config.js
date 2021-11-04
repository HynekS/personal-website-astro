module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        accent: "var(--color-primary)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        accent: "var(--color-primary)",
      },
      fontFamily: {
        base: `system-ui, -apple-system, 'Segoe UI', 'Open Sans', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`,
        display: `Jost, system-ui, -apple-system, 'Segoe UI', 'Open Sans', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`,
        // I like much better Consolas then Menlo, so I am swapping them:
        mono: `ui-monospace, SFMono-Regular, Consolas, Menlo, Monaco, "Liberation Mono", "Courier New", monospace`,
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: "var(--text-primary)",
            pre: {
              marginLeft: "-1rem",
              marginRight: "-1rem",
              borderTopLeftRadius: "0rem",
              borderTopRightRadius: "0rem",
              borderBottomRightRadius: "0rem",
              borderBottomLeftRadius: "0rem",
            },
            "h2, h3, h4, h5, h6": {
              marginBottom: "0.25em",
            },
            "a[href]": {
              color: "var(--color-links)",
              backgroundColor: "#e7f6f7",
              padding: "0.1em 0.2em",
              borderRadius: "0.1em",
            },
            code: {
              backgroundColor: "var(--bg-secondary)",
              borderRadius: 4,
              padding: "0.25em 0.4em",
              fontWeight: 400,
            },
            "figure, video": {
              marginLeft: "-1rem",
              marginRight: "-1rem",
            },
            "code::before, code::after": {
              content: '""',
              display: "none",
            },
            "h1 ~ div p:first-of-type": {
              fontSize: "calc(22/18 * 1em)",
              lineHeight: "calc(32/22)",
            },
            "blockquote p:first-of-type::before": {
              content: '""',
            },
            "blockquote p:last-of-type::after": {
              content: '""',
            },
            "ul>li::before": {
              content: '"✓"',
              backgroundColor: "transparent",
              top: 0,
            },
          },
        },
        dark: {
          css: {
            color: "var(--text-primary)",
            "strong, em, blockquote": {
              color: "var(--text-secondary)",
            },
            "h1, h2, h3, h4, h5, h6": {
              color: "var(--text-secondary)",
            },
            "a[href]": {
              color: "var(--color-links)",
              backgroundColor: "transparent",
            },
            code: {
              color: "#D1D5DB",
            },
          },
        },
        lg: {
          css: {
            "h2, h3, h4, h5, h6": {
              marginBottom: "0.25em",
            },
            "figure, video, h1": {
              marginLeft: 0,
              marginRight: 0,
            },
            "ul>li::before": {
              top: 0,
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["responsive", "dark"],
  },
  plugins: [require("@tailwindcss/typography")],
}
