import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import makeStyles from '@material-ui/core/styles/makeStyles';

import DocumentInspector from './DocumentInspector';
import ElementInspector from './ElementInspector';
import PageInspector from './PageInspector';

import { appTheme } from '@storycopter/ui/src/themes';

const useStyles = makeStyles(theme => ({
  tab: {
    // ...theme.typography.body2,
    // fontWeight: 'bold',
    // textTransform: 'none',
  },
}));

const Inspector = ({ data, update, ...props }) => {
  const classes = useStyles();
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
        <Tab className={classes.tab} value="document" label="Story" />
        <Tab className={classes.tab} value="page" label="Page" />
        <Tab className={classes.tab} value="element" label="Element" />
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
};

export default connect(({ data }) => ({ data }), { update })(Inspector);
