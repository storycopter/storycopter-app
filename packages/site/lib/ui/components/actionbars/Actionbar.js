import styled from "styled-components";

import { setSpace, setType } from "ui/mixins";

const Actionbar = styled.div`
  ${setType("x")};
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
  & > * {
    ${setSpace("mvx")};
    ${setSpace("mhm")};
  }
  & > *:first-child {
    ${setSpace("mln")};
  }
  & > *:last-child {
    ${setSpace("mrn")};
  }
`;

export default Actionbar;
