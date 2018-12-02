import React from 'react';
import { shallow } from 'enzyme';
import DigitPicker from './DigitPicker';
import * as SC from './styled-components';

describe('DigitPicker', () => {
  describe('visual', () => {
    let root;
    let cells;
    let wrappers;

    beforeEach(() => {
      root = shallow(<DigitPicker from={4} to={7} />);
      cells = root.find(SC.Cell);
      wrappers = root.find(SC.Wrapper);
    });

    it('should render the correct number of SC.Cells inside SC.Wrapper', () => {
      expect(wrappers).toHaveLength(1);
      expect(cells).toHaveLength(4);
    });

    it('should populate SC.Cells with corresponding numbers', () => {
      const expectedCellsContent = ['4', '5', '6', '7'];
      cells.forEach((node, index) => {
        const text = node.children().text();
        expect(text).toEqual(expectedCellsContent[index]);
      });
    });

    it('should render all SC.Cells unselected', () => {
      cells.forEach((node) => {
        const selected = node.prop('selected');
        expect(selected).toBe(false);
      });
    });
  });

  describe('functional', () => {
    let handleChange;
    let root;
    let cells;
    let getCell;
    let getCellPropSelected;

    beforeEach(() => {
      handleChange = jest.fn();
      root = shallow(<DigitPicker from={4} to={7} onChange={handleChange} />);
      cells = root.find(SC.Cell);
      getCell = (n) => root.find(SC.Cell).at(n);
      getCellPropSelected = (n) => getCell(n).prop('selected');
    });

    it('should toggle SC.Cell selection when it is clicked', () => {
      getCell(1).simulate('click');
      expect(getCellPropSelected(1)).toBe(true);

      getCell(1).simulate('click');
      expect(getCellPropSelected(1)).toBe(false);

      getCell(1).simulate('click');
      expect(getCellPropSelected(1)).toBe(true);
    });

    it('should keep only one Cell selected', () => {
      getCell(2).simulate('click');
      for (let i = 0; i < cells.length; i += 1) {
        if (i !== 2) {
          expect(getCellPropSelected(i)).toBe(false);
        } else {
          expect(getCellPropSelected(2)).toBe(true);
        }
      }

      getCell(0).simulate('click');
      for (let i = 0; i < cells.length; i += 1) {
        if (i !== 0) {
          expect(getCellPropSelected(i)).toBe(false);
        } else {
          expect(getCellPropSelected(0)).toBe(true);
        }
      }
    });

    it('should call onChange with selected value', () => {
      expect(handleChange).toHaveBeenCalledTimes(0);

      getCell(0).simulate('click');
      expect(handleChange).toHaveBeenLastCalledWith(4);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange with null when SC.Cell is unselected', () => {
      getCell(1).simulate('click');
      expect(handleChange).toHaveBeenLastCalledWith(5);
      getCell(1).simulate('click');
      expect(handleChange).toHaveBeenLastCalledWith(null);

      expect(handleChange).toHaveBeenCalledTimes(2);
    });
  });
});
