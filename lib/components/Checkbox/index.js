import React from 'react';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import Icon from '../Icon';
import BaseTheme from '../../theme/base';

const Checkbox = ({ selected, ...rest }, context) => {
  const { animation, iconSize, selectedTintColor, tintColor,
    selectedIcon, icon } = context.mergeStyle('Checkbox', rest);
  return selected ? (
    <Animatable.View animation={animation}>
      <Icon
        name={selectedIcon}
        color={selectedTintColor}
        size={iconSize} />
    </Animatable.View>
  ) : (
    <Animatable.View animation={animation}>
      <Icon
        name={icon}
        color={tintColor}
        size={iconSize} />
    </Animatable.View>
  );
};

Checkbox.displayName = 'Checkbox';

Checkbox.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Checkbox.propTypes = {
  selected: PropTypes.bool,
  selectedIcon: PropTypes.string,
  selectedTintColor: ExtraPropTypes.color,
  animation: PropTypes.string,
  icon: PropTypes.string,
  tintColor: ExtraPropTypes.color,
  iconSize: PropTypes.number
};

Checkbox.defaultProps = {
  selected: false
};

export default Checkbox;
