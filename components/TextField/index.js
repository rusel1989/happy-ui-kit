import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

const TextField = ({ style, getRef, ...rest }) => (
  <TextInput
    ref={getRef}
    underlineColorAndroid='transparent'
    style={[ { fontSize: 16 }, style ]}
    {...rest} />
);

TextField.propTypes = {
  ...TextInput.propTypes,
  getRef: PropTypes.func
};

TextField.demoProps = {
  padding: 16,
  placeholder: 'Text field'
};

export default TextField;
