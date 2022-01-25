const colors = require("tailwindcss/colors")

import tw, { css } from "twin.macro"

const baseStyles = css`
  .light {
    --bg-primary: ${colors.gray["50"]};
    --bg-secondary: ${colors.coolGray["200"]};
    --text-primary: #475569;
    --text-secondary: #1e293b;
    --color-primary: #e11d48; /* red */
    --color-links: #01778b;
  }

  .dark {
    --bg-primary: #1c232e;
    --bg-secondary: ${colors.coolGray["900"]};
    --text-primary: #d4cece;
    --text-secondary: #e9e1e1;
    --color-primary: ${colors.cyan["300"]}; /* #e4d1bb gold: */
    --color-links: #7ecbd7;
  }

  @font-face {
    font-family: "Nunito-fallback";
    ascent-override: 110%;
    descent-override: 20%;
    line-gap-override: normal;
    advance-override: 10;
    src: local(Arial);
  }

  @font-face {
    font-family: "Nunito";
    /*src: local("Nunito"), url("/assets/fonts/Nunito[wght].ttf") format("truetype-variations");*/
    src: /*local("Nunito"),*/ url("/assets/fonts/Nunito[wght]-subset.woff2") format("woff2");
    font-weight: 125 950;
    font-stretch: 75% 125%;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Nunito";
    /*src: local("Nunito"), url("/assets/fonts/Nunito-Italic[wght].ttf") format("truetype-variations");*/
    src: /*local("Nunito"),*/ url("/assets/fonts/Nunito-Italic[wght]-subset.woff2") format("woff2");
    font-weight: 125 950;
    font-stretch: 75% 125%;
    font-style: italic;
    font-display: swap;
  }

  @media (prefers-reduced-motion) {
    html {
      scroll-behavior: auto !important;
    }
  }

  body {
    ${tw`h-full transition-all duration-200 bg-primary text-primary font-base`}
  }

  body.dark {
    background: radial-gradient(
      circle,
      rgba(28, 35, 46, 1) 0%,
      rgba(28, 35, 46, 1) 30%,
      rgba(17, 24, 35, 1) 110%
    );
    background-attachment: fixed;
  }

  @-moz-document url-prefix() {
    body.dark {
      background: var(--bg-primary);
    }
  }

  #__next {
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${tw`font-display`}
  }

  [id] {
    scroll-margin-top: 2ex;
  }

  .prism-code .line_highlight {
    background-color: rgba(53, 59, 69, 0.6);
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }

  .prism-code::-webkit-scrollbar-track {
    border-radius: 0.375rem;
  }

  .prism-code::-webkit-scrollbar {
    border-radius: 0.375rem;
  }

  .prism-code::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    border: 5px solid rgba(1, 22, 39, 40);
    background-color: rgb(50, 62, 80);
  }
`

export default baseStyles
