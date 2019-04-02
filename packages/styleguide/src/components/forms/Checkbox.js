import React from "react";
import styled from "styled-components";

import { setSpace } from "@storycopter/styleguide/src/mixins";

const El = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
  }
`;
const Input = styled(({ label, ...props }) => (
  <input type="checkbox" {...props} />
))`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;
const Check = styled.span`
  background-color: #eee;
  height: 25px;
  left: 0;
  position: absolute;
  top: 0;
  width: 25px;
`;
const Label = styled.span`
  ${setSpace("mls")};
`;

const Checkbox = props => {
  const { label } = props;
  return (
    <El>
      <Input {...props} />
      <Check />
      <Label>{label}</Label>
    </El>
  );
};

export default Checkbox;
