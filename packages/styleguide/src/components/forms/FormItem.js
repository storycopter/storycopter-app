import React from "react";
import styled from "styled-components";

import { setSpace } from "@storycopter/styleguide/src/mixins";

import Label from "./Label";
import Input from "./Input";

const FormItem = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  ${Label} {
    position: absolute;
    top: 0;
    left: 0;
  }
  ${Input} {
    ${setSpace("pbs")};
    ${setSpace("ptl")};
  }
`;

export default FormItem;
