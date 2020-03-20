import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/styles';

import { Action } from '@storycopter/ui/src/components';
import { color } from '@storycopter/ui/src/settings';
import { setSpace, setType } from '@storycopter/ui/src/mixins';

import AniLink from './AniLink';

const TileEl = styled(({ ...props }) => <div {...props} />)`
  border: none;
  cursor: pointer;
  display: block;
  height: 400px;
  overflow: hidden;
  position: relative;
  white-space: normal;
  max-width: 400px;
  width: 100%;
`;

const TileLink = styled(({ theme, ...props }) => <AniLink {...props} />)`
  display: block;
`;

const TileImage = styled(({ theme, ...props }) => <div {...props} />)``;
const TileContent = styled(({ theme, ...props }) => <div {...props} />)`
  ${setSpace('pal')};
  background: ${color.shadow[500]};
  bottom: 0;
  color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const TileHead = styled.div`
  h2,
  p {
    white-space: normal;
  }
  h2 {
    ${setType('l')};
    ${setSpace('mbm')};
  }
  p {
    ${setType('s')};
  }
`;
const TileFoot = styled.div``;

const Tile = props => {
  const { isActive } = props;
  return (
    <TileEl>
      <TileImage>
        <Img fluid={props.cover.childImageSharp.tileSize} />
      </TileImage>
      <TileContent theme={props.theme}>
        <TileHead>
          <h2>{props.title}</h2>
          {isActive ? <p>{props.text}</p> : null}
        </TileHead>
        <TileFoot>{isActive ? <Action>Continue</Action> : null}</TileFoot>
      </TileContent>
    </TileEl>
  );
};

export default withTheme(Tile);
