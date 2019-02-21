/* eslint no-unused-vars: 0 */
import { array, object, oneOfType, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import { breakpoint, color, font, track } from "ui/settings";
import { iawriter } from "assets/fonts";
import { setSpace, setType } from "ui/mixins";

const El = styled.section``;

const StyledEl = styled(({ cover, ...props }) => <El {...props} />)`
  ${setSpace("phl")};
  ${setSpace("pvh")};
  align-items: center;
  color: ${color.mono600};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${({ cover }) => (cover ? `90vh` : `auto`)};
  width: 100%;
  ${breakpoint.tabletUp} {
    ${setSpace("phh")};
  }
  h1,
  h2,
  h3,
  p {
    ${setSpace("mbm")};
    position: relative;
  }
  .SectionCapsTitle {
    ${setType("x")};
    font-family: ${font.mono};
    letter-spacing: ${track.s};
    text-transform: uppercase;
  }
  .SectionHeroTitle {
    ${setType("h")};
    color: ${color.mono900};
    font-family: ${font.mono};
    font-weight: bold;
    ${breakpoint.tabletUp} {
      ${setSpace("mbl")};
    }
  }
  .SectionSubtitle {
    ${setSpace("mbx")};
    ${setType("m")};
    color: ${color.mono700};
    font-weight: bold;
  }
  .SectionCopy {
    ${setType("m")};
  }
  .SectionMicroCopy {
    ${setType("x")};
  }
  .SectionTextPrefix {
    ${setSpace("mrs")};
    ${setType("x")};
    color: ${color.mono400};
    font-weight: normal;
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Child = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ limit }) => (limit ? "1060px" : "auto")};
  width: 100%;
`;

const Section = props => {
  const { children } = props;
  return (
    <StyledEl {...props}>
      <Child limit={props.limit}>{children}</Child>
    </StyledEl>
  );
};

Section.propTypes = {
  children: oneOfType([array, object, string]).isRequired
};

Section.defaultProps = {};

export default Section;
