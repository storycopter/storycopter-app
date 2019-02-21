import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { setHeight, setSize, setSpace, setType, setWidth } from "ui/mixins";
import { color, font, radius, time } from "ui/settings";

const Hd = styled.div`
  color: ${color.mono900};
  font-family: ${font.sans};
`;

const Bd = styled.div`
  ${setSpace("mtx")};
  ${setType("x")};
  color: ${color.mono300};
  font-family: ${font.sans};
`;

const Element = styled.button`
  ${setSpace("man")};
  ${setSpace("pan")};
  ${setType("x")};
  background: transparent;
  border: none;
  box-shadow: none;
  color: ${({ isInvalid }) => (isInvalid ? "red" : color.mono900)};
  cursor: pointer;
  display: block;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  outline: none;
  text-align: left;
  width: 100%;
  span {
    ${setHeight("s")};
    ${setWidth("m")};
    display: inline-block;
    position: relative;
  }
  span:after,
  span:before {
    ${setHeight("x")};
    border-radius: ${radius.h};
    content: " ";
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    transition: background ${time.s}, margin ${time.s};
  }
  span:after {
    ${setSize("s")};
    background: white;
    box-shadow: 0 1px 3px ${color.shadow300};
  }
  span:before {
    ${setHeight("s")};
    ${setWidth("m")};
    background: ${color.mono100};
    box-shadow: inset 0 1px 3px ${color.shadow300};
  }
  ${({ isActive }) =>
    isActive
      ? `
    span:before {
      background: ${color.mono900};
    }
  `
      : `
    span:after {
      ${setSpace("mrm")};
    }
  `};
`;

const Switch = props => {
  const { children, displayLabel, isActive } = props;
  return (
    <Fragment>
      <Hd>
        <Element {...props} aria-checked={isActive} role="switch" type="button">
          {displayLabel}
          <span />
        </Element>
      </Hd>
      <Bd>{children}</Bd>
    </Fragment>
  );
};

Switch.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.node
  ]),
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  displayLabel: PropTypes.string.isRequired
};

Switch.defaultProps = {
  children: null,
  isActive: false,
  isDisabled: false
};

export default Switch;
