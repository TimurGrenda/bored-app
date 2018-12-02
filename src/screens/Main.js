import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Range from '../components/Range';
import * as SC from '../styled-components';
import DigitPicker from '../components/DigitPicker';
import Select from '../components/Select';

const activityTypes = [
  {
    value: 'education',
    label: 'Education',
  },
  {
    value: 'recreational',
    label: 'Recreational',
  },
  {
    value: 'social',
    label: 'Social',
  },
  {
    value: 'diy',
    label: 'DIY',
  },
  {
    value: 'charity',
    label: 'Charity',
  },
  {
    value: 'cooking',
    label: 'Cooking',
  },
  {
    value: 'relaxation',
    label: 'Relaxation',
  },
  {
    value: 'music',
    label: 'Music',
  },
  {
    value: 'busywork',
    label: 'Busywork',
  },
];

class Main extends Component {
  state = {
    rangeHandles: [0, 20, 50, 80, 100],
    participants: null,
  };

  handleRangeChange = (values) => {
    this.setState({
      rangeHandles: values,
    });
  };

  handleDigitPickerChange = (value) => {
    this.setState({
      participants: value,
    });
  };

  render() {
    const { rangeHandles, participants } = this.state;
    const { goToActivityPage } = this.props;
    return (
      <React.Fragment>
        <SC.PageWrapper centered>
          <SC.Title>Bored?</SC.Title>
          <SC.Button type={'button'} onClick={goToActivityPage}>
            Get suggestions
          </SC.Button>
          <Range
            initialValues={[0, 20, 50, 80, 100]}
            onChange={this.handleRangeChange}
          />
          {rangeHandles.map((cur, i) => (
            <SC.Paragraph
              key={i} // eslint-disable-line react/no-array-index-key
            >
              <SC.Text bold>{i}:</SC.Text>
              <SC.Text>{cur.toFixed(2)}</SC.Text>
            </SC.Paragraph>
          ))}
          <DigitPicker
            from={1}
            to={8}
            onChange={this.handleDigitPickerChange}
          />
          <SC.Paragraph>
            <SC.Text>
              participants:
              {participants}
            </SC.Text>
          </SC.Paragraph>
          <div style={{ width: '300px' }}>
            <Select options={activityTypes} />
          </div>
        </SC.PageWrapper>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  goToActivityPage: PropTypes.func.isRequired,
};

export default Main;
