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

  it('should have correct initial state: isOpen==false and selectedOptionValue==null', () => {
    const root = shallow(<Select options={options} />);
    const state = root.state();
    expect(state.isOpen).toBeFalsy();
    expect(state.selectedOptionValue).toBeNull();
  });

  it('should render correct component structure after initial render', () => {
    const root = shallow(<Select options={options} />);

    expect(root.type()).toEqual(OutsideClickHandler);
    const rootChildren = root.children();
    expect(rootChildren).toHaveLength(1);

    const firstRootChild = root.children().first();
    expect(firstRootChild.type()).toEqual(Header);
  });

  it('should pass disabled == true to OutsideClickHandler after initial render', () => {
    const root = shallow(<Select options={options} />);
    expect(root.prop('disabled')).toBeTruthy();
  });

  it('should pass initial text to HeaderTitle', () => {
    const root = shallow(<Select options={options} />);
    const header = root.find(Header);
    expect(header.prop('title')).toEqual('Choose option');
  });

  it('should toggle isOpen state when Header is clicked', () => {
    const root = shallow(<Select options={options} />);
    const header = root.find(Header);
    expect(root.state().isOpen).toBeFalsy();
    header.simulate('click');
    expect(root.state().isOpen).toBeTruthy();
    header.simulate('click');
    expect(root.state().isOpen).toBeFalsy();
  });

  it('should render OptionsList when state.isOpen==true', () => {
    const root = shallow(<Select options={options} />);
    root.setState({ isOpen: true });
    expect(root.find(OptionsList).exists()).toBeTruthy();
  });

  it('should hide OptionsList when clicked outside of the component', () => {
    const root = shallow(<Select options={options} />);
    root.setState({ isOpen: true });
    expect(root.find(OptionsList).exists()).toBeTruthy();

    root.find(OutsideClickHandler).prop('onOutsideClick')();

    expect(root.find(OptionsList).exists()).toBeFalsy();
  });

  it('should pass options to OptionsList', () => {
    const root = shallow(<Select options={options} />);
    root.setState({ isOpen: true });
    expect(root.find(OptionsList).exists()).toBeTruthy();

    const optionsList = root.find(OptionsList);
    expect(optionsList.prop('options')).toEqual(options);
  });

  it('should set selectedOptionValue and hide OptionsList after option is selected', () => {
    const root = shallow(<Select options={options} />);
    root.setState({ isOpen: true });
    expect(root.find(OptionsList).exists()).toBeTruthy();

    root.instance().handleOptionSelection('2');

    expect(root.state('selectedOptionValue')).toEqual('2');
    expect(root.find(OptionsList).exists()).toBeFalsy();
  });

  it('should provide correct title to Header after option selection', () => {
    const root = shallow(<Select options={options} />);
    root.instance().handleOptionSelection(options[1].value);

    const header = root.find(Header);
    const expected = options.find((i) => i.value === options[1].value).label;
    expect(header.prop('title')).toEqual(expected);
  });

  it('should change Header title when selected option is changed', () => {
    const root = shallow(<Select options={options} />);
    root.instance().handleOptionSelection(options[1].value);

    const expected1 = options.find((i) => i.value === options[1].value).label;
    expect(root.find(Header).prop('title')).toEqual(expected1);

    root.instance().handleOptionSelection(options[0].value);
    const expected2 = options.find((i) => i.value === options[0].value).label;
    expect(root.find(Header).prop('title')).toEqual(expected2);
  });
});
