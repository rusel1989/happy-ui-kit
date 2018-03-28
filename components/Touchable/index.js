import React from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity, Platform, TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';

import BaseTheme from '../../theme/base';

const TouchableView = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
const background = Platform.OS === 'android' ? TouchableNativeFeedback.Ripple(BaseTheme.palette.EXTRA_LIGHT_GREY, true) : null;

const createTouchable = (Component, touchableProps) => ({
  onPress,
  children,
  style,
  underlayColor
}) => {
  return (
    <Component
      style={style}
      onPress={onPress}
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

Touchable.contextTypes = {
  theme: PropTypes.object
};

Touchable.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.object
};

Touchable.defaultProps = {
  onPress: () => {}
};

Touchable.demoProps = {
  style: { padding: 16 },
  children: <Text>Touchable</Text>
};

Touchable.Highlight = createTouchable(TouchableHighlight, {});
Touchable.Highlight.displayName = 'Touchable.Highlight';

Touchable.Highlight.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  underlayColor: PropTypes.string
};

Touchable.Highlight.defaultProps = {
  onPress: () => {},
  underlayColor: BaseTheme.palette.EXTRA_LIGHT_GREY
};

Touchable.Highlight.demoProps = {
  style: { padding: 16 },
  children: <Text>Touchable Highlight</Text>
};

Touchable.subComponents = [
  Touchable.Highlight
];

export default Touchable;
