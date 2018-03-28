import React from 'react';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import BaseTheme from '../../theme/base';

const Checkbox = ({ selected, ...rest }, context) => {
  const { animation, size, selectedTintColor, tintColor, selectedIcon, icon } = context.mergeStyle('Checkbox', rest);
  return selected ? (
    <Animatable.View animation={animation}>
      <Icon
        name={selectedIcon}
        color={selectedTintColor}
        size={size} />
    </Animatable.View>
  ) : (
    <Animatable.View animation={animation}>
      <Icon
        name={icon}
        color={tintColor}
        size={size} />
    </Animatable.View>
  );
};

Checkbox.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Checkbox.propTypes = {
  selected: PropTypes.bool,
  selectedIcon: PropTypes.string,
  selectedTintColor: PropTypes.string,
  animation: PropTypes.string,
  icon: PropTypes.string,
  tintColor: PropTypes.string
};

Checkbox.defaultProps = {
  selected: false,
  ...BaseTheme.Checkbox
};

Checkbox.demoFlexDirection = 'row';

Checkbox.demoProps = [{
  selected: true
}, {
  selected: false
}, {
  selected: true,
  selectedIcon: 'save',
  selectedTintColor: 'green',
  animation: 'zoomIn'
}, {
  selected: false,
  tintColor: 'red',
  icon: 'remove'
}];

export default Checkbox;
