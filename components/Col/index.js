import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Col = ({ style, children, justifyContent, alignItems, backgroundColor }) => {
  return (
    <View style={[{ flexDirection: 'column', alignItems, justifyContent, backgroundColor }, style]}>
      {children}
    </View>
  );
};

Col.contextTypes = {
  theme: PropTypes.object
};

Col.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  backgroundColor: PropTypes.string
};

Col.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center'
};

export default Col;
