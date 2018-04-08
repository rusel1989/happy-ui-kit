import React from 'react';
import { View } from 'react-native';
import { Row, Button, TextField, Text } from 'happy-ui-kit';

import palette from '../palette';

export default class SaveConfirmation extends React.Component {
  render () {
    const { onComponentNameChange, componentName, onCancelPress, onSavePress, error } = this.props;
    return (
      <View>
        <Row style={{ height: 50 }}>
          <Text.Light size='large'>Enter new component name</Text.Light>
        </Row>
        <TextField
          style={{ flex: 1, borderRadius: 4, height: 40 }}
          backgroundColor={palette.APP_LIGHT_GREY}
          onChangeText={onComponentNameChange}
          value={componentName} />
        <Row>
          <Button
            labelColor={palette.APP_DANGER}
            uppercaseLabel={false}
            backgroundColor='white'
            labelSize={20}
            label='Cancel'
            onPress={onCancelPress} />
          <Button
            uppercaseLabel={false}
            backgroundColor='white'
            labelSize={20}
            label='Save'
            labelColor={palette.APP_PRIMARY_DARKER}
            onPress={onSavePress} />
        </Row>
        {error &&
          <Text.Light textAlign='center' color={palette.APP_DANGER}>
            {error}
          </Text.Light>}
      </View>
    );
  }
}
