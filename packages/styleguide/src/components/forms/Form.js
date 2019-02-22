import React from "react";
import styled from "styled-components";

import { setSpace } from "@storycopter/styleguide/src/mixins";
import FormItem from "./FormItem";

const Form = styled(({ ...props }) => <form {...props} />)`
  text-align: left;
  ${FormItem} {
    ${setSpace("mvm")};
  }
`;

export default Form;
