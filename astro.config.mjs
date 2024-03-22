import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import preact from "@astrojs/preact";
// import compress from "astro-compress";
import remarkPrism from "remark-prism";
import defaultLayoutPlugin from "./defaultLayout.mjs";
import { remarkReadingTime } from "./remark-reading-time.mjs";

export default defineConfig({
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    mdx({
      remarkPlugins: [defaultLayoutPlugin, remarkReadingTime, remarkPrism],
      drafts: false,
    }),
    tailwind(),
    preact({
      compat: true,
    }),
    // breaks build
    // compress(),
  ],
});
