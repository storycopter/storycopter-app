import React, { Component } from 'react';
import styled from 'styled-components';

import { breakpoint, track } from '@storycopter/ui/settings';
import { setSpace, setType } from '@storycopter/ui/mixins';

const Element = styled(({ ...props }) => <a {...props} />)`
  ${setSpace('phm')};
  ${setSpace('pvs')};
  ${setType('x')};
  background: ${({ primary }) => (primary ? 'white' : 'transparent')};
  border-color: white;
  border-style: solid;
  border-width: 2px;
  color: ${({ primary }) => (primary ? 'black' : 'white')};
  display: block;
  letter-spacing: ${track.m};
  text-transform: uppercase;
`;

class Action extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    // console.group('Action.js');
    // console.log(this.props);
    // console.groupEnd();

    return <Element {...this.props}>{children}</Element>;
  }
}

export default Action;

Action.propTypes = {};
Action.defaultProps = {};
