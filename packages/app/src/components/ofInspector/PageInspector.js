import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({}));

const PageInspector = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { inspector } = data;

  return <>Page inspector</>;
};

export default connect(({ data }) => ({ data }), { update })(PageInspector);
