import React from 'react';
import { shallow } from 'enzyme';
import DigitPicker from './DigitPicker';
import * as SC from './styled-components';

describe('DigitPicker', () => {
  it('should render the correct number of SC.Cells inside SC.Wrapper', () => {
    const wrapper = shallow(
      <DigitPicker from={4} to={7} selected={null} onChange={() => {}} />
    );

    const wrappers = wrapper.find(SC.Wrapper);
    expect(wrappers).toHaveLength(1);

    const cells = wrapper.find(SC.Cell);
    expect(cells).toHaveLength(4);
  });

  it('should populate SC.Cells with corresponding numbers', () => {
    const wrapper = shallow(
      <DigitPicker from={4} to={7} selected={null} onChange={() => {}} />
    );

    const cells = wrapper.find(SC.Cell);
    const expectedCellsContent = ['4', '5', '6', '7'];

    cells.forEach((node, index) => {
      const text = node.children().text();
      expect(text).toEqual(expectedCellsContent[index]);
    });
  });

  it('should render all SC.Cells unselected when selected prop is null', () => {
    const wrapper = shallow(
      <DigitPicker from={4} to={7} selected={null} onChange={() => {}} />
    );

    const cells = wrapper.find(SC.Cell);

    cells.forEach((node) => {
      const selected = node.prop('selected');
      expect(selected).toBeFalsy();
    });
  });

  it('should select correct Cell when provided with selected prop', () => {
    const wrapper = shallow(
      <DigitPicker from={4} to={7} selected={5} onChange={() => {}} />
    );

    const cells = wrapper.find(SC.Cell);

    expect(cells.at(1).prop('selected')).toBeTruthy();
  });

  it('should select only one Cell, which value is provided in the selected prop', () => {
    const wrapper = shallow(
      <DigitPicker from={4} to={7} selected={5} onChange={() => {}} />
    );

    const cells = wrapper.find(SC.Cell);

    expect(cells.at(0).prop('selected')).toBeFalsy();
    expect(cells.at(1).prop('selected')).toBeTruthy();
    expect(cells.at(2).prop('selected')).toBeFalsy();
    expect(cells.at(3).prop('selected')).toBeFalsy();
  });

  it('should call onChange with new value when selecting new Cell', () => {
    const onChangeHandler = jest.fn();
    const wrapper = shallow(
      <DigitPicker from={4} to={7} selected={5} onChange={onChangeHandler} />
    );

    const cells = wrapper.find(SC.Cell);
    cells.at(2).simulate('click');
    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onChangeHandler).toHaveBeenCalledWith(6);
  });

  it('should call onChange with null when deselecting selected Cell', () => {
    const onChangeHandler = jest.fn();
    const wrapper = shallow(
      <DigitPicker from={4} to={7} selected={5} onChange={onChangeHandler} />
    );

    const cells = wrapper.find(SC.Cell);
    cells.at(1).simulate('click');
    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onChangeHandler).toHaveBeenCalledWith(null);
  });
});
