const path = require('path');

// define child rescript
module.exports = config => {
  // config.entry = ['@babel/polyfill', './src/index.js'];

  config.target = 'electron-renderer';

  // console.log(config.module.rules);

  config.module.rules[2].oneOf.splice(1, 1);
  config.module.rules[2].oneOf.unshift(
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      // exclude: /(node_modules)/,
      exclude: /node_modules\/(?!(@storycopter\/idoc|@storycopter\/ui)\/).*/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { modules: 'commonjs' }], '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties', 'babel-plugin-styled-components'],
          },
        },
      ],
    }
  );

  config.resolve.alias = {
    '@components': path.resolve(__dirname, 'src/components'),
    '@formulas': path.resolve(__dirname, 'src/formulas'),
    '@material-ui/core': path.resolve('node_modules', '@material-ui/core'),
    '@material-ui/icons': path.resolve('node_modules', '@material-ui/icons'),
    'react-dom': path.resolve('./node_modules/react-dom'),
    react: path.resolve('./node_modules/react'),
  };

  return config;
};
