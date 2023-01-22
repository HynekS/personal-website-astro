import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import image from "@astrojs/image";
import nightOwl from "./src/night-owl.json";

import defaultLayoutPlugin from "./defaultLayout.mjs";

export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [defaultLayoutPlugin],
      extendDefaultPlugins: true,
      shikiConfig: { theme: nightOwl },
      drafts: true,
    }),
    tailwind(),
    preact(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
