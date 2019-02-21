import { array, object, oneOfType, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import { fadeIn } from "ui/animations";
import { time } from "ui/settings";

const MainEl = styled.main`
  & > * {
    animation: ${fadeIn} ${time.l} linear;
    margin-left: auto;
    margin-right: auto;
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
