import React from 'react';
import PropTypes from 'prop-types';
import * as SC from '../styled-components';
import Range from '../components/Range/Range';
import DigitPicker from '../components/DigitPicker/DigitPicker';
import Select from '../components/Select/Select';
import { activityTypes } from './constants';

const Filter = ({
  goToMainScreen,
  priceRange,
  accessibilityRange,
  participants,
  activityType,
  handlePriceRangeChange,
  handleAccessibilityRangeChange,
  handleParticipantsChange,
  handleActivityTypeChange,
}) => (
  <SC.PageWrapper centered>
    <SC.Button onClick={goToMainScreen}>Back to Main</SC.Button>

    <SC.Paragraph>
      <SC.Text>Type:</SC.Text>
    </SC.Paragraph>
    <div style={{ width: 260, marginTop: 20 }}>
      <Select
        options={activityTypes}
        selectedOptionValue={activityType}
        onChange={handleActivityTypeChange}
      />
    </div>

    <SC.Paragraph>
      <SC.Text>price: {priceRange.map((el) => el.toFixed(2))}</SC.Text>
    </SC.Paragraph>
    <Range initialValues={priceRange} onChange={handlePriceRangeChange} />

    <SC.Paragraph>
      <SC.Text>
        accessibility: {accessibilityRange.map((el) => el.toFixed(2))}
      </SC.Text>
    </SC.Paragraph>
    <Range
      initialValues={accessibilityRange}
      onChange={handleAccessibilityRangeChange}
    />

    <div style={{ marginTop: 20 }}>
      <DigitPicker
        from={1}
        to={6}
        onChange={handleParticipantsChange}
        selected={participants}
      />
      <SC.Paragraph>
        <SC.Text>participants: {participants}</SC.Text>
      </SC.Paragraph>
    </div>
  </SC.PageWrapper>
);

Filter.propTypes = {
  goToMainScreen: PropTypes.func.isRequired,
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  accessibilityRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  participants: PropTypes.number,
  activityType: PropTypes.string,
  handlePriceRangeChange: PropTypes.func.isRequired,
  handleAccessibilityRangeChange: PropTypes.func.isRequired,
  handleParticipantsChange: PropTypes.func.isRequired,
  handleActivityTypeChange: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  participants: null,
  activityType: null,
};

export default Filter;
