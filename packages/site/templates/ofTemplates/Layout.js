/* eslint no-unused-expressions: 0 */
import { array, oneOfType, object } from "prop-types";
import { createGlobalStyle } from "styled-components";
import React from "react";

import { color, font } from "@storycopter/styleguide/src/config";
import { CSSReset, setType } from "@storycopter/styleguide";

import { Footer, Main, Topbar } from "./ofLayout";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background: linear-gradient(to bottom, #4a4969 0%,#7072ab 50%,#cd82a0 100%); 
  }
  body {
    ${setType("m")};
    color: ${color.mono700};
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
  a {
    color: ${color.flare900};
    text-decoration: underline;
  }
  *::selection { background: grey; }
  *::-moz-selection { background: grey; }
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
