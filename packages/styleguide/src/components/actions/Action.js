import React from "react";
import styled from "styled-components";

import { color, font } from "@storycopter/styleguide/src/config";
import { setSpace, setType } from "@storycopter/styleguide/src/mixins";

const Action = styled(({ ...props }) => <button type="button" {...props} />)`
  ${setSpace("pam")};
  ${setType("m")};
  appearance: none;
  background: none;
  border: 1px solid ${color.mono200};
  cursor: pointer;
  font-family: ${font.sans};
  outline: none;
`;

export default Action;
