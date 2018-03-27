import React from 'react';
import { Constants } from 'expo';
import PropTypes from 'prop-types';

import Col from '../Col';
import ListItem from '../ListItem';
import Icon from '../Icon';
import { colors } from '@happy/components/theme';

const Drawer = ({ items, navigation, renderIcon }) => {
  return (
    <Col
      style={{ backgroundColor: 'white', paddingTop: Constants.statusBarHeight }}
      alignItems='stretch'>
      {items.map((item, i) => {
        return (
          <ListItem.Selectable
            key={i}
            iconColor={colors.APP_BLACK}
            icon={renderIcon({route: item})}
            onPress={() => navigation.navigate(item.routeName)}
            label={item.routeName}
            height={50}
            labelColor={colors.APP_DARK_GREY}
            rightButton={<Icon name='arrow-right' style={{ marginRight: -6 }} />} />
        );
      })}
    </Col>
  );
};

Drawer.propTypes = {

};

export default Drawer;
