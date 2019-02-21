import styled from "styled-components";

import { color, font, time, track } from "ui/settings";
import { setSpace, setType } from "ui/mixins";

const FormItem = styled.div`
  ${setSpace("mbl")};
  position: relative;
  line-height: 1;
  .InputLabel {
    ${setSpace("man")};
    ${setSpace("pvs")};
    background: white;
    color: ${color.mono400};
    font-family: ${font.sans};
    font-size: 13px;
    font-weight: 400;
    left: 1px;
    width: 100%;
    letter-spacing: ${track.x};
    position: absolute;
    text-transform: uppercase;
    top: 0;
    &.isInvalid {
      color: red;
    }
    span {
      visibility: hidden;
    }
    span.isRequired {
      color: red;
      visibility: visible;
    }
  }
  .CheckLabel {
    ${setType("x")};
    color: ${color.mono400};
    font-family: ${font.sans};
    font-weight: 400;
    width: 100%;
    &.isInvalid {
      color: red;
    }
  }
  .TextInput {
    ${setSpace("man")};
    ${setSpace("pbs")};
    ${setSpace("ptl")};
    ${setType("x")};
    appearance: none;
    background: transparent;
    border-color: ${color.mono100};
    border-radius: 0;
    border-style: solid;
    border-width: 0 0 1px 0;
    box-shadow: none;
    display: block;
    font-family: ${font.sans};
    outline: none;
    resize: none;
    transition: border ${time.s}, box-shadow ${time.s};
    width: 100%;
    &:focus {
      border-color: ${color.mono900};
      box-shadow: inset 0 -1px 0 ${color.mono900};
    }
    &.isPlaceholder,
    &::placeholder {
      color: ${color.mono200};
    }
    &.isInvalid {
      border-color: red;
      &:focus {
        box-shadow: inset 0 -1px 0 red;
      }
    }
  }
`;

export default FormItem;
