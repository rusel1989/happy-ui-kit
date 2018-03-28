import React from 'react';
import PropTypes from 'prop-types';

import Row from '../Row';
import Text from '../Text';
import BaseTheme from '../../theme/base';

const SectionHeader = ({ title, ...rest }, context) => {
  const { uppercase, height, backgroundColor, spacingHorizontal, textSize, textColor } = context.mergeStyle('SectionHeader', rest);
  return (
    <Row justifyContent='flex-start' style={{ height, backgroundColor, paddingHorizontal: spacingHorizontal }}>
      <Text.Medium size={textSize} color={textColor}>{uppercase ? title.toUpperCase() : title}</Text.Medium>
    </Row>
  );
};

SectionHeader.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

SectionHeader.propTypes = {
  title: PropTypes.string,
  uppercase: PropTypes.bool,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  spacingHorizontal: PropTypes.number,
  textSize: PropTypes.string,
  textColor: PropTypes.string
};

SectionHeader.defaultProps = {
  title: '',
  ...BaseTheme.SectionHeader
};

SectionHeader.demoProps = {
  title: 'Section header'
};

export default SectionHeader;
