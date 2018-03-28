import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BaseTheme from '../../theme/base';
import Text from '../Text';

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
  alignItems: PropTypes.string,
  backgroundColor: PropTypes.string
};

Row.defaultProps = {
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: BaseTheme.palette.WHITE
};

const demoStyle = {
  height: 50,
  padding: 8,
  borderWidth: 1,
  borderColor: BaseTheme.palette.APP_BLACK
};

Row.demoProps = [
  { alignItems: 'center', justifyContent: 'flex-start' },
  { alignItems: 'flex-start', justifyContent: 'space-between' },
  { alignItems: 'center', justifyContent: 'center' },
  { alignItems: 'flex-end', justifyContent: 'flex-end' }
].map(({ alignItems, justifyContent }) => {
  return {
    style: demoStyle,
    backgroundColor: BaseTheme.palette.APP_LIGHT_GREY,
    children: (
      <Text.Monospace color={BaseTheme.palette.APP_BLACK} fontWeight='600' size={11}>
        {`<Row alignItems='${alignItems}'
  justifyContent='${justifyContent}' />`}
      </Text.Monospace>
    ),
    alignItems,
    justifyContent
  };
});

export default Row;
