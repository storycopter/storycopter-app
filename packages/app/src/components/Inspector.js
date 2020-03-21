import React from 'react';
import { connect } from 'react-redux';
import { update } from '../reducers/data';

import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import DocumentInspector from './ofInspector/DocumentInspector';
import ElementInspector from './ofInspector/ElementInspector';
import PageInspector from './ofInspector/PageInspector';

import { appTheme } from '@storycopter/ui/src/themes';

export default connect(({ data }) => ({ data }), { update })(({ data, update, ...props }) => {
  const { inspector } = data;
  const { activeInspector } = inspector;

  const handleUpdate = payload => {
    update({
      inspector: {
        ...inspector,
        ...payload,
      },
    });
  };

  const handleTabChange = (event, newValue) => {
    handleUpdate({ activeInspector: newValue });
  };

  const boxProps = {
    flexDirection: 'column',
    borderTop: `1px solid ${appTheme.palette.divider}`,
  };

  return (
    <>
      <Tabs value={activeInspector} onChange={handleTabChange} aria-label="Idoc inspector" variant="fullWidth">
        <Tab value="document" label="Document" />
        <Tab value="page" label="Page" />
        <Tab value="element" label="Element" />
      </Tabs>
      <Box {...boxProps} display={activeInspector === 'document' ? 'flex' : 'none'}>
        <DocumentInspector />
      </Box>
      <Box {...boxProps} display={activeInspector === 'page' ? 'flex' : 'none'}>
        <PageInspector />
      </Box>
      <Box {...boxProps} display={inspector.activeInspector === 'element' ? 'flex' : 'none'}>
        <ElementInspector />
      </Box>
    </>
  );
});
