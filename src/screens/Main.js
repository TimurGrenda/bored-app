import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from '../styled-components/Title';
import PageWrapper from '../styled-components/PageWrapper';
import Button from '../styled-components/Button';
import Range from '../components/Range';
import Paragraph from '../styled-components/Paragraph';
import Text from '../styled-components/Text';
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
    rangeHandles: [],
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
        <PageWrapper centered>
          <Title>Bored?</Title>
          <Button type={'button'} onClick={goToActivityPage}>
            Get suggestions
          </Button>
          <Range
            handlesCount={5}
            initialValues={[0, 20, 50, 80, 100]}
            onChange={this.handleRangeChange}
          />
          {rangeHandles.map((cur, i) => (
            <Paragraph>
              <Text bold>{i}:</Text>
              <Text>{cur.toFixed(2)}</Text>
            </Paragraph>
          ))}
          <DigitPicker range={[1, 8]} onChange={this.handleDigitPickerChange} />
          <Paragraph>
            <Text>
              participants:
              {participants}
            </Text>
          </Paragraph>
          <div style={{ width: '300px' }}>
            <Select options={activityTypes} />
          </div>
        </PageWrapper>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  goToActivityPage: PropTypes.func.isRequired,
};

export default Main;
