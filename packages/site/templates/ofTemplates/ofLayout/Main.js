import { array, object, oneOfType, string } from "prop-types";
import React from "react";
import styled from "styled-components";

const MainEl = styled.main``;

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
