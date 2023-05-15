import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import preact from "@astrojs/preact";
import image from "@astrojs/image";
import compress from "astro-compress";
import remarkPrism from "remark-prism";
import defaultLayoutPlugin from "./defaultLayout.mjs";
import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [
    partytown({
      // Adds dataLayer.push as a forwarding-event.
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
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    compress(),
  ],
});
