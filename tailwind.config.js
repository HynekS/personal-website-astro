const colors = require("tailwindcss/colors")

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
        base: "var(--font-base)",
        display: "var(--font-display)",
        mono: "var(--font-mono)",
      },
      /* Temporary extension to get all the tailwind v3 colors in twin.macro. Should be removed when macro is updated */
      colors: {
        ...Object.fromEntries(Object.entries(colors)),
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
            "h2 + pre, h3 + pre, h4 + pre, h5 + pre, h6 + pre": {
              marginTop: "1.3333333em",
            },
            "h2 a[href], h3 a[href], h4 a[href], h5 a[href], h6 a[href], .dark h2 a[href], h3 a[href], h4 a[href], h5 a[href], h6 a[href]":
              {
                backgroundColor: "transparent",
                textDecoration: "none",
                padding: "inherit",
                color: "unset",
                fontWeight: "unset",
                position: "relative",
                "&:hover": {
                  "&::before": {
                    content: '"#"',
                    position: "absolute",
                    left: "-0.7em",
                    fontSize: "0.9em",
                    fontWeight: 400,
                    lineHeight: 1.55,
                    opacity: 0.36,
                  },
                },
              },
            a: {
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
            "h1 ~ p:first-of-type": {
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
            a: {
              color: "var(--color-links)",
              backgroundColor: "transparent",
            },
            code: {
              color: "#d1d5db",
            },
            hr: {
              opacity: 0.3,
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
