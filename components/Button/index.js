import React from 'react';
import { View, TouchableNativeFeedback, TouchableHighlight, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';
import { colors } from '@happy/components/theme';

const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;

const Button = ({
  onPress,
  label,
  background,
  color,
  uppercaseLabel
}) => (
  <Touchable onPress={onPress}>
    <View style={[styles.button, { backgroundColor: background }]}>
      <Text.Bold
        color={color}
        size={20}>
        {uppercaseLabel ? label.toUpperCase() : label}
      </Text.Bold>
    </View>
  </Touchable>
);

Button.defaultProps = {
  onPress: () => {},
  label: '',
  background: colors.APP_PRIMARY,
  color: colors.WHITE,
  uppercaseLabel: false
};

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  uppercaseLabel: PropTypes.bool
};

Button.demoProps = {
  label: 'Test',
  onPress: () => {}
};

const RoundButton = (props) => (
  <Touchable
    onPress={props.onPress}
    underlayColor={colors.LIGHT_GREY}>
    <View style={styles.button}>
      <Text.Bold
        color={colors.GREY}
        size={20}>
        {props.label}
      </Text.Bold>
    </View>
  </Touchable>
);

Button.Round = RoundButton;


const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row'
  },
  button: {
    height: 60,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedButton: {
    borderRadius: 12
  }
});

export default Button;
