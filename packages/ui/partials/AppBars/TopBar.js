import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { array, bool } from 'prop-types';
import { navigate } from 'gatsby';
import { withTheme } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import { PointerIcon, ShareIcon } from '@storycopter/ui/elements';
import { breakpoint, color, time, track } from '@storycopter/ui/settings';
import { setHeight, setSpace, setType } from '@storycopter/ui/mixins';

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
  ${breakpoint.phone} {
    display: none;
  }
`;
const Toolbar = styled.div`
  pointer-events: auto;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  letter-spacing: ${track.l};
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  text-transform: uppercase;
  transition: opacity ${time.m};
  & > span {
    ${setType('x')};
    ${setSpace('phs')};
    ${setSpace('pvx')};
    background-color: ${color.shadow200};
    pointer-events: auto;
  }
`;
const Preview = styled.p`
  display: none;
  opacity: 0;
  transition: opacity ${time.m};
`;

const BreadcrumbMarker = styled.a`
  background-color: transparent;
  border-radius: 100px;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-block;
  font-size: 1px;
  height: 34px;
  line-height: 34px;
  position: relative;
  transition: background-color ${time.m}, border-color ${time.m};
  width: 34px;
  &:hover {
    border-color: ${color.flare500};
    background-color: ${color.shadow500};
  }
  .bc-tick {
    background: ${color.flare800};
    box-shadow: 0 0 2px ${color.shadow300};
    display: block;
    height: 10px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
  }
  .bc-title,
  .bc-order {
    height: 1px;
    overflow: hidden;
    visibility: hidden;
    width: 1px;
  }
`;
const Breadcrumb = styled.li`
  text-align: center;
`;
const Breadcrumbs = styled.nav`
  bottom: 0;
  display: none;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  transform: translateY(50%);
  transition: opacity ${time.m};
  & > ol {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  ${Breadcrumb} {
    flex: 0 0 ${({ count }) => 100 / count};
  }
`;

const Element = styled(({ isHovered, theme, ...props }) => <header {...props} />)`
  ${setHeight('h')};
  ${setSpace('pam')};
  align-items: center;
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  transition: background ${time.m}, box-shadow ${time.m};
  z-index: ${({ theme }) => theme.zIndex.appBar};

  ${({ isHovered }) =>
    isHovered
      ? `
    background-color: ${color.mono900};
    box-shadow: 0 1px 5px ${color.shadow300};
    pointer-events: auto;
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
  `
      : ``};
`;

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: true,
    };
    this.onBreadcrumbClick = this.onBreadcrumbClick.bind(this);
    this.toggleSharePopover = this.toggleSharePopover.bind(this);
    this.toggleHoveredState = this.toggleHoveredState.bind(this);
  }

  toggleHoveredState(state) {
    this.setState({ isHovered: state });
  }
  toggleSharePopover(state) {
    this.setState({ isHovered: state });
  }
  onBreadcrumbClick(path) {
    console.log('onBreadcrumbClick', path);
    navigate(path);
  }

  render() {
    const { allowPrev, allowNext, toc, theme } = this.props;
    // const { chapters } = toc;

    // console.group('TopBar.js');
    // console.log(chapters);
    // console.groupEnd();

    return (
      <PopupState variant="popover" popupId="sharePopover">
        {popupState => (
          <>
            <Element
              isHovered={this.state.isHovered || popupState.isOpen}
              onMouseOut={() => this.toggleHoveredState(false)}
              onMouseOver={() => this.toggleHoveredState(true)}
              theme={theme}>
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
                          }}>
                          <KeyboardArrowLeftIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Next page">
                        <IconButton
                          disabled={!allowNext}
                          style={{
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                          }}>
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
                <Breadcrumbs count={toc.length}>
                  {toc.length > 1 ? (
                    <ol>
                      {_.sortBy(toc, [o => o.order]).map((chapter, i) => {
                        return (
                          <Breadcrumb key={chapter.uid}>
                            <Tooltip title={chapter.title}>
                              <BreadcrumbMarker onClick={() => this.onBreadcrumbClick(chapter.path)}>
                                <span className="bc-order">{chapter.id}</span>
                                <span className="bc-title">{chapter.title}</span>
                                <span className="bc-tick"></span>
                              </BreadcrumbMarker>
                            </Tooltip>
                          </Breadcrumb>
                        );
                      })}
                    </ol>
                  ) : null}
                </Breadcrumbs>
              </Main>
              <Side rx>
                <Toolbar>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Tooltip title="Share">
                        <IconButton {...bindTrigger(popupState)}>
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
            <Menu
              {...bindMenu(popupState)}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}>
              <MenuItem onClick={popupState.close}>Facebook</MenuItem>
              <MenuItem onClick={popupState.close}>Twitter</MenuItem>
              <MenuItem onClick={popupState.close}>Email</MenuItem>
            </Menu>
          </>
        )}
      </PopupState>
    );
  }
}

export default withTheme(TopBar);

TopBar.propTypes = {
  allowNext: bool,
  allowPrev: bool,
  isCredits: bool,
  isHome: bool,
  toc: array.isRequired,
};
TopBar.defaultProps = {
  allowPrev: null,
  allowNext: null,
  isCredits: null,
  isHome: null,
};
