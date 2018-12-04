import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { Motion, spring } from 'react-motion';
import * as SC from './styled-components';

class Modal extends Component {
  render() {
    const { isOpen, onRequestClose, children } = this.props;
    const modalBody = (
      <Motion
        defaultStyle={{
          y: -300,
          opacity: 0,
        }}
        style={{
          y: spring(0),
          opacity: spring(1),
        }}
      >
        {(styles) => (
          <SC.Overlay style={{ opacity: styles.opacity }}>
            <OutsideClickHandler onOutsideClick={onRequestClose}>
              <SC.ModalBody style={{ transform: `translateY(${styles.y}px)` }}>
                {children}
                <SC.CloseButton onClick={onRequestClose}>x</SC.CloseButton>
              </SC.ModalBody>
            </OutsideClickHandler>
          </SC.Overlay>
        )}
      </Motion>
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
