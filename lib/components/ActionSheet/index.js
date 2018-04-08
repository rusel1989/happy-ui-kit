import React, { Component } from 'react';
import { View, Modal, StyleSheet, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import BaseTheme from '../../theme/base';
import ChipGroup from '../ChipGroup';
import Button from '../Button';
import ListItem from '../ListItem';
import Overlay from '../Overlay';

const initialState = {
  visible: false,
  selectedIndex: -1,
  selectedOption: null,
  selectedSubOption: null,
  subOptions: null,
  options: []
};

class ActionSheet extends Component {
  state = initialState;
  translateY = new Animated.Value(0);
  contentHeight = 0;

  show = (config, value) => {
    let selectedIndex = -1;
    let selectedOption = null;
    let selectedSubOption = null;

    this.contentHeight = this._computeHeight(config.options.length);
    this.translateY.setValue(this.contentHeight);

    if (value) {
      if (config.subOptions) {
        const values = value.split('-');
        value = values[1];
        selectedSubOption = values[0];
      }
      const item = config.options.find((opt) => opt.value === value);
      if (item) {
        selectedOption = item;
        selectedIndex = config.options.indexOf(item);
      }
    }

    this.setState({
      visible: true,
      ...config,
      selectedOption,
      selectedSubOption,
      selectedIndex
    }, () => {
      this._showSheet();
    });
  }

  hide = () => {
    return this._hideSheet()
      .then(() => {
        this.setState({ ...initialState });
      });
  }

  _computeHeight = (optionCount = 0) => {
    return ((optionCount + 1) * this.props.itemHeight) + 20;
  }

  _animateSheet = (toValue = 0, duration) => {
    if (this.animating) {
      return Promise.resolve(false);
    }
    this.animating = true;
    return new Promise((resolve, reject) => {
      return Animated.timing(this.translateY, {
        toValue,
        easing: this.props.easing,
        duration: this.props.duration,
        useNativeDriver: true
      }).start((result) => {
        this.animating = false;
        resolve(result);
      });
    });
  }

  _showSheet = () => {
    return this._animateSheet(0);
  }

  _hideSheet = () => {
    return this._animateSheet(this.contentHeight)
      .then(() => {
        return this.overlay.fadeOut(this.props.duration / 2);
      });
  }

  onFinishButtonPress = () => {
    if (!this.canSaveValue()) {
      this.hide();
    } else {
      const { name, selectedOption, selectedSubOption } = this.state;
      const result = { name, selectedOption, selectedSubOption };
      this.props.onSelectionFinished(result.name, result.selectedOption, result.selectedSubOption);
      this.hide();
    }
  }

  onOptionSelected = (option) => {
    this.setState({ selectedOption: option, selectedIndex: option.index });
  }

  onSubOptionSelected = (option) => {
    this.setState({ selectedSubOption: option });
  }

  setOverlayRef = v => {
    this.overlay = v;
  }

  setSheetRef = v => {
    this.sheet = v;
  }

  canSaveValue = () => {
    return (this.state.selectedIndex > -1 && !this.state.subOptions) || (this.state.subOptions && this.state.selectedSubOption);
  }

  render () {
    const { visible, selectedIndex, subOptions, options, selectedSubOption } = this.state;

    const { duration, ...rest } = this.props;
    const { labelColor, itemBackgroundColor, selectedBackgroundColor, selectedIconColor,
      selectedLabelColor, iconColor, itemBorderRadius, itemHeight } = this.context.mergeStyle('ActionSheet', rest);
    return (
      <Modal
        visible={visible}
        transparent
        animationType='none'
        onRequestClose={() => {}}>
        <Overlay
          duration={this.props.duration / 2}
          getRef={this.setOverlayRef}
          onPress={() => this.hide()} />
        <Animated.View
          style={[
            styles.sheetContainer, {
              transform: [{
                translateY: this.translateY
              }]
            }
          ]}
          ref={this.setSheetRef}>
          <View style={styles.sheetItemsContainer}>
            {options.map((option, index) => {
              const isSelected = selectedIndex === index;
              return (
                <ListItem.Selectable
                  key={index}
                  icon={option.icon}
                  label={option.label}
                  height={itemHeight}
                  iconColor={iconColor}
                  labelColor={labelColor}
                  backgroundColor={itemBackgroundColor}
                  selectedIconColor={selectedIconColor}
                  selectedLabelColor={selectedLabelColor}
                  selectedBackgroundColor={selectedBackgroundColor}
                  isSelected={isSelected}
                  onPress={() => this.onOptionSelected({ ...option, index })}>
                  {subOptions && isSelected && (
                    <ChipGroup
                      options={subOptions}
                      onSelect={this.onSubOptionSelected}
                      value={selectedSubOption} />)}
                </ListItem.Selectable>
              );
            })}
          </View>
          <Button
            borderRadius={itemBorderRadius}
            backgroundColor={itemBackgroundColor}
            labelColor={labelColor}
            height={itemHeight}
            uppercaseLabel={false}
            label={this.canSaveValue() ? 'Save' : 'Cancel'}
            onPress={this.onFinishButtonPress} />
        </Animated.View>
      </Modal>
    );
  }
}

ActionSheet.displayName = 'ActionSheet';

ActionSheet.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

ActionSheet.propTypes = {
  duration: PropTypes.number,
  easing: PropTypes.func,
  onSelectionFinished: PropTypes.func,
  labelColor: ExtraPropTypes.color,
  itemBackgroundColor: ExtraPropTypes.color,
  selectedBackgroundColor: ExtraPropTypes.color,
  selectedIconColor: ExtraPropTypes.color,
  selectedTextColor: ExtraPropTypes.color,
  iconColor: ExtraPropTypes.color,
  itemBorderRadius: PropTypes.number,
  itemHeight: PropTypes.number
};

ActionSheet.defaultProps = {
  duration: 400,
  easing: Easing.linear,
  onSelectionFinished: () => {}
};

ActionSheet.demoMethods = [{
  name: 'show',
  label: 'Show sheet',
  args: [{
    options: [
      { label: 'Option 1', icon: 'save', value: 'value' },
      { label: 'Option 2', icon: 'remove', value: 'value2' }
    ]
  }, '']
}];

const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10
  },
  sheetItemsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10
  }
});

export default ActionSheet;
