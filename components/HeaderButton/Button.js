import React from 'react';
import PropTypes from 'prop-types';

import BaseTheme from '../../theme/base';
import IconButton from '../IconButton';

const HeaderButton = ({ onPress, iconName, ...rest }, context) => {
  const { iconColor, backgroundColor, width, height } = context.mergeStyle('HeaderButton', rest);
  return (
    <IconButton
      onPress={onPress}
      backgroundColor={backgroundColor}
      style={{ width, height }}
      name={iconName}
      color={iconColor} />
  );
};

HeaderButton.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

HeaderButton.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

HeaderButton.defaultProps = {
  onPress: () => {},
  iconName: 'arrow',
  ...BaseTheme.HeaderButton
};

HeaderButton.demoProps = {
  iconColor: BaseTheme.palette.APP_PRIMARY
};

HeaderButton.displayName = 'HeaderButton';

export default HeaderButton;
