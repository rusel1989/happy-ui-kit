import React from 'react';
import { Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';

import * as fonts from '../../fonts';
import BaseTheme from '../../theme/base';

const monospaceFont = Platform.OS === 'ios' ? 'Courier' : 'monospace';
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
const fontSizes = {
  xsmall: 10,
  small: 12,
  default: 14,
  medium: 16,
  large: 18,
  xlarge: 20
};

const AppText = ({ children, ...rest }) => {
  return (
    <Text
      {...rest}>
      {children}
    </Text>
  );
};

AppText.displayName = 'AppText';

AppText.contextTypes = {
  theme: PropTypes.object
};

AppText.propTypes = Text.propTypes;

AppText.demoProps = {
  children: 'System text',
  style: { padding: 8 }
};

const CustomText = ({
  children,
  style,
  ...rest
}, context) => {
  const {
    size,
    color,
    fontFamily,
    fontWeight,
    textAlign
  } = context.mergeStyle('Text', rest);
  return (
    <AppText
      style={[ { fontSize: fontSizes[size] || size, color, fontWeight, fontFamily, textAlign }, style ]}
      {...rest}>
      {children}
    </AppText>);
};

CustomText.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

CustomText.propTypes = {
  ...Text.propTypes,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.oneOf([ '100', '200', '300', '400', '500', '600', '700', '800', '900' ]),
  style: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node
};

CustomText.displayName = 'CustomText';

CustomText.defaultProps = {
  ...BaseTheme.Text
};

CustomText.demoProps = {
  size: 'xlarge',
  fontWeight: fontWeights.Bold,
  color: BaseTheme.palette.APP_SUCCESS,
  style: { padding: 8 },
  children: 'Custom text'
};

AppText.Custom = CustomText;

const createTextComponent = (fontFamily, fontWeight) => (props) =>
  <CustomText fontWeight={fontWeight} {...props} fontFamily={fontFamily} />;

keys(fonts[Platform.OS]).forEach((key) => {
  const [ family, weight ] = key.split('-');
  if (!AppText[family]) {
    AppText[family] = {};
  }
  AppText[family][weight] = createTextComponent(key);
  AppText[family][weight].displayName = `${AppText.displayName}.${family}.${weight}`;
});

keys(fontWeights).forEach((key) => {
  AppText[key] = createTextComponent('System', fontWeights[key]);
  AppText[key].displayName = `${AppText.displayName}.${key}`;
});

AppText.Monospace = createTextComponent(monospaceFont);
AppText.Monospace.displayName = `${AppText.displayName}.Monospace`;

AppText.Monospace.demoProps = {
  children: 'Monospace text',
  style: { padding: 8 }
};

AppText.subComponents = [
  CustomText,
  AppText.ExtraLight,
  AppText.Light,
  AppText.Book,
  AppText.Regular,
  AppText.Medium,
  AppText.Semibold,
  AppText.Bold,
  AppText.Black,
  AppText.ExtraBlack,
  AppText.Monospace
];

export default AppText;
