import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Touchable from '../Touchable';

const IconButton = ({ onPress, style, name, color }) => {
  return (
    <Touchable
      onPress={onPress}>
      <Icon
        style={[ styles.button, style ]}
        name={name}
        color={color} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: { width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }
});

IconButton.propTypes = {

};


export default IconButton;
