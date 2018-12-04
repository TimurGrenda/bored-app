import React from 'react';
import { shallow } from 'enzyme';
import OutsideClickHandler from 'react-outside-click-handler';
import { Motion } from 'react-motion';
import Modal from './Modal';
import * as SC from './styled-components';

describe('Modal component', () => {
  const children = <div>test</div>;

  it('should not render anything when closed', () => {
    const root = shallow(
      <Modal isOpen={false} onRequestClose={() => {}}>
        {children}
      </Modal>
    );

    expect(root.children()).toHaveLength(0);
  });

  it('should render children in a portal when opened', () => {
    const root = shallow(
      <Modal isOpen onRequestClose={() => {}}>
        {children}
      </Modal>
    );

    const motionRender = shallow(
      root.find(Motion).prop('children')({
        opacity: 1,
        y: 0,
      })
    );

    // fixMe: find a better solution to test that Modal renders Portal
    expect(root.type().toString()).toEqual('Symbol(react.portal)');

    expect(motionRender.containsMatchingElement(children)).toBeTruthy();
  });

  it('should render close button when opened', () => {
    const root = shallow(
      <Modal isOpen onRequestClose={() => {}}>
        {children}
      </Modal>
    );

    const motionRender = shallow(
      root.find(Motion).prop('children')({
        opacity: 1,
        y: 0,
      })
    );

    const closeButton = motionRender.find(SC.CloseButton);
    expect(closeButton.exists()).toBeTruthy();
  });

  it('should call onRequestClose when clicked on CloseButton', () => {
    const onRequestClose = jest.fn();

    const root = shallow(
      <Modal isOpen onRequestClose={onRequestClose}>
        {children}
      </Modal>
    );

    const motionRender = shallow(
      root.find(Motion).prop('children')({
        opacity: 1,
        y: 0,
      })
    );

    const closeButton = motionRender.find(SC.CloseButton);
    closeButton.simulate('click');
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('should call onRequestClose when clicked outside modal body', () => {
    const onRequestClose = jest.fn();

    const root = shallow(
      <Modal isOpen onRequestClose={onRequestClose}>
        {children}
      </Modal>
    );

    const motionRender = shallow(
      root.find(Motion).prop('children')({
        opacity: 1,
        y: 0,
      })
    );

    const outsideClickHandler = motionRender.find(OutsideClickHandler);
    outsideClickHandler.prop('onOutsideClick')(); // simulate outside click
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });
});
