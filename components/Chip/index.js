import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import Text from '../Text';
import Touchable from '../Touchable';

import { colors } from '@happy/components/theme';
import { toTitleCase } from '@happy/utils';

const getTintColor = (active) => active ? colors.DARK_GREY : colors.MEDIUM_GREY;

const BaseChip = ({ label, value, active, style, animated, onPress }) => {
  const tintColor = getTintColor(active);
  return (
    <View style={styles.chipContainer}>
      <View style={[ styles.chip, { borderColor: tintColor }, style ]} >
        <Touchable.Highlight
          hitSlop={{ top: 10, left: 5, bottom: 10, right: 5 }}
          underlayColor={colors.EXTRA_LIGHT_GREY}
          style={{ paddingHorizontal: 17, flex: 1, justifyContent: 'center' }}
          onPress={() => onPress(value)}>
          <Text.Regular size={16} color={tintColor}>
            {label || toTitleCase(value)}
          </Text.Regular>
        </Touchable.Highlight>
      </View>
    </View>
  );
};

class Chip extends Component {
  setChipRef = v => {
    this.chipRef = v;
  }

  onChipPress = () => {
    this.chipRef.pulse(600);
    this.props.onPress(this.props.value);
  }

  render () {
    if (!this.props.animated) {
      return (
        <BaseChip
          {...this.props} />)
    }
    return (
      <Animatable.View
        ref={this.setChipRef}>
        <BaseChip
          {...this.props}
          onPress={this.onChipPress} />
      </Animatable.View>
    );
  }
}

Chip.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  active: PropTypes.bool,
  animated: PropTypes.bool,
  style: PropTypes.object,
  onPress: PropTypes.func
};

Chip.defaultProps = {
  label: '',
  value: '',
  active: false,
  animated: false,
  onPress: () => {}
};

Chip.demoProps = [{
  label: 'Chip',
  active: false
}, {
  label: 'Active Chip',
  active: true
}, {
  label: 'Animated Chip',
  animated: true
}];

const styles = StyleSheet.create({
  chipContainer: {
    height: 60,
    justifyContent: 'center'
  },
  chip: {
    height: 36,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: colors.WHITE
  },
  chipText: {
    fontSize: 16
  }
});

export default Chip;
