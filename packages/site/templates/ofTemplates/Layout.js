/* eslint no-unused-expressions: 0 */
import { array, oneOfType, object } from "prop-types";
import { createGlobalStyle } from "styled-components";
import React from "react";

import { backgr } from "@storycopter/styleguide/src/assets";
import { breakpoint, color, font } from "@storycopter/styleguide/src/config";
import { CSSReset, setType } from "@storycopter/styleguide";

import { Footer, Main, Topbar } from "./ofLayout";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: white;
    background-image: url(${backgr});
    background-position: 100% 50%;
    background-repeat: no-repeat;
    background-size: 200%;
    ${breakpoint.phone} {
      background-position: 66% 50%;
      background-size: 500%;
    }
  }
  body {
    ${setType("m")};
    color: ${color.mono700};
    font-family: ${font.sans};
    font-weight: 300;
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
  a {
    color: ${color.brand};
    text-decoration: underline;
  }
  *::selection { background: rgba(2, 161, 154, .3) }
  *::-moz-selection { background: rgba(2, 161, 154, .3) }
`;

const Layout = props => {
  const { children } = props;

  return (
    <>
      <CSSReset />
      <GlobalStyle />
      <Topbar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: oneOfType([array, object]).isRequired
};

Layout.defaultProps = {};

export default Layout;
