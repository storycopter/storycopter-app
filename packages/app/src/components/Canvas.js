import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../reducers/data';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { componentMap } from '@storycopter/ui/src/components';
import { docTheme } from '@storycopter/ui/src/themes';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflow: 'auto',
    padding: `${theme.spacing(5)}px`,
  },
  components: {
    boxShadow: theme.shadows[4],
    position: 'relative',
  },
  componentWrap: {
    position: 'relative',
    width: '100%',
    height: 'auto',
  },
}));

const Canvas = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject, editor } = data;
  const { basepath, chapters } = currentProject;
  const { activeChapterId, activeElementId } = editor;

  const chapterData = activeChapterId ? _.find(chapters, o => o.meta.uid === editor.activeChapterId) : null;
  const chapterIndex = activeChapterId ? _.findIndex(chapters, o => o.meta.uid === editor.activeChapterId) : null;

  const onInspectElement = componentId => {
    update({
      ...produce(data, nextData => {
        nextData.editor.activeElementId = componentId;
      }),
    });
  };

  const onElementUpdate = payload => {
    const componentIndex = _.findIndex(chapterData.tree.components, o => o.id === activeElementId);
    update({
      ...produce(data, nextData => {
        nextData.currentProject.chapters[chapterIndex].tree.components[componentIndex].settings = {
          ...nextData.currentProject.chapters[chapterIndex].tree.components[componentIndex].settings,
          ...payload,
        };
      }),
    });
  };

  // console.group('Canvas.js');
  // console.log('chapterData:', chapterData);
  // console.log('data:', data);
  // console.log('props:', props);
  // console.groupEnd();

  return (
    <Box className={classes.root}>
      <Grid container direction="column" className={classes.components}>
        {chapterData
          ? _.sortBy(chapterData.tree.components, [o => o.order]).map((component, i) => {
              // consolidate fill props with raw images
              const fill =
                component.settings.fill && component.settings.fill.length > 0
                  ? {
                      ...component.settings.fill,
                      raw: `${basepath}src/chapters/${activeChapterId}/${component.id}-${component.settings.fill}`,
                    }
                  : component.settings.fill;

              // consolidate component.settings.images with raw images
              const images =
                component.settings.images.length > 0
                  ? component.settings.images.map(image => {
                      const imagePath = `${basepath}src/chapters/${activeChapterId}/${component.id}-${image.name}`;
                      return {
                        ...image,
                        raw: imagePath,
                      };
                    })
                  : [];

              // dirty validate mask string values
              const mask = ['dark', 'light'].includes(component.settings.mask) ? component.settings.mask : null;

              const RenderedComponent = componentMap[component.type];
              const componentProps = component.settings;

              return (
                <Grid item key={`${chapterData.meta.uid}${component.id}`} className={classes.componentWrap}>
                  <ThemeProvider theme={docTheme}>
                    <div onClick={() => onInspectElement(component.id)}>
                      <RenderedComponent
                        {...componentProps}
                        animate={false}
                        cover={false}
                        fill={fill}
                        images={images}
                        isEditable
                        mask={mask}
                        onElementUpdate={onElementUpdate}
                      />
                    </div>
                  </ThemeProvider>
                </Grid>
              );
            })
          : null}
      </Grid>
    </Box>
  );
};

export default connect(({ data }) => ({ data }), { update })(Canvas);
