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
      keyframes: {
        swing: {
          "0%": {
            backgroundPosition: "100% center",
            animationTimingFunction: "ease-in",
          },
          "22%": {
            backgroundPosition: "-20.5% center",
            animationTimingFunction: "ease-out",
          },
          "48%": {
            backgroundPosition: "25% center",
            animationTimingFunction: "ease-in",
          },
          "59%": {
            backgroundPosition: "-29.5% center",
            animationTimingFunction: "ease-out",
          },
        },
      },
      /* Temporary extension to get all the tailwind v3 colors in twin.macro. Should be removed when macro is updated */
      colors: {
        ...Object.fromEntries(Object.entries(colors)),
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: "var(--text-primary)",
            fontFamily: "var(--font-base)",
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

              backgroundPosition: "100% center",
              backgroundSize: "200% 100%",
              animationDuration: "3.3s",
              animationIterationCount: "infinite",
              boxDecorationBreak: "clone",
              display: "inline",
              "&:hover": {
                animationName: "swing",
                animationTimingFunction: "ease-out",
                background:
                  "linear-gradient(45deg, rgba(231,246,247,1) 0%, rgba(233,250,251,1) 5%, rgba(197,241,244,1) 21%, rgba(202,241,247,1) 24%, rgba(197,241,244,1) 27%, rgba(231,246,247,1) 44%, rgba(231,246,247,1) 100%, rgba(233,250,251,1) 100%)",
                backgroundPosition: "100% center",
                backgroundSize: "200% 100%",
                textDecorationColor: "rgb(31, 105, 231)",
              },
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
              backgroundPosition: "100% center",
              backgroundSize: "200% 100%",
              textDecorationLine: "underline",
              textDecorationColor: "rgba(126, 203, 215, 1)",
              animationDuration: "3.3s",
              animationIterationCount: "infinite",
              boxDecorationBreak: "clone",
              display: "inline",
              "&:hover": {
                animationName: "swing",
                animationTimingFunction: "ease-out",
                background:
                  "linear-gradient(45deg, rgb(69, 138, 255) 0%, rgba(104, 114, 251, 1) 5%, rgba(250, 44, 245, 1) 20%, rgb(226, 122, 224) 24%, rgba(250, 44, 245, 1) 27%, rgba(104, 114, 251, 1) 44%, rgb(69, 138, 255) 50%, rgb(69, 138, 255) 100%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                backgroundPosition: "100% center",
                backgroundSize: "200% 100%",
                textDecorationColor: "rgb(31, 105, 231)",
              },
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
        thin: {
          css: {
            "h1, h2, h3, h4, h5, h6": {
              fontWeight: 300,
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
