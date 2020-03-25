import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
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
    width: theme.spacing(3),
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
          H
        </Avatar>
      </Tooltip>
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
      <Tooltip title="Credits">
        <Avatar
          alt="Credits"
          className={classes.avatar}
          // onClick={() => onAvatarClick(meta.uid)}
          // src={meta.coverEnabled ? `file:///${basepath}/src/essentials/home/${meta.coverImage.name}` : null}
          variant="rounded">
          C
        </Avatar>
      </Tooltip>
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(Pages);
