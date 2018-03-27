import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import Row from '../Row';
import Col from '../Col';
import Icon from '../Icon';
import Text from '../Text';
import Touchable from '../Touchable';
import { colors } from '@happy/components/theme';

const ListItem = ({
  label,
  labelColor,
  iconColor,
  icon,
  children,
  showSeparator,
  height
}) => (
  <Row style={[ styles.container, { borderBottomWidth: showSeparator ? 1 : 0, height } ]}>
    {(icon || label) && (
      <Row
        justifyContent='flex-start'
        style={{ marginRight: icon && !label ? 16 : 0, flex: icon && label ? 1 : 0 }}>
        {icon && (
          <Icon
            name={icon}
            color={iconColor} />)}
        {label && (
          <Text.Light
            style={{ paddingLeft: icon ? 16 : 0 }}
            size={16}
            color={labelColor}>
            {label}
          </Text.Light>)}
      </Row>)}
    {children}
  </Row>
);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  label: PropTypes.string,
  labelColor: PropTypes.string,
  iconColor: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  showSeparator: PropTypes.bool,
  height: PropTypes.number
};

ListItem.defaultProps = {
  labelColor: colors.MEDIUM_GREY,
  iconColor: colors.MEDIUM_GREY,
  showSeparator: true,
  height: 60
};

ListItem.demoProps = {
  label: 'List item',
  icon: 'save',
  iconColor: colors.APP_PRIMARY

};

class SelectableListItem extends Component {
  setRef = (v) => {
    this.btnRef = v;
  }

  onPress = () => {
    if (this.props.animated) {
      this.btnRef.pulse(350);
    }
    this.props.onPress();
  }

  render () {
    const { label, icon, height, children, isSelected, selectedBackgroundColor, iconColor, labelColor, showSeparator, rightButton } = this.props;
    return (
      <Animatable.View
        useNativeDriver
        style={{ backgroundColor: isSelected ? selectedBackgroundColor : colors.WHITE }}
        ref={this.setRef}>
        <Touchable.Highlight
          onPress={this.onPress}>
          <ListItem
            height={height}
            showSeparator={showSeparator}
            label={label}
            labelColor={labelColor}
            iconColor={iconColor}
            icon={icon}>
            {children}
            {rightButton}
          </ListItem>
        </Touchable.Highlight>
      </Animatable.View>
    );
  }
}

SelectableListItem.displayName = `${ListItem.displayName}.Selectable`;

SelectableListItem.propTypes = {
  ...ListItem.propTypes,
  animated: PropTypes.bool,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
  selectedBackgroundColor: PropTypes.string,
  rightButton: PropTypes.node
}

SelectableListItem.defaultProps = {
  ...ListItem.defaultProps,
  onPress: () => {},
  selectedBackgroundColor: colors.WHITE,
  animated: false,
  isSelected: false,
  rightButton: null
};

SelectableListItem.demoProps = {
  icon: 'radio-active',
  isSelected: true,
  label: 'Selectable Item',
  labelColor: colors.APP_DARK_GREY,
  iconColor: colors.APP_BLACK,
  selectedBackgroundColor: colors.APP_LIGHT_GREY
};


class CollapsibleListItem extends Component {

  state = {
    collapsibleHeight: new Animated.Value(0),
    opened: false
  }

  componentDidMount () {
    if (this.props.getRef) {
      this.props.getRef(this);
    }
  }

  setRef = (v) => {
    this.collapsible = v;
    if (this.props.getRef) {
      this.props.getRef(v);
    }
  }

  open = () => {
    this.animate(this.props.contentHeight, () => {
      this.setState({ opened: true });
      this.props.onOpen();
    });
  }

  close = (cb) => {
    this.animate(0, () => {
      this.setState({ opened: false });
      this.props.onClose();
      cb && cb();
    });
  }

  animate = (to, callback) => {
    Animated.timing(this.state.collapsibleHeight, {
      toValue: to,
      duration: 300,
      // useNativeDriver: true
    }).start(callback);
  }

  onPress = () => {
    if (this.state.opened) {
      this.close();
    } else {
      this.open();
    }
    this.props.onPress();
  }

  render () {
    const { children, style, ...rest } = this.props;
    return (
      <Col style={[ { borderBottomColor: colors.SEPARATOR, borderBottomWidth: 1 }, style ]} alignItems='stretch'>
        <SelectableListItem
          {...rest}
          onPress={this.onPress}
          showSeparator={false} />
        <Animated.View ref={this.setRef} style={{ height: this.state.collapsibleHeight, overflow: 'hidden' }}>
          {children}
        </Animated.View>
      </Col>
    );
  }
}

CollapsibleListItem.displayName = `${ListItem.displayName}.Collapsible`;

CollapsibleListItem.propTypes = {
  ...SelectableListItem.propTypes,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  contentHeight: PropTypes.number,
  getRef: PropTypes.func,
  children: PropTypes.node
};

CollapsibleListItem.defaultProps = {
  ...SelectableListItem.defaultProps,
  onOpen: () => {},
  onClose: () => {},
  contentHeight: 240,
  getRef: () => {}
};

CollapsibleListItem.demoProps = {
 label: 'Collapsible item',
 icon: 'arrow-down',
 children: <Col><Text>{`Collapsible content`}</Text></Col>,
 contentHeight: 50
};

ListItem.Selectable = SelectableListItem;
ListItem.Collapsible = CollapsibleListItem;

ListItem.subComponents = [
  SelectableListItem,
  CollapsibleListItem
];



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: 60,
    borderBottomColor: colors.SEPARATOR,
    backgroundColor: colors.WHITE
  }
});

export default ListItem;
