import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as SC from '../styled-components';
import Range from '../components/Range/Range';
import DigitPicker from '../components/DigitPicker/DigitPicker';
import Select from '../components/Select/Select';
import { activityTypes } from './constants';

class Filter extends PureComponent {
  constructor(props) {
    super(props);
    const {
      savedPriceRange,
      savedAccessibilityRange,
      savedParticipants,
      savedActivityType,
    } = this.props;

    this.state = {
      priceRange: savedPriceRange,
      accessibilityRange: savedAccessibilityRange,
      participants: savedParticipants,
      activityType: savedActivityType,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.reinitializeStateFromProps();
    }
  }

  handlePriceRangeChange = (values) => {
    this.setState({
      priceRange: values,
    });
  };

  handleAccessibilityRangeChange = (values) => {
    this.setState({
      accessibilityRange: values,
    });
  };

  handleParticipantsChange = (value) => {
    this.setState({
      participants: value,
    });
  };

  handleActivityTypeChange = (value) => {
    this.setState({
      activityType: value,
    });
  };

  clearActivityType = () => {
    this.setState({
      activityType: null,
    });
  };

  saveFilters = () => {
    const { saveFilters } = this.props;
    const {
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    } = this.state;

    saveFilters({ priceRange, accessibilityRange, participants, activityType });
  };

  reinitializeStateFromProps = () => {
    const {
      savedPriceRange,
      savedAccessibilityRange,
      savedParticipants,
      savedActivityType,
    } = this.props;

    this.setState({
      priceRange: savedPriceRange,
      accessibilityRange: savedAccessibilityRange,
      participants: savedParticipants,
      activityType: savedActivityType,
    });
  };

  render() {
    const { goToMainScreen, clearFilters } = this.props;

    const {
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    } = this.state;

    return (
      <SC.PageWrapper centered>
        <SC.Button secondary onClick={goToMainScreen}>
          Back to Main
        </SC.Button>

        <SC.Paragraph>
          <SC.Text>Type:</SC.Text>
        </SC.Paragraph>
        <div style={{ width: 260, marginTop: 20 }}>
          <Select
            options={activityTypes}
            selectedOptionValue={activityType}
            onChange={this.handleActivityTypeChange}
            onClearSelection={this.clearActivityType}
          />
        </div>

        <SC.Paragraph>
          <SC.Text>price: {priceRange.map((el) => el.toFixed(2))}</SC.Text>
        </SC.Paragraph>
        <Range values={priceRange} onChange={this.handlePriceRangeChange} />

        <SC.Paragraph>
          <SC.Text>
            accessibility: {accessibilityRange.map((el) => el.toFixed(2))}
          </SC.Text>
        </SC.Paragraph>
        <Range
          values={accessibilityRange}
          onChange={this.handleAccessibilityRangeChange}
        />

        <div style={{ marginTop: 20 }}>
          <DigitPicker
            from={1}
            to={6}
            onChange={this.handleParticipantsChange}
            selected={participants}
          />
          <SC.Paragraph>
            <SC.Text>participants: {participants}</SC.Text>
          </SC.Paragraph>
        </div>
        <SC.Paragraph>
          <SC.Button onClick={this.saveFilters}>Save filters</SC.Button>
        </SC.Paragraph>
        <SC.Paragraph>
          <SC.Button onClick={clearFilters}>Clear filters</SC.Button>
        </SC.Paragraph>
        <SC.Paragraph>
          <SC.Button secondary onClick={this.reinitializeStateFromProps}>
            Reset filters
          </SC.Button>
        </SC.Paragraph>
      </SC.PageWrapper>
    );
  }
}

Filter.propTypes = {
  goToMainScreen: PropTypes.func.isRequired,
  savedPriceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  savedAccessibilityRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  savedParticipants: PropTypes.number,
  savedActivityType: PropTypes.string,
  saveFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  savedParticipants: null,
  savedActivityType: null,
};

export default Filter;
