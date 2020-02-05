import React from 'react';
import { connect } from 'react-redux';
import { update } from '../reducers/data';

import { Box, Tabs, Tab } from '@material-ui/core';
import DocumentInspector from './ofInspector/DocumentInspector';

import { defaultTheme } from '../themes';

const Inspector = props => {
  const { data, update } = props;
  const { inspector } = data;

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

  return (
    <>
      <Tabs
        value={inspector.activeInspector}
        onChange={handleTabChange}
        aria-label="simple tabs example"
        variant="fullWidth">
        <Tab label="Item One" value="document" label="Document" />
        <Tab label="Item Two" value="page" label="Page" />
        {/* <Tab label="Item Three" value="component" label="Element" /> */}
      </Tabs>
      <Box
        display={inspector.activeInspector !== 'document' ? 'none' : 'flex'}
        flexDirection="column"
        borderTop={`1px solid ${defaultTheme.palette.divider}`}>
        <DocumentInspector />
      </Box>
      <Box display={inspector.activeInspector !== 'page' ? 'none' : 'flex'}>Page</Box>
      {/* <Box display={inspector.activeInspector !== 'component' ? 'none' : 'flex'}>Element</Box> */}
    </>
  );
};

export default connect(({ data }) => ({ data }), { update })(Inspector);
