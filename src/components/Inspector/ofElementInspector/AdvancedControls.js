import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '@reducers/data';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';

const AdvancedControls = ({ data, update, ...props }) => {
  const { activePageId, activeElementId } = data.editor;

  const isEssential = ['credits', 'home'].includes(activePageId);

  const popupState = usePopupState({ variant: 'popover', popupId: 'advancedPageMenu' });

  const onElementDelete = () => {
    popupState.close();
    if (isEssential) return;
    const activePageIndex = _.findIndex(data.currentProject.pages, o => o.meta.uid === activePageId);
    const activeElIndex = _.findIndex(
      data.currentProject.pages[activePageIndex].elements,
      o => o.id === activeElementId
    );
    update({
      ...produce(data, nextData => {
        nextData.editor.activeElementId = null;
        nextData.currentProject.pages[activePageIndex].elements = [
          ...data.currentProject.pages[activePageIndex].elements.slice(0, activeElIndex),
          ...data.currentProject.pages[activePageIndex].elements.slice(activeElIndex + 1),
        ];
      }),
    });
  };

  // console.group('AdvancedControls.js');
  // console.log('activeComponent:', activeComponent);
  // console.groupEnd();

  return (
    <div {...props}>
      {!isEssential ? (
        <>
          <Button {...bindTrigger(popupState)} color="primary" fullWidth size="small" startIcon={<SettingsIcon />}>
            Advanced…
          </Button>
          <Menu
            {...bindMenu(popupState)}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <MenuItem dense onClick={onElementDelete}>
              Delete selected element
            </MenuItem>
          </Menu>
        </>
      ) : null}
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(AdvancedControls);
