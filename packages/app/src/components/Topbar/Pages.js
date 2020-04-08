import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PanoramaWideAngleIcon from '@material-ui/icons/PanoramaWideAngle';
import Tooltip from '@material-ui/core/Tooltip';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import makeStyles from '@material-ui/core/styles/makeStyles';

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
    userSelect: 'none',
    width: '100%',
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
}));

const Pages = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject, editor } = data;
  const { activePageId } = editor;
  const { basepath, pages } = currentProject;

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

  const avatarProps = {
    className: classes.avatar,
    variant: 'rounded',
  };

  return (
    <div className={classes.root}>
      <Tooltip title="Opening titles">
        <Avatar
          {...avatarProps}
          alt="Opening titles"
          // onClick={() => onAvatarClick(meta.uid)}
          // src={meta.coverEnabled ? `file:///${basepath}/src/essentials/home/${meta.coverImage.name}` : null}
        >
          <PanoramaWideAngleIcon fontSize="inherit" />
        </Avatar>
      </Tooltip>
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
                        style={provided.draggableProps.style}>
                        <Tooltip title={`${i + 1}. ${meta.title}`}>
                          <Avatar
                            {...avatarProps}
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
                        </Tooltip>
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
      <Tooltip title="Credits">
        <Avatar
          {...avatarProps}
          alt="Credits"
          // onClick={() => onAvatarClick(meta.uid)}
          // src={meta.coverEnabled ? `file:///${basepath}/src/essentials/home/${meta.coverImage.name}` : null}
        >
          <ViewHeadlineIcon fontSize="inherit" />
        </Avatar>
      </Tooltip>
      <Tooltip title="New page">
        <IconButton size="small">
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(Pages);
