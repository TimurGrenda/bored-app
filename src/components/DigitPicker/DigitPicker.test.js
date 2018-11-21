import React from 'react';
import { shallow } from 'enzyme';
import DigitPicker from './DigitPicker';
import Wrapper from './styled-components/Wrapper';
import Cell from './styled-components/Cell';

describe('DigitPicker', () => {
  describe('visual', () => {
    let root;
    let cells;
    let wrappers;

    beforeEach(() => {
      root = shallow(<DigitPicker range={[4, 7]} />);
      cells = root.find(Cell);
      wrappers = root.find(Wrapper);
    });

    it('should render the correct number of Cells inside Wrapper', () => {
      expect(wrappers).toHaveLength(1);
      expect(cells).toHaveLength(4);
    });

    it('should populate Cells with corresponding numbers', () => {
      const expectedCellsContent = ['4', '5', '6', '7'];
      cells.forEach((node, index) => {
        const text = node.children().text();
        expect(text).toEqual(expectedCellsContent[index]);
      });
    });

    it('should render all Cells unselected', () => {
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
      root = shallow(<DigitPicker range={[4, 7]} onChange={handleChange} />);
      cells = root.find(Cell);
      getCell = (n) => root.find(Cell).at(n);
      getCellPropSelected = (n) => getCell(n).prop('selected');
    });

    it('should toggle Cell selection when it is clicked', () => {
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

    it('should call onChange with null when Cell is unselected', () => {
      getCell(1).simulate('click');
      expect(handleChange).toHaveBeenLastCalledWith(5);
      getCell(1).simulate('click');
      expect(handleChange).toHaveBeenLastCalledWith(null);

      expect(handleChange).toHaveBeenCalledTimes(2);
    });
  });
});
