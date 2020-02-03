import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import { Box } from '@material-ui/core';

const BrandExperience = props => {
  return <Box textAlign="center">BrandExperience</Box>;
};

export default connect(({ data }) => ({ data }), { update })(BrandExperience);
