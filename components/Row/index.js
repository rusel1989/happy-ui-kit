import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import BaseTheme from '../../theme/base';

const Row = ({ style, children, justifyContent, alignItems, backgroundColor }) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems, justifyContent, backgroundColor }, style]}>
      {children}
    </View>
  );
};

Row.contextTypes = {
  theme: PropTypes.object
};

Row.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string
};

Row.defaultProps = {
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: BaseTheme.palette.WHITE
};

const demoStyle = {
  backgroundColor: '#fff',
  height: 60,
  width: 100
};

Row.demoProps = [{
  style: demoStyle,
  children: <Text>flex-start | space-between</Text>,
  alignItems: 'flex-start'
}, {
  style: demoStyle,
  children: <Text>flex-end | space-between</Text>,
  alignItems: 'flex-end'
}, {
  style: demoStyle,
  children: <Text>center | flex-end</Text>,
  justifyContent: 'flex-end'
}];

export default Row;
