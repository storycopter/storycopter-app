const path = require('path');

module.exports = {
  webpack: config => {
    config.resolveLoader.modules.push(
      path.resolve(__dirname, './../../node_modules')
    );

    config.module.rules[0].oneOf.splice(1, 1);
    config.module.rules[0].oneOf.unshift(
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.mdx?$/,
      //   use: ["babel-loader", "mdx-loader"]
      // },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      }
    );

    // console.log(JSON.stringify(config));
    return config;
  },
};
