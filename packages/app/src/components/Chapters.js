import React from 'react';
import { connect } from 'react-redux';
import { update } from '../reducers/data';

import { Box } from '@material-ui/core';

const Chapters = props => {
  return <Box textAlign="center">Chapters</Box>;
};

export default connect(({ data }) => ({ data }), { update })(Chapters);
