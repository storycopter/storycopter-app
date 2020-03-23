import React from 'react';
import { connect } from 'react-redux';
import { update } from '../reducers/data';
import { orderBy } from 'lodash';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
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
    cursor: 'pointer',
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
}));

const Pages = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject, editor } = data;
  const { basepath, pages } = currentProject;

  const handleUpdate = payload => {
    update({
      editor: {
        ...editor,
        ...payload,
      },
    });
  };

  const handleAvatarClick = value => {
    handleUpdate({ activePageId: value, activeElementId: null });
  };

  return (
    <Box className={classes.root}>
      {orderBy(pages, [o => o.meta.order], ['asc']).map(page => {
        // do not render the dummy page (used by the idoc package)
        if (page.uid === 'default') return null;
        return (
          <Tooltip title={page.meta.title} key={page.meta.order}>
            <Avatar
              alt={`${page.meta.title}`}
              className={classes.avatar}
              src={`file:///${basepath}/src/pages/${page.meta.uid}/${page.meta.cover.name}`}
              variant="square"
              onClick={() => handleAvatarClick(page.meta.uid)}>
              {page.meta.order + 1}
            </Avatar>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default connect(({ data }) => ({ data }), { update })(Pages);
