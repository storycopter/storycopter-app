import React from "react";
import styled from "styled-components";

import { setSpace } from "@storycopter/styleguide";

const TopbarEl = styled.header`
  & > div {
    ${setSpace("pal")};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Topbar = props => {
  return (
    <TopbarEl {...props}>
      <div>
        <div>
          <h1>Storycopter</h1>
        </div>
        <div>
          <a>Contact</a>
        </div>
      </div>
    </TopbarEl>
  );
};

export default Topbar;
