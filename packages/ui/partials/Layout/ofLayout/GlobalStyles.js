import { color } from '@storycopter/ui/settings';
import { createGlobalStyle } from 'styled-components';
import { setType } from '@storycopter/ui/mixins';
import { withTheme } from '@material-ui/styles';

const GlobalStyle = createGlobalStyle`

  /* RESET */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }

  /* NORMALIZE */

  body {
    ${setType('m')};
    ${({ theme }) => theme.typography.body2};
  }
  a {
    font-size: inherit;
    text-decoration: none;
  }
  img {
    line-height: 0;
  }
  abbr {
    text-decoration: none;
  }

  body,
  body * {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: ${color.flare200};
  }
  ::-moz-selection {
    background: ${color.flare200};
  }

`;

export default withTheme(GlobalStyle);
