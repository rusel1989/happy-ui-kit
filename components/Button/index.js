import React from 'react';
import { View, TouchableNativeFeedback, TouchableHighlight, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';
import BaseTheme from '../../theme/base';

const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;

const Button = ({
  onPress,
  label,
  ...rest
}, context) => {
  const { backgroundColor, color, uppercaseLabel, height, borderRadius, labelSize } = context.mergeStyle('Button', rest);
  return (
    <Touchable onPress={onPress}>
      <View style={[styles.button, { backgroundColor, height, borderRadius }]}>
        <Text.Bold
          color={color}
          size={labelSize}>
          {uppercaseLabel ? label.toUpperCase() : label}
        </Text.Bold>
      </View>
    </Touchable>
  );
};

Button.defaultProps = {
  onPress: () => {},
  label: '',
  ...BaseTheme.Button
};

Button.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  uppercaseLabel: PropTypes.bool,
  labelSize: PropTypes.number,
  borderRadius: PropTypes.number,
  height: PropTypes.number
};

Button.demoProps = [{
  label: 'Default Button'
}, {
  label: 'Custom Buttom',
  backgroundColor: BaseTheme.palette.APP_DARK_GREY,
  color: BaseTheme.palette.WHITE,
  borderRadius: 20,
  height: 40,
  labelSize: 14,
  uppercaseLabel: false
}];

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Button;
