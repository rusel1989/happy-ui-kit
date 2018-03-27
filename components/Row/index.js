import React from 'react';
import { View } from 'react-native';

const Row = ({ style, children, justifyContent = 'space-between', alignItems = 'center' }) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems, justifyContent }, style]}>
      {children}
    </View>
  );
};

Row.propTypes = {

};

export default Row;
