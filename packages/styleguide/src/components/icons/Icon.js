import React from "react";
import styled from "styled-components";

import "./iconfont/style.css";
import { Link } from "@storycopter/styleguide";
import { setSpace } from "@storycopter/styleguide/src/mixins";

const Icon = styled(({ ...props }) => (
  <i className={`${props.className} icon-${props.name}`} />
))`
  &:before {
    position: relative;
    top: 0.1em;
  }
  ${Link} & {
    ${setSpace("mrx")};
  }
`;

export default Icon;
