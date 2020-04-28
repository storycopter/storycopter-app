import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import Grid from '@material-ui/core/Grid';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';

import { componentMap, constructTheme } from '@storycopter/idoc';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflow: 'auto',
    padding: theme.spacing(5),
  },
  elements: {},
  elementWrap: {
    position: 'relative',
    width: '100%',
  },
}));

const Canvas = ({ data, update }) => {
  const classes = useStyles();
  const theme = useTheme();
  const canvasNode = useRef();

  const { currentProject, editor } = data;
  const { site, basepath, pages, essentials } = currentProject;
  const { activePageId, activeElementId } = editor;

  const [canvasHeight, setCanvasSize] = useState(null);

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

  const getCanvasSize = () => {
    if (!canvasNode?.current) return null;
    const canvasRect = canvasNode.current.getBoundingClientRect();
    const size = window.innerHeight - canvasRect.top - (window.innerWidth - canvasRect.right);
    setCanvasSize(size);
  };

  useEffect(() => {
    getCanvasSize();
  }, [canvasNode]);

  useEffect(() => {
    window.addEventListener('resize', getCanvasSize);
    return () => window.removeEventListener('resize', getCanvasSize);
  });

  console.group('Canvas.js');
  console.log('constructTheme:', constructTheme(site.brand));
  console.groupEnd();

  return (
    <div className={classes.root} onClick={activeElementId ? e => onInspectElement(e, null) : null}>
      <Grid className={classes.elements} ref={canvasNode}>
        {_.sortBy(activePage?.elements, [o => o.order]).map(({ id, order, settings, type }, i) => {
          const Component = componentMap[type];
          const isElementActive = activeElementId === id;

          // construct backgImage object
          const backgImage = {
            ...settings?.backgImage,
            publicURL: `file://${basepath}/src/${targetEntity}/${activePageId}/${settings?.backgImage?.name}`,
          };

          const images = settings?.images?.map(image => ({
            ...image,
            publicURL: `file://${basepath}/src/${targetEntity}/${activePageId}/${image?.name}`,
          }));

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
                }}>
                <ThemeProvider theme={constructTheme(site.brand)}>
                  <Component
                    {...settings}
                    backgImage={settings.backgImageEnabled ? backgImage : null}
                    canvasHeight={canvasHeight}
                    images={images}
                    isEditable
                    onElementUpdate={onElementUpdate}
                    style={{
                      minHeight: settings.fullSize ? `${canvasHeight}px` || 'auto' : 'auto',
                    }}
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
