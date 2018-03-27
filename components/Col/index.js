import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const Col = ({ style, children, justifyContent, alignItems }) => {
  return (
    <View style={[{ flexDirection: 'column', alignItems, justifyContent }, style]}>
      {children}
    </View>
  );
};

Col.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string
};

Col.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center'
};

const demoStyle = {
  backgroundColor: '#fff',
  height: 60
};

Col.demoProps = [{
  style: demoStyle,
  children: <Text>flex-start | stretch</Text>,
  justifyContent: 'flex-start',
  alignItems: 'stretch'
}, {
  style: demoStyle,
  children: <Text>center | stretch</Text>,
  alignItems: 'stretch'
}, {
  style: demoStyle,
  children: <Text>flex-end | center</Text>,
  justifyContent: 'flex-end'
}];

export default Col;
