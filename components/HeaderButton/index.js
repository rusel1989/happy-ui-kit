import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';
import IconButton from '../IconButton';

const HeaderButton = ({ onPress, iconName }) => (
  <IconButton
    onPress={onPress}
    style={styles.button}
    name={iconName}
    color={colors.WHITE} />
);

HeaderButton.Save = (props) => (
  <HeaderButton iconName='save' {...props} />);

HeaderButton.Close = (props) => (
  <HeaderButton iconName='remove' {...props} />);

HeaderButton.Back = (props) => (
  <HeaderButton iconName='back' {...props} />);

const styles = StyleSheet.create({
  button: {
    height: 44,
    width: 44
  }
});

HeaderButton.propTypes = {

};

export default HeaderButton;
