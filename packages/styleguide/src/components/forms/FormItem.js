import React from "react";
import styled from "styled-components";

import { color } from "@storycopter/styleguide/src/config";
import { setSpace } from "@storycopter/styleguide/src/mixins";

import Label from "./Label";
import Input from "./Input";

const FormItem = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  border-left: 1px solid ${color.brand};
  ${Label} {
    ${setSpace("mlm")}
    left: 0;
    position: absolute;
    top: 0;
  }
  ${Input} {
    ${setSpace("pbs")};
    ${setSpace("plm")}
    ${setSpace("ptl")};
  }
`;

export default FormItem;
