import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import Grid from '@material-ui/core/Grid';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';

import componentMap from '@storycopter/ui/src/components/componentMap';
import docTheme from '@storycopter/ui/src/themes/docTheme';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflow: 'auto',
    padding: `${theme.spacing(5)}px`,
  },
  elements: {},
  elementWrap: {
    position: 'relative',
    width: '100%',
    height: 'auto',
  },
}));

const Canvas = ({ data, update }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { currentProject, editor } = data;
  const { basepath, pages, essentials } = currentProject;
  const { activePageId, activeElementId } = editor;

  const isEssential = ['home', 'credits'].includes(activePageId);
  const targetEntity = isEssential ? 'essentials' : 'pages';

  const activePage = isEssential ? essentials[activePageId] : _.find(pages, o => o.meta.uid === activePageId);
  const activePageIndex = _.findIndex(pages, o => o.meta.uid === activePageId);

  const onInspectElement = (e, elementId) => {
    e.stopPropagation();
    update({
      ...produce(data, nextData => {
        nextData.editor.activeElementId = elementId;
        if (elementId) nextData.inspector.activeInspector = 'element';
      }),
    });
  };

  const onElementUpdate = payload => {
    const componentIndex = _.findIndex(activePage.elements, o => o.id === activeElementId);
    if (isEssential) {
      update({
        ...produce(data, nextData => {
          nextData.currentProject.essentials[activePageId].elements[componentIndex].settings = {
            ...nextData.currentProject.essentials[activePageId].elements[componentIndex].settings,
            ...payload,
          };
        }),
      });
    } else {
      update({
        ...produce(data, nextData => {
          nextData.currentProject.pages[activePageIndex].elements[componentIndex].settings = {
            ...nextData.currentProject.pages[activePageIndex].elements[componentIndex].settings,
            ...payload,
          };
        }),
      });
    }
    return null;
  };

  // TODO: scroll to active element on activeElementId change

  // console.group('Canvas.js');
  // console.log('activeElementId:', activeElementId);
  // console.log('activePage:', activePage);
  // console.log('props:', props);
  // console.groupEnd();

  return (
    <div className={classes.root} onClick={activeElementId ? e => onInspectElement(e, null) : null}>
      <Grid container direction="column" className={classes.elements}>
        {_.sortBy(activePage?.elements, [o => o.order]).map(({ id, order, settings, type }, i) => {
          // TODO: don’t do this:
          if (type !== 'headline') return null;

          const Component = componentMap[type];
          const isElementActive = activeElementId === id;

          // construct backgImage object
          const backgImage = {
            ...settings.backgImage,
            raw: `file:///${basepath}/src/${targetEntity}/${activePageId}/${settings.backgImage.name}`,
          };

          const isFirstChild = i === 0;
          const isLastChild = i === activePage.elements.length - 1;
          const activeMargin = isElementActive
            ? {
                marginTop: isFirstChild ? 0 : '20px',
                marginBottom: isLastChild ? 0 : '20px',
              }
            : null;

          return (
            <Grid
              className={classes.elementWrap}
              item
              key={`${activePageId}-${id}`}
              onClick={e => onInspectElement(e, id)}>
              <div
                style={{
                  ...activeMargin,
                  backgroundColor: currentProject.site.brand.backgColor,
                  boxShadow: isElementActive ? `0 0 0 5px ${theme.palette.primary.main}` : theme.shadows[2],
                  position: 'relative',
                  transition: 'margin 0.5s',
                  zIndex: 1,
                  // minHeight: settings.fullScreen ? `` : 'auto',
                }}>
                <ThemeProvider theme={docTheme}>
                  <Component
                    {...settings}
                    backgImage={settings.backgImageEnabled ? backgImage : null}
                    isEditable
                    onElementUpdate={onElementUpdate}
                  />
                </ThemeProvider>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(Canvas);
