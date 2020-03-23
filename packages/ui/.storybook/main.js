module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-links/register',
    '@storybook/addon-viewport/register',
    'storybook-dark-mode/register',
    '@storybook/addon-knobs/register',
  ],
};
