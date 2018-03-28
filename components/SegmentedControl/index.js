import React from 'react';
import { View } from 'react-native';
import SegmentedControl from 'react-native-segmented-control-tab';
import PropTypes from 'prop-types';

import BaseTheme from '../../theme/base';
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
CustomSegmentedControl.displayName = 'SegmentedControls';

CustomSegmentedControl.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

CustomSegmentedControl.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  selectedIndex: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  spacingVertical: PropTypes.number,
  spacingHorizontal: PropTypes.number
};

CustomSegmentedControl.defaultProps = {
  onChange: () => {},
  options: [],
  selectedIndex: 0,
  ...BaseTheme.SegmentedControl
};

export default CustomSegmentedControl;
