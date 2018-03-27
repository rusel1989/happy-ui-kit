import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PropTypes from 'prop-types';

import Text from '../Text';
import { colors } from '../theme';

const renderText = (val, formatText) =>
  <Text.RobotoCondensed.Bold color='#37474F' size={20}>
    {formatText(val)}
  </Text.RobotoCondensed.Bold>;

const CircleChart = ({ value, size, lineWidth, showText, formatText, colors, spacing }) => {
  return (
    <AnimatedCircularProgress
      size={size}
      width={lineWidth}
      fill={value}
      rotation={0}
      linecap='round'
      friction={90000}
      {...colors}>
      {showText && (v => renderText(v, formatText))}
    </AnimatedCircularProgress>
  );
};

CircleChart.propTypes = {
  value: PropTypes.number,
  size: PropTypes.number,
  lineWidth: PropTypes.number,
  showText: PropTypes.bool,
  formatText: PropTypes.func,
  colors: PropTypes.shape({
    tintColor: PropTypes.string,
    backgroundColor: PropTypes.string
  }),
  spacing: PropTypes.number
};

CircleChart.defaultProps = {
  value: 0,
  size: 70,
  lineWidth: 6,
  showText: true,
  formatText: (v) => `${v.toFixed(0)}`,
  colors: { tintColor: colors.APP_PRIMARY, backgroundColor: colors.APP_LIGHT_GREY },
  spacing: 5
};

CircleChart.demoProps = [{
  size: 50,
  value: 90
}, {
  value: 80,
  size: 80,
  lineWidth: 10,
  showText: false,
  colors: { tintColor: colors.APP_DANGER, backgroundColor: colors.APP_LIGHT_GREY }
}, {
  value: 7,
  formatText: (v) => `${v.toFixed(0)} %`,
  colors: { tintColor: colors.APP_SUCCESS, backgroundColor: colors.APP_LIGHT_GREY }
}, {
  value: 50,
  lineWidth: 4,
  colors: { tintColor: colors.APP_PRIMARY, backgroundColor: colors.APP_INFO }

}];

CircleChart.noRef = true;

export default CircleChart;
