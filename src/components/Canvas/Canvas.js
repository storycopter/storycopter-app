import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';

import { uploadFile } from '@utils';
import { update } from '@reducers/data';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import { ThemeProvider } from '@material-ui/core/styles';

import { componentMap, constructTheme } from '@storycopter/gatsby-starter-storycopter';

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
  const activeElementIndex = _.findIndex(activePage?.elements, o => o.id === activeElementId);

  const onInspectElement = (e, elementId) => {
    e.stopPropagation();
    if (elementId === activeElementId) return;
    update({
      ...produce(data, nextData => {
        nextData.editor.activeElementId = elementId;
        if (elementId) nextData.inspector.activeInspector = 'element';
      }),
    });
  };

  const onElementUpdate = payload => {
    if (!activeElementId) return null;
    update({
      ...produce(data, nextData => {
        if (isEssential) {
          nextData.currentProject.essentials[activePageId].elements[activeElementIndex].settings = {
            ...nextData.currentProject.essentials[activePageId].elements[activeElementIndex].settings,
            ...payload,
          };
        } else {
          nextData.currentProject.pages[activePageIndex].elements[activeElementIndex].settings = {
            ...nextData.currentProject.pages[activePageIndex].elements[activeElementIndex].settings,
            ...payload,
          };
        }
      }),
    });
  };

  const onFigureImageUpload = () => {
    const destination = `src/pages/${activePage.meta.uid}`;
    const file = uploadFile(basepath, destination, ['jpg', 'png']);
    if (file) {
      console.log(file);
      onElementUpdate({
        image: {
          name: file.name,
        },
      });
    }
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

  // console.group('Canvas.js');
  // console.log('data:', data);
  // console.groupEnd();

  return (
    <div className={classes.root} onClick={activeElementId ? e => onInspectElement(e, null) : null}>
      <Grid className={classes.elements} ref={canvasNode}>
        <ThemeProvider theme={constructTheme(site.brand)}>
          {_.sortBy(activePage?.elements, [o => o.order]).map(({ id, order, settings, type }, i) => {
            if (type === 'slideshow') return null;

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

            const image = settings?.image?.name
              ? {
                  ...settings.image,
                  publicURL: `file://${basepath}/src/${targetEntity}/${activePageId}/${settings.image?.name}`,
                }
              : settings.image;

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
                  <Component
                    {...settings}
                    backgImage={settings.backgImageEnabled ? backgImage : null}
                    canvasHeight={canvasHeight}
                    image={image}
                    images={images}
                    isEditable
                    isActivelyEditable={activeElementId === id}
                    onElementUpdate={onElementUpdate}
                    onImageUpload={type === 'figure' ? onFigureImageUpload : null}
                    style={{
                      minHeight: settings.fullSize ? `${canvasHeight}px` || 'auto' : 'auto',
                    }}
                  />
                </div>
              </Grid>
            );
          })}
        </ThemeProvider>
      </Grid>
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(Canvas);
