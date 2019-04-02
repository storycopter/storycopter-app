import React from "react";
import styled from "styled-components";

import { color, font, radius, track } from "@storycopter/styleguide/src/config";
import { setSpace, setType } from "@storycopter/styleguide/src/mixins";

const Button = styled(({ ...props }) => <button type="button" {...props} />)`
  ${setSpace("phl")};
  ${setSpace("pvs")};
  ${setType("l")};
  appearance: none;
  background: ${color.brand};
  border-radius: 0;
  border-color: ${color.brand};
  border-style: solid;
  border-width: 1px;
  color: white;
  cursor: pointer;
  font-family: ${font.serif};
  font-weight: 800;
  outline: none;
`;

export default Button;
