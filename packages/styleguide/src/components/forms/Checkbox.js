import React from "react";
import styled from "styled-components";

const Checkbox = styled(({ ...props }) => (
  <input type="checkbox" {...props} />
))``;

export default Checkbox;
