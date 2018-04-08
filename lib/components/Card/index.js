import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'
import Col from '../Col';


const Card = ({ children, alignItems, justifyContent, style, ...rest }, context) => {
  const { backgroundColor, spacingVertical, spacingHorizontal, borderRadius, shadow } = context.mergeStyle('Card', rest);
  const shadowStyle = shadow ? { elevation: 2 } : {};
  return (
    <Col alignItems={alignItems} justifyContent={justifyContent} style={{ ...shadowStyle, backgroundColor, borderRadius, paddingVertical: spacingVertical, paddingHorizontal: spacingHorizontal, ...style }}>
      {children}
    </Col>
  );
};

Card.displayName = 'Card';

Card.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Card.propTypes = {
  ...Col.propTypes,
  backgroundColor: ExtraPropTypes.color,
  spacingVertical: PropTypes.number,
  spacingHorizontal: PropTypes.number,
  borderRadius: PropTypes.number,
  shadow: PropTypes.bool
};

Card.defaultProps = {
  alignItems: 'stretch',
  justifyContent: 'flex-start'
};

Card.demoProps = {
  children: <Text>Card content</Text>
};

export default Card;
