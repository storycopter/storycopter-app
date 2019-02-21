import React, { Fragment } from "react";
import {
  array,
  arrayOf,
  bool,
  node,
  number,
  object,
  oneOfType,
  string
} from "prop-types";
import styled from "styled-components";

import { setSpace } from "../../mixins";

const Child = styled.div`
  ${({ flexDirection, justifyContent }) =>
    flexDirection
      ? `
    display: flex;
    flex-direction: ${flexDirection};
    justify-content: ${justifyContent};
  `
      : ""};
`;

const Element = styled.div`
  display: ${({ flexDirection }) => (flexDirection ? "flex" : "block")};
  flex-basis: ${({ flexBasis }) => flexBasis};
  min-height: ${({ cover }) => (cover ? "100vh" : "auto")};
  width: ${({ span }) => (span ? "100%" : "auto")};

  ${({ ft }) =>
    ft
      ? `
      align-content: stretch;
  `
      : ""};
  ${({ flexDirection }) =>
    flexDirection
      ? `
    flex-direction: ${flexDirection};
    flex-wrap: wrap;
    justify-content: space-between;
  `
      : ""};
  ${({ flexGrow }) =>
    flexGrow
      ? `
    flex-grow: ${flexGrow};
  `
      : ""};
  ${({ flexShrink }) =>
    flexShrink
      ? `
    flex-shrink: ${flexShrink};
  `
      : ""};
  ${({ justifyContent }) =>
    justifyContent
      ? `
    justify-content: ${justifyContent};
  `
      : ""};
  ${({ hasSpace }) => {
    if (hasSpace) {
      return Array.isArray(hasSpace)
        ? hasSpace.map(space => setSpace(space))
        : setSpace(hasSpace);
    }
    return "";
  }};
`;

const Container = props => {
  const { children, ft, hd, flexDirection } = props;
  return (
    <Element {...props}>
      {ft ? (
        <Fragment>
          <Child flexDirection={flexDirection}>
            {hd || null}
            {children}
          </Child>
          {ft}
        </Fragment>
      ) : (
        <Fragment>
          {hd || null}
          {children}
        </Fragment>
      )}
    </Element>
  );
};

Container.propTypes = {
  children: oneOfType([array, object, string]).isRequired,
  cover: bool,
  flexBasis: string,
  flexDirection: string,
  flexShrink: oneOfType([number, string]),
  flexGrow: oneOfType([number, string]),
  ft: oneOfType([array, object, node]),
  hasSpace: oneOfType([string, arrayOf(string)]),
  hd: oneOfType([array, object, node]),
  justifyContent: string,
  span: bool
};

Container.defaultProps = {
  cover: false,
  flexBasis: "auto",
  flexDirection: null,
  flexShrink: "auto",
  flexGrow: "auto",
  ft: null,
  hasSpace: null,
  hd: null,
  justifyContent: "space-between",
  span: null
};

export default Container;
