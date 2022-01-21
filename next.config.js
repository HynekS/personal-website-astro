const withOptimizedImages = require("next-optimized-images")
const withPlugins = require("next-compose-plugins")
const withTM = require("next-transpile-modules")(["react-children-utilities"]) // pass the modules you would like to see transpiled

module.exports = withPlugins(
  [
    withOptimizedImages,
    {
      // these are the default values so you don't have to provide them if they are good enough for your use-case.
      // but you can overwrite them here with any valid value you want.
      imagesublicPath: "/_next",
      imagesName: "static/media/[name].[hash].[ext]",

      inlineImageLimit: 8192,
      imagesFolder: "media",

      handleImages: ["jpeg", "png", "svg", "webp", "gif"],
      removeOriginalExtension: false,
      optimizeImages: true,
      optimizeImagesInDev: false,
      mozjpeg: {
        quality: 80,
      },
      optipng: {
        optimizationLevel: 3,
      },
      pngquant: false,
      gifsicle: {
        interlaced: true,
        optimizationLevel: 3,
      },
      svgo: {
        // enable/disable svgo plugins here
      },
      webp: {
        preset: "default",
        quality: 75,
      },
    },
    withTM,
  ],
  {
    experimental: { esmExternals: true },
    pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],

    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.mdx?$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: "@mdx-js/loader",
            options: {
              jsxImportSource: "@emotion/react",
              runtime: "automatic",
            },
          },
        ],
      })

      if (!options.dev && !options.isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        })
      }

      if (!options.isServer) {
        // Fixes npm packages that depend on `fs` module
        //config.node = { fs: "empty" }
        //config.resolve.fallback.fs = false;
        //config.resolve.fallback.fs = false
        webpack5: false
      }
      return config
    },
  },
)
