import React from 'react';
import PropTypes from 'prop-types';

import Chip from '../Chip';
import Row from '../Row';

const ChipGroup = ({
  options,
  onSelect,
  value,
  justifyContent,
  animated
}) => (
  <Row justifyContent={justifyContent} style={{ marginHorizontal: -5 }}>
    {options.map((option, i) => (
      <Chip
        key={i}
        animated={animated}
        style={{ marginHorizontal: 5 }}
        onPress={onSelect}
        value={option}
        active={option === value} />
    ))}
  </Row>
);

ChipGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  value: PropTypes.string,
  justifyContent: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between']),
  animated: PropTypes.bool
};

ChipGroup.defaultProps = {
  options: [],
  onSelect: () => {},
  value: '',
  animated: false
};

ChipGroup.demoProps = {
  options: ['chip', 'selected chip', 'other chip'],
  value: 'selected chip'
};

export default ChipGroup;
