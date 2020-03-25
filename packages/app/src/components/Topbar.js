import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../reducers/data';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({}));

const Topbar = ({ data, update, ...props }) => {
  const classes = useStyles();

  return <div className={classes.root}>Topbar</div>;
};

export default connect(({ data }) => ({ data }), { update })(Topbar);
