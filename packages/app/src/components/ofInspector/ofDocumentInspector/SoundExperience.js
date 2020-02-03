import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import { Box } from '@material-ui/core';

const SoundExperience = props => {
  return <Box textAlign="center">SoundExperience</Box>;
};

export default connect(({ data }) => ({ data }), { update })(SoundExperience);
