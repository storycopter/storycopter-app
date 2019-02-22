import { array, object, oneOfType, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import { setSpace } from "@storycopter/styleguide/src/mixins";

const MainEl = styled.main`
  & > div {
    ${setSpace("phl")};
    margin-left: auto;
    margin-right: auto;
    max-width: 1080px;
  }
`;

const Main = props => {
  const { children } = props;
  return (
    <MainEl {...props}>
      <div>{children}</div>
    </MainEl>
  );
};

Main.propTypes = {
  children: oneOfType([array, object, string]).isRequired
};

export default Main;
