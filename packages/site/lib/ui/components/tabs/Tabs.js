import { number } from "prop-types";
import React from "react";
import styled from "styled-components";

import { color } from "ui/settings";
import {} from "assets/fonts";
import { setSpace } from "ui/mixins";

const El = styled.ul``;

const StyledEl = styled(({ count, ...props }) => <El {...props} />)`
  ${setSpace("mbm")};
  align-items: center;
  border-bottom: 2px solid ${color.mono100};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  & > * {
    flex-basis: ${({ count }) => 100 / count}%;
  }
`;

const Tabs = props => <StyledEl {...props} />;

Tabs.propTypes = {
  count: number.isRequired
};

Tabs.defaultProps = {};

export default Tabs;
