import React from 'react';
import HeaderButton from './Button';

const CloseButton = (props) => (
  <HeaderButton iconName='remove' {...props} />);

CloseButton.displayName = `${HeaderButton.displayName}.Close`;

export default CloseButton;
