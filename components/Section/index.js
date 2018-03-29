import React from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import SectionHeader from '../SectionHeader';
import Col from '../Col';
import Card from '../Card';
import BaseTheme from '../../theme/base';

const Section = ({ title, children, ...rest }, context) => {
  const { headerHeight, headerUppercase, headerTextSize, headerTextColor,
    headerBackgroundColor, contentBackgroundColor, contentSpacingVertical,
    contentSpacingHorizontal } = context.mergeStyle('Section', rest);
  return (
    <Col alignItems='stretch' justifyContent='flex-start'>
      <SectionHeader
        uppercase={headerUppercase}
        textSize={headerTextSize}
        textColor={headerTextColor}
        height={headerHeight}
        backgroundColor={headerBackgroundColor}
        title={title} />
      <Card
        shadow={false}
        backgroundColor={contentBackgroundColor}
        spacingVertical={contentSpacingVertical}
        spacingHorizontal={contentSpacingHorizontal}>
        {children}
      </Card>
    </Col>
  );
};

Section.displayName = 'Section';

Section.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  headerUppercase: PropTypes.bool,
  headerHeight: PropTypes.number,
  headerTextSize: PropTypes.number,
  headerTextColor: ExtraPropTypes.color,
  headerBackgroundColor: ExtraPropTypes.color,
  contentBackgroundColor: ExtraPropTypes.color,
  contentSpacingVertical: PropTypes.number,
  contentSpacingHorizontal: PropTypes.number
};

Section.defaultProps = {
  title: '',
  ...BaseTheme.Section
};

export default Section;
