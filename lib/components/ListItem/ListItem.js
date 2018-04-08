import React from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';

import Row from '../Row';
import Col from '../Col';
import Icon from '../Icon';
import Text from '../Text';
import Touchable from '../Touchable';
import Separator from '../Separator';

const ListItem = ({
  label,
  onPress,
  icon,
  children,
  rightButton,
  ...rest
}, context) => {
  const { showSeparator, height, labelColor, iconColor, spacingHorizontal, labelSize, backgroundColor, activeBackgroundColor } = context.mergeStyle('ListItem', rest);
  return (
    <Col alignItems='stretch' style={{ backgroundColor }}>
      <Touchable.Highlight onPress={onPress} underlayColor={activeBackgroundColor}>
        <Row style={{ height, paddingHorizontal: spacingHorizontal }}>
          {(icon || label) && (
            <Row
              justifyContent='flex-start'
              style={{ marginRight: icon && !label ? spacingHorizontal : 0, flex: icon && label ? 1 : 0 }}>
              {icon && (
                <Icon
                  name={icon}
                  color={iconColor} />)}
              {label && (
                <Text.Light
                  style={{ paddingLeft: icon ? spacingHorizontal : 0 }}
                  size={labelSize}
                  color={labelColor}>
                  {label}
                </Text.Light>)}
            </Row>)}
          {children}
          {rightButton}
        </Row>
        {showSeparator && <Separator />}
      </Touchable.Highlight>
    </Col>
  );
};

ListItem.displayName = 'ListItem';

ListItem.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

ListItem.propTypes = {
  label: PropTypes.string,
  labelColor: ExtraPropTypes.color,
  iconColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  icon: PropTypes.string,
  children: PropTypes.node,
  showSeparator: PropTypes.bool,
  height: PropTypes.number,
  spacingHorizontal: PropTypes.number,
  labelSize: PropTypes.number,
  onPress: PropTypes.func,
  activeBackgroundColor: ExtraPropTypes.color
};

ListItem.defaultProps = {
  onPress: () => {},
  label: null
};

export default ListItem;
