
import React from 'react';
import PropTypes from 'prop-types';

import Col from '../Col';
import Text from '../Text';
import Icon from '../Icon';
import BaseTheme from '../../theme/base';

const Notification = ({ message, icon, ...rest }, context) => {
  const { tintColor, backgroundColor, spacingVertical, spacingHorizontal, textSize, textAlign } = context.mergeStyle('Notification', rest);
  return (
    <Col alignItems='stretch' style={{ backgroundColor, paddingVertical: spacingVertical, paddingHorizontal: spacingHorizontal }}>
      <Icon
        color={tintColor}
        style={{ position: 'absolute', left: spacingHorizontal }}
        name={icon} />
      <Text.Light size={textSize} style={{ alignSelf: textAlign }} color={tintColor}>{message}</Text.Light>
    </Col>
  );
};

Notification.displayName = 'Notification';

Notification.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Notification.propTypes = {
  message: PropTypes.string,
  tintColor: PropTypes.string,
  icon: PropTypes.string,
  backgroundColor: PropTypes.string,
  spacingVertical: PropTypes.number,
  spacingHorizontal: PropTypes.number,
  textSize: PropTypes.number,
  textAlign: PropTypes.string
};

Notification.defaultProps = {
  message: '',
  icon: 'notification',
  ...BaseTheme.Notification
};

Notification.Danger = ({ message }) => {
  return (
    <Notification
      icon='error'
      tintColor={BaseTheme.palette.APP_DANGER}
      message={message} />

  );
};

Notification.Danger.displayName = `${Notification.displayName}.Danger`;

Notification.Danger.propTypes = {
  message: PropTypes.string
};

Notification.Danger.defaultProps = {
  message: ''
};

Notification.Success = ({ message }) => {
  return (
    <Notification
      icon='notification'
      tintColor={BaseTheme.palette.APP_SUCCESS}
      message={message} />
  );
};

Notification.Success.displayName = `${Notification.displayName}.Success`;

Notification.Success.propTypes = {
  message: PropTypes.string
};

Notification.Success.defaultProps = {
  message: ''
};

export default Notification;
