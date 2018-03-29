import React from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity, Platform, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import BaseTheme from '../../theme/base';

const TouchableView = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
const background = Platform.OS === 'android' ? TouchableNativeFeedback.Ripple(BaseTheme.palette.APP_LIGHT_GREY, true) : null;

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

Touchable.displayName = 'Touchable';

Touchable.contextTypes = {
  theme: PropTypes.object
};

Touchable.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ])
};

Touchable.defaultProps = {
  onPress: () => {}
};

Touchable.Highlight = createTouchable(TouchableHighlight, {});
Touchable.Highlight.displayName = 'Touchable.Highlight';

Touchable.Highlight.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  underlayColor: ExtraPropTypes.color
};

Touchable.Highlight.defaultProps = {
  onPress: () => {},
  underlayColor: BaseTheme.palette.EXTRA_LIGHT_GREY
};

export default Touchable;
