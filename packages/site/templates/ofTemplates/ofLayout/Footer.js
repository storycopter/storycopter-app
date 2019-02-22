import React from "react";
import styled from "styled-components";

import { Icon } from "@storycopter/styleguide/src/components";
import { setSpace } from "@storycopter/styleguide/src/mixins";

const FooterEl = styled.footer`
  & > div {
    ${setSpace("pal")};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Footer = props => {
  return (
    <FooterEl {...props}>
      <div>
        <div>Storycopter</div>
        <div>
          <Icon name="twitter" /> storycopter
          <Icon name="gmail" /> storycopter
        </div>
      </div>
    </FooterEl>
  );
};

export default Footer;
