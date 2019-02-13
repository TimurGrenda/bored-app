import React from 'react';
import { shallow } from 'enzyme';
import OutsideClickHandler from 'react-outside-click-handler';
import Select from './Select';
import Header from './components/Header';
import OptionsList from './components/OptionsList';

describe('Select component', () => {
  const options = [
    { value: '1', label: 'first' },
    { value: '2', label: 'second' },
    { value: '3', label: 'third' },
  ];

  it('should have correct initial state: isOpen==false', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={null}
      />
    );
    const state = root.state();
    expect(state.isOpen).toBeFalsy();
  });

  it('should render correct component structure after initial render', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={null}
      />
    );

    expect(root.type()).toEqual('div');
    const rootChildren = root.children();
    expect(rootChildren).toHaveLength(1);

    const firstRootChild = root.children().first();
    expect(firstRootChild.type()).toEqual(OutsideClickHandler);

    const nextRootChild = firstRootChild.children().first();
    expect(nextRootChild.type()).toEqual(Header);
  });

  it('should pass disabled == true to OutsideClickHandler after initial render', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={null}
      />
    );
    expect(root.find(OutsideClickHandler).prop('disabled')).toBeTruthy();
  });

  it('should pass initial text to HeaderTitle', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={null}
      />
    );
    const header = root.find(Header);
    expect(header.prop('title')).toEqual('Any');
  });

  it('should toggle isOpen state when Header is clicked', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={null}
      />
    );
    const header = root.find(Header);
    expect(root.state().isOpen).toBeFalsy();
    header.simulate('click');
    expect(root.state().isOpen).toBeTruthy();
    header.simulate('click');
    expect(root.state().isOpen).toBeFalsy();
  });

  it('should render OptionsList when state.isOpen==true', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={null}
      />
    );
    root.setState({ isOpen: true });
    expect(root.find(OptionsList).exists()).toBeTruthy();
  });

  it('should hide OptionsList when clicked outside of the component', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={null}
      />
    );
    root.setState({ isOpen: true });
    expect(root.find(OptionsList).exists()).toBeTruthy();

    root.find(OutsideClickHandler).prop('onOutsideClick')();

    expect(root.find(OptionsList).exists()).toBeFalsy();
  });

  it('should pass options to OptionsList', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={null}
      />
    );
    root.setState({ isOpen: true });
    expect(root.find(OptionsList).exists()).toBeTruthy();

    const optionsList = root.find(OptionsList);
    expect(optionsList.prop('options')).toEqual(options);
  });

  it('should call onChange when option is selected', () => {
    const handleChange = jest.fn();
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={handleChange}
        selectedOptionValue={null}
      />
    );

    root.instance().handleOptionSelection(options[1].value);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(options[1].value);
  });

  it('should hide OptionsList when option is selected', () => {
    const handleChange = jest.fn();
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={handleChange}
        selectedOptionValue={null}
      />
    );

    root.setState({ isOpen: true });
    root.instance().handleOptionSelection(options[1].value);

    expect(root.find(OptionsList).exists()).toBeFalsy();
  });

  it('should provide correct title to Header when option is selected', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={options[1].value}
      />
    );

    const header = root.find(Header);
    const expected = options.find((i) => i.value === options[1].value).label;
    expect(header.prop('title')).toEqual(expected);
  });

  it('should call onClearSelection when ClearButton was clicked', () => {
    const onClearSelection = jest.fn();
    const root = shallow(
      <Select
        onClearSelection={onClearSelection}
        options={options}
        onChange={() => {}}
        selectedOptionValue={options[1].value}
      />
    );

    const header = root.find(Header);
    header.prop('onClearButtonClick')({
      stopPropagation: () => {},
    });

    expect(onClearSelection).toHaveBeenCalledTimes(1);
  });

  it('should show ClearButton when option is selected', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={options[1].value}
      />
    );

    const header = root.find(Header);

    expect(header.prop('showClearButton')).toBeTruthy();
  });

  it('should not show ClearButton when option is not selected', () => {
    const root = shallow(
      <Select
        onClearSelection={() => {}}
        options={options}
        onChange={() => {}}
        selectedOptionValue={null}
      />
    );

    const header = root.find(Header);

    expect(header.prop('showClearButton')).toBeFalsy();
  });
});
