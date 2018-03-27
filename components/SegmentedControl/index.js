import React from 'react';
import { View, StyleSheet } from 'react-native';
import SegmentedControl from 'react-native-segmented-control-tab';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';
import { toTitleCase } from '@happy/utils';

const CustomSegmentedControl = ({
  onChange,
  options,
  selectedIndex,
  tintColor
}) => {
  return (
    <View style={styles.container}>
      <SegmentedControl
        activeTabStyle={{ backgroundColor: tintColor }}
        onTabPress={i => onChange(i)}
        selectedIndex={selectedIndex}
        tabStyle={{ borderColor: tintColor }}
        tabTextStyle={{ color: tintColor }}
        values={options.map(o => toTitleCase(o))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: colors.WHITE }
});

CustomSegmentedControl.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  selectedIndex: PropTypes.number,
  tintColor: PropTypes.string
};

CustomSegmentedControl.defaultProps = {
  onChange: () => {},
  options: [],
  selectedIndex: 0,
  tintColor: colors.APP_BLACK
};

CustomSegmentedControl.demoProps = {
  onChange: (i) => console.log(`selected ${i}`),
  options: ['Segmented', 'Control'],
  tintColor: colors.APP_PRIMARY
};

export default CustomSegmentedControl;
