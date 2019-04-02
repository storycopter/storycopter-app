import React from "react";
import styled from "styled-components";

import {
  color,
  font,
  radius,
  time,
  track
} from "@storycopter/styleguide/src/config";
import { setSpace, setType } from "@storycopter/styleguide/src/mixins";

const Button = styled(({ ...props }) => <button type="button" {...props} />)`
  ${setSpace("phl")};
  ${setSpace("pvm")};
  ${setType("s")};
  appearance: none;
  background: ${color.brand500};
  border-color: ${color.brand500};
  border-radius: ${radius.x};
  border-style: solid;
  border-width: 1px;
  color: white;
  cursor: pointer;
  font-family: ${font.sans};
  font-weight: 800;
  letter-spacing: ${track.m};
  outline: none;
  text-transform: uppercase;
  transition: background ${time.m};
  &:hover {
    background-color: ${color.brand600};
  }
`;

export default Button;
