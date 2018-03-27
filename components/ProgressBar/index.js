import React from 'react'
import PropTypes from 'prop-types';

import Row from '@happy/components/Row';
import Col from '@happy/components/Col';
import Text from '@happy/components/Text';
import { colors } from '@happy/components/theme';

const ProgressBar = ({ progress = 0.5 }) => {
  return (
    <Col alignItems='stretch'>
      <Row justifyContent='flex-start' style={{ backgroundColor: colors.APP_LIGHT_GREY, borderRadius: 2, overflow: 'hidden' }}>
        <Row style={{ flex: progress, backgroundColor: colors.APP_PRIMARY, height: 40 }} />
      </Row>
      <Col style={{ position: 'absolute', right: 16 }}>
      <Text>{(progress * 100).toFixed(1)} %</Text></Col>
    </Col>
  )
}

ProgressBar.propTypes = {

};

export default ProgressBar
