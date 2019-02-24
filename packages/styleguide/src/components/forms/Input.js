import React from "react";
import styled from "styled-components";

import { setType, setSpace } from "@storycopter/styleguide/src/mixins";
import { color, font } from "@storycopter/styleguide/src/config";

const Input = styled(({ ...props }) => <input {...props} />)`
  ${setSpace("pvs")};
  ${setType("m")};
  appearance: none;
  background: none;
  border-color: ${color.flare300};
  border-radius: none;
  border-width: 0 0 1px 0;
  box-shadow: none;
  color: white;
  display: block;
  font-family: ${font.sans};
  font-weight: 300;
  outline: none;
  width: 100%;
  &::placeholder {
    color: ${color.mono300};
  }
  &:focus {
    border-color: ${color.flare900};
    box-shadow: inset 0 -1px 0 0 ${color.flare900};
  }
`;

export default Input;
