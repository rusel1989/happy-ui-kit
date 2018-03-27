
import React from 'react';
import PropTypes from 'prop-types';

import Col from '@happy/components/Col';
import Text from '@happy/components/Text';
import Icon from '@happy/components/Icon';
import { colors } from '@happy/components/theme';

const Notification = ({ message, tintColor, icon }) => {
  return (
    <Col alignItems='stretch' style={{ backgroundColor: 'white', paddingVertical: 20 }}>
      <Icon
        color={tintColor}
        style={{ position: 'absolute', left: 16 }}
        name={icon} />
      <Text.Light style={{ alignSelf: 'center' }} color={tintColor}>{message}</Text.Light>
    </Col>
  );
};

Notification.displayName = 'Notification';

Notification.propTypes = {
  message: PropTypes.string,
  tintColor: PropTypes.string,
  icon: PropTypes.string
};

Notification.defaultProps = {
  message: '',
  tintColor: colors.APP_DARK_GREY,
  icon: 'notification'
};

Notification.demoProps = {
  message: 'Notification with message',
  icon: 'save'
};

Notification.Danger = ({ message }) => {
  return (
    <Notification
      icon='error'
      tintColor={colors.APP_DANGER}
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

Notification.Danger.demoProps = {
  message: 'Error notification with message'
};

Notification.Success = ({ message }) => {
  return (
    <Notification
      icon='notification'
      tintColor={colors.APP_SUCCESS}
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

Notification.Success.demoProps = {
  message: 'Success notification with message'
};

Notification.subComponents = [
  Notification.Success,
  Notification.Danger
];

export default Notification;
