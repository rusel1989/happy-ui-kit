import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

const Col = ({ style, children, justifyContent, alignItems, backgroundColor }) => {
  return (
    <View style={[{ flexDirection: 'column', alignItems, justifyContent, backgroundColor }, style]}>
      {children}
    </View>
  );
};

Col.displayName = 'Col';

Col.contextTypes = {
  theme: PropTypes.object
};

Col.propTypes = {
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  children: PropTypes.node,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  backgroundColor: ExtraPropTypes.color
};

Col.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center'
};

export default Col;
