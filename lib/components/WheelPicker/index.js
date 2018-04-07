import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import BaseTheme from '../../theme/base';
import Text from '../Text';
import ScrollPicker from './ScrollPicker';
import Row from '../Row';
import Col from '../Col';

const renderItem = ({ data, index, isSelected, selectedTextColor, selectedTextSize, textColor, textSize }) => {
  if (isSelected) {
    return (
      <Text.Medium
        size={selectedTextSize}
        color={selectedTextColor}>
        {data}
      </Text.Medium>);
  } else {
    return (
      <Text.Regular
        size={textSize}
        color={textColor}>
        {data}
      </Text.Regular>);
  }
};

class WheelPicker extends Component {
  constructor (props) {
    super(props);
    const initialState = {};
    props.wheels.forEach((wheel) => { initialState[wheel.id] = this.getValue(wheel.id); });
    this.state = {
      ...initialState
    };
  }

  onWheelChange = (id, data) => {
    this.setState({ [id]: data }, () => {
      this.props.onChange(this.state);
    });
  }

  getValue = (id) => {
    return this.props.value ? (this.props.value[id] || this.props.value) : '0';
  }

  render () {
    const { height, backgroundColor, wheelWidth, itemHeight, highlightColor, spacingHorizontal, wheelSpacing, selectedItemBorderColor,
      selectedItemBorderWidth, selectedItemBorderRadius, ...rest } = this.context.mergeStyle('WheelPicker', this.props);
    return (
      <Row
        ref={this.setPickerRef}
        justifyContent='center'
        backgroundColor={backgroundColor}
        style={{ height, overflow: 'hidden' }}>
        {
          this.props.wheels.map(({ id, values }, index) => (
            <Col alignItems='stretch' style={{ width: wheelWidth, marginHorizontal: wheelSpacing }} key={id}>
              <ScrollPicker
                style={{ width: wheelWidth }}
                dataSource={values}
                selectedIndex={values.indexOf(this.getValue(id))}
                itemHeight={itemHeight}
                wrapperHeight={height}
                highlightColor={selectedItemBorderColor}
                highlightBorderRadius={selectedItemBorderRadius}
                highlightBorderWidth={selectedItemBorderWidth}
                renderItem={(data, index, isSelected) => renderItem({ data, index, isSelected, ...rest })}
                onValueChange={(data) => this.onWheelChange(id, data)} />
            </Col>
          ))
        }
      </Row>
    );
  }
}

WheelPicker.displayName = 'WheelPicker';

WheelPicker.defaultProps = {
  onChange: () => {},
  wheels: [],
  value: null,
  ...BaseTheme.WheelPicker
};

WheelPicker.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

WheelPicker.propTypes = {
  onChange: PropTypes.func,
  wheels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string)
  })),
  value: PropTypes.any,
  selectedTextColor: ExtraPropTypes.color,
  textColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  highlightColor: ExtraPropTypes.color,
  selectedTextSize: PropTypes.number,
  textSize: PropTypes.number,
  height: PropTypes.number,
  wheelWidth: PropTypes.number,
  itemHeight: PropTypes.number,
  spacingHorizontal: PropTypes.number,
  wheelSpacing: PropTypes.number,
  selectedItemBorderColor: ExtraPropTypes.color,
  selectedItemBorderWidth: PropTypes.number,
  selectedItemBorderRadius: PropTypes.number
};

export default WheelPicker;
