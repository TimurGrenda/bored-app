import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import * as SC from './styled-components';

class Modal extends Component {
  render() {
    const { isOpen, onRequestClose, children } = this.props;
    const modalBody = (
      <SC.Overlay>
        <OutsideClickHandler onOutsideClick={onRequestClose}>
          <SC.ModalBody>
            {children}
            <SC.CloseButton onClick={onRequestClose}>x</SC.CloseButton>
          </SC.ModalBody>
        </OutsideClickHandler>
      </SC.Overlay>
    );

    if (isOpen) {
      return ReactDOM.createPortal(modalBody, document.body);
    }
    return null;
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default Modal;
