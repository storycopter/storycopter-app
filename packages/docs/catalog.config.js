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
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { modules: 'commonjs' }],
                '@babel/preset-react',
                '@catalog/babel-preset',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                'babel-plugin-styled-components',
              ],
            },
          },
        ],
      }
    );

    // console.log(JSON.stringify(config));
    return config;
  },
};
