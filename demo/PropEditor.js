import React, { Component } from 'react';
import { Slider, Switch, View } from 'react-native';
import { SlidersColorPicker } from 'react-native-color';

import BaseTheme from '../theme/base';
import Text from '../components/Text';
import Button from '../components/Button';

import Col from '../components/Col';
import Row from '../components/Row';
import TextField from '../components/TextField';

class PropEditor extends Component {
  state = {
    colorPickerVisible: false
  }

  renderNumberEditor () {
    return (
      <Slider
        step={1}
        style={{ flex: 1 }}
        thumbTintColor={BaseTheme.palette.APP_LIGHT_GREY}
        minimumTrackTintColor={BaseTheme.palette.APP_PRIMARY_DARKER}
        maximumTrackTintColor={BaseTheme.palette.APP_PRIMARY_DARKER}
        minimumValue={this.props.minValue}
        maximumValue={this.props.maxValue}
        value={this.props.value}
        onValueChange={this.props.onChange} />
    );
  }

  renderStringEditor () {
    return (
      <TextField
        style={{ flex: 1, borderRadius: 4, height: 40 }}
        backgroundColor={BaseTheme.palette.APP_LIGHT_GREY}
        defaultValue={this.props.value}
        value={this.props.value}
        onChangeText={this.props.onChange} />
    );
  }

  renderBoolEditor () {
    return (
      <Col style={{ flex: 1 }}>
        <Switch
          tintColor={BaseTheme.palette.APP_PRIMARY_LIGHT}
          thumbTintColor={BaseTheme.palette.APP_LIGHT_GREY}
          value={!!this.props.value}
          onValueChange={this.props.onChange} />
      </Col>
    );
  }

  openColorPicker = () => {
    this.setState({ colorPickerVisible: true });
  }

  onColorSelect= (color) => {
    this.hideColorPicker();
    this.props.onChange(color);
  }

  hideColorPicker= () => {
    this.setState({ colorPickerVisible: false });
  }

  renderColorEditor () {
    return (
      <Col style={{ flex: 1 }}>
        <Button
          label='Open color picker'
          borderRadius={10}
          uppercaseLabel={false}
          onPress={this.openColorPicker} />
        <SlidersColorPicker
          swatches={[]}
          color={this.props.value || this.props.defaultColor}
          onOk={this.onColorSelect}
          onCancel={this.hideColorPicker}
          okLabel='Select'
          cancelLabel='Cancel'
          returnMode='hex'
          visible={this.state.colorPickerVisible} />
      </Col>
    );
  }

  renderEditor () {
    const { type } = this.props;
    if (type === 'number') {
      return this.renderNumberEditor();
    } else if (type === 'string') {
      return this.renderStringEditor();
    } else if (type === 'bool') {
      return this.renderBoolEditor();
    } else if (type === 'color') {
      return this.renderColorEditor();
    } else {
      return <Text.Custom>Not Editable</Text.Custom>;
    }
  }

  render () {
    const valueColor = this.props.type === 'color' && this.props.value ? this.props.value : null;
    return (
      <View style={{ backgroundColor: 'white', paddingBottom: 10 }}>
        <Row>
          <Col alignItems='flex-start'>
            <Text.Light>Current value</Text.Light>
            <Text.Bold color={valueColor} size='xlarge'>{`${this.props.value || 'Not defined'}`}</Text.Bold>
          </Col>
          {this.props.value !== this.props.defaultValue && (
            <Text.Light
              onPress={() => this.props.onChange(this.props.defaultValue)}
              color={BaseTheme.palette.APP_PRIMARY}
              size='xlarge'>
              Reset
            </Text.Light>)}
        </Row>
        <Row style={{ height: 30, marginTop: 20 }}>
          {this.renderEditor()}
        </Row>
      </View>
    );
  }
}

PropEditor.displayName = 'PropEditor';

PropEditor.propTypes = {

};

PropEditor.defaultProps = {
  defaultColor: BaseTheme.palette.APP_PRIMARY,
  onChange: () => {},
  maxValue: 100,
  minValue: 0
};

export default PropEditor;
