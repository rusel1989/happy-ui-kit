import React from 'react';
import { View } from 'react-native';
import SegmentedControl from 'react-native-segmented-control-tab';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';

import { toTitleCase } from '../../utils';

const CustomSegmentedControl = ({
  onChange,
  options,
  selectedIndex,
  ...rest
}, context) => {
  const { tintColor, textSize, backgroundColor, spacingVertical, spacingHorizontal } = context.mergeStyle('SegmentedControl', rest);
  return (
    <View style={{ paddingHorizontal: spacingHorizontal, backgroundColor, paddingVertical: spacingVertical }}>
      <SegmentedControl
        activeTabStyle={{ backgroundColor: tintColor }}
        onTabPress={i => onChange(i)}
        selectedIndex={selectedIndex}
        tabStyle={{ borderColor: tintColor }}
        tabTextStyle={{ color: tintColor, fontSize: textSize }}
        values={options.map(o => toTitleCase(o))} />
    </View>
  );
};
CustomSegmentedControl.displayName = 'SegmentedControl';

CustomSegmentedControl.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

CustomSegmentedControl.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  selectedIndex: PropTypes.number,
  tintColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  spacingVertical: PropTypes.number,
  spacingHorizontal: PropTypes.number
};

CustomSegmentedControl.defaultProps = {
  onChange: () => {},
  options: [],
  selectedIndex: 0
};

export default CustomSegmentedControl;
