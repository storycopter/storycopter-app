import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../reducers/data';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';

import { componentMap } from '@storycopter/ui/src/components';
import { docTheme } from '@storycopter/ui/src/themes';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflow: 'auto',
    padding: `${theme.spacing(5)}px`,
  },
  components: {
    // boxShadow: theme.shadows[4],
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
  const theme = useTheme();

  const { currentProject, editor } = data;
  const { basepath, chapters } = currentProject;
  const { activeChapterId, activeElementId } = editor;

  const activeChapter = activeChapterId ? _.find(chapters, o => o.meta.uid === activeChapterId) : null;
  const activeChapterIndex = activeChapterId ? _.findIndex(chapters, o => o.meta.uid === activeChapterId) : null;

  const onInspectElement = (e, componentId) => {
    e.stopPropagation();
    update({
      ...produce(data, nextData => {
        nextData.inspector.activeInspector = 'element';
        nextData.editor.activeElementId = componentId;
      }),
    });
  };

  const onElementUpdate = payload => {
    const componentIndex = _.findIndex(activeChapter.tree.components, o => o.id === activeElementId);
    update({
      ...produce(data, nextData => {
        nextData.currentProject.chapters[activeChapterIndex].tree.components[componentIndex].settings = {
          ...nextData.currentProject.chapters[activeChapterIndex].tree.components[componentIndex].settings,
          ...payload,
        };
      }),
    });
  };

  // console.group('Canvas.js');
  // console.log('activeChapter:', activeChapter);
  // console.log('data:', data);
  // console.log('props:', props);
  // console.groupEnd();

  return (
    <Box className={classes.root} onClick={!activeElementId ? e => onInspectElement(e, null) : null}>
      <Grid container direction="column" className={classes.components}>
        {activeChapter
          ? _.sortBy(activeChapter.tree.components, [o => o.order]).map((component, i) => {
              // consolidate backgImage props with raw images
              const backgImage =
                component.settings.backgImage && component.settings.backgImage.length > 0
                  ? {
                      ...component.settings.backgImage,
                      raw: `${basepath}src/chapters/${activeChapterId}/${component.id}-${component.settings.backgImage}`,
                    }
                  : component.settings.backgImage;

              // consolidate component.settings.images with raw images
              const images =
                component.settings.images && component.settings.images.length > 0
                  ? component.settings.images.map(image => {
                      const imagePath = `${basepath}src/chapters/${activeChapterId}/${component.id}-${image.name}`;
                      return {
                        ...image,
                        raw: imagePath,
                      };
                    })
                  : [];

              const RenderedComponent = componentMap[component.type];
              const componentSettings = component.settings;
              const isActiveComponent = activeElementId === component.id;

              return (
                <Grid item key={`${activeChapter.meta.uid}${component.id}`} className={classes.componentWrap}>
                  <ThemeProvider theme={docTheme}>
                    <div onClick={e => onInspectElement(e, component.id)}>
                      <RenderedComponent
                        {...componentSettings}
                        animate={false}
                        cover={false}
                        backgImage={backgImage}
                        images={images}
                        isEditable
                        onElementUpdate={onElementUpdate}
                        style={{
                          boxShadow: isActiveComponent ? `0 0 0 5px ${theme.palette.primary.main}` : theme.shadows[4],
                          margin: isActiveComponent ? (i === 0 ? '0 0 20px' : '20px 0') : '0',
                          transition: 'margin 0.5s',
                        }}
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
