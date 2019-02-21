import { array, func, object, oneOfType, string } from "prop-types";
import { Link as GatsbyLink } from "gatsby";
import React from "react";
import styled from "styled-components";

import { color, font, time, track } from "ui/settings";
import { setSpace } from "ui/mixins";

const LinkEl = styled.a`
  ${setSpace("pvx")};
  background: transparent;
  border-color: transparent;
  border-style: solid;
  border-width: 0 0 2px;
  color: ${color.mono800};
  cursor: pointer;
  display: inline-block;
  font-family: ${font.sans};
  font-size: inherit;
  font-weight: bold;
  letter-spacing: ${track.x};
  line-height: inherit;
  text-align: center;
  text-decoration: none;
  transition: border ${time.s}, transform ${time.s};
  white-space: nowrap;
  text-transform: uppercase;
  &:hover {
    border-color: ${({ plain }) => (plain ? "" : color.mono800)};
    transform: translateY(-1px);
  }
  ${({ isActive }) =>
    isActive
      ? `
        border-color: grey;
  `
      : ``};
`;

const Link = props => {
  const { onClick, to } = props;
  if (to) {
    return <LinkEl as={GatsbyLink} {...props} />;
  }
  if (onClick) {
    return <LinkEl as="a" {...props} />;
  }
  return <LinkEl {...props} />;
};

Link.propTypes = {
  children: oneOfType([array, object, string]),
  href: string,
  onClick: func,
  to: string
};

Link.defaultProps = {
  children: null,
  href: "",
  onClick: null,
  to: null
};

export default Link;
