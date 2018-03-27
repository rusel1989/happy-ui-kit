import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable'; // eslint-disable-line
import PropTypes from 'prop-types';

import Row from '../Row';
import Col from '../Col';
import Text from '../Text';
import Icon from '../Icon';
import Touchable from '../Touchable';

import { colors } from '@happy/components/theme';

const RoundButton = ({ icon, onPress, label }) => {
  return (
    <Col style={styles.container}>
      <Row style={styles.button}>
        <Touchable onPress={onPress}>
          <Row>
            <Icon
              name={icon}
              color={colors.WHITE} />
            <Text.Regular
              size={16}
              color={colors.WHITE}
              style={styles.text}>
              {label}
            </Text.Regular>
          </Row>
        </Touchable>
      </Row>
    </Col>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  button: { backgroundColor: colors.DARK_GREY, height: 36, borderRadius: 20, paddingLeft: 7, paddingRight: 20 },
  text: { paddingLeft: 15 }
});

RoundButton.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func,
  label: PropTypes.string
};

RoundButton.defaultProps = {
  icon: 'arrow',
  onPress: () => {},
  label: ''
};

RoundButton.demoProps = {
  label: 'Footer button'
};

export default RoundButton;
