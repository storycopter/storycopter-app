/* eslint no-unused-expressions: 0 */
import { array, oneOfType, object } from "prop-types";
import { createGlobalStyle } from "styled-components";
import React from "react";

import { color, font } from "@storycopter/styleguide/src/settings";
import { reset } from "@storycopter/styleguide/src/assets";
import { setType } from "@storycopter/styleguide/src/mixins";

import { Footer, Main, Topbar } from "./ofLayout";

const GlobalStyle = createGlobalStyle`
  ${reset};
  html,
  body {
    background: #fff;
  }
  body {
    ${setType("m")};
    color: ${color.mono600};
    font-family: ${font.sans};
    min-height: 100vh;
    position: relative;
    width: 100%;
  }
  body > div,
  body > div > div {
    min-height: 100vh;
  }
  body > div > div {
    align-item: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
