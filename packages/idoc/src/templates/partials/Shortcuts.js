import Img from 'gatsby-image';
import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { bool } from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/styles';

import { breakpoint, color, radius, time } from '@storycopter/ui/settings';
import { setSpace, setType } from '@storycopter/ui/mixins';

import AniLink from '../components/AniLink';

const TileOverline = styled(Typography)`
  ${setType('x')}
  color: ${color.mono300};
`;
const TileTitle = styled(({ theme, ...props }) => <Typography {...props} />)`
  ${setSpace('mts')};
  ${setType('h')};
  color: ${({ theme }) => theme.palette.primary.main};
  position: relative;
  width: 100%;
`;
const TileText = styled.div`
  ${setSpace('mtm')};
  ${setType('m')}
`;
const TileIcon = styled(({ theme, ...props }) => <div {...props} />)`
  ${setSpace('mtm')};
  ${setType('l')}
  color: ${color.mono300};
`;

const TileCopy = styled.div`
  color: ${color.mono500};
  display: flex;
  flex-direction: column;
  flex: 0 0 50%;
  justify-content: center;
  text-align: ${({ prev }) => (prev ? `right` : `left`)};
  width: 50vw;
  & > div {
    ${setSpace('pal')};
    position: relative;
  }
`;
const TileImagery = styled.div`
  background: ${color.mono900};
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 50%;
  position: relative;
  width: 100%;
  .gatsby-image-wrapper {
    opacity: 0.5;
  }
`;
const TileContent = styled.div`
  display: flex;
  flex: 0 0 50%;
`;

const Tile = styled(({ prev, next, theme, ...props }) => <AniLink {...props} />)`
  border-radius: ${radius.x};
  display: block;
  position: relative;
`;
const TileRoot = styled.div`
  flex: 0 0 50%;
  &:first-child {
    ${TileContent} {
      flex-direction: row;
    }
  }
  &:last-child {
    ${TileContent} {
      flex-direction: row-reverse;
    }
  }
  &:hover {
    .gatsby-image-wrapper {
      opacity: 0.75;
    }
  }
`;
const Element = styled(({ theme, ...props }) => <nav {...props} />)`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-width: 1600px;
  min-height: 100vh;

  ${breakpoint.phone} {
    justify-content: space-around;
  }
  ${breakpoint.tabletPlus} {
    justify-content: center;
  }
  ${breakpoint.desktopPlus} {
    ${setSpace('pak')};
    ${TileRoot} {
      &:first-child {
        ${TileContent} {
          flex-direction: row-reverse;
        }
        ${TileImagery} {
          flex: 0 0 ${(100 / 3) * 2}%;
        }
        ${TileCopy} {
          flex: 0 0 ${100 / 3}%;
        }
      }
      &:last-child {
        transform: translateY(-7%);
        ${TileContent} {
          ${setSpace('phh')};
          flex-direction: row;
        }
        ${TileCopy} {
          text-align: left;
          flex: 0 0 ${(100 / 5) * 3}%;
        }
        ${TileTitle} {
          ${setType('l')};
        }
        ${TileImagery} {
          flex: 0 0 ${(100 / 5) * 2}%;
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
    const { theme } = this.props;
    const { prevPage, nextPage } = this.props.toc;
    const { isTransitioning, tooltip } = this.state;

    console.group('Shortcuts.js');
    console.log({ theme });
    console.groupEnd();

    return (
      <aside>
        <Element theme={theme}>
          <TileRoot>
            <Tile next onClick={this.onLinkWTransitionClick} theme={theme} to={nextPage.path}>
              <TileContent>
                {nextPage && nextPage.cover ? (
                  <TileImagery>
                    <Img fluid={nextPage.cover.childImageSharp.verticalFluidThumb} className="show-mobile" />
                    <Img fluid={nextPage.cover.childImageSharp.horizontalFluidThumb} className="hide-mobile" />
                  </TileImagery>
                ) : null}
                <TileCopy next>
                  <div>
                    <TileOverline component="span" display="block" variant="overline" noWrap gutterBottom>
                      Next
                    </TileOverline>
                    <TileTitle component="h2" display="block" gutterBottom theme={theme} variant="h4">
                      {nextPage.title}
                    </TileTitle>
                    <TileIcon theme={theme}>
                      <ArrowForwardIcon fontSize="inherit" />
                    </TileIcon>
                  </div>
                </TileCopy>
              </TileContent>
            </Tile>
          </TileRoot>
          <TileRoot>
            <Tile prev onClick={this.onLinkWTransitionClick} theme={theme} to={prevPage.path}>
              <TileContent>
                {prevPage && prevPage.cover ? (
                  <TileImagery>
                    <Img fluid={prevPage.cover.childImageSharp.verticalFluidThumb} className="show-mobile" />
                    <Img fluid={prevPage.cover.childImageSharp.horizontalFluidThumb} className="hide-mobile" />
                  </TileImagery>
                ) : null}
                <TileCopy prev>
                  <div>
                    <TileOverline component="span" display="block" variant="overline" noWrap gutterBottom>
                      Previously
                    </TileOverline>
                    <TileTitle component="h2" display="block" gutterBottom theme={theme} variant="h4">
                      {prevPage.title}
                    </TileTitle>
                    <TileIcon theme={theme}>
                      <ArrowBackIcon fontSize="inherit" />
                    </TileIcon>
                  </div>
                </TileCopy>
              </TileContent>
            </Tile>
          </TileRoot>
        </Element>
      </aside>
    );
  }
}

export default withTheme(Shortcuts);

Shortcuts.propTypes = {};
Shortcuts.defaultProps = {};
