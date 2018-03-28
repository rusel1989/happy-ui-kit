import React from 'react';
import HeaderButton from './Button';

const SaveButton = (props) => (
  <HeaderButton iconName='save' {...props} />);

SaveButton.displayName = `${HeaderButton.displayName}.Save`;

export default SaveButton;
