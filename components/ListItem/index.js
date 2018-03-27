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
  labelColor = colors.MEDIUM_GREY,
  iconColor = colors.MEDIUM_GREY,
  icon,
  children,
  showSeparator = true,
  height = 60
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

class SelectableListItem extends Component {
  static defaultProps = {
    onPress: () => {},
    selectedBackgroundColor: colors.WHITE
  }

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

class CollapsibleListItem extends Component {
  static defaultProps = {
    onPress: () => {},
    onOpen: () => {},
    onClose: () => {},
    selectedBackgroundColor: colors.WHITE,
    contentHeight: 240
  }

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

ListItem.Selectable = SelectableListItem;
ListItem.Collapsible = CollapsibleListItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: 60,
    borderBottomColor: colors.SEPARATOR,
    backgroundColor: colors.WHITE
  }
});

ListItem.propTypes = {

};


export default ListItem;
