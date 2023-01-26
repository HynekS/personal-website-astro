import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import image from "@astrojs/image";
import compress from "astro-compress";
import nightOwl from "./src/night-owl.json";

import defaultLayoutPlugin from "./defaultLayout.mjs";
import { remarkReadingTime } from "./remark-reading-time.mjs";

export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [defaultLayoutPlugin, remarkReadingTime],
      extendDefaultPlugins: true,
      shikiConfig: { theme: nightOwl },
      drafts: true,
    }),
    tailwind(),
    preact({ compat: true }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    compress(),
  ],
});
