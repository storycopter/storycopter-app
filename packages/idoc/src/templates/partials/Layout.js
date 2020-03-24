import React from 'react';
import PropTypes from 'prop-types';

import Baseline from '@storycopter/ui/src/themes/styles/Baseline';

export default function Layout({ pageContext, ...props }) {
  // console.group('Layout.js');
  // console.log({ pageContext });
  // console.groupEnd();

  return (
    <>
      <Baseline />
      <div {...props} />
    </>
  );
}

Layout.propTypes = {};
