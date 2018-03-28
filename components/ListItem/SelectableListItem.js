import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';

import ListItem from './ListItem';
import BaseTheme from '../../theme/base';

class SelectableListItem extends React.Component {
  setRef = (v) => {
    this.btnRef = v;
  }

  onPress = () => {
    if (this.props.animated) {
      this.btnRef.pulse(350);
    }
    this.props.onPress();
  }

  render () {
    const { label, selectedIcon, icon, children, isSelected, rightButton, ...rest } = this.props;
    const {
      selectedBackgroundColor,
      selectedIconColor,
      selectedLabelColor,
      backgroundColor,
      iconColor,
      labelColor,
      ...listItemStyleProps
    } = this.context.mergeStyle('SelectableListItem', rest);

    const colors = isSelected ? {
      backgroundColor: selectedBackgroundColor,
      iconColor: selectedIconColor,
      labelColor: selectedLabelColor
    } : {
      backgroundColor,
      iconColor,
      labelColor
    };
    const iconFinal = isSelected && selectedIcon ? selectedIcon : icon;

    return (
      <Animatable.View
        useNativeDriver
        ref={this.setRef}>
        <ListItem
          onPress={this.onPress}
          label={label}
          icon={iconFinal}
          rightButton={rightButton}
          {...listItemStyleProps}
          {...colors}>
          {children}
        </ListItem>
      </Animatable.View>
    );
  }
}

SelectableListItem.displayName = `${ListItem.displayName}.Selectable`;

SelectableListItem.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

SelectableListItem.propTypes = {
  ...ListItem.propTypes,
  animated: PropTypes.bool,
  isSelected: PropTypes.bool,
  selectedBackgroundColor: PropTypes.string,
  selectedIconColor: PropTypes.string,
  selectedLabelColor: PropTypes.string,
  selectedIcon: PropTypes.string,
  rightButton: PropTypes.node
};

SelectableListItem.defaultProps = {
  ...ListItem.defaultProps,
  onPress: () => {},
  selectedBackgroundColor: BaseTheme.palette.WHITE,
  animated: false,
  isSelected: false,
  rightButton: null
};

export default SelectableListItem;
