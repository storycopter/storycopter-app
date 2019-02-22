import React from "react";
import styled from "styled-components";

import { setSpace } from "@storycopter/styleguide/src/mixins";
import Label from "./Label";

const Checkbox = styled(({ ...props }) => <input type="checkbox" {...props} />)`
  ${Label} > & {
  }
  ${Label} > & + span {
    ${setSpace("mls")};
  }
`;

export default Checkbox;
