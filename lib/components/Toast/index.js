/*
 * A android like toast for android and ios, written in JS
 * https://github.com/react-native-component/react-native-smart-toast/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'
import {
  StyleSheet,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

import TimerEnhance from 'react-native-smart-timer-enhance';
import constants, { gravity } from './constants';
import BaseTheme from '../../theme/base';
import Text from '../Text';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: -9999,
    top: -9999,
    zIndex: 999
  }
});

class Toast extends Component {
    static constants = constants
    constructor (props) {
      super(props);
      this.state = {
        position: props.position,
        visible: false,
        opacity: new Animated.Value(0),
        children: props.children
      };
      this._toastWidth = null;
      this._toastHeight = null;
      this._toastShowAnimation = null;
      this._toastHideAnimation = null;
      this._toastAnimationToggle = null;
    }

    render () {
      const { textColor, textSize, font, spacingVertical, spacingHorizontal, backgroundColor, borderRadius } = this.context.mergeStyle('Toast', this.props);
      let children = React.Children.map(this.state.children, (child) => {
        if (!React.isValidElement(child)) {
          return (
            <Text.Custom
              size={textSize}
              color={textColor}
              fontFamily={font}
              style={[ styles.text, { } ]}>
              {child}
            </Text.Custom>
          );
        }
        return child;
      });
      return (
        this.state.visible
          ? (
            <Animated.View
              ref={component => { this._container = component; }}
              onLayout={this._onToastLayout}
              style={[styles.container, { paddingVertical: spacingVertical, paddingHorizontal: spacingHorizontal, backgroundColor, borderRadius, opacity: this.state.opacity }]}>
              {children}
            </Animated.View>)
          : null
      );
    }

    show = ({ children = this.state.children, position = this.state.position, duration = this.props.animatedDuration, easing = Easing.linear, delay = this.props.delay, animationEnd }
      = { children: this.state.children, position: this.state.position, duration: this.props.animatedDuration, easing: Easing.linear, delay: this.props.delay }) => {
      this._toastShowAnimation && this._toastShowAnimation.stop();
      this._toastHideAnimation && this._toastHideAnimation.stop();
      this._toastAnimationToggle && this.clearTimeout(this._toastAnimationToggle);

      if (this.state.visible) {
        this._setToastPosition(position);
      }

      this.setState({
        children,
        position,
        visible: true
      });

      this._toastShowAnimation = Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration,
          easing,
          delay
        }
      );
      this._toastShowAnimation.start(() => {
        this._toastShowAnimation = null;
        if (!animationEnd) {
          this._toastAnimationToggle = this.setTimeout(() => {
            this.hide({duration, easing, delay});
            this._toastAnimationToggle = null;
          }, this.props.duration);
        } else {
          animationEnd();
        }
      });
    }

    hide = ({ duration = this.props.animatedDuration, easing = Easing.linear, delay = this.props.delay, animationEnd }
      = { duration: this.props.animatedDuration, easing: Easing.linear, delay: this.props.delay }) => {
      this._toastShowAnimation && this._toastShowAnimation.stop();
      this._toastHideAnimation && this._toastHideAnimation.stop();
      this.clearTimeout(this._toastAnimationToggle);

      this._toastHideAnimation = Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          duration,
          easing,
          delay
        }
      );
      this._toastHideAnimation.start(() => {
        this._toastHideAnimation = null;
        this.setState({
          visible: false
        });
        animationEnd && animationEnd();
      });
    }

    _onToastLayout = (e) => {
      this._toastWidth = e.nativeEvent.layout.width;
      this._toastHeight = e.nativeEvent.layout.height;
      this._setToastPosition();
    }

    _setToastPosition = (position = this.state.position) => {
      if (!this._toastWidth || !this._toastHeight) {
        return;
      }
      let { spacing, marginTop } = this.props;
      let left = (deviceWidth - this._toastWidth) / 2;
      let top = position === gravity.top
        ? spacing + marginTop
        : position === gravity.center ? (deviceHeight - this._toastHeight) / 2 : null;
      let bottom = position === gravity.bottom ? spacing : null;
      this._container.setNativeProps({
        style: {
          left,
          top,
          bottom
        }
      });
    }
}

Toast.displayName = 'Toast';

Toast.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Toast.defaultProps = {
  spacing: 30,
  position: gravity.bottom,
  duration: 3000,
  animatedDuration: 510,
  delay: 0,
  marginTop: 0
};

Toast.propTypes = {
  spacing: PropTypes.number,
  position: PropTypes.oneOf([ gravity.top, gravity.bottom, gravity.center ]),
  duration: PropTypes.number,
  animatedDuration: PropTypes.number,
  delay: PropTypes.number,
  marginTop: PropTypes.number,
  textColor: ExtraPropTypes.color,
  textSize: PropTypes.number,
  font: PropTypes.string,
  spacingVertical: PropTypes.number,
  spacingHorizontal: PropTypes.number,
  backgroundColor: ExtraPropTypes.color,
  borderRadius: PropTypes.number
};

export default TimerEnhance(Toast);
