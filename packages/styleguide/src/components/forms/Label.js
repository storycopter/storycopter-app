import React from "react";
import styled from "styled-components";

import { color, font } from "@storycopter/styleguide/src/config";
import { setType } from "@storycopter/styleguide/src/mixins";

const Label = styled(({ ...props }) => <label {...props} />)`
  ${setType("s")};
  color: ${color.mono700};
  font-family: ${font.serif};
  font-weight: 700;
  letter-spacing: normal;
`;

export default Label;
