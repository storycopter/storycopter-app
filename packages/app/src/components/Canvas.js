import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { update } from '../reducers/data';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

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

export default connect(({ data }) => ({ data }), { update })(({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject, editor, inspector } = data;
  const { basepath, chapters } = currentProject;
  const { activeChapter } = editor;

  const chapterData = activeChapter ? _.find(chapters, o => o.meta.uid === editor.activeChapter) : null;

  const onInspectElement = (chapter, component) => {
    console.log('onInspectElement', chapter, component);
    update({
      inspector: {
        ...inspector,
        elementInspector: {
          ...inspector.elementInspector,
          targetElement: { chapter: chapter, component: component },
        },
      },
    });
  };

  return (
    <Box className={classes.root}>
      <Grid container direction="column" className={classes.components}>
        {chapterData
          ? _.sortBy(chapterData.tree.components, [o => o.order]).map((component, i) => {
              // consolidate fill props with raw images
              const fill =
                component.props.fill && component.props.fill.length > 0
                  ? {
                      ...component.props.fill,
                      raw: `${basepath}src/chapters/${activeChapter}/${component.id}-${component.props.fill}`,
                    }
                  : component.props.fill;

              // consolidate component.props.images with raw images
              const images =
                component.props.images.length > 0
                  ? component.props.images.map(image => {
                      const imagePath = `${basepath}src/chapters/${activeChapter}/${component.id}-${image.name}`;
                      return {
                        ...image,
                        raw: imagePath,
                      };
                    })
                  : [];

              // dirty validate mask string values
              const mask = ['dark', 'light'].includes(component.props.mask) ? component.props.mask : null;

              const RenderedComponent = componentMap[component.type];
              const componentProps = component.props;

              return (
                <Grid item key={component.id} className={classes.componentWrap}>
                  <ThemeProvider theme={docTheme}>
                    <div onClick={() => onInspectElement(activeChapter, component.id)}>
                      <RenderedComponent
                        {...componentProps}
                        animate={false}
                        cover={false}
                        fill={fill}
                        images={images}
                        isEditable
                        mask={mask}
                        onComponentSave={payload => console.log({ payload })}
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
});
