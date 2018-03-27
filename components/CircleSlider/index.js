import React, {Component} from 'react';
import { PanResponder, View, StyleSheet } from 'react-native';
import { Svg } from 'expo';
import interpolate from 'color-interpolate';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';
import Text from '../Text';

const { Path, Circle, G } = Svg;

const styles = StyleSheet.create({
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class CircularSlider extends Component {
  constructor (props) {
    super(props);
    const { width, height, initialValue, meterColors } = props;
    const smallestSide = (Math.min(width, height));
    this.colormap = interpolate(meterColors);
    this.state = {
      cx: width / 2,
      cy: height / 2,
      r: (smallestSide / 2) * 0.85,
      value: initialValue
    };
  }

  componentWillMount = () => {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderEnd: this.handlePanResponderEnd
    });
  }

  polarToCartesian = (angle) => {
    const {cx, cy, r} = this.state;
    const a = (angle - 90) * Math.PI / 180.0;
    const x = cx + (r * Math.cos(a));
    const y = cy + (r * Math.sin(a));
    return {x, y};
  }

  cartesianToPolar = (x, y) => {
    const {cx, cy} = this.state;
    return Math.round((Math.atan((y - cy) / (x - cx))) / (Math.PI / 180) + ((x > cx) ? 90 : 270));
  }

  onValueChange = (value) => {
    this.setState({ value });
  }

  handlePanResponderEnd = () => {
    this.props.onValueSelected(this.state.value);
  }

  handlePanResponderMove = ({nativeEvent: {locationX, locationY}}) => {
    this.onValueChange(this.cartesianToPolar(locationX, locationY));
  }

  render () {
    const { width, height, meterWidth, textColor, textSize, railColor, railWidth, btnRadius, btnFill, btnStroke, btnStrokeWidth, formatValue } = this.props;
    const { cx, cy, r, value } = this.state;
    const startCoord = this.polarToCartesian(0);
    const endCoord = this.polarToCartesian(value);
    const handleCx = btnRadius - (meterWidth / 2);
    const meterColor = this.colormap(value / 360);

    return (
      <View style={{ alignSelf: 'center' }}>
        <View style={styles.textContainer}>
          <Text.CondensedRegular
            color={textColor}
            size={textSize}>
            {formatValue(value)}
          </Text.CondensedRegular>
        </View>
        <Svg
          onLayout={this.onLayout}
          width={width}
          height={height}>

          <Circle
            cx={cx}
            cy={cy}
            r={r}
            stroke={railColor}
            strokeWidth={railWidth}
            fill='none' />

          <Path
            stroke={meterColor}
            strokeWidth={meterWidth}
            strokeLinecap='round'
            fill='none'
            d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`} />

          <G
            x={endCoord.x - handleCx}
            y={endCoord.y - handleCx}>
            <Circle
              cx={handleCx}
              cy={handleCx}
              r={btnRadius}
              fill={btnFill}
              stroke={btnStroke}
              strokeWidth={btnStrokeWidth}
              fillOpacity={0.9}
              {...this._panResponder.panHandlers} />
            <Circle
              r={meterWidth / 2}
              cx={handleCx}
              cy={handleCx}
              fill={meterColor} />
          </G>
        </Svg>
      </View>
    );
  }
}

CircularSlider.propTypes = {
  btnRadius: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  btnFill: PropTypes.string,
  btnStroke: PropTypes.string,
  btnStrokeWidth: PropTypes.number,
  railWidth: PropTypes.number,
  railColor: PropTypes.string,
  meterWidth: PropTypes.number,
  meterColor: PropTypes.string,
  meterColors: PropTypes.arrayOf(PropTypes.string),
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  initialValue: PropTypes.number,
  onValueSelected: PropTypes.func,
  formatValue: PropTypes.func
}

CircularSlider.defaultProps = {
  width: 120,
  height: 120,
  btnRadius: 15,
  btnFill: '#ddd',
  btnStroke: 'transparent',
  btnStrokeWidth: 0,
  railWidth: 10,
  railColor: colors.LIGHT_GREY,
  meterWidth: 10,
  meterColor: '#0cd',
  meterColors: [colors.APP_DANGER, colors.APP_SUCCESS],
  textColor: colors.DARK_GREY,
  textSize: 58,
  initialValue: 0,
  onValueSelected: () => {},
  formatValue: (v) => `${(v / 36).toFixed(1)}`
};

CircularSlider.demoProps = {
  width: 150,
  height: 150,
  textSize: 40
};

export default CircularSlider;
