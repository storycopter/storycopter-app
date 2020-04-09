import React, { useState } from 'react';
import _ from 'lodash';
import findIndex from 'lodash/findIndex';
import produce from 'immer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import elementMap from '../../../elements/elementMap';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  listAvatar: {
    minWidth: theme.spacing(5),
  },
  list: {
    width: '100%',
  },
  listItem: {
    position: 'relative',
  },
  listItemSecondaryAction: {
    right: 0,
  },
  iconButton: {
    opacity: 0.33,
    '&:hover': { opacity: 1 },
  },
}));

const TreeListItem = ({
  activePageIndex,
  classes,
  data,
  draggableSnapshot,
  droppableSnapshot,
  element,
  provided,
  update,
  ...props
}) => {
  const moreActionsPopupState = usePopupState({ variant: 'popover', popupId: 'moreElementMenu' });

  const onElementDelete = (e, elementId) => {
    e.stopPropagation();
    moreActionsPopupState.close();
    const activeElIndex = findIndex(data.currentProject.pages[activePageIndex].elements, o => o.id === elementId);
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages[activePageIndex].elements = [
          ...data.currentProject.pages[activePageIndex].elements.slice(0, activeElIndex),
          ...data.currentProject.pages[activePageIndex].elements.slice(activeElIndex + 1),
        ];
      }),
    });
  };

  const onElementInspect = (e, elementId) => {
    e.stopPropagation();
    moreActionsPopupState.close();
    update({
      ...produce(data, nextData => {
        nextData.editor.activeElementId = elementId;
        if (elementId) nextData.inspector.activeInspector = 'element';
      }),
    });
  };

  return (
    <ListItem
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
      className={classes.listItem}
      disableGutters>
      <ListItemAvatar className={classes.listAvatar}>
        <Typography color="textSecondary" variant="body2">
          {droppableSnapshot.isDraggingOver && draggableSnapshot.isDragging ? (
            <DragHandleIcon fontSize="small" />
          ) : (
            <span style={{ opacity: droppableSnapshot.isDraggingOver ? 0.5 : 1 }}>{element.order + 1}.</span>
          )}
        </Typography>
      </ListItemAvatar>
      <ListItemText primary={elementMap[element.type].name} />
      {!droppableSnapshot.isDraggingOver ? (
        <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
          <IconButton
            {...bindTrigger(moreActionsPopupState)}
            className={classes.iconButton}
            disableFocusRipple
            disableRipple
            edge="end"
            // onClick={() => {
            //   moreActionsPopupState.setAnchorEl();
            //   setActivePopup(element.id);
            //   moreActionsPopupState.open();
            // }}
            size="small">
            <MoreHorizIcon fontSize="inherit" />
          </IconButton>
          <Menu
            {...bindMenu(moreActionsPopupState)}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <MenuItem dense onClick={e => onElementInspect(e, element.id)}>
              Edit
            </MenuItem>
            <MenuItem dense onClick={e => onElementDelete(e, element.id)}>
              Delete
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      ) : null}
    </ListItem>
  );
};

const TreeControls = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { pages } = data.currentProject;
  const { activePageId, activeElementId } = data.editor;

  const activePage = _.find(pages, o => o.meta.uid === activePageId);
  const activePageIndex = _.findIndex(pages, o => o.meta.uid === activePageId);
  // const activeComponentIndex = _.findIndex(elements, o => o.id === activeElementId);

  const [activePopup, setActivePopup] = useState(null);

  const newElPopupState = usePopupState({ variant: 'popover', popupId: 'addElementMenu' });

  const reorder = (arr, startIndex, endIndex) => {
    const result = Array.from(arr);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((o, i) => ({ ...o, order: i }));
  };

  const onElementAdd = type => {
    newElPopupState.close();
    const payload = elementMap[type].schema;
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages[activePageIndex].elements.push({
          ...payload,
          id: `${activePageId}-${Date.now()}`,
          order: data.currentProject.pages[activePageIndex].elements.length,
        });
      }),
    });
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return null;
    const payload = reorder(activePage.elements, source.index, destination.index);
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages[activePageIndex].elements = payload;
        nextData.editor.activeElementId = null;
      }),
    });
  };

  // console.group('TreeControls.js');
  // console.log('activePageId', activePageId);
  // console.groupEnd();

  return (
    <Grid {...props} container className={classes.root} direction="column" spacing={1}>
      <Grid item>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, droppableSnapshot) => (
              <List {...provided.droppableProps} className={classes.list} dense disablePadding ref={provided.innerRef}>
                {activePage?.elements.map((element, index) => {
                  return (
                    <Draggable key={`${activePageId}${element.id}`} draggableId={element.id} index={index}>
                      {(provided, draggableSnapshot) => (
                        <TreeListItem
                          activePageIndex={activePageIndex}
                          classes={classes}
                          data={data}
                          draggableSnapshot={draggableSnapshot}
                          droppableSnapshot={droppableSnapshot}
                          element={element}
                          provided={provided}
                          update={update}
                        />
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <Grid item>
        <Button
          {...bindTrigger(newElPopupState)}
          color="primary"
          fullWidth
          size="small"
          startIcon={<AddCircleOutlineIcon />}>
          Add new…
        </Button>
        <Menu
          {...bindMenu(newElPopupState)}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
          {_.sortBy(Object.keys(elementMap), o => o.name).map(o => (
            <MenuItem dense key={elementMap[o].schema.type} onClick={() => onElementAdd(elementMap[o].schema.type)}>
              {elementMap[o].name}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
};

export default connect(({ data }) => ({ data }), { update })(TreeControls);
