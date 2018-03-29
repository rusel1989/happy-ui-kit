import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import Col from '../Col';
import Touchable from '../Touchable';
import BaseTheme from '../../theme/base';

const Button = ({
  onPress,
  label,
  fullWidth,
  align,
  style,
  ...rest
}, context) => {
  const { backgroundColor, color, uppercaseLabel, height,
    borderRadius, labelSize, spacingHorizontal } = context.mergeStyle('Button', rest);
  return (
    <Col style={{ backgroundColor, height, borderRadius, alignSelf: fullWidth ? null : align, paddingHorizontal: spacingHorizontal, ...style }}>
      <Touchable onPress={onPress}>
        <Text.Bold
          color={color}
          size={labelSize}>
          {uppercaseLabel ? label.toUpperCase() : label}
        </Text.Bold>
      </Touchable>
    </Col>
  );
};

Button.displayName = 'Button';

Button.defaultProps = {
  onPress: () => {},
  label: '',
  fullWidth: true,
  align: 'center',
  ...BaseTheme.Button
};

Button.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  uppercaseLabel: PropTypes.bool,
  labelSize: PropTypes.number,
  borderRadius: PropTypes.number,
  height: PropTypes.number,
  spacingHorizontal: PropTypes.number
};

export default Button;
