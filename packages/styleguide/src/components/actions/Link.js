import React from "react";
import styled from "styled-components";

import { color, font } from "@storycopter/styleguide/src/config";

const Link = styled(({ ...props }) => <a {...props}>{props.children}</a>)`
  color: ${color.flare800};
  cursor: pointer;
  font-family: ${font.sans};
  outline: none;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

export default Link;
