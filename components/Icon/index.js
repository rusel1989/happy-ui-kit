import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { getImage } from '../../images';

const Icon = ({ style, color, name, size, ...rest }) => (
  <View style={style}>
    <Image
      {...rest}
      source={getImage(`icon-${name}`)}
      style={[ { tintColor: color }, size ? { width: size, height: size } : {} ]} />
  </View>
);

Icon.propTypes = {

};

export default Icon;
