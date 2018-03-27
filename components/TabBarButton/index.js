import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import { center, colors } from '@happy/components/theme';
import { square } from '@happy/utils';
import Icon from '../Icon';
import Text from '../Text';

const TabBarButton = ({ onPress, title, icon, isActive, image, imageStyle, iconSize = 26 }) => {
  const color = isActive ? colors.TAB_BAR_BUTTON_ACTIVE : colors.TAB_BAR_BUTTON;
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.button}>
      {image && (
        <Image source={image} style={imageStyle} />)}
      {icon && (
        <View style={{ ...center }}>
          <View style={{ ...center, ...square(28) }}>
            <Icon
              name={icon}
              color={color}
              size={iconSize} />
          </View>
          <Text.Regular color={color} size={10}>{title}</Text.Regular>
        </View>)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { height: 40, paddingVertical: 5, ...center }
});

TabBarButton.propTypes = {

};

export default TabBarButton;
