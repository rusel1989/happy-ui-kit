import React from 'react';
import PropTypes from 'prop-types';

import Row from '@happy/components/Row';
import Col from '@happy/components/Col';
import Text from '@happy/components/Text';
import { colors } from '@happy/components/theme';

const ProgressBar = ({
  progress,
  backgroundColor,
  barColor,
  height,
  textColor
}) => {
  return (
    <Col alignItems='stretch'>
      <Row justifyContent='flex-start' style={{ backgroundColor, borderRadius: 2, overflow: 'hidden' }}>
        <Row style={{ flex: progress, backgroundColor: barColor, height }} />
      </Row>
      <Col style={{ position: 'absolute', right: 16 }}>
        <Text.Regular color={textColor}>{(progress * 100).toFixed(1)} %</Text.Regular>
      </Col>
    </Col>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  backgroundColor: PropTypes.string,
  barColor: PropTypes.string,
  height: PropTypes.number,
  textColor: PropTypes.string
};

ProgressBar.defaultProps = {
  progress: 0,
  backgroundColor: colors.APP_LIGHT_GREY,
  barColor: colors.APP_PRIMARY,
  height: 40,
  textColor: colors.APP_BLACK
};

ProgressBar.demoProps = {
  progress: 0.65
};

export default ProgressBar;
