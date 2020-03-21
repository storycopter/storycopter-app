import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import makeStyles from '@material-ui/core/styles/makeStyles';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

const useStyles = makeStyles(theme => ({}));

export default connect(({ data }) => ({ data }), { update })(({ data, update, ...props }) => {
  const classes = useStyles();

  const { inspector } = data;
  const { elementInspector } = inspector;

  console.group('ElementInspector.js');
  console.log({ elementInspector });
  console.groupEnd();

  return <>Element inspector</>;
});
