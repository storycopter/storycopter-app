import React from "react";
import styled from "styled-components";

import { color } from "@storycopter/styleguide/src/config";
import { setType } from "@storycopter/styleguide/src/mixins";

const Label = styled(({ ...props }) => <label {...props} />)`
  ${setType("x")};
  color: ${color.flare900};
  font-weight: 400;
`;

export default Label;
