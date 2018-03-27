import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

const Overlay = ({ getRef, style, onPress, backgroundColor, animation, duration }) => (
  <Animatable.Text
    useNativeDriver
    ref={getRef}
    animation={animation}
    duration={duration}
    style={[ styles.overlay, { backgroundColor }, style ]}
    onPress={onPress} />
);

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject }
});

Overlay.displayName = 'Overlay';

Overlay.propTypes = {
  getRef: PropTypes.func,
  style: PropTypes.object,
  onPress: PropTypes.func,
  backgroundColor: PropTypes.string,
  animation: PropTypes.string,
  duration: PropTypes.number
};

Overlay.defaultProps = {
  getRef: () => {},
  onPress: () => {},
  backgroundColor: 'rgba(38,50,56,0.4)',
  animation: 'fadeIn',
  duration: 500
};

Overlay.demoProps = {
  style: { height: 200, position: 'relative' },
  duration: 3000
};

export default Overlay;
