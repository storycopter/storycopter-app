import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import { Box } from '@material-ui/core';

const Motivation = props => {
  return <Box textAlign="center">Motivation</Box>;
};

export default connect(({ data }) => ({ data }), { update })(Motivation);
