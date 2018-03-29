import React, { Component } from 'react';
import { Slider, Switch } from 'react-native';

import BaseTheme from '../theme/base';
import Text from '../components/Text';
import Col from '../components/Col';
import Row from '../components/Row';
import TextField from '../components/TextField';

class PropEditor extends Component {
  renderNumberEditor () {
    return (
      <Slider
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
        style={{ flex: 1, paddingVertical: 8, borderRadius: 4 }}
        backgroundColor={BaseTheme.palette.APP_LIGHT_GREY}
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

  renderEditor () {
    console.log(this.props);
    const { type } = this.props;
    if (type === 'number') {
      return this.renderNumberEditor();
    } else if (type === 'string') {
      return this.renderStringEditor();
    } else if (type === 'bool') {
      return this.renderBoolEditor();
    } else {
      return <Text.Custom>Not Editable</Text.Custom>;
    }
  }

  render () {
    return (
      <Row style={{ height: 30 }}>
        {this.renderEditor()}
      </Row>
    );
  }
}

PropEditor.displayName = 'PropEditor';

PropEditor.propTypes = {

};

PropEditor.defaultProps = {
  onChange: () => {},
  maxValue: 100,
  minValue: 0,

};

export default PropEditor;
