/* eslint no-unused-vars: 0 */
import { array, object, oneOfType, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import { color } from "ui/settings";
import { setSpace, setWidth } from "ui/mixins";

const El = styled.hr``;

const StyledEl = styled(({ block, ...props }) => <El {...props} />)`
  ${setSpace("mvm")};
  border: none;
  display: block;
`;

const Separator = props => <StyledEl {...props} />;

Separator.propTypes = {};

Separator.defaultProps = {};

export default Separator;
