import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../theme';
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
  style: PropTypes.object,
  color: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number
};

Icon.defaultProps = {
};

Icon.demoProps = [{
  name: 'arrow', color: colors.APP_PRIMARY },
{ name: 'back', color: colors.APP_PRIMARY },
{ name: 'calendar', color: colors.APP_PRIMARY },
{ name: 'category', color: colors.APP_PRIMARY },
{ name: 'error', color: colors.APP_PRIMARY },
{ name: 'files', color: colors.APP_PRIMARY },
{ name: 'meeting', color: colors.APP_PRIMARY },
{ name: 'menu', color: colors.APP_PRIMARY },
{ name: 'message', color: colors.APP_PRIMARY },
{ name: 'more', color: colors.APP_PRIMARY },
{ name: 'news', color: colors.APP_PRIMARY },
{ name: 'notification', color: colors.APP_PRIMARY },
{ name: 'personal', color: colors.APP_PRIMARY },
{ name: 'photos', color: colors.APP_PRIMARY },
{ name: 'plus', color: colors.APP_PRIMARY },
{ name: 'poster', color: colors.APP_PRIMARY },
{ name: 'profile', color: colors.APP_PRIMARY },
{ name: 'program', color: colors.APP_PRIMARY },
{ name: 'pulls', color: colors.APP_PRIMARY },
{ name: 'question', color: colors.APP_PRIMARY },
{ name: 'remove', color: colors.APP_PRIMARY },
{ name: 'save', color: colors.APP_PRIMARY },
{ name: 'settings', color: colors.APP_PRIMARY },
{ name: 'time', color: colors.APP_PRIMARY
}];

export default Icon;
