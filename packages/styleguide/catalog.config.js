const path = require("path");

module.exports = {
  webpack: catalogWebpackConfig => {
    const modifiedWebpackConfig = {
      ...catalogWebpackConfig,
      resolveLoader: {
        modules: [
          "node_modules",
          path.resolve(__dirname, "./../../node_modules")
        ]
      },
      module: {
        rules: [
          {
            test: /\.md/,
            use: ["@catalog/markdown-loader", "raw-loader"]
          },
          {
            test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/,
            loader: "url-loader?limit=100000"
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
              }
            }
          }
        ]
      }
    };
    return modifiedWebpackConfig;
  }
};
