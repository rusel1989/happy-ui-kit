import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

const Overlay = ({ getRef = () => {}, style, onPress = () => {} }) => (
  <Animatable.Text
    useNativeDriver
    ref={getRef}
    animation='fadeIn'
    style={[ styles.overlay, style ]}
    onPress={onPress} />
);

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(38,50,56,0.4)' }
});

Overlay.propTypes = {

};

export default Overlay;
