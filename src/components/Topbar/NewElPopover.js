import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';
import { usePopupState, bindHover, bindMenu } from 'material-ui-popup-state/hooks';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';

import elementMap from '../../elements/elementMap';
import createPage from '../../utils/createPage';

const ParentPopupState = React.createContext(null);

const MAX_PAGES_NUMBER = 8;

const useStyles = makeStyles(theme => ({
  divider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const NewElementPopup = ({ data, update, ...props }) => {
  const classes = useStyles();
  const popupState = usePopupState({ popupId: 'demoMenu', variant: 'popover' });

  const { currentProject, editor } = data;
  const { activePageId } = editor;
  const { basepath, pages } = currentProject;

  const isEssential = ['credits', 'home'].includes(activePageId);

  const onPageCreate = () => {
    popupState.close();
    const newPage = createPage(basepath, pages.length);
    if (!newPage) return;
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages.push(newPage);
        nextData.editor.activePageId = newPage.meta.uid;
        nextData.inspector.activeInspector = 'page';
      }),
    });
  };

  const onElementAdd = type => {
    popupState.close();
    if (isEssential) return;
    const payload = elementMap[type].schema;
    const activePageIndex = _.findIndex(currentProject.pages, o => o.meta.uid === activePageId);
    console.log({ activePageIndex });
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

  return (
    <>
      <IconButton {...bindHover(popupState)} variant="contained" size="small">
        <AddCircleOutlineIcon />
      </IconButton>
      <ParentPopupState.Provider value={popupState}>
        <Menu
          {...bindMenu(popupState)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          disableAutoFocusItem
          getContentAnchorEl={null}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
          {activePageId && !isEssential
            ? [
                <Submenu key="submenu" popupId="moreChoicesMenu" title="Add page element">
                  {_.sortBy(Object.keys(elementMap), o => o.name).map(o => (
                    <MenuItem
                      dense
                      key={elementMap[o].schema.type}
                      onClick={() => onElementAdd(elementMap[o].schema.type)}>
                      {elementMap[o].name}
                    </MenuItem>
                  ))}
                </Submenu>,
                <Divider className={classes.divider} key="divider" />,
              ]
            : null}
          <MenuItem disabled={pages.length >= MAX_PAGES_NUMBER} dense onClick={onPageCreate}>
            Create new page
          </MenuItem>
        </Menu>
      </ParentPopupState.Provider>
    </>
  );
};

export default connect(({ data }) => ({ data }), { update })(NewElementPopup);

const submenuStyles = theme => ({
  menu: {
    top: theme.spacing(-1),
  },
  title: {
    flexGrow: 1,
    marginTop: 0,
    marginBottom: 0,
  },
  moreArrow: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(-1),
  },
});

const Submenu = withStyles(submenuStyles)(
  React.forwardRef(({ classes, title, popupId, children, ...props }, ref) => {
    const parentPopupState = React.useContext(ParentPopupState);
    const popupState = usePopupState({
      popupId,
      variant: 'popover',
      parentPopupState,
    });
    return (
      <ParentPopupState.Provider value={popupState}>
        <MenuItem dense {...bindHover(popupState)} selected={popupState.isOpen} ref={ref}>
          <ListItemText className={classes.title}>{title}</ListItemText>
          <ChevronRight className={classes.moreArrow} fontSize="inherit" />
        </MenuItem>
        <Menu
          {...bindMenu(popupState)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          className={classes.menu}
          disableAutoFocusItem
          getContentAnchorEl={null}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          {...props}>
          {children}
        </Menu>
      </ParentPopupState.Provider>
    );
  })
);
