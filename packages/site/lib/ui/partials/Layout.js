/* eslint no-unused-expressions: 0 */
import { array, oneOfType, object } from "prop-types";
import { createGlobalStyle } from "styled-components";
import React from "react";

import { color, ResetCSS, setType } from "@storycopter/styleguide";

import { Footer, Main, Topbar } from "./ofLayout";

const GlobalStyle = createGlobalStyle`
  ${ResetCSS};
  html {
    background: #fff;
  }
  body {
    ${setType("m")};
    background-color: #f5f5f5;
    color: ${color.mono600};
    min-height: 100vh;
    position: relative;
    width: 100%;
  }
  img {
    line-height: 0;
  }
  a,
  abbr {
    text-decoration: none;
  }
  *::selection { background: grey; }
  *::-moz-selection { background: grey; }
`;

const Layout = props => {
  const { children } = props;

  return (
    <>
      <Topbar />
      <Main>{children}</Main>
      <Footer />
      <GlobalStyle />
    </>
  );
};

Layout.propTypes = {
  children: oneOfType([array, object]).isRequired
};

Layout.defaultProps = {};

export default Layout;
