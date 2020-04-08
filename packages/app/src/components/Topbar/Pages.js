import Popover from 'material-ui-popup-state/HoverPopover';
import React, { useState } from 'react';
import _ from 'lodash';
import produce from 'immer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';
import { usePopupState, bindHover, bindPopover } from 'material-ui-popup-state/hooks';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import PanoramaWideAngleIcon from '@material-ui/icons/PanoramaWideAngle';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import makeStyles from '@material-ui/core/styles/makeStyles';

const PAGE_DETAILS_CARD_WIDTH = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
  list: {
    display: 'flex',
    // userSelect: 'none',
    '& > *': {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  avatar: {
    ...theme.typography.button,
    cursor: 'pointer',
    height: theme.spacing(4),
    width: theme.spacing(3.5),
  },
  avatarActive: {
    boxShadow: `0 0 0 ${theme.spacing(0.4)}px ${theme.colors.flare[500]}, 0 0 1px 1px ${theme.colors.shadow[900]}`,
  },
  popover: {
    // paddingTop: theme.spacing(1),
  },
  pageCard: {
    display: 'flex',
    flexDirection: 'column',
    width: `${PAGE_DETAILS_CARD_WIDTH}px`,
  },
  pageCardHead: {
    lineHeight: 0,
  },
  pageCoverAlt: {
    background: theme.palette.background.default,
    padding: theme.spacing(1),
  },
  pageCardBody: {
    padding: theme.spacing(1),
  },
}));

const Pages = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject, editor } = data;
  const { activePageId } = editor;
  const { basepath, essentials, pages } = currentProject;

  const [pageDetails, setPageDetails] = useState(null);

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'pageDetailsPopover',
  });

  const reorder = (arr, startIndex, endIndex) => {
    const result = Array.from(arr);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((o, i) => ({ ...o, meta: { ...o.meta, order: i } }));
  };

  const onAvatarClick = pageId => {
    update({
      ...produce(data, nextData => {
        nextData.editor.activePageId = pageId;
        nextData.editor.activeElementId = null;
        // nextData.inspector.activeInspector = 'page';
      }),
    });
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const payload = reorder(pages, source.index, destination.index);
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages = payload;
      }),
    });
  };

  const onSelectPage = () => {
    if (!pageDetails) return;
    popupState.close();
    update({
      ...produce(data, nextData => {
        nextData.editor.activePageId = pageDetails.uid;
        nextData.inspector.activeInspector = 'page';
      }),
    });
  };

  const avatarProps = {
    className: classes.avatar,
    variant: 'rounded',
  };
  const popoverProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    disableRestoreFocus: true,
  };

  // console.log({ pageDetails });

  return (
    <>
      <div className={classes.root}>
        <div onMouseEnter={() => setPageDetails(essentials.home.meta)}>
          <Avatar
            {...avatarProps}
            {...bindHover(popupState)}
            alt="Opening titles"
            className={`${classes.avatar} ${activePageId === 'home' ? classes.avatarActive : ''}`}
            onClick={() => onAvatarClick('home')}
            src={
              essentials.home?.meta?.coverEnabled
                ? `file:///${basepath}/src/essentials/home/${essentials.home?.meta?.coverImage?.name}`
                : null
            }>
            <PanoramaWideAngleIcon fontSize="inherit" />
          </Avatar>
        </div>
        <Divider flexItem orientation="vertical" />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, droppableSnapshot) => (
              <div {...provided.droppableProps} className={classes.list} ref={provided.innerRef}>
                {_.orderBy(pages, [o => o.meta.order], ['asc']).map(({ meta }, i) => {
                  // do not render the dummy page (used by the idoc package)
                  if (meta.uid === 'pagesDummy') return null;
                  return (
                    <Draggable key={meta.order} draggableId={meta.uid} index={i}>
                      {(provided, draggableSnapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onMouseEnter={() => setPageDetails(meta)}
                          style={provided.draggableProps.style}>
                          {/* <Tooltip title={`${i + 1}. ${meta.title}`}> */}
                          <Avatar
                            {...avatarProps}
                            {...bindHover(popupState)}
                            alt={`${meta.title}`}
                            className={`${classes.avatar} ${activePageId === meta.uid ? classes.avatarActive : ''}`}
                            onClick={() => onAvatarClick(meta.uid)}
                            src={
                              meta.coverEnabled
                                ? `file:///${basepath}/src/pages/${meta.uid}/${meta.coverImage.name}`
                                : null
                            }>
                            {i + 1}
                          </Avatar>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Divider flexItem orientation="vertical" />
        <div onMouseEnter={() => setPageDetails(essentials.credits.meta)}>
          <Avatar
            {...avatarProps}
            {...bindHover(popupState)}
            alt="Credits"
            className={`${classes.avatar} ${activePageId === 'credits' ? classes.avatarActive : ''}`}
            onClick={() => onAvatarClick('credits')}
            src={
              essentials.credits?.meta?.coverEnabled
                ? `file:///${basepath}/src/essentials/home/${essentials.home.credits?.meta?.coverImage?.name}`
                : null
            }>
            <ViewHeadlineIcon fontSize="inherit" />
          </Avatar>
        </div>
        <Tooltip title="New page">
          <IconButton size="small">
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </div>
      {pageDetails ? (
        <Popover {...bindPopover(popupState)} {...popoverProps} className={classes.popover}>
          <Grid
            alignItems="stretch"
            className={classes.pageCard}
            container
            direction="column"
            justify="flex-start"
            spacing={0}>
            <Grid className={classes.pageCardHead} item>
              {pageDetails.coverEnabled && pageDetails.coverImage?.name ? (
                <img
                  src={`file:///${basepath}/src/pages/${pageDetails.uid}/${pageDetails.coverImage.name}`}
                  width={PAGE_DETAILS_CARD_WIDTH}
                />
              ) : (
                <Typography className={classes.pageCoverAlt} component="p" variant="caption" color="textSecondary">
                  Add page cover…
                </Typography>
              )}
            </Grid>
            <Grid className={classes.pageCardBody} item>
              <Typography component="h2" variant="subtitle2">
                {pageDetails.title}
              </Typography>
            </Grid>
          </Grid>
        </Popover>
      ) : null}
    </>
  );
};

export default connect(({ data }) => ({ data }), { update })(Pages);
