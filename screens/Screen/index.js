import React from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import BaseTheme from '../../theme/base';
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
    backgroundColor: BaseTheme.palette.APP_BACKGROUND
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: BaseTheme.palette.PINK
  }
});

Screen.contextTypes = {
  theme: PropTypes.object
};

Screen.propTypes = {

};

export default Screen;
