import React from "react";
import styled from "styled-components";

import { setSpace } from "@storycopter/styleguide/src/mixins";

import Label from "./Label";
import Input from "./Input";

const FormItem = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  ${Label} {
    left: 0;
    position: absolute;
    top: 0;
  }
  ${Input} {
    ${setSpace("pbs")};
    ${setSpace("ptl")};
  }
`;

export default FormItem;
