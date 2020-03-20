import React, { Component } from 'react';
import styled from 'styled-components';

import { withTheme } from '@material-ui/styles';

import { breakpoint, time, track } from '@storycopter/ui/settings';
import { setSpace, setType } from '@storycopter/ui/mixins';

const Element = styled(({ theme, ...props }) => <a {...props} />)`
  ${setSpace('phm')};
  ${setSpace('pvs')};
  ${setType('x')};
  background: ${({ primary, theme }) => (primary ? theme.palette.common.white : 'transparent')};
  border-color: ${({ theme }) => theme.palette.common.white};
  border-style: solid;
  border-width: 2px;
  color: ${({ primary, theme }) => (primary ? theme.palette.common.black : theme.palette.common.white)};
  display: inline-block;
  letter-spacing: ${track.m};
  text-transform: uppercase;
  transition: background ${time.m}, color ${time.m}, transform ${time.x};
  &:hover {
    background-color: white;
    color: black;
    transform: translateY(-3%);
  }
  &:active {
    transform: translateY(0%);
  }
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

export default withTheme(Action);

Action.propTypes = {};
Action.defaultProps = {};
