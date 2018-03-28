import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PropTypes from 'prop-types';

import Text from '../Text';
import BaseTheme from '../../theme/base';

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
  textColor: PropTypes.string,
  formatText: PropTypes.func,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  linecap: PropTypes.string
};

CircleChart.defaultProps = {
  value: 100,
  formatText: (v) => `${v.toFixed(0)}`,
  ...BaseTheme.CircleChart
};

CircleChart.demoFlexDirection = 'row';

CircleChart.demoProps = [{
  size: 50,
  value: 90
}, {
  value: 80,
  size: 80,
  lineWidth: 10,
  showText: false,
  tintColor: BaseTheme.palette.APP_DANGER,
  backgroundColor: BaseTheme.palette.APP_LIGHT_GREY
}, {
  value: 7,
  formatText: (v) => `${v.toFixed(0)} %`,
  tintColor: BaseTheme.palette.APP_SUCCESS,
  backgroundColor: BaseTheme.palette.APP_LIGHT_GREY
}, {
  value: 50,
  lineWidth: 4,
  tintColor: BaseTheme.palette.APP_PRIMARY,
  backgroundColor: BaseTheme.palette.APP_INFO
}];

CircleChart.noRef = true;

export default CircleChart;
