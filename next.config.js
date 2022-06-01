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
      webp: {
        preset: "default",
        quality: 75,
      },
      responsive: {
        adapter: require("responsive-loader/sharp"),
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

      // https://github.com/cyrilwanner/next-optimized-images/issues/177
      // https://github.com/cyrilwanner/next-optimized-images/pull/247
      if (!options.isServer) {
        config.module.rules.forEach(rule => {
          if (rule.oneOf) {
            rule.oneOf.forEach(subRule => {
              if (
                subRule.issuer &&
                !subRule.test &&
                !subRule.include &&
                subRule.exclude &&
                subRule.use &&
                subRule.use.options &&
                subRule.use.options.name
              ) {
                if (
                  String(subRule.issuer) ===
                    "/\\.(css|scss|sass)(\\.webpack\\[javascript\\/auto\\])?$/" &&
                  subRule.use.options.name.startsWith("static/media/")
                ) {
                  subRule.exclude.push(/\.(jpg|jpeg|png|svg|webp|gif|ico)$/)
                }
              }
            })
          }
        })
      }

      if (!options.dev && !options.isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        })
      }

      return config
    },
  },
)
