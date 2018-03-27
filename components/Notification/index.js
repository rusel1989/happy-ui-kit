
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

Notification.Danger = ({ message }) => {
  return (
    <Notification
      icon='error'
      tintColor={colors.APP_DANGER}
      message={message} />

  );
};

Notification.Success = ({ message }) => {
  return (
    <Notification
      icon='notification'
      tintColor={colors.APP_SUCCESS}
      message={message} />
  );
};

Notification.propTypes = {

};

export default Notification;
