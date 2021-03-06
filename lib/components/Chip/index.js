import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';
import color from 'color';

import * as BaseTheme from '../../theme/base';
import { toTitleCase } from '../../utils';
import Text from '../Text';
import Touchable from '../Touchable';

const BaseChip = ({ label, active, animated, onPress, spacingHorizontal, ...rest }, context) => {
  const { activeTintColor, tintColor, backgroundColor, height,
    borderRadius, borderWidth, textSize } = context.mergeStyle('Chip', rest);
  const tintColorF = active ? activeTintColor : tintColor;
  return (
    <View style={[styles.chipContainer, { marginHorizontal: spacingHorizontal }]}>
      <View style={{ borderColor: tintColor, backgroundColor, height, borderRadius, borderWidth }} >
        <Touchable.Highlight
          style={{ paddingHorizontal: 17, flex: 1, justifyContent: 'center', borderRadius }}
          underlayColor={color(backgroundColor).darken(0.1).hex()}
          onPress={() => onPress(label)}>
          <Text.Regular size={textSize} color={tintColorF}>
            {toTitleCase(label)}
          </Text.Regular>
        </Touchable.Highlight>
      </View>
    </View>
  );
};

BaseChip.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

BaseChip.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  onPress: PropTypes.func,
  activeTintColor: ExtraPropTypes.color,
  tintColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  textSize: PropTypes.number,
  spacingHorizontal: PropTypes.number
};

BaseChip.defaultProps = {
  label: '',
  value: '',
  active: false,
  onPress: () => {},
  ...BaseTheme.Chip
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
      return (<BaseChip {...this.props} />);
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

Chip.displayName = 'Chip';

Chip.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Chip.propTypes = {
  animated: PropTypes.bool,
  ...BaseChip.propTypes
};

Chip.defaultProps = {
  animated: false
};

const styles = StyleSheet.create({
  chipContainer: {
    height: 60,
    justifyContent: 'center'
  }
});

export default Chip;
