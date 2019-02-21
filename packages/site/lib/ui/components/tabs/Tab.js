import { array, bool, func, object, oneOfType, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import { color, font } from "ui/settings";
import { setSpace, setType } from "ui/mixins";

const El = styled.li``;

const StyledEl = styled(({ isActive, ...props }) => <El {...props} />)`
  border-style: solid;
  border-width: 0 0 2px;
  cursor: pointer;
  margin-bottom: -2px;
  outline: none;
  position: relative;
  text-align: center;
  border-color: ${({ isActive }) =>
    isActive
      ? `
    ${color.mono900}
  `
      : "transparent"};
  &:last-child {
    border-right: none !important;
  }
  &:first-child {
    border-left: none !important;
  }
  span {
    ${setSpace("pbm")};
    ${setType("s")};
    color: ${color.mono900};
    display: inline-block;
    font-family: ${font.mono};
    font-weight: bold;
  }
  &:hover span {
    border-color: ${color.mono900};
  }
`;

const Tab = props => {
  const handleClick = e => {
    e.preventDefault();
    props.onClick();
  };
  return (
    <StyledEl {...props} onClick={e => handleClick(e)} role="button">
      <span>{props.children}</span>
    </StyledEl>
  );
};

Tab.propTypes = {
  children: oneOfType([array, object, string]).isRequired,
  isActive: bool,
  onClick: func.isRequired
};

Tab.defaultProps = {
  isActive: null
};

export default Tab;
