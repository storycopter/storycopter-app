import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { withTheme } from '@material-ui/styles';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import { CreditsIcon } from '@storycopter/ui/elements';
import { setHeight, setSpace } from '@storycopter/ui/mixins';

const Side = styled(({ lx, rx, ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: row;
  flex: 0 0 200px;
  justify-content: ${({ lx, rx }) => (rx ? 'flex-end' : 'flex-start')};

  ${({ lx, rx }) =>
    rx
      ? `
  ${IconButton} {${setSpace('mlx')}}`
      : ``}
`;
const Toolbar = styled.div``;

const Element = styled(({ theme, ...props }) => <footer {...props} />)`
  ${setHeight('h')};
  ${setSpace('pam')};
  align-items: center;
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.appBar};
`;

class FooBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { theme } = this.props;

    return (
      <Element theme={theme}>
        <Side lx>
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item>
                <Tooltip title="Credits">
                  <Link to="/credits">
                    <IconButton>
                      <CreditsIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </Side>
        <Side rx>
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item>
                <Tooltip title="Mute sound">
                  <IconButton>
                    <VolumeOffIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Enter full-screen">
                  <IconButton>
                    <FullscreenIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </Side>
      </Element>
    );
  }
}

export default withTheme(FooBar);

FooBar.propTypes = {};
FooBar.defaultProps = {};
