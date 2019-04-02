import React from "react";
import styled from "styled-components";

import { color, font } from "@storycopter/styleguide/src/config";

const Link = styled(({ ...props }) => <a {...props}>{props.children}</a>)`
  color: ${color.brand};
  cursor: pointer;
  font-family: ${font.sans};
  outline: none;
  text-decoration: none;
`;

export default Link;
