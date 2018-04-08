import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';

import Text from '../Text';

const renderText = (val, formatText, { textSize, textColor }) =>
  <Text.RobotoCondensed.Bold color={textColor} size={textSize}>
    {formatText(val)}
  </Text.RobotoCondensed.Bold>;

const CircleChart = ({ value, formatText, ...rest }, context) => {
  const { size, lineWidth, linecap, rotation, backgroundColor, tintColor, showText, textSize, textColor } = context.mergeStyle('CircleChart', rest);
  return (
    <AnimatedCircularProgress
      size={size}
      width={lineWidth}
      fill={value}
      rotation={rotation}
      linecap={linecap}
      tintColor={tintColor}
      backgroundColor={backgroundColor}>
      {showText && (v => renderText(v, formatText, { textSize, textColor }))}
    </AnimatedCircularProgress>
  );
};

CircleChart.displayName = 'CircleChart';

CircleChart.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

CircleChart.propTypes = {
  value: PropTypes.number,
  size: PropTypes.number,
  lineWidth: PropTypes.number,
  showText: PropTypes.bool,
  textSize: PropTypes.number,
  textColor: ExtraPropTypes.color,
  formatText: PropTypes.func,
  tintColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  rotation: PropTypes.number,
  linecap: PropTypes.string
};

CircleChart.defaultProps = {
  value: 100,
  formatText: (v) => `${v.toFixed(0)}`
};

export default CircleChart;
