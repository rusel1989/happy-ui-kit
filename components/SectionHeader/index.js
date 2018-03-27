import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';

const SectionHeader = ({ title = '', onPress }) => (
  <View style={styles.container}>
    <Text.Medium size={12}>{title.toUpperCase()}</Text.Medium>
  </View>
);

SectionHeader.defaultProps = {
  onPress: () => {}
};

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

};


export default SectionHeader;
