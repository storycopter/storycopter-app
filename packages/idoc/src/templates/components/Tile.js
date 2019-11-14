import React from 'react';
import { withTheme } from '@material-ui/styles';
import styled from 'styled-components';

import { setSpace, setType } from '@storycopter/ui/mixins';

import AniLink from './AniLink';

const TileEl = styled(({ ...props }) => <div {...props} />)`
  background: grey;
  border: none;
  cursor: pointer;
  display: block;
  height: 400px;
  position: relative;
  white-space: normal;
  width: 320px;
  p {
    display: block;
  }
`;

const TileLink = styled(({ theme, ...props }) => <AniLink {...props} />)`
  ${setSpace('pal')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  h2,
  p {
    white-space: normal;
  }
  h2 {
    ${setType('m')};
  }
  p {
    ${setType('s')};
  }
`;

const Tile = props => {
  return (
    <TileEl>
      <TileLink to={props.path}>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
      </TileLink>
    </TileEl>
  );
};

export default withTheme(Tile);
