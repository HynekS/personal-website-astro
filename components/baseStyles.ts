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
    --bg-primary: #1c232e /*#1a2633*/;
    --bg-secondary: ${colors.coolGray["900"]};
    --text-primary: #d4cece;
    --text-secondary: #e9e1e1;
    --color-primary: #e4d1bb; /* gold: */
    --color-links: #7ecbd7;
  }

  @font-face {
    font-family: "Nunito";
    src: local("Nunito"), url("/assets/fonts/Nunito[wght].ttf") format("truetype-variations");
    font-weight: 125 950;
    font-stretch: 75% 125%;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Jost";
    src: local("Jost"),
      url("/assets/fonts/Jost-Italic-VariableFont_wght.ttf") format("truetype-variations");
    font-weight: 125 950;
    font-stretch: 75% 125%;
    font-style: italic;
    font-display: swap;
  }

  html {
    height: 100%;
    width: 100vw;
    scroll-behavior: smooth;
    /*overflow-y: overlay;*/
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  @media (prefers-reduced-motion) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    ${tw`h-full transition-all duration-200 bg-primary text-primary font-base`}
  }
  /*
  body.light {
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 60%,
      rgb(224 251 257) 110%
    );
  }
  */
  body.dark {
    background: radial-gradient(
      circle,
      rgba(28, 35, 46, 1) 0%,
      rgba(28, 35, 46, 1) 30%,
      rgba(17, 24, 35, 1) 110%
    );
  }

  #__next {
    height: 100%;
    min-height: 100%;
    scroll-behavior: smooth;
    overflow-x: hidden;
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
    /* background-color: rgb(139, 146, 151); */
    background-color: rgb(50, 62, 80);
  }
`

export default baseStyles
