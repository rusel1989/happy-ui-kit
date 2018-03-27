import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';
import Text from '../Text';
import ScrollPicker from './ScrollPicker';

const renderItem = (data, index, isSelected) => {
  if (isSelected) {
    return (
      <Text.Medium
        size={22}
        color={colors.DARK_GREY}>
        {data}
      </Text.Medium>);
  } else {
    return (
      <Text.Regular
        size={20}
        color={colors.LIGHT_GREY}>
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

  componentDidMount () {
    if (this.props.getRef) {
      this.props.getRef(this);
    }
    if (!this.props.defaultOpened && this.props.animated) {
      this.picker.transitionTo({ height: 0 });
    }
  }

  onWheelChange = (id, data) => {
    this.setState({ [id]: data }, () => {
      this.props.onChange(this.state);
    });
  }

  setPickerRef = v => {
    this.picker = v;
  }

  open = () => {
    if (this.props.animated) {
      this.picker.transitionTo({ height: 240 });
      setTimeout(() => {
        this.props.onOpen();
      }, 300);
    } else {
      this.props.onOpen();
    }
  }

  close = () => {
    if (this.props.animated) {
      this.picker.transitionTo({ height: 0 });
      setTimeout(() => {
        this.props.onClose();
      }, 300);
    } else {
      this.props.onClose();
    }
  }

  getValue = (id) => {
    return this.props.value ? (this.props.value[id] || this.props.value) : '0';
  }

  renderWheels = () => {
    return this.props.wheels.map(({ id, values, selectedIndex }, index) => (
      <View style={styles.wheel} key={id}>
        <ScrollPicker
          style={{ width: 50 }}
          dataSource={values}
          selectedIndex={values.indexOf(this.getValue(id))}
          itemHeight={50}
          wrapperHeight={240}
          highlightColor={colors.DARK_GREY}
          renderItem={renderItem}
          onValueChange={(data) => this.onWheelChange(id, data)} />
      </View>
    ));
  }

  render () {
    if (this.props.animated) {
      return (
        <Animatable.View
          ref={this.setPickerRef}
          style={styles.container}>
          {this.renderWheels()}
        </Animatable.View >
      );
    } else {
      return (
        <View
          ref={this.setPickerRef}
          style={styles.container}>
          {this.renderWheels()}
        </View>
      );
    }
  }
}

WheelPicker.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  onChange: () => {},
  getRef: () => {},
  wheels: [],
  value: null,
  animated: false,
  defaultOpened: false
};

WheelPicker.propTypes = {
  getRef: PropTypes.func,
  onOpen: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  wheels: PropTypes.array,
  value: PropTypes.any,
  animated: PropTypes.bool,
  defaultOpened: PropTypes.bool
};

WheelPicker.demoProps = {
  defaultOpened: true,
  value: { numbers: '30' },
  wheels: [{ id: 'numbers', values: ['10', '20', '30', '40', '50'] }]
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', height: 240, overflow: 'hidden' },
  wheel: { width: 50, marginHorizontal: 36 },
  wheelInner: { width: 50 }
});

export default WheelPicker;
