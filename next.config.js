const { PHASE_EXPORT } = require("next/constants")

module.exports = phase => {
  return {
    images:
      phase === PHASE_EXPORT
        ? {
            loader: "imgix",
            path: "",
          }
        : { domains: ["pbs.twimg.com"] },
    webpack: (config, { dev, isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        })
      }
      if (!isServer) {
        config.node = { fs: "empty" }
      }
      return config
    },
  }
}
