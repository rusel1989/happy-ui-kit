import React from 'react';
import HeaderButton from './Button';

const BackButton = (props) => (
  <HeaderButton iconName='back' {...props} />);

BackButton.displayName = `${HeaderButton.displayName}.Back`;

export default BackButton;
