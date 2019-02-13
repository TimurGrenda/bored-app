import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as SC from '../styled-components';
import Range from '../components/Range/Range';
import DigitPicker from '../components/DigitPicker/DigitPicker';
import Select from '../components/Select';
import { activityTypes } from '../constants/activityTypes';
import { nullOrNumber, nullOrString } from '../utils/customPropTypeValidation';
import NavigationButton from '../components/NavigationButton';
import { sortNumbersArrayAscending } from '../utils/sortNumbersArrayAscending';

class Filter extends PureComponent {
  constructor(props) {
    super(props);
    const {
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    } = this.props;

    this.state = {
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    };
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
    const { saveFilters, history } = this.props;
    const {
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    } = this.state;

    saveFilters({ priceRange, accessibilityRange, participants, activityType });
    history.push('/activity');
  };

  clearFilters = () => {
    const { initialFiltersStates } = this.props;
    this.setState(initialFiltersStates);
  };

  reinitializeStateFromProps = () => {
    const {
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    } = this.props;

    this.setState({
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    });
  };

  /* eslint-disable react/destructuring-assignment */
  areStateAndPropsEqual = () =>
    this.state.priceRange[0] === this.props.priceRange[0] &&
    this.state.priceRange[1] === this.props.priceRange[1] &&
    this.state.accessibilityRange[0] === this.props.accessibilityRange[0] &&
    this.state.accessibilityRange[1] === this.props.accessibilityRange[1] &&
    this.state.participants === this.props.participants &&
    this.state.activityType === this.props.activityType;
  /* eslint-enable react/destructuring-assignment */

  areStateAndInitialFiltersStatesEqual = () => {
    const { initialFiltersStates: initial } = this.props;
    const {
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    } = this.state;

    return (
      priceRange[0] === initial.priceRange[0] &&
      priceRange[1] === initial.priceRange[1] &&
      accessibilityRange[0] === initial.accessibilityRange[0] &&
      accessibilityRange[1] === initial.accessibilityRange[1] &&
      participants === initial.participants &&
      activityType === initial.activityType
    );
  };

  render() {
    const {
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    } = this.state;

    const stateAndPropsAreEqual = this.areStateAndPropsEqual();
    const stateAndInitialFiltersStatesAreEqual = this.areStateAndInitialFiltersStatesEqual();

    return (
      <SC.PageWrapper centered>
        <NavigationButton secondary to={'/activity'}>
          Back to activity
        </NavigationButton>

        <SC.Block>
          <SC.Text bold>Type:</SC.Text>
          <Select
            options={activityTypes}
            selectedOptionValue={activityType}
            onChange={this.handleActivityTypeChange}
            onClearSelection={this.clearActivityType}
            style={{ width: 200, marginTop: 20, marginLeft: 10 }}
          />
        </SC.Block>

        <SC.Block>
          <SC.Paragraph centered>
            <SC.Text bold>Price: </SC.Text>
            <SC.Text>
              {sortNumbersArrayAscending(priceRange)
                .map((el) => el.toFixed(2))
                .join(' - ')}
            </SC.Text>
          </SC.Paragraph>
          <Range values={priceRange} onChange={this.handlePriceRangeChange} />
        </SC.Block>

        <SC.Block>
          <SC.Paragraph centered noTopMargin>
            <SC.Text bold>Accessibility: </SC.Text>
            <SC.Text>
              {sortNumbersArrayAscending(accessibilityRange)
                .map((el) => el.toFixed(2))
                .join(' - ')}
            </SC.Text>
          </SC.Paragraph>
          <Range
            values={accessibilityRange}
            onChange={this.handleAccessibilityRangeChange}
          />
        </SC.Block>

        <SC.Block>
          <SC.Paragraph noTopMargin>
            <SC.Text bold>Participants: </SC.Text>
            <SC.Text>{participants || 'any'}</SC.Text>
          </SC.Paragraph>
          <DigitPicker
            from={1}
            to={6}
            onChange={this.handleParticipantsChange}
            selected={participants}
            style={{ marginTop: 10 }}
          />
        </SC.Block>

        <SC.Block marginTop={'30px'}>
          <SC.Button
            disabled={stateAndPropsAreEqual}
            onClick={this.saveFilters}
          >
            Save filters
          </SC.Button>
        </SC.Block>
        <SC.Block>
          <SC.Button
            disabled={stateAndInitialFiltersStatesAreEqual}
            secondary
            onClick={this.clearFilters}
          >
            Clear filters
          </SC.Button>
        </SC.Block>
        <SC.Block>
          <SC.Button
            disabled={stateAndPropsAreEqual}
            secondary
            onClick={this.reinitializeStateFromProps}
          >
            Reset to saved values
          </SC.Button>
        </SC.Block>
      </SC.PageWrapper>
    );
  }
}

const filtersPropTypes = {
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  accessibilityRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  participants: nullOrNumber.isRequired,
  activityType: nullOrString.isRequired,
};

Filter.propTypes = {
  ...filtersPropTypes,
  saveFilters: PropTypes.func.isRequired,
  initialFiltersStates: PropTypes.shape(filtersPropTypes).isRequired,
};

export default withRouter(Filter);
