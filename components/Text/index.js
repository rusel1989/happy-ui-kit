import React from 'react';
import { Text, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';

const fontWeights = {
  ExtraLight: '100',
  Light: '200',
  Book: '300',
  Regular: '400',
  Medium: '500',
  Semibold: '600',
  Bold: '700',
  Black: '800',
  ExtraBlack: '900'
};

const platformFontMap = Platform.select({
  android: {
    Bold: { fontFamily: 'Roboto-Bold' },
    Regular: { fontFamily: 'Roboto-Regular' },
    Medium: { fontFamily: 'Roboto-Medium' },
    Black: { fontFamily: 'Roboto-Black' },
    Semibold: { fontFamily: 'Roboto-Medium' },
    Light: { fontWeight: fontWeights.Light }
  },
  ios: {
    Light: { fontWeight: fontWeights.Light },
    Bold: { fontWeight: fontWeights.Bold },
    Regular: { fontWeight: fontWeights.Regular },
    Medium: { fontWeight: fontWeights.Medium },
    Semibold: { fontWeight: fontWeights.Semibold },
    Black: { fontWeight: fontWeights.Black },
    DisplayRegular: { fontWeight: fontWeights.Regular },
    DisplaySemibold: { fontWeight: fontWeights.Semibold }
  }
});

const fontMap = {
  ...platformFontMap,
  CondensedBold: { fontFamily: 'RobotoCondensed-Bold' },
  CondensedRegular: { fontFamily: 'RobotoCondensed-Regular' },
  RobotoRegular: { fontFamily: 'Roboto-Regular' }
};

const AppText = ({ children, ...rest }) => {
  return (
    <Text {...rest}>
      {children}
    </Text>
  );
};

Object.keys(fontMap).map(key => {
  AppText[key] = ({ size = 14, color = colors.DARK_GREY, style, children, ...rest }) => (
    <AppText
      style={[ { fontSize: size, color, ...fontMap[key] }, style ]}
      {...rest}>
      {children}
    </AppText>);
});

AppText.propTypes = {

};

export default AppText;
