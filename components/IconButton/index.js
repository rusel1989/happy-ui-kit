import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Touchable from '../Touchable';

const IconButton = ({ onPress, style, name, color, size, iconSize }) => {
  return (
    <Touchable
      onPress={onPress}>
      <Icon
        style={[ styles.button, size ? { width: size, height: size } : {}, style ]}
        name={name}
        size={iconSize}
        color={color} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: { width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }
});

IconButton.displayName = 'IconButton';

IconButton.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

IconButton.propTypes = {
  style: PropTypes.object,
  color: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  iconSize: PropTypes.number,
  onPress: PropTypes.func
};

IconButton.defaultProps = {
  onPress: () => {},
  size: 60
};

IconButton.demoProps = [];

export default IconButton;
