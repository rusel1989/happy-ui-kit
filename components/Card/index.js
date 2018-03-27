import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';

const Card = ({ children, style }) => (
  <View style={[ styles.content, style ]}>
    {children}
  </View>
);

Card.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node
};

Card.demoProps = {
  children: <Text>Card content</Text>
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.WHITE
  }
});

export default Card;
