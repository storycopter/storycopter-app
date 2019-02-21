import { array, func, object, oneOfType, string } from "prop-types";
import { Link as GatsbyButton } from "gatsby";
import React from "react";
import styled from "styled-components";

import { color, font, time, track } from "ui/settings";
import { setSpace } from "ui/mixins";

const Element = styled.a``;

const StyledElement = styled(({ isDisabled, block, ...props }) => (
  <Element {...props} />
))`
  ${setSpace("pam")};
  background-color: ${({ isDisabled }) =>
    isDisabled ? color.mono200 : color.mono800};
  border: 2px solid
    ${({ isDisabled }) => (isDisabled ? color.mono200 : color.mono800)};
  color: white;
  cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};
  display: inline-block;
  font-family: ${font.mono};
  font-size: inherit;
  letter-spacing: ${track.x};
  line-height: 1em;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: box-shadow ${time.s}, transform ${time.s};
  white-space: nowrap;
  width: ${({ block }) => (block ? `100%` : `auto`)};
  &:hover {
    transform: ${({ isDisabled }) =>
      isDisabled ? "none" : "translateY(-1px)"};
  }
  ${({ isSecondary, isButton }) =>
    isButton && isSecondary
      ? `
    background: transparent;
    color: ${color.mono800};
  `
      : ``};
`;

const Button = props => {
  const { onClick, to } = props;
  if (to) {
    return <StyledElement as={GatsbyButton} {...props} />;
  }
  if (onClick) {
    return <StyledElement as="button" type="button" {...props} />;
  }
  return <StyledElement {...props} />;
};

Button.propTypes = {
  children: oneOfType([array, object, string]),
  href: string,
  onClick: func,
  to: string
};

Button.defaultProps = {
  children: null,
  href: "",
  onClick: null,
  to: null
};

export default Button;
