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
import { breakpoint } from '@storycopter/ui/settings';
import { setHeight, setSpace } from '@storycopter/ui/mixins';

import AniLink from '../components/AniLink';

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
const Toolbar = styled.div`
  pointer-events: auto;
`;

const Element = styled(({ theme, ...props }) => <footer {...props} />)`
  ${({ theme }) => theme.typography.body2};
  ${setHeight('h')};
  ${setSpace('pam')};
  align-items: center;
  bottom: 0;
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  pointer-events: none;
  position: fixed;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.appBar};
  ${breakpoint.phone} {
    display: none;
  }
`;

class FooBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLinkWTransitionClick = this.onLinkWTransitionClick.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.tooltip && prevProps.path !== this.props.path) {
      this.setState({ isTransitioning: null });
    }
  }

  onLinkWTransitionClick() {
    this.setState({ isTransitioning: true });
  }

  render() {
    const { theme } = this.props;
    const { isTransitioning, tooltip } = this.state;

    return (
      <Element theme={theme}>
        <Side lx>
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item>
                <Tooltip
                  enterDelay={500}
                  onClose={() => this.setState({ tooltip: null })}
                  onOpen={() => this.setState({ tooltip: 'credits' })}
                  open={!isTransitioning && tooltip === 'credits'}
                  title="Credits">
                  <div style={{ display: 'inline-block' }}>
                    <AniLink to="/credits" onClick={this.onLinkWTransitionClick}>
                      <IconButton>
                        <CreditsIcon />
                      </IconButton>
                    </AniLink>
                  </div>
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
