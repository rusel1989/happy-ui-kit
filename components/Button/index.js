import React from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';

import Text from '../Text';
import Col from '../Col';
import Row from '../Row';
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
  const { backgroundColor, labelColor, labelFont, labelFontWeight, uppercaseLabel, height,
    borderRadius, labelSize, spacingHorizontal, raised } = context.mergeStyle('Button', rest);
  return (
    <Col
      alignItems='stretch'
      justifyContent='center'
      style={{ backgroundColor, borderRadius, alignSelf: fullWidth ? null : align, overflow: 'hidden', elevation: raised ? 2 : null }}>
      <Touchable onPress={onPress}>
        <Row style={{ height, paddingHorizontal: spacingHorizontal }} justifyContent='center'>
          <Text.Custom
            fontFamily={labelFont}
            fontWeight={labelFontWeight}
            color={labelColor}
            size={labelSize}>
            {uppercaseLabel ? label.toUpperCase() : label}
          </Text.Custom>
        </Row>
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
  backgroundColor: ExtraPropTypes.color,
  borderRadius: PropTypes.number,
  height: PropTypes.number,
  spacingHorizontal: PropTypes.number,
  raised: PropTypes.bool,
  fullWidth: PropTypes.bool,
  align: PropTypes.string,
  label: PropTypes.string,
  labelColor: ExtraPropTypes.color,
  labelSize: PropTypes.number,
  labelFont: PropTypes.string,
  labelFontWeight: PropTypes.string,
  uppercaseLabel: PropTypes.bool
};

export default Button;
