import { createMuiTheme } from '@material-ui/core/styles';

import setType from './mixins/setType';

const thm = createMuiTheme();

console.group('docTheme.js');
console.log('thm:', thm);
console.groupEnd();

export default createMuiTheme({
  // ...thm,
  typography: {
    // ...thm.typography,
    h1: {
      ...setType(900),
      fontWeight: 'medium',
    },
    h2: {
      ...setType(800),
      fontWeight: 'medium',
    },
    h3: {
      ...setType(700),
      fontWeight: 'medium',
    },
    h4: {
      ...setType(600),
      fontWeight: 'normal',
    },
    h5: {
      ...setType(500),
      fontWeight: 'normal',
    },
    h6: {
      ...setType(400),
      fontWeight: 'normal',
    },
  },
});
