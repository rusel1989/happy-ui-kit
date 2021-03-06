import React from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';

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

HeaderButton.displayName = 'HeaderButton';

HeaderButton.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

HeaderButton.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  iconColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  width: PropTypes.number,
  height: PropTypes.number
};

HeaderButton.defaultProps = {
  onPress: () => {},
  iconName: 'arrow'
};

export default HeaderButton;
