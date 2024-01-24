// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Override JavaScript file names
      webpackConfig.output.filename = "static/js/index.js";
      webpackConfig.output.chunkFilename = "static/js/[name].chunk.js";

      // Override CSS file names in production
      if (env === "production") {
        webpackConfig.plugins.forEach((plugin) => {
          if (plugin.constructor.name === "MiniCssExtractPlugin") {
            plugin.options.filename = "static/css/index.css";
            plugin.options.chunkFilename = "static/css/[name].chunk.css";
          }
        });
      }

      return webpackConfig;
    },
  },
  style: {
    postcss: {
      plugins: [require("autoprefixer")],
    },
  },
  babel: {
    presets: ["@babel/preset-react"],
  },
};
