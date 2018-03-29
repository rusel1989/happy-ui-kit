import React from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'
import { Animated } from 'react-native';

import ListItem from './ListItem';
import Col from '../Col';
import Separator from '../Separator';

class CollapsibleListItem extends React.Component {
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
      duration: 300
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
    const { children, showSeparator, ...rest } = this.props;
    return (
      <Col alignItems='stretch'>
        <ListItem
          {...rest}
          onPress={this.onPress}
          showSeparator={false} />
        <Animated.View ref={this.setRef} style={{ height: this.state.collapsibleHeight, overflow: 'hidden' }}>
          {children}
        </Animated.View>
        {showSeparator && <Separator />}
      </Col>
    );
  }
}

CollapsibleListItem.displayName = `${ListItem.displayName}.Collapsible`;

CollapsibleListItem.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

CollapsibleListItem.propTypes = {
  ...ListItem.propTypes,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  contentHeight: PropTypes.number,
  getRef: PropTypes.func
};

CollapsibleListItem.defaultProps = {
  ...ListItem.defaultProps,
  onOpen: () => {},
  onClose: () => {},
  contentHeight: 240,
  getRef: () => {}
};

export default CollapsibleListItem;
