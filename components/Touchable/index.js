import React from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity, Platform, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';

const TouchableView = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
const background = Platform.OS === 'android' ? TouchableNativeFeedback.Ripple(colors.EXTRA_LIGHT_GREY, true) : null;

const createTouchable = (Component, touchableProps) => ({
  onPress,
  children,
  style,
  underlayColor = colors.EXTRA_LIGHT_GREY,
  hitSlop
}) => {
  return (
    <Component
      onPress={onPress}
      {...touchableProps}
      hitSlop={hitSlop}
      style={style}
      underlayColor={underlayColor}>
      <View>
        {children}
      </View>
    </Component>
  );
};

const Touchable = createTouchable(TouchableView, {
  background,
  activeOpacity: 1
});

Touchable.Highlight = createTouchable(TouchableHighlight, {
  underlayColor: colors.EXTRA_LIGHT_GREY
});

Touchable.propTypes = {

};

export default Touchable;
