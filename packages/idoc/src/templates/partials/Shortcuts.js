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

const TileSub = styled(Typography)``;
const TileTitle = styled(({ theme, ...props }) => <Typography {...props} />)`
  ${setType('h')};
  color: ${({ theme }) => theme.palette.primary.main};
  width: 100%;
`;
const TileText = styled(Typography)``;
const TileButton = styled(Button)``;
const TileCopy = styled.div`
  color: ${color.mono500};
  display: flex;
  flex-direction: column;
  flex: 0 0 50%;
  justify-content: center;
  & > div {
    ${setSpace('pal')};
    position: relative;
    width: 50vw;
  }
`;
const TileImagery = styled.div`
  background: ${color.mono900};
  display: block;
  flex: 0 0 50%;
  position: relative;
  width: 100%;
  .gatsby-image-wrapper {
    opacity: 0.5;
  }
  &:hover {
    .gatsby-image-wrapper {
      opacity: 0.75;
    }
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
`;
const Element = styled(({ theme, ...props }) => <nav {...props} />)`
  ${setSpace('pvh')}
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100vh;
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
    console.log({ prevPage });
    console.log({ nextPage });
    console.groupEnd();

    return (
      <aside>
        <Element theme={theme}>
          <TileRoot>
            <Tile next onClick={this.onLinkWTransitionClick} theme={theme} to={nextPage.path}>
              <TileContent>
                {nextPage && nextPage.cover ? (
                  <TileImagery>
                    <Img fluid={nextPage.cover.childImageSharp.squarishFluidThumb} className="show-mobile" />
                    <Img fluid={nextPage.cover.childImageSharp.horizontal} className="hide-mobile" />
                  </TileImagery>
                ) : null}
                <TileCopy>
                  <div>
                    <TileSub component="span" display="block" variant="overline" noWrap gutterBottom>
                      Next <ArrowForwardIcon fontSize="inherit" />
                    </TileSub>
                    <TileTitle component="h2" display="block" gutterBottom noWrap theme={theme} variant="h4">
                      {nextPage.title}
                    </TileTitle>
                    <TileText component="p" display="block" variant="body1" noWrap gutterBottom>
                      {nextPage.text}
                    </TileText>
                  </div>
                </TileCopy>
              </TileContent>
            </Tile>
          </TileRoot>
          <TileRoot>
            <Tile onClick={this.onLinkWTransitionClick} prev theme={theme} to={prevPage.path}>
              <TileContent>
                {prevPage && prevPage.cover ? (
                  <TileImagery>
                    <Img fluid={prevPage.cover.childImageSharp.squarishFluidThumb} className="show-mobile" />
                    <Img fluid={prevPage.cover.childImageSharp.horizontal} className="hide-mobile" />
                  </TileImagery>
                ) : null}
                <TileCopy>
                  <div>
                    <TileSub component="span" display="block" variant="overline" noWrap gutterBottom>
                      <ArrowBackIcon fontSize="inherit" /> Previously
                    </TileSub>
                    <TileTitle component="h2" display="block" gutterBottom noWrap theme={theme} variant="h6">
                      {prevPage.title}
                    </TileTitle>
                    <TileText component="p" display="block" variant="body1" noWrap gutterBottom>
                      {prevPage.text}
                    </TileText>
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
