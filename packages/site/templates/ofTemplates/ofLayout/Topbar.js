import React from "react";
import styled from "styled-components";

import { color } from "@storycopter/styleguide/src/config";
import { Link, Icon } from "@storycopter/styleguide";
import { setSpace, setType } from "@storycopter/styleguide/src/mixins";

const TopbarEl = styled.header`
  & > div {
    ${setSpace("pal")};
    ${setType("m")};
    color: ${color.flare900};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  h1 {
    font-weight: 700;
  }
  ${Link} {
    ${setSpace("mlm")};
  }
`;

const Topbar = props => {
  return (
    <TopbarEl {...props}>
      <div>
        <div>
          <h1>Storycopter</h1>
        </div>
        <div>
          <Link as="a" href="https://twitter.com/storycopter">
            <Icon name="twitter" target="_blank" />
          </Link>
          <Link as="a" href="https://github.com/storycopter">
            <Icon name="github" target="_blank" />
          </Link>
          <Link as="a" href="mailto:storycopter@gmail.com">
            <Icon name="gmail" />
          </Link>
        </div>
      </div>
    </TopbarEl>
  );
};

export default Topbar;
