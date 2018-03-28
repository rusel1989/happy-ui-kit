import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import BaseTheme from '../../theme/base';
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
  style: PropTypes.object,
  color: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number
};

Icon.defaultProps = {};

Icon.demoFlexDirection = 'row';

Icon.demoProps = [
  { name: 'arrow', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'back', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'calendar', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'category', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'error', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'files', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'meeting', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'menu', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'message', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'more', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'news', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'notification', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'personal', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'photos', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'plus', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'poster', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'profile', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'program', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'pulls', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'question', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'remove', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'save', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'settings', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'time', color: BaseTheme.palette.APP_PRIMARY }
];

export default Icon;
