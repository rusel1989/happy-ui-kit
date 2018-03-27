import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

const TextField = ({ style, getRef, ...rest }) => (
  <TextInput ref={getRef} underlineColorAndroid='transparent' style={[ { fontSize: 16 }, style ]} {...rest} />
);

TextField.propTypes = {

};

export default TextField;
