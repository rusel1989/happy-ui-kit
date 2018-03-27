import React from 'react';
import { View, StyleSheet } from 'react-native';
import SegmentedControl from 'react-native-segmented-control-tab';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';
import { toTitleCase } from '@happy/utils';

const CustomSegmentedControl = ({
  onChange,
  options = [],
  selectedIndex = 0,
  tintColor = colors.APP_BLACK
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

};

export default CustomSegmentedControl;
