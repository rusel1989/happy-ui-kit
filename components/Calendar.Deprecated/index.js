import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import range from 'lodash/range';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import BaseTheme from '../../theme/base';
import WheelPicker from '../WheelPicker';
import SegmentedControl from '../SegmentedControl';

const options = ['week', 'month', 'year'];
const currentDate = new Date();

const getDaysInMonth = (month, year) => {
  const dayCount = new Date(year, month, 0).getDate();
  return range(1, dayCount + 1, 1);
};

const getYears = () => {
  const year = currentDate.getFullYear();
  return range(year - 2, year + 3, 1);
};

const wheelsConfig = {
  week: {
    wheels: (m, y) => [{
      id: 'dayFrom',
      values: getDaysInMonth(m, y)
    }, {
      id: 'dayTo',
      values: getDaysInMonth(m, y)
    }]
  },
  month: {
    wheels: () => [{
      id: 'month',
      values: range(1, 13, 1)
    }]
  },
  year: {
    wheels: () => [{
      id: 'year',
      values: getYears()
    }]
  }
};

class Calendar extends Component {
  static defaultProps = {
    range: 'week',
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
    week: { dayFrom: currentDate.getDate() - 7, dayTo: currentDate.getDate() },
    getRef: () => {},
    onRangeChange: () => {},
    onPickerTypeChange: () => {},
    value: ''
  }

  static propTypes = {
    range: PropTypes.oneOf(options),
    month: PropTypes.number,
    year: PropTypes.number,
    week: PropTypes.shape({
      dayFrom: PropTypes.number,
      dayTo: PropTypes.number
    }),
    getRef: PropTypes.func,
    onRangeChange: PropTypes.func,
    onPickerTypeChange: PropTypes.func,
    value: PropTypes.any
  }

  componentDidMount () {
    this.props.getRef && this.setRef();
  }

  hide = (duration = 300) => {
    this.overlay.fadeOut(duration);
    this.container.transitionTo({ height: 0 });
  }

  open = (duration = 300) => {
    this.overlay.fadeIn(duration);
    this.container.transitionTo({ height: 300 });
  }

  setRef = () => {
    this.props.getRef(this);
  }

  setContainerRef = v => {
    this.container = v;
  }

  setOverlayRef = v => {
    this.overlay = v;
  }

  setPickerType = (pickerType) => {
    this.props.onPickerTypeChange(pickerType);
  }

  render () {
    const zIndex = this.props.show ? 1 : -1;
    return (
      <Animatable.View
        useNativeDriver
        ref={this.setOverlayRef}
        style={[ styles.overlay, { zIndex } ]} >
        <Animatable.View
          style={styles.content}
          ref={this.setContainerRef}>
          <SegmentedControl
            onChange={this.props.onPickerTypeChange}
            value={this.props.range}
            options={options} />
          <WheelPicker
            wheels={wheelsConfig[this.props.range].wheels(this.props.month, this.props.year)}
            onChange={this.props.onRangeChange}
            value={this.props.value} />
        </Animatable.View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: 'rgba(0,0,0,0.4)', ...StyleSheet.absoluteFillObject, opacity: 0 },
  content: { backgroundColor: BaseTheme.palette.WHITE, position: 'absolute', left: 0, right: 0 }
});

export default Calendar;
