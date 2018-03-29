import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import { getImage } from '../../images';

const Icon = ({ style, color, name, size, ...rest }) => {
  return (
    <View style={style}>
      <Image
        {...rest}
        source={getImage(`icon-${name}`)}
        style={[ { tintColor: color }, size ? { width: size, height: size } : {} ]} />
    </View>
  );
};

Icon.displayName = 'Icon';

Icon.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Icon.propTypes = {
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  color: ExtraPropTypes.color,
  name: PropTypes.string,
  size: PropTypes.number
};

Icon.defaultProps = {};

export default Icon;
