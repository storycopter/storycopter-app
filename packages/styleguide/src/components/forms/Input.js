import React from "react";
import styled from "styled-components";

import { setType, setSpace } from "@storycopter/styleguide/src/mixins";
import { color, font } from "@storycopter/styleguide/src/config";

const Input = styled(({ ...props }) => <input {...props} />)`
  ${setSpace("phn")};
  ${setSpace("pvs")};
  ${setType("s")};
  appearance: none;
  background: white;
  border-color: ${color.brand500};
  border-radius: 0;
  border-width: 0 0 1px 0;
  box-shadow: none;
  color: ${color.mono700};
  display: block;
  font-family: ${font.sans};
  font-weight: 400;
  outline: none;
  width: 100%;
  &::placeholder {
    color: ${color.mono300};
  }
  &:focus {
    border-color: ${color.brand600};
    box-shadow: inset 0 -1px 0 0 ${color.brand600};
  }
`;

export default Input;
