import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  Platform,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import color from 'color';
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-native-color';
import map from 'lodash/map';
import merge from 'lodash/merge'
import IconButton from '../components/IconButton';
import Text from '../components/Text';
import Row from '../components/Row';

import Col from '../components/Col';

import Card from '../components/Card';
import Overlay from '../components/Overlay';
import BaseTheme from '../theme/base';

const stringToHsl = (colorString = '#000000') => {
  return color(colorString).hsl().object();
};

const hslToString = (hslObject = { h: 0, s: 0, l: 0 }) => {
  // nsole.log(hslObject);
  return color.hsl(hslObject).hex();
};

class SlidersColorPicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      colorString: this.props.color,
      colorHsl: stringToHsl(this.props.color)
    };
  }

  open = ({ defaultColor = '#70c1b3' }) => {
    console.log('open', defaultColor, {
      visible: true,
      colorString: defaultColor,
      colorHsl: stringToHsl(defaultColor)
    });
    this.setState({
      visible: true,
      colorString: defaultColor,
      colorHsl: stringToHsl(defaultColor)
    });
  }

  close = () => {
    this.setState({
      visible: false
    });
  }

  onColorSelected = () => {
    this.props.onColorSelected(this.state.colorString);
    this.close();
  }

  updateHue = (h) => {
    console.log(h);
    const colorHsl = merge(this.state.colorHsl, { h });
    const colorString = hslToString(colorHsl);
    this.setState({ colorHsl, colorString });
  }

  updateSaturation = (s) => {
    console.log(s);
    const colorHsl = merge(this.state.colorHsl, { s });
    const colorString = hslToString(colorHsl);
    this.setState({ colorHsl, colorString });
  }

  updateLightness = (l) => {
    console.log(l);
    const colorHsl = merge(this.state.colorHsl, { l });
    const colorString = hslToString(colorHsl);
    this.setState({ colorHsl, colorString });
  }

  render () {
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={this.state.visible}
        onRequestClose={() => this.close()}>
        <View>
          <Row>
            <IconButton
              color={BaseTheme.palette.APP_DARK_GREY}
              name='remove'
              onPress={() => this.close()} />
            <IconButton
              color={BaseTheme.palette.APP_DARK_GREY}
              name='save'
              onPress={() => this.onColorSelected()} />
          </Row>
          <Row
            justifyContent='flex-start'
            style={{ height: 150, backgroundColor: this.state.colorString }}>
            <Text.Monospace>
              {this.state.colorString}
            </Text.Monospace>
          </Row>
          <Col spacingVertical={16} alignItems='stretch'>
            <HueSlider
              style={{ marginTop: 16 }}
              gradientSteps={40}
              value={this.state.colorHsl.h}
              onValueChange={this.updateHue} />
            <SaturationSlider
              style={{ marginTop: 16 }}
              gradientSteps={20}
              value={this.state.colorHsl.s}
              color={this.state.colorHsl}
              onValueChange={this.updateSaturation} />
            <LightnessSlider
              style={{ marginTop: 16 }}
              gradientSteps={20}
              value={this.state.colorHsl.l}
              color={this.state.colorHsl}
              onValueChange={this.updateLightness} />
          </Col>
        </View>
      </Modal>
    );
  }
}

SlidersColorPicker.propTypes = {
  onColorSelected: PropTypes.func,
  color: PropTypes.string
};

SlidersColorPicker.defaultProps = {
  color: '#70c1b3',
  onColorSelected: () => {}
};

export default SlidersColorPicker;
