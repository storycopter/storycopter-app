import React from "react";
import styled from "styled-components";

import {} from "@storycopter/styleguide/src/config";
import {} from "@storycopter/styleguide/src/mixins";

const Actionbar = styled(({ ...props }) => <div type="button" {...props} />)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Actionbar;
