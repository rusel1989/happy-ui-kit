import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import BaseTheme from '../../theme/base';

const Overlay = ({ getRef, style, onPress, ...rest }, context) => {
  const { backgroundColor, animation, duration } = context.mergeStyle('Overlay', rest);
  return (
    <Animatable.Text
      useNativeDriver
      ref={getRef}
      animation={animation}
      duration={duration}
      style={[ { ...StyleSheet.absoluteFillObject, backgroundColor }, style ]}
      onPress={onPress} />
  );
};

Overlay.displayName = 'Overlay';

Overlay.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Overlay.propTypes = {
  getRef: PropTypes.func,
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  onPress: PropTypes.func,
  backgroundColor: ExtraPropTypes.color,
  animation: PropTypes.string,
  duration: PropTypes.number
};

Overlay.defaultProps = {
  getRef: () => {},
  onPress: () => {},
  ...BaseTheme.Overlay
};

export default Overlay;
