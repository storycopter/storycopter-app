/* eslint no-unused-vars: 0 */
import { array, object, oneOfType, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import { breakpoint, color, font, track } from "ui/settings";
import { iawriter } from "assets/fonts";
import { setSpace, setType } from "ui/mixins";

const El = styled.div``;

const StyledEl = styled(({ block, ...props }) => <El {...props} />)`
  ${setSpace("pal")};
  ${setSpace("pth")};
  background: white;
  position: relative;
  ${breakpoint.tabletUp} {
    ${setSpace("pah")};
  }
  .TileCapsTitle {
    ${setSpace("mvm")};
    ${setType("x")};
    font-family: ${font.mono};
    letter-spacing: ${track.m};
    text-transform: uppercase;
  }
  .TileTitle {
    ${setType("l")};
    color: ${color.mono900};
    font-family: ${font.mono};
    font-weight: bold;
  }
  .TileBadgeTitle {
    ${setSpace("man")};
    ${setSpace("phm")};
    ${setSpace("pvx")};
    ${setType("x")};
    background: ${color.mono900};
    color: ${color.mono100};
    font-family: ${font.mono};
    left: 50%;
    letter-spacing: ${track.m};
    position: absolute;
    text-transform: uppercase;
    top: 0;
    transform: translateY(-50%) translateX(-50%);
    white-space: nowrap;
  }
  .TileText {
    ${setSpace("mvm")};
    ${setType("x")};
    color: ${color.mono600};
  }
`;

const Tile = props => {
  const { children } = props;
  return <StyledEl {...props}>{children}</StyledEl>;
};

Tile.propTypes = {
  children: oneOfType([array, object, string]).isRequired
};

Tile.defaultProps = {};

export default Tile;
