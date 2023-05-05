import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import image from "@astrojs/image";
import compress from "astro-compress";
import remarkPrism from "remark-prism";
import defaultLayoutPlugin from "./defaultLayout.mjs";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [
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
  output: "server",
  adapter: vercel(),
});
