import Img from 'gatsby-image';
import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { bool } from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/styles';

import { breakpoint, color, radius, time, track } from '@storycopter/ui/settings';
import { setHeight, setSpace } from '@storycopter/ui/mixins';

import AniLink from '../components/AniLink';

const TileArrow = styled.div`
  position: absolute;
  top: 50%;
  transition: transform ${time.m};
`;
const TileSub = styled(Typography)`
  color: ${color.flare500};
`;
const TileTitle = styled(Typography)``;

const TileLink = styled(AniLink)`
  background-color: ${({ theme }) => theme.palette.common.black};
  color: ${({ theme }) => theme.palette.common.white};
  display: block;
  position: relative;
  text-align: center;
  .gatsby-image-wrapper {
    border-radius: 1px;
    opacity: 0.25;
    overflow: hidden;
    transition: opacity ${time.m};
  }
  &:hover {
    .gatsby-image-wrapper {
      opacity: 0.5;
    }
  }
`;

const TileText = styled.div`
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 50%;
  justify-content: center;
  &:first-child {
    ${setSpace('prh')};
    ${TileArrow} {
      left: 0;
      transform: translate(-50%, -50%);
    }
    &:hover {
      ${TileArrow} {
        transform: translate(-150%, -50%);
      }
    }
  }
  &:last-child {
    ${setSpace('plh')};
    ${TileArrow} {
      right: 0;
      transform: translate(50%, -50%);
    }
    &:hover {
      ${TileArrow} {
        transform: translate(150%, -50%);
      }
    }
  }
`;

const Element = styled(({ isHome, theme, ...props }) => <nav {...props} />)`
  ${setSpace('pak')};
  align-items: stretch;
  background-color: ${color.mono900};
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  width: 100%;
  min-height: 75vh;
`;

const ShortcutsQuery = graphql`
  query ShortcutsQuery {
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
            preview: fluid(maxWidth: 600, maxHeight: 400, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
    }
  }
`;

class Shortcuts extends Component {
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
    const { theme, isHome, isCredits, path } = this.props;
    const { isTransitioning, tooltip } = this.state;

    return (
      <StaticQuery
        query={ShortcutsQuery}
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
          const currentChapter = _.find(toc, o => o.path === path);
          const currentChapterI = _.findIndex(toc, o => o.path === path);
          const isLastChapter = currentChapterI === toc.length - 1;
          const isFirstChapter = currentChapterI === 0;

          const nextChapter = currentChapter ? (isLastChapter ? '/credits' : toc[currentChapterI + 1]) : toc[0];
          const prevChapter = currentChapter ? (isFirstChapter ? '/' : toc[currentChapterI - 1]) : null;

          console.group('Shortcuts.js');
          console.log({ theme });
          console.log({ toc });
          console.log({ prevChapter });
          console.log({ currentChapter });
          console.log({ nextChapter });
          console.groupEnd();

          return (
            <aside>
              <Element theme={theme}>
                <Tile theme={theme} prev>
                  <TileLink
                    onClick={this.onLinkWTransitionClick}
                    to={isHome ? '/credits' : isCredits ? toc[toc.length - 1].path : prevChapter.path}
                    theme={theme}>
                    {prevChapter && prevChapter.cover ? (
                      <Img fluid={prevChapter.cover.childImageSharp.preview} />
                    ) : null}
                    <TileText>
                      <div>
                        <TileArrow>
                          <KeyboardArrowLeftIcon />
                        </TileArrow>
                        <h2>
                          {/* <TileSub component="span" display="block" variant="overline" noWrap>
                            Previous page
                          </TileSub> */}
                          <TileTitle component="span" display="block" variant="h6" noWrap>
                            {prevChapter !== '/' ? prevChapter.title : 'Opening Titles'}
                          </TileTitle>
                        </h2>
                      </div>
                    </TileText>
                  </TileLink>
                </Tile>
                <Tile theme={theme} next>
                  <TileLink
                    onClick={this.onLinkWTransitionClick}
                    to={nextChapter !== '/credits' ? nextChapter.path : '/credits'}
                    theme={theme}>
                    {nextChapter && nextChapter.cover ? (
                      <Img fluid={nextChapter.cover.childImageSharp.preview} />
                    ) : null}
                    <TileText>
                      <div>
                        <TileArrow>
                          <KeyboardArrowRightIcon />
                        </TileArrow>
                        <h2>
                          {/* <TileSub component="span" display="block" variant="overline" noWrap>
                            Next page
                          </TileSub> */}
                          <TileTitle component="span" display="block" variant="h6" noWrap>
                            {nextChapter !== '/credits' ? nextChapter.title : 'Credits'}
                          </TileTitle>
                        </h2>
                      </div>
                    </TileText>
                  </TileLink>
                </Tile>
              </Element>
            </aside>
          );
        }}
      />
    );
  }
}

export default withTheme(Shortcuts);

Shortcuts.propTypes = {
  allowNext: bool,
  allowPrev: bool,
  isCredits: bool,
  isHome: bool,
};
Shortcuts.defaultProps = {
  allowPrev: null,
  allowNext: null,
  isCredits: null,
  isHome: null,
};
