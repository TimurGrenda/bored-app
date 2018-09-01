import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from '../styled-components/Title';
import PageWrapper from '../styled-components/PageWrapper';
import Button from '../styled-components/Button';
import Range from '../components/Range';
import Paragraph from '../styled-components/Paragraph';
import Text from '../styled-components/Text';
import DigitPicker from '../components/DigitPicker';

class Main extends Component {
  state = {
    from: 20,
    to: 80,
    participants: null,
  };

  handleRangeChange = (values) => {
    this.setState({
      from: Math.min(...values),
      to: Math.max(...values),
    });
  };

  handleDigitPickerChange = (value) => {
    this.setState({
      participants: value,
    });
  };

  render() {
    const { from, to, participants } = this.state;
    const { goToActivityPage } = this.props;
    return (
      <React.Fragment>
        <PageWrapper centered>
          <Title>Bored?</Title>
          <Button type={'button'} onClick={goToActivityPage}>
            Get suggestions
          </Button>
          <Range initialValues={[20, 80]} onChange={this.handleRangeChange} />
          <Paragraph>
            <Text>
              from:
              {from.toFixed(2)}
            </Text>
          </Paragraph>
          <Paragraph>
            <Text>
              to:
              {to.toFixed(2)}
            </Text>
          </Paragraph>
          <DigitPicker range={[1, 8]} onChange={this.handleDigitPickerChange} />
          <Paragraph>
            <Text>
              participants:
              {participants}
            </Text>
          </Paragraph>
        </PageWrapper>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  goToActivityPage: PropTypes.func.isRequired,
};

export default Main;
