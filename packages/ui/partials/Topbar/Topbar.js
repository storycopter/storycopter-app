import React, { Component } from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/styles';
import { bool } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import { PointerIcon, ShareIcon } from '@storycopter/ui/elements';

import { color, time, track } from '@storycopter/ui/settings';
import { setHeight, setType, setSpace } from '@storycopter/ui/mixins';

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
const Main = styled.div`
  flex: 1 1 100%;
`;
const Toolbar = styled.div``;
const Title = styled.h1`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  letter-spacing: ${track.l};
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  text-transform: uppercase;
  transition: opacity ${time.s};
  & > span {
    ${setType('x')};
    ${setSpace('phs')};
    ${setSpace('pvx')};
    background-color: ${color.shadow200};
  }
`;
const Preview = styled.p`
  display: none;
  opacity: 0;
  transition: opacity ${time.s};
`;
const Breadcrumbs = styled.nav`
  display: none;
  opacity: 0;
  transition: opacity ${time.s};
`;

const Element = styled(({ theme, pin, ...props }) => <header {...props} />)`
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
  top: 0;
  transition: background ${time.s}, box-shadow ${time.s}, height ${time.m};
  z-index: ${({ theme }) => theme.zIndex.appBar};
  &:hover {
    background-color: ${color.shadow900};
    box-shadow: 0 1px 5px ${color.shadow300};
    ${Breadcrumbs} {
      display: block;
      opacity: 1;
    }
    ${Preview} {
      display: block;
      opacity: 1;
    }
    ${Title} {
      display: none;
      opacity: 0;
    }
  }
`;

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { allowPrev, allowNext, pin, theme } = this.props;

    console.group('Topbar.js');
    console.log(this.props.theme);
    console.groupEnd();

    return (
      <Element theme={theme} pin={pin}>
        <Side lx>
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item>
                <Tooltip title="Table of contents">
                  <IconButton>
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Previous page">
                  <IconButton
                    disabled={!allowPrev}
                    style={{
                      borderBottomRightRadius: 0,
                      borderTopRightRadius: 0,
                    }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Next page">
                  <IconButton
                    disabled={!allowNext}
                    style={{
                      borderBottomLeftRadius: 0,
                      borderTopLeftRadius: 0,
                    }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </Side>
        <Main>
          <Title theme={theme}>
            <span>Title</span>
          </Title>
          <Preview>Preview</Preview>
          <Breadcrumbs>Breadcrumbs</Breadcrumbs>
        </Main>
        <Side rx>
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item>
                <Tooltip title="Share">
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Take action">
                  <IconButton>
                    <PointerIcon />
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

export default withTheme(Topbar);

Topbar.propTypes = {
  allowNext: bool,
  allowPrev: bool,
  isCredits: bool,
  isHome: bool,
  pin: bool,
};
Topbar.defaultProps = {
  allowPrev: null,
  allowNext: null,
  isCredits: null,
  isHome: null,
  pin: null,
};
