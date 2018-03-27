import React from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';
import Col from '../Col';

const Screen = ({ children, style, justifyContent = 'flex-start', alignItems = 'stretch', ...rest }) => (
  <Col
    alignItems={alignItems}
    justifyContent={justifyContent}
    style={[styles.container, style]}
    {...rest}>
    {children}
  </Col>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.APP_BACKGROUND
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: colors.PINK
  }
});

Screen.propTypes = {

};


export default Screen;
