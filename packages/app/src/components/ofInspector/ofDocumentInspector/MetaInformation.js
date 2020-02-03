import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import { Box } from '@material-ui/core';

const MetaInformation = props => {
  return <Box textAlign="center">MetaInformation</Box>;
};

export default connect(({ data }) => ({ data }), { update })(MetaInformation);
