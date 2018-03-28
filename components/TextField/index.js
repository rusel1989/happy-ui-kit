import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

import BaseTheme from '../../theme/base';

const TextField = ({ style, getRef, onChangeText, placeholder, ...rest }, context) => {
  const { textColor, textSize, backgroundColor, font, borderRadius, borderColor,
    borderWidth, spacingVertical, spacingHorizontal } = context.mergeStyle('TextField', rest);
  return (
    <TextInput
      ref={getRef}
      placeholder={placeholder}
      onChangeText={onChangeText}
      underlineColorAndroid='transparent'
      style={[ { fontSize: textSize, color: textColor, backgroundColor, fontFamily: font, borderRadius, borderWidth, borderColor, paddingVertical: spacingVertical, paddingHorizontal: spacingHorizontal }, style ]} />
  );
};

TextField.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

TextField.propTypes = {
  getRef: PropTypes.func,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  font: PropTypes.string,
  borderRadius: PropTypes.number,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  spacingVertical: PropTypes.number,
  spacingHorizontal: PropTypes.number
};

TextField.defaultProps = {
  ...BaseTheme.TextField
};

export default TextField;
