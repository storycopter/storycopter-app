import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({}));

const ElementInspector = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { inspector } = data;
  const { elementInspector } = inspector;

  // console.group('ElementInspector.js');
  // console.log({ elementInspector });
  // console.groupEnd();

  return <>Element inspector</>;
};

export default connect(({ data }) => ({ data }), { update })(ElementInspector);
