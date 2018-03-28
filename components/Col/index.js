import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import BaseTheme from '../../theme/base';

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

const demoStyle = {
  height: 100,
  padding: 8,
  borderWidth: 1,
  borderColor: BaseTheme.palette.APP_BLACK
};

Col.demoProps = [
  { alignItems: 'center', justifyContent: 'flex-start' },
  { alignItems: 'flex-end', justifyContent: 'center' }
].map(({ alignItems, justifyContent }) => {
  return {
    style: demoStyle,
    backgroundColor: BaseTheme.palette.APP_LIGHT_GREY,
    children: (
      <Text.Monospace color={BaseTheme.palette.APP_BLACK} fontWeight='600' size={11}>
        {`<Col alignItems='${alignItems}'
  justifyContent='${justifyContent}' />`}
      </Text.Monospace>
    ),
    alignItems,
    justifyContent
  };
});

export default Col;
