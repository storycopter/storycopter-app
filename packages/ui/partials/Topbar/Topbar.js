import React, { Component } from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/styles';
import {} from 'prop-types';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import { PointerIcon, ShareIcon } from '@storycopter/ui/elements';

import { breakpoint, color } from '@storycopter/ui/settings';
import { setType, setSpace } from '@storycopter/ui/mixins';

const Side = styled(({ lx, rx, ...props }) => <div {...props} />)`
  flex: 0 0 160px;
  text-align: ${({ lx, rx }) => (rx ? 'right' : 'left')};
`;
const Main = styled.div`
  flex: 1 1 100%;
`;
const Toolbar = styled.div``;
const Preview = styled.h1``;
const Breadcrumbs = styled.nav``;

const Element = styled(({ theme, ...props }) => <header {...props} />)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.appBar};
`;

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { theme } = this.props;

    console.group('Topbar.js');
    console.log(this.props);
    console.groupEnd();

    return (
      <Element theme={theme}>
        <Side lx>
          <Toolbar>
            <Tooltip title="Menu">
              <IconButton>
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Previous chapter">
              <IconButton>
                <KeyboardArrowLeftIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Next chapter">
              <IconButton>
                <KeyboardArrowRightIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Side>
        <Main>
          <Preview>Preview</Preview>
          <Breadcrumbs>Breadcrumbs</Breadcrumbs>
        </Main>
        <Side rx>
          <Toolbar>
            <Tooltip title="Share">
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Take action">
              <IconButton>
                <PointerIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Side>
      </Element>
    );
  }
}

export default withTheme(Topbar);

Topbar.propTypes = {};
Topbar.defaultProps = {};