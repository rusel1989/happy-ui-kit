import React from 'react';
import PropTypes from 'prop-types';

import Chip from '../Chip';
import Row from '../Row';
import BaseTheme from '../../theme/base';

const ChipGroup = ({
  options,
  onPress,
  value,
  selectable,
  justifyContent,
  ...rest
}, context) => {
  const { spacingHorizontal, animated } = context.mergeStyle('ChipGroup', rest);
  return (
    <Row justifyContent={justifyContent} style={{ marginHorizontal: -spacingHorizontal }}>
      {options.map((option, i) => (
        <Chip
          key={i}
          animated={animated}
          spacingHorizontal={spacingHorizontal}
          onPress={onPress}
          label={option}
          active={selectable && option === value} />
      ))}
    </Row>
  );
};

ChipGroup.displayName = 'ChipGroup';

ChipGroup.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

ChipGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  value: PropTypes.string,
  justifyContent: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between']),
  animated: PropTypes.bool,
  spacingHorizontal: PropTypes.number
};

ChipGroup.defaultProps = {
  options: [],
  onSelect: () => {},
  value: '',
  selectable: true,
  justifyContent: 'flex-start',
  ...BaseTheme.ChipGroup
};

ChipGroup.demoProps = {
  options: ['chip', 'selected chip', 'other chip'],
  value: 'selected chip'
};

export default ChipGroup;
