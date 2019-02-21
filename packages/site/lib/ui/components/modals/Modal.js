import { array, func, object, oneOfType, string } from "prop-types";
import React from "react";
import ReactModal from "react-modal";
import styled, { createGlobalStyle } from "styled-components";

import { breakpoint, color, font } from "ui/settings";
import { setSpace, setType } from "ui/mixins";
import { Action } from "ui/components";

ReactModal.setAppElement("#___gatsby");

const GlobalStyle = createGlobalStyle`
`;

const ModalClose = styled.span`
  ${setSpace("mrh")};
  ${setSpace("mth")};
  ${setType("h")};
  color: ${color.mono900};
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
  ${breakpoint.phone} {
    ${setSpace("mrm")};
    ${setSpace("mtm")};
  }
`;
const ModalContent = styled.div`
  ${setSpace("pah")};
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  .ModalTitle {
    ${setSpace("mbh")};
    ${setType("l")};
    color: ${color.mono900};
    font-family: ${font.mono};
    font-weight: bold;
    ${breakpoint.tabletUp} {
      ${setType("h")};
    }
  }
`;

const Modal = props => {
  const { children } = props;
  return (
    <>
      <ReactModal
        {...props}
        ariaHideApp
        bodyOpenClassName="ReactModal__Body--open"
        className="ReactModal__Content"
        htmlOpenClassName="ReactModal__Html--open"
        overlayClassName="ReactModal__Overlay"
        parentSelector={() => document.body}
        portalClassName="ReactModalPortal"
        role="dialog"
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
        style={{ overlay: {}, content: {} }}
      >
        <ModalClose>
          <Action onClick={() => props.onRequestClose()} title="Zamknij">
            ✕
          </Action>
        </ModalClose>
        <ModalContent>{children}</ModalContent>
      </ReactModal>
      <GlobalStyle />
    </>
  );
};

Modal.propTypes = {
  children: oneOfType([array, object, string]).isRequired,
  onRequestClose: func.isRequired
};

Modal.defaultProps = {};

export default Modal;
