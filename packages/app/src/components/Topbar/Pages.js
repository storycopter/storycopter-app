import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PanoramaWideAngleIcon from '@material-ui/icons/PanoramaWideAngle';
import Tooltip from '@material-ui/core/Tooltip';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
  avatar: {
    ...theme.typography.button,
    cursor: 'pointer',
    height: theme.spacing(4),
    width: theme.spacing(3.5),
  },
}));

const Pages = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject } = data;
  const { basepath, pages } = currentProject;

  const onAvatarClick = pageId => {
    update({
      ...produce(data, nextData => {
        nextData.editor.activePageId = pageId;
        nextData.editor.activeElementId = null;
      }),
    });
  };

  return (
    <div className={classes.root}>
      <Tooltip title="Opening titles">
        <Avatar
          alt="Opening titles"
          className={classes.avatar}
          // onClick={() => onAvatarClick(meta.uid)}
          // src={meta.coverEnabled ? `file:///${basepath}/src/essentials/home/${meta.coverImage.name}` : null}
          variant="rounded">
          <PanoramaWideAngleIcon fontSize="inherit" />
        </Avatar>
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      {_.orderBy(pages, [o => o.meta.order], ['asc']).map(({ meta }, i) => {
        // do not render the dummy page (used by the idoc package)
        if (meta.uid === 'pagesDummy') return null;
        return (
          <Tooltip title={`${i + 1}. ${meta.title}`} key={meta.order}>
            <Avatar
              alt={`${meta.title}`}
              className={classes.avatar}
              onClick={() => onAvatarClick(meta.uid)}
              src={meta.coverEnabled ? `file:///${basepath}/src/pages/${meta.uid}/${meta.coverImage.name}` : null}
              variant="rounded">
              {i + 1}
            </Avatar>
          </Tooltip>
        );
      })}
      <IconButton size="small">
        <AddCircleOutlineIcon />
      </IconButton>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="Credits">
        <Avatar
          alt="Credits"
          className={classes.avatar}
          // onClick={() => onAvatarClick(meta.uid)}
          // src={meta.coverEnabled ? `file:///${basepath}/src/essentials/home/${meta.coverImage.name}` : null}
          variant="rounded">
          <ViewHeadlineIcon fontSize="inherit" />
        </Avatar>
      </Tooltip>
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(Pages);
