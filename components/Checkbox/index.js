import React from 'react';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const Checkbox = ({ selected = false, style }) => {
  return selected ? (
    <Animatable.View animation='fadeIn'>
      <Icon
        name={'radio-active'}
        size={22}
        style={style} />
    </Animatable.View>
  ) : (
    <Animatable.View animation='fadeIn'>
      <Icon
        name={'radio-deafult'}
        size={22}
        style={style} />
    </Animatable.View>
  );
};

Checkbox.propTypes = {
  selected: PropTypes.bool,
  style: PropTypes.object
};

Checkbox.demoProps = [{
  selected: true
}, {
  selected: false
}];

export default Checkbox;
