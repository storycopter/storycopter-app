import React from "react";
import styled from "styled-components";

const FooterEl = styled.footer`
  & > div {
  }
`;

const Footer = props => {
  return (
    <FooterEl {...props}>
      <div />
    </FooterEl>
  );
};

export default Footer;
