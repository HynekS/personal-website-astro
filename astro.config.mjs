import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import image from "@astrojs/image";

import defaultLayoutPlugin from "./defaultLayout.mjs";

export default defineConfig({
  markdown: {
    remarkPlugins: [defaultLayoutPlugin],
    extendDefaultPlugins: true,
  },
  integrations: [
    mdx(),
    tailwind(),
    preact(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
