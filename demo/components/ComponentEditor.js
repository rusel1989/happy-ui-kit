import React from 'react';
import { View, Platform, Picker } from 'react-native';
import { Row, Button, WheelPicker } from 'happy-ui-kit';

import PropEditor from './PropEditor';
import SaveConfirmation from './SaveConfirmation';
import palette from '../palette';

export default class ComponentEditor extends React.Component {
  render () {
    if (this.props.showSaveConfirmation) {
      const { onComponentNameChange, componentName, onCancelPress, onSavePress, error } = this.props;
      return (
        <SaveConfirmation
          onComponentNameChange={onComponentNameChange}
          componentName={componentName}
          onCancelPress={onCancelPress}
          onSavePress={onSavePress}
          error={error} />
      );
    }
    const { editingOptions, selectedPropParams, onClosePress, onSelectedPropChange,
      selectedProp, selectedPropValue, onPropSelect, onResetAllPress } = this.props;
    const wheelValues = editingOptions.map(({ name }) => name);

    return (
      <View>
        <PropEditor
          {...selectedPropParams}
          onClosePress={onClosePress}
          onChange={onSelectedPropChange}
          value={selectedPropValue} />
        <Row style={{ height: 140, zIndex: -1 }} justifyContent='center'>
          {Platform.OS === 'ios' ? (
            <Picker
              style={{ flex: 1 }}
              selectedValue={selectedProp}
              onValueChange={onPropSelect}>
              {wheelValues.map((prop, i) =>
                <Picker.Item label={prop} value={prop} key={i} />)}
            </Picker>
          ) : (
            <WheelPicker
              height={120}
              wheelWidth={180}
              onChange={({ selectedProp }) => onPropSelect(selectedProp)}
              value={{ selectedProp: wheelValues[0] }}
              wheels={[{ id: 'selectedProp', values: wheelValues }]} />
          )}
        </Row>
        <Button
          label='Restore default props'
          uppercaseLabel={false}
          backgroundColor='white'
          labelSize={20}
          labelColor={palette.APP_PRIMARY_DARKER}
          onPress={onResetAllPress} />
      </View>
    );
  }
}
