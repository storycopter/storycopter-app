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
  const { basepath, pages } = currentProject;
  const { activePageId, activeElementId } = editor;

  const activePage = activePageId ? _.find(pages, o => o.meta.uid === activePageId) : null;
  const activePageIndex = activePageId ? _.findIndex(pages, o => o.meta.uid === activePageId) : null;

  const onInspectElement = (e, componentId) => {
    console.log('onInspectElement', e, componentId);
    e.stopPropagation();
    update({
      ...produce(data, nextData => {
        nextData.editor.activeElementId = componentId;
        if (componentId) nextData.inspector.activeInspector = 'element';
      }),
    });
  };

  const onElementUpdate = payload => {
    const componentIndex = _.findIndex(activePage.tree.components, o => o.id === activeElementId);
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages[activePageIndex].tree.components[componentIndex].settings = {
          ...nextData.currentProject.pages[activePageIndex].tree.components[componentIndex].settings,
          ...payload,
        };
      }),
    });
  };

  console.group('Canvas.js');
  console.log('activeElementId:', activeElementId);
  // console.log('data:', data);
  // console.log('props:', props);
  console.groupEnd();

  return (
    <Box className={classes.root} onClick={activeElementId ? e => onInspectElement(e, null) : null}>
      <Grid container direction="column" className={classes.components}>
        {activePage
          ? _.sortBy(activePage.tree.components, [o => o.order]).map((component, i) => {
              // consolidate backgImage props with raw images
              const backgImage =
                component.settings.backgImage && component.settings.backgImage.length > 0
                  ? {
                      ...component.settings.backgImage,
                      raw: `${basepath}/src/pages/${activePageId}/${component.id}-${component.settings.backgImage}`,
                    }
                  : component.settings.backgImage;

              // consolidate component.settings.images with raw images
              const images =
                component.settings.images && component.settings.images.length > 0
                  ? component.settings.images.map(image => {
                      const imagePath = `${basepath}src/pages/${activePageId}/${component.id}-${image.name}`;
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
                <Grid
                  className={classes.componentWrap}
                  item
                  key={`${activePage.meta.uid}${component.id}`}
                  onClick={e => onInspectElement(e, component.id)}>
                  <ThemeProvider theme={docTheme}>
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
