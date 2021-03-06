import React from 'react';
import _ from 'lodash';
import findIndex from 'lodash/findIndex';
import produce from 'immer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { update } from '@reducers/data';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import formulas from '@formulas/map';

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

const ChildrenListItem = ({
  activePageIndex,
  classes,
  data,
  draggableSnapshot,
  droppableSnapshot,
  provided,
  image,
  update,
  ...props
}) => {
  const moreActionsPopupState = usePopupState({ variant: 'popover', popupId: 'moreElementMenu' });

  const onSliceDelete = (e, imageId) => {
    console.log('onSliceDelete:', imageId);
    e.stopPropagation();
    moreActionsPopupState.close();
    // const activeElIndex = findIndex(data.currentProject.pages[activePageIndex].elements, o => o.id === imageId);
    // update({
    //   ...produce(data, nextData => {
    //     nextData.currentProject.pages[activePageIndex].elements = [
    //       ...data.currentProject.pages[activePageIndex].elements.image(0, activeElIndex),
    //       ...data.currentProject.pages[activePageIndex].elements.image(activeElIndex + 1),
    //     ];
    //   }),
    // });
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
            <span style={{ opacity: droppableSnapshot.isDraggingOver ? 0.5 : 1 }}>{image.order + 1}.</span>
          )}
        </Typography>
      </ListItemAvatar>
      <ListItemText
        primary={'something'}
        // primary={formulas[element.type].name}
      />
      {!droppableSnapshot.isDraggingOver ? (
        <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
          <IconButton
            {...bindTrigger(moreActionsPopupState)}
            className={classes.iconButton}
            disableFocusRipple
            disableRipple
            edge="end"
            size="small">
            <MoreHorizIcon fontSize="inherit" />
          </IconButton>
          <Menu
            {...bindMenu(moreActionsPopupState)}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <MenuItem dense onClick={e => onSliceDelete(e, image.id)}>
              Delete
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      ) : null}
    </ListItem>
  );
};

const ChildrenControls = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { pages, essentials } = data.currentProject;
  const { activePageId, activeElementId } = data.editor;

  const isEssential = ['home', 'credits'].includes(activePageId);
  const activePage = isEssential ? essentials[activePageId] : _.find(pages, o => o.meta.uid === activePageId);
  const activeElement = _.find(activePage.elements, o => o.id === activeElementId);
  const { type } = activeElement;

  const activePageIndex = _.findIndex(pages, o => o.meta.uid === activePageId);

  const reorder = (arr, startIndex, endIndex) => {
    const result = Array.from(arr);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((o, i) => ({ ...o, order: i }));
  };

  const onChildAdd = () => {
    console.log('onChildAdd');
    // const payload = elementMap[type].schema;
    // update({
    //   ...produce(data, nextData => {
    //     nextData.currentProject.pages[activePageIndex].elements.push({
    //       ...payload,
    //       id: `${activePageId}-${Date.now()}`,
    //       order: data.currentProject.pages[activePageIndex].elements.length,
    //     });
    //   }),
    // });
  };

  const onDragEnd = ({ source, destination }) => {
    // if (!destination) return null;
    // const payload = reorder(activePage.elements, source.index, destination.index);
    // update({
    //   ...produce(data, nextData => {
    //     nextData.currentProject.pages[activePageIndex].elements = payload;
    //     nextData.editor.activeElementId = null;
    //   }),
    // });
  };

  console.group('ChildrenControls.js');
  console.log('activePageId', activePageId);
  console.log('activeElement', activeElement);
  console.groupEnd();

  return (
    <Grid {...props} container className={classes.root} direction="column" spacing={1}>
      <Grid item>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, droppableSnapshot) => (
              <List {...provided.droppableProps} className={classes.list} dense disablePadding ref={provided.innerRef}>
                {activeElement?.settings.images.map((image, index) => {
                  console.log({ image });
                  return (
                    <Draggable key={`${activeElementId}${image.id}`} draggableId={image.id} index={index}>
                      {(provided, draggableSnapshot) => (
                        <>
                          <ChildrenListItem
                            activePageIndex={activePageIndex}
                            classes={classes}
                            data={data}
                            draggableSnapshot={draggableSnapshot}
                            droppableSnapshot={droppableSnapshot}
                            provided={provided}
                            image={image}
                            update={update}
                          />
                        </>
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
        <Button onClick={onChildAdd} color="primary" fullWidth size="small" startIcon={<AddCircleOutlineIcon />}>
          Add slide
        </Button>
      </Grid>
    </Grid>
  );
};

export default connect(({ data }) => ({ data }), { update })(ChildrenControls);
