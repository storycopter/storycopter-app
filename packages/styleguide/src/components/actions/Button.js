import React from "react";
import styled from "styled-components";

import { color, font, radius, track } from "@storycopter/styleguide/src/config";
import { setSpace, setType } from "@storycopter/styleguide/src/mixins";

const Button = styled(({ ...props }) => <button type="button" {...props} />)`
  ${setSpace("phl")};
  ${setSpace("pvs")};
  ${setType("x")};
  appearance: none;
  background: transparent;
  border: 2px solid ${color.flare900};
  border-radius: ${radius.a};
  color: ${color.flare900};
  cursor: pointer;
  font-family: ${font.sans};
  font-weight: 700;
  letter-spacing: ${track.s};
  outline: none;
  text-transform: uppercase;
`;

export default Button;
