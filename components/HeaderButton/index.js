import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';
import IconButton from '../IconButton';

const HeaderButton = ({ onPress, iconName, iconColor }) => (
  <IconButton
    onPress={onPress}
    style={styles.button}
    name={iconName}
    color={iconColor} />
);

HeaderButton.displayName = 'HeaderButton';

HeaderButton.Save = (props) => (
  <HeaderButton iconName='save' {...props} />);

HeaderButton.Save.displayName = `${HeaderButton.displayName}.Save`;

HeaderButton.Close = (props) => (
  <HeaderButton iconName='remove' {...props} />);

HeaderButton.Close.displayName = `${HeaderButton.displayName}.Close`;

HeaderButton.Back = (props) => (
  <HeaderButton iconName='back' {...props} />);

HeaderButton.Back.displayName = `${HeaderButton.displayName}.Back`;

const styles = StyleSheet.create({
  button: {
    height: 44,
    width: 44
  }
});

HeaderButton.subComponents = [
  HeaderButton.Save,
  HeaderButton.Close,
  HeaderButton.Back
];

HeaderButton.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  iconColor: PropTypes.string
};

HeaderButton.defaultProps = {
  onPress: () => {},
  iconName: 'arrow',
  iconColor: colors.WHITE
};

HeaderButton.demoProps = {
  iconColor: colors.APP_PRIMARY
};

export default HeaderButton;
