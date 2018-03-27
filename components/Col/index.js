import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Col = ({ style, children, justifyContent = 'center', alignItems = 'center' }) => {
  return (
    <View style={[{ flexDirection: 'column', alignItems, justifyContent }, style]}>
      {children}
    </View>
  );
};

Col.propTypes = {

};

export default Col;
