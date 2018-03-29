import React from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import Row from '../Row';
import Col from '../Col';
import Text from '../Text';
import BaseTheme from '../../theme/base';

const ProgressBar = ({ progress, ...rest }, context) => {
  const { showText, borderRadius, backgroundColor, barColor, height, textColor } = context.mergeStyle('ProgressBar', rest);

  return (
    <Col alignItems='stretch'>
      <Row justifyContent='flex-start' style={{ backgroundColor, borderRadius, overflow: 'hidden' }}>
        <Row style={{ flex: progress, backgroundColor: barColor, height }} />
      </Row>
      {showText && (
        <Col style={{ position: 'absolute', right: 16 }}>
          <Text.Regular color={textColor}>{(progress * 100).toFixed(1)} %</Text.Regular>
        </Col>)}
    </Col>
  );
};

ProgressBar.displayName = 'ProgressBar';

ProgressBar.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  backgroundColor: ExtraPropTypes.color,
  barColor: ExtraPropTypes.color,
  height: PropTypes.number,
  textColor: ExtraPropTypes.color,
  showText: PropTypes.bool,
  borderRadius: PropTypes.number
};

ProgressBar.defaultProps = BaseTheme.ProgressBar;

export default ProgressBar;
