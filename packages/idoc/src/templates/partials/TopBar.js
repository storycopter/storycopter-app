import Img from 'gatsby-image';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { bool } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/styles';

import { PointerIcon, ShareIcon } from '@storycopter/ui/elements';
import { breakpoint, color, time, track } from '@storycopter/ui/settings';
import { setHeight, setSpace } from '@storycopter/ui/mixins';

import AniLink from '../components/AniLink';

const Side = styled(({ lx, rx, ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: row;
  flex: 0 0 143px;
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
const Toolbar = styled.div``;
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
    ${setSpace('phs')};
    ${setSpace('pvx')};
    background-color: ${color.shadow300};
    border-radius: 1px;
    color: ${color.white};
    letter-spacing: ${track.l};
    position: relative;
    text-transform: uppercase;
  }
`;
const Summary = styled.div`
  display: none;
  opacity: 0;
  transition: opacity ${time.m};
  text-align: center;
  .summary-title {
    letter-spacing: ${track.l};
    position: relative;
    text-transform: uppercase;
    top: -2px;
    color: ${color.mono400};
  }
  .summary-text {
    position: relative;
    top: -2px;
  }
`;
const Preview = styled.div`
  width: 160px;
  .preview-thumb {
    ${setSpace('mtx')};
  }
  .preview-title {
  }
  .preview-text {
    ${setSpace('mbx')};
  }
`;

const BreadcrumbLink = styled(AniLink)`
  background-color: transparent;
  border-radius: 100px;
  cursor: pointer;
  display: inline-block;
  font-size: 1px;
  height: 34px;
  line-height: 34px;
  position: relative;
  transition: background-color ${time.m}, border-color ${time.m}, box-shadow ${time.m};
  width: 34px;
  .breadcrumb-tick {
    background: ${color.mono100};
    border-radius: 1px;
    box-shadow: 0 0 2px ${color.shadow300};
    display: block;
    height: 8px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
  }
  .breadcrumb-title,
  .breadcrumb-order {
    height: 1px;
    overflow: hidden;
    visibility: hidden;
    width: 1px;
  }
`;
const Breadcrumb = styled.li`
  position: relative;
  text-align: center;
  z-index: 1;
`;
const Breadcrumbs = styled.nav`
  ${({ isHovered }) =>
    isHovered
      ? `
    bottom: 0;
  `
      : `
  top: 1px;
  `}
  display: flex;
  flex-direction: row;
  left: 0;
  position: ${({ isHovered }) => (isHovered ? 'absolute' : 'fixed')};
  right: 0;
  transform: ${({ isHovered }) => (isHovered ? 'translateY(50%)' : 'translateY(-50%)')};
  transition: opacity ${time.m};
  width: 100%;
  &:before {
    background: ${color.shadow300};
    content: ' ';
    display: block;
    height: 16px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
  &:after {
    background: ${({ theme }) => theme.palette.background.accent};
    content: ' ';
    display: ${({ count }) => (count > 1 ? 'block' : 'none')};
    height: 3px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: ${({ count, current }) => (100 / count) * current - 100 / count / 2}%;
  }
  & > ol {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  ${Breadcrumb} {
    flex: 0 0 ${({ count }) => 100 / count}%;
  }
`;

const Element = styled(({ isHovered, theme, ...props }) => <header {...props} />)`
  ${setHeight('h')};
  ${setSpace('pam')};
  align-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.appBar};
  ${({ isHovered }) =>
    isHovered
      ? `
    background-color: ${color.mono900};
    ${Breadcrumbs} {
      display: block;
      opacity: 1;
    }
    ${Summary} {
      display: block;
      opacity: 1;
    }
  `
      : ``};
`;

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLinkWTransitionClick = this.onLinkWTransitionClick.bind(this);
    // this.elRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.tooltip && prevProps.path !== this.props.path) {
      this.setState({ isTransitioning: null });
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onLinkWTransitionClick() {
    this.setState({ isTransitioning: true });
  }

  onMouseMove(e) {
    if (!e) return null;
    const coords = { x: e.pageX, y: e.pageY };
    // console.log(e);
    // console.log(coords);
    return null;
  }

  render() {
    const { isCredits, isEssential, isHome, theme, toc } = this.props;
    const { isHovered, isTransitioning, tooltip } = this.state;
    const { chapters, currentPage, currentPageI, nextPage, prevPage } = toc;

    // console.group('TopBar.js');
    // console.log({ toc });
    // console.groupEnd();

    return (
      <PopupState variant="popover" popupId="sharePopover">
        {popupState => (
          <div ref={this.elRef}>
            <Element
              isHovered={isHovered || popupState.isOpen}
              onMouseOut={() => this.setState({ isHovered: false })}
              onMouseOver={() => this.setState({ isHovered: true })}
              theme={theme}>
              <Side lx>
                <Toolbar>
                  <Grid container spacing={1}>
                    {chapters.length > 1 && !isEssential ? (
                      <Grid item>
                        <Tooltip
                          enterDelay={500}
                          onClose={() => this.setState({ tooltip: null })}
                          onOpen={() => this.setState({ tooltip: 'chapters' })}
                          open={!isTransitioning && tooltip === 'chapters'}
                          title="Table of contents">
                          <div style={{ display: 'inline-block' }}>
                            <AniLink onClick={this.onLinkWTransitionClick} to="/contents">
                              <IconButton>
                                <MenuIcon />
                              </IconButton>
                            </AniLink>
                          </div>
                        </Tooltip>
                      </Grid>
                    ) : (
                      'Brandmark'
                    )}
                    {!isEssential ? (
                      <Grid item>
                        {prevPage ? (
                          <Tooltip
                            enterDelay={500}
                            onClose={() => this.setState({ tooltip: null })}
                            onOpen={() => this.setState({ tooltip: 'prev' })}
                            open={!isTransitioning && tooltip === 'prev'}
                            title="Previous page">
                            <div style={{ display: 'inline-block' }}>
                              <AniLink onClick={this.onLinkWTransitionClick} to={prevPage.path}>
                                <IconButton
                                  style={{
                                    borderBottomRightRadius: 0,
                                    borderTopRightRadius: 0,
                                  }}>
                                  <KeyboardArrowLeftIcon />
                                </IconButton>
                              </AniLink>
                            </div>
                          </Tooltip>
                        ) : null}
                        {nextPage ? (
                          <Tooltip
                            enterDelay={500}
                            onClose={() => this.setState({ tooltip: null })}
                            onOpen={() => this.setState({ tooltip: 'next' })}
                            open={!isTransitioning && tooltip === 'next'}
                            title="Next page">
                            <div style={{ display: 'inline-block' }}>
                              <AniLink onClick={this.onLinkWTransitionClick} to={nextPage.path}>
                                <IconButton
                                  style={{
                                    borderBottomLeftRadius: 0,
                                    borderTopLeftRadius: 0,
                                  }}>
                                  <KeyboardArrowRightIcon />
                                </IconButton>
                              </AniLink>
                            </div>
                          </Tooltip>
                        ) : null}
                      </Grid>
                    ) : null}
                  </Grid>
                </Toolbar>
              </Side>
              <Main>
                {isHome ? (
                  <Title theme={theme}>
                    <Typography component="span" noWrap variant="caption">
                      Hiking Cima dell’Uomo
                    </Typography>
                  </Title>
                ) : null}
                <Summary>
                  {currentPage || isCredits ? (
                    <>
                      <AniLink to="/">
                        <Typography className="summary-title" component="h2" display="block" noWrap variant="caption">
                          Hiking Cima dell’Uomo
                        </Typography>
                      </AniLink>
                      <Typography className="summary-text" component="p" display="block" noWrap variant="subtitle2">
                        {isCredits ? 'Credits' : currentPage.title}
                      </Typography>
                    </>
                  ) : null}
                </Summary>
                <Breadcrumbs
                  count={chapters.length}
                  current={currentPageI}
                  isHovered={isHovered || popupState.isOpen}
                  theme={theme}>
                  {chapters.length > 1 ? (
                    <ol>
                      {_.sortBy(chapters, [o => o.order]).map((chapter, i) => {
                        const camelId = _.camelCase(`str${chapter.uid}`);
                        const breadcrumb = (
                          <div style={{ display: 'inline-block' }}>
                            <BreadcrumbLink onClick={this.onLinkWTransitionClick} theme={theme} to={chapter.path}>
                              <span className="breadcrumb-order">{chapter.id}</span>
                              <span className="breadcrumb-title">{chapter.title}</span>
                              <span className="breadcrumb-tick"></span>
                            </BreadcrumbLink>
                          </div>
                        );
                        return (
                          <Breadcrumb key={chapter.uid}>
                            <Tooltip
                              onClose={() => this.setState({ tooltip: null })}
                              onOpen={() => this.setState({ tooltip: camelId })}
                              open={!isTransitioning && tooltip === camelId}
                              title={
                                <Preview>
                                  <Img
                                    fixed={chapter.cover.childImageSharp.smallFixedThumb}
                                    className="preview-thumb"
                                  />
                                  <Typography
                                    className="preview-title"
                                    component="h2"
                                    display="block"
                                    noWrap
                                    variant="subtitle1">
                                    {chapter.title}
                                  </Typography>
                                  <Typography
                                    className="preview-text"
                                    component="p"
                                    display="block"
                                    noWrap
                                    variant="caption">
                                    {chapter.text}
                                  </Typography>
                                </Preview>
                              }>
                              {breadcrumb}
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
                      <Tooltip
                        enterDelay={500}
                        onClose={() => this.setState({ tooltip: null })}
                        onOpen={() => this.setState({ tooltip: 'share' })}
                        open={!isTransitioning && tooltip === 'share'}
                        title="Share">
                        <div style={{ display: 'inline-block' }}>
                          <IconButton {...bindTrigger(popupState)}>
                            <ShareIcon />
                          </IconButton>
                        </div>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip
                        enterDelay={500}
                        onClose={() => this.setState({ tooltip: null })}
                        onOpen={() => this.setState({ tooltip: 'cta' })}
                        open={!isTransitioning && tooltip === 'cta'}
                        title="Take action">
                        <div style={{ display: 'inline-block' }}>
                          <IconButton>
                            <PointerIcon />
                          </IconButton>
                        </div>
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
          </div>
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
};
TopBar.defaultProps = {
  allowPrev: null,
  allowNext: null,
  isCredits: null,
  isHome: null,
};
