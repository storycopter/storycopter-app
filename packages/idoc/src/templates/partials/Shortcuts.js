import Img from 'gatsby-image';
import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { bool } from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';

import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { withTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import { color, radius, time } from '@storycopter/ui/settings';
import { setSpace, setType } from '@storycopter/ui/mixins';

import AniLink from '../components/AniLink';

const TileSub = styled(Typography)`
  color: ${color.flare500};
`;
const TileTitle = styled(Typography)``;

const TileText = styled(Typography)``;

const TileButton = styled(Button)`
  ${setSpace('mtl')};
  ${setSpace('pan')};
  color: ${color.mono100};
`;

const TileLink = styled(AniLink)`
  background: ${color.mono900};
  border-radius: ${radius.x};
  color: ${({ theme }) => theme.palette.common.white};
  display: block;
  max-width: 1000px;
  overflow: hidden;
  position: relative;
  .gatsby-image-wrapper {
    opacity: 0.25;
    transition: opacity ${time.m};
  }
  &:hover {
    .gatsby-image-wrapper {
      opacity: 0.5;
    }
  }
`;

const TileContent = styled.div`
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
  &:first-child {
    ${setSpace('mbk')};
    flex: 0 0 ${(100 / 3) * 2}%;
    justify-content: flex-start;
    ${TileContent} {
      ${setSpace('pak')};
    }
    ${TileTitle} {
      ${setType('h')};
    }
    ${TileButton} {
      ${setType('s')};
    }
  }
  &:last-child {
    ${setSpace('prh')};
    flex: 0 0 ${100 / 3}%;
    justify-content: flex-end;
    align-self: flex-end;
    ${TileContent} {
      ${setSpace('pah')};
    }
    ${TileTitle} {
      ${setType('l')};
    }
    ${TileButton} {
      ${setType('x')};
    }
  }
`;

const Element = styled(({ isHome, theme, ...props }) => <nav {...props} />)`
  ${setSpace('pak')};
  align-items: stretch;
  background-color: ${({ theme }) => theme.palette.common.white};
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  position: relative;
  width: 100%;
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
            horizontal: fluid(maxWidth: 600, maxHeight: 450, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            vertical: fluid(maxWidth: 400, maxHeight: 500, quality: 95, cropFocus: CENTER, fit: COVER) {
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
                <Tile theme={theme} next>
                  <TileLink
                    onClick={this.onLinkWTransitionClick}
                    to={nextChapter !== '/credits' ? nextChapter.path : nextChapter}
                    theme={theme}>
                    {nextChapter && nextChapter.cover ? (
                      <Img fluid={nextChapter.cover.childImageSharp.horizontal} />
                    ) : null}
                    <TileContent>
                      <div>
                        <TileSub component="span" display="block" variant="overline" noWrap gutterBottom>
                          Next
                        </TileSub>
                        <h2>
                          <TileTitle component="span" display="block" variant="h4" noWrap gutterBottom>
                            {nextChapter !== '/credits' ? nextChapter.title : 'Credits'}
                          </TileTitle>
                        </h2>
                        <TileText component="p" display="block" variant="p1" noWrap gutterBottom>
                          {nextChapter !== '/credits' ? nextChapter.text : null}
                        </TileText>

                        <TileButton endIcon={<ArrowRightAltIcon />}>Continue</TileButton>
                      </div>
                    </TileContent>
                  </TileLink>
                </Tile>
                <Tile theme={theme} prev>
                  <TileLink
                    onClick={this.onLinkWTransitionClick}
                    to={prevChapter && prevChapter.path ? prevChapter.path : '/'}
                    theme={theme}>
                    {prevChapter && prevChapter.cover ? (
                      <Img fluid={prevChapter.cover.childImageSharp.vertical} />
                    ) : null}
                    <TileContent>
                      <div>
                        <TileSub component="span" display="block" variant="overline" noWrap gutterBottom>
                          Previously
                        </TileSub>
                        <h2>
                          <TileTitle component="span" display="block" variant="h6" noWrap gutterBottom>
                            {prevChapter && prevChapter.title ? prevChapter.title : 'Opening Titles'}
                          </TileTitle>
                        </h2>
                        <TileButton>Return</TileButton>
                      </div>
                    </TileContent>
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
