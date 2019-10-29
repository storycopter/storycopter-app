import React, { Component } from 'react';
import styled from 'styled-components';

import { breakpoint } from '@storycopter/ui/settings';
import { setSpace } from '@storycopter/ui/mixins';

const Element = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: row;
  ${breakpoint.phone} {
    align-items: stretch;
    flex-direction: column;
    text-align: center;
    width: 100%;
    & > *:not(:first-child) {
      ${setSpace('mts')};
    }
    & > *:not(:last-child) {
      ${setSpace('mbs')};
    }
  }
  ${breakpoint.tabletPlus} {
    & > *:not(:first-child) {
      ${setSpace('mlm')};
    }
    & > *:not(:last-child) {
      ${setSpace('mrm')};
    }
  }
`;

class Actionbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    // console.group('Actionbar.js');
    // console.log(this.props);
    // console.groupEnd();

    return <Element {...this.props}>{children}</Element>;
  }
}

export default Actionbar;

Actionbar.propTypes = {};
Actionbar.defaultProps = {};
