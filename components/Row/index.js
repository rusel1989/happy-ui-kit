import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Row = ({ style, children, justifyContent, alignItems, backgroundColor }) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems, justifyContent, backgroundColor }, style]}>
      {children}
    </View>
  );
};

Row.displayName = 'Row';

Row.contextTypes = {
  theme: PropTypes.object
};

Row.propTypes = {
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  children: PropTypes.node,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  backgroundColor: PropTypes.string
};

Row.defaultProps = {
  justifyContent: 'space-between',
  alignItems: 'center'
};

export default Row;
