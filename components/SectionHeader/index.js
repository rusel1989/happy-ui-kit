import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';

const SectionHeader = ({ title, uppercase }) => (
  <View style={styles.container}>
    <Text.Medium size={12}>{uppercase ? title.toUpperCase() : title}</Text.Medium>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 28,
    backgroundColor: '#ECEFF1',
    paddingHorizontal: 16,
    alignItems: 'center'
  }
});

SectionHeader.propTypes = {
  title: PropTypes.string,
  uppercase: PropTypes.bool
};

SectionHeader.defaultProps = {
  title: '',
  uppercase: true
};

SectionHeader.demoProps = {
  title: 'Section header'
};

export default SectionHeader;
