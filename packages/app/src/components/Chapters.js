import React from 'react';
import { connect } from 'react-redux';
import { update } from '../reducers/data';
import { orderBy } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
}));

const Chapters = props => {
  const { data, update } = props;
  const { currentProject } = data;
  const { chapters } = currentProject;

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {orderBy(chapters, [o => o.meta.order], ['asc']).map(chapter => {
        return (
          <Tooltip title={chapter.meta.title}>
            <Avatar
              alt={`${chapter.meta.title}`}
              className={classes.avatar}
              key={chapter.meta.order}
              src={`${currentProject.basepath}src/chapters/${chapter.meta.uid}/${chapter.meta.cover.name}`}
              variant="square">
              {chapter.meta.order + 1}
            </Avatar>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default connect(({ data }) => ({ data }), { update })(Chapters);
