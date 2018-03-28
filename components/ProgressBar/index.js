import React from 'react';
import PropTypes from 'prop-types';

import Row from '@happy/components/Row';
import Col from '@happy/components/Col';
import Text from '@happy/components/Text';
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

ProgressBar.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  backgroundColor: PropTypes.string,
  barColor: PropTypes.string,
  height: PropTypes.number,
  textColor: PropTypes.string,
  showText: PropTypes.bool,
  borderRadius: PropTypes.number
};

ProgressBar.defaultProps = BaseTheme.ProgressBar;

ProgressBar.demoProps = [{
  progress: 0.65
}, {
  progress: 0.4,
  barColor: 'green',
  backgroundColor: 'navy',
  textColor: 'white',
  borderRadius: 10
}];

export default ProgressBar;
