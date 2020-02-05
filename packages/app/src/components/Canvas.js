import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { update } from '../reducers/data';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

import { componentMap } from '@storycopter/ui/components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflow: 'auto',
    padding: `${theme.spacing(5)}px`,
  },
  componentWrap: {
    position: 'relative',
  },
}));

const Canvas = props => {
  const classes = useStyles();

  const { data } = props;
  const { currentProject, editor } = data;
  const { chapters } = currentProject;
  const { activeChapter } = editor;

  const chapterData = activeChapter ? _.find(chapters, o => o.meta.uid === editor.activeChapter) : null;

  return (
    <Box className={classes.root}>
      <Grid container spacing={3} direction="column">
        {chapterData
          ? _.sortBy(chapterData.tree.components, [o => o.order]).map((component, i) => {
              console.log(component);

              const mask = ['dark', 'light'].includes(props.mask) ? props.mask : null;

              const RenderedComponent = componentMap[component.type];
              const componentProps = component.props;

              return (
                <Grid item key={component.id} className={classes.componentWrap}>
                  <RenderedComponent {...componentProps} mask={mask} />
                </Grid>
              );
            })
          : null}
      </Grid>
    </Box>
  );
};

export default connect(({ data }) => ({ data }), { update })(Canvas);
