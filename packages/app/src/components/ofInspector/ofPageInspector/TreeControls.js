import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import produce from 'immer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TitleIcon from '@material-ui/icons/Title';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
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
}));

const TreeControls = ({ data, update }) => {
  const classes = useStyles();

  const { basepath, pages, site } = data.currentProject;
  const { activePageId, activeElementId } = data.editor;

  const activePage = activePageId ? _.find(pages, o => o.meta.uid === activePageId) : null;
  const activePageIndex = activePageId ? _.findIndex(pages, o => o.meta.uid === activePageId) : null;
  // const activeComponentIndex = _.findIndex(activePage.tree.components, o => o.id === activeElementId);

  const [elements, setElements] = useState(activePage.tree.components || []);

  const reorder = (arr, startIndex, endIndex) => {
    const result = Array.from(arr);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((o, i) => ({ ...o, order: i }));
  };

  const onInspectElement = (e, elementId) => {
    e.stopPropagation();
    update({
      ...produce(data, nextData => {
        nextData.editor.activeElementId = elementId;
        if (elementId) nextData.inspector.activeInspector = 'element';
      }),
    });
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const payload = reorder(elements, source.index, destination.index);
    setElements(payload);
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages[activePageIndex].tree = {
          ...nextData.currentProject.pages[activePageIndex].tree,
          components: payload,
        };
        nextData.editor.activeElementId = null;
      }),
    });
  };

  // useEffect(() => {}, []);

  // console.group('TreeControls.js');
  // console.log('activePageId', activePageId);
  // console.groupEnd();

  const elementTypes = {
    headline: 'Headline',
    gallery: 'Image gallery',
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, droppableSnapshot) => (
          <List
            {...provided.droppableProps}
            dense
            disablePadding
            ref={provided.innerRef}
            className={classes.list}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {elements.map((element, index) => {
              {
                /* const { settings } = element;
              const secondaryText = () => {
                if (element.type === 'headline') {
                  return element.settings.title || element.settings.subtitle || element.settings.text;
                }
              }; */
              }
              return (
                <Draggable key={element.id} draggableId={element.id} index={index}>
                  {(provided, draggableSnapshot) => (
                    <ListItem
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className={classes.listItem}
                      disableGutters
                      ref={provided.innerRef}>
                      <ListItemAvatar className={classes.listAvatar}>
                        <Typography color="textSecondary" variant="body2">
                          {droppableSnapshot.isDraggingOver && draggableSnapshot.isDragging ? (
                            <DragHandleIcon fontSize="small" />
                          ) : (
                            <span style={{ opacity: droppableSnapshot.isDraggingOver ? 0.5 : 1 }}>
                              {element.order + 1}.
                            </span>
                          )}
                        </Typography>
                      </ListItemAvatar>
                      <ListItemText primary={elementTypes[element.type]} />
                      <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                        <IconButton onClick={e => onInspectElement(e, element.id)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default connect(({ data }) => ({ data }), { update })(TreeControls);