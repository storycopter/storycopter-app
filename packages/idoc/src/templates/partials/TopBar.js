import Img from 'gatsby-image';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { bool } from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';

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
    ${setSpace('phs')};
    ${setSpace('pvx')};
    background-color: ${color.shadow500};
    border-radius: 1px;
    color: ${color.white};
    letter-spacing: ${track.l};
    pointer-events: auto;
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
  &:hover {
    background-color: ${color.flare100};
    box-shadow: 0 0 5px ${color.shadow300};
  }
  .breadcrumb-tick {
    background: ${color.flare800};
    border-radius: 1px;
    box-shadow: 0 0 2px ${color.shadow300};
    display: block;
    height: 10px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3px;
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
  bottom: 0;
  display: flex;
  display: none;
  flex-direction: row;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  transform: translateY(50%);
  transition: opacity ${time.m};
  &:before {
    background: ${({ theme }) => theme.palette.background.accent};
    content: ' ';
    display: block;
    height: 2px;
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
  }
  ${Breadcrumb} {
    flex: 0 0 ${({ count }) => 100 / count}%;
  }
`;

const Element = styled(({ isHovered, isHome, theme, ...props }) => <header {...props} />)`
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
  z-index: ${({ theme }) => theme.zIndex.appBar};
  ${({ isHovered }) =>
    isHovered
      ? `
    background-color: ${color.mono900};
    box-shadow: 0 0 0 10px ${color.shadow400};
    pointer-events: auto;
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

const TopBarQuery = graphql`
  query TopBarQuery {
    allChaptersJson(sort: { fields: meta___order }) {
      edges {
        node {
          meta {
            cover {
              name
            }
            order
            path
            text
            title
            uid
          }
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "chapters" }, name: { eq: "cover" } }) {
      edges {
        node {
          childImageSharp {
            thumb: fixed(width: 40, height: 40, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed
            }
            preview: fixed(width: 160, height: 80, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed
            }
          }
          relativePath
        }
      }
    }
  }
`;

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  tooltip: null
      // isTransitioning: null
    };
    this.onLinkWTransitionClick = this.onLinkWTransitionClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.tooltip && prevState.path !== this.state.path) {
      this.setState({ isTransitioning: false });
    }
  }

  onLinkWTransitionClick() {
    this.setState({ isTransitioning: true });
  }

  render() {
    const { theme, isHome, isCredits } = this.props;

    return (
      <StaticQuery
        query={TopBarQuery}
        render={data => {
          // fetch cover images by name
          const covers = data.allFile.edges.map(el => el.node);
          const toc = data.allChaptersJson.edges
            .map(el => el.node.meta)
            .map(el => {
              return {
                ...el,
                cover: {
                  ...el.cover,
                  ..._.find(covers, o => o.relativePath.startsWith(el.uid)),
                },
              };
            });

          // fetch active chapter
          const currentChapter = _.find(toc, o => o.path === this.props.path);
          const currentChapterI = _.findIndex(toc, o => o.path === this.props.path);
          const isLastChapter = currentChapterI === toc.length - 1;
          const isFirstChapter = currentChapterI === 0;
          const nextPath = currentChapter ? (isLastChapter ? '/credits' : toc[currentChapterI + 1].path) : toc[0].path;
          const prevPath = currentChapter ? (isFirstChapter ? '/' : toc[currentChapterI - 1].path) : '/';

          // console.group('TopBar.js');
          // console.log(this.state.tooltip);
          // console.groupEnd();

          return (
            <PopupState variant="popover" popupId="sharePopover">
              {popupState => (
                <>
                  <Element
                    isHovered={this.state.isHovered || popupState.isOpen}
                    onMouseOut={() => this.setState({ isHovered: false })}
                    onMouseOver={() => this.setState({ isHovered: true })}
                    theme={theme}>
                    <Side lx>
                      <Toolbar>
                        <Grid container spacing={1}>
                          <Grid item>
                            <Tooltip
                              enterDelay={500}
                              onClose={() => this.setState({ tooltip: null })}
                              onOpen={() => this.setState({ tooltip: 'toc' })}
                              open={!this.state.isTransitioning && this.state.tooltip === 'toc'}
                              title="Table of contents">
                              <div style={{ display: 'inline-block' }}>
                                <IconButton>
                                  <MenuIcon />
                                </IconButton>
                              </div>
                            </Tooltip>
                          </Grid>
                          <Grid item>
                            <Tooltip
                              enterDelay={500}
                              onClose={() => this.setState({ tooltip: null })}
                              onOpen={() => this.setState({ tooltip: 'prev' })}
                              open={!this.state.isTransitioning && this.state.tooltip === 'prev'}
                              title="Previous chapter">
                              <div style={{ display: 'inline-block' }}>
                                <AniLink
                                  onClick={this.onLinkWTransitionClick}
                                  to={isHome ? '/credits' : isCredits ? toc[toc.length - 1].path : prevPath}>
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
                            <Tooltip
                              enterDelay={500}
                              onClose={() => this.setState({ tooltip: null })}
                              onOpen={() => this.setState({ tooltip: 'next' })}
                              open={!this.state.isTransitioning && this.state.tooltip === 'next'}
                              title="Next chapter">
                              <div style={{ display: 'inline-block' }}>
                                <AniLink onClick={this.onLinkWTransitionClick} to={isCredits ? '/' : nextPath}>
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
                          </Grid>
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
                        {currentChapter || isCredits ? (
                          <>
                            <Typography
                              className="summary-title"
                              component="h2"
                              display="block"
                              noWrap
                              variant="caption">
                              Hiking Cima dell’Uomo
                            </Typography>
                            <Typography
                              className="summary-text"
                              component="p"
                              display="block"
                              noWrap
                              variant="subtitle2">
                              {isCredits ? 'Credits' : currentChapter.title}
                            </Typography>
                          </>
                        ) : null}
                      </Summary>
                      <Breadcrumbs
                        count={toc.length}
                        current={currentChapter ? currentChapterI + 1 : isCredits ? toc.length + 1 : null}
                        theme={theme}>
                        {toc.length > 1 ? (
                          <ol>
                            {_.sortBy(toc, [o => o.order]).map((chapter, i) => {
                              const camelId = _.camelCase(`str${chapter.uid}`);
                              const breadcrumb = (
                                <div style={{ display: 'inline-block' }}>
                                  <BreadcrumbLink to={chapter.path} onClick={this.onLinkWTransitionClick}>
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
                                    open={!this.state.isTransitioning && this.state.tooltip === camelId}
                                    title={
                                      <Preview>
                                        <Img fixed={chapter.cover.childImageSharp.preview} className="preview-thumb" />
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
                              open={!this.state.isTransitioning && this.state.tooltip === 'share'}
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
                              open={!this.state.isTransitioning && this.state.tooltip === 'cta'}
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
                </>
              )}
            </PopupState>
          );
        }}
      />
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
