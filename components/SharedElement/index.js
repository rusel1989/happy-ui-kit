import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

Animatable.initializeRegistryWithDefinitions({
  enterFromBottom: {
    from: { bottom: -300, opacity: 1 },
    to: { bottom: 0, opacity: 1 },
    easing: 'ease-in-out-quad'
  },
  leaveToBottom: {
    from: { bottom: 0, opacity: 1 },
    to: { bottom: -300, opacity: 1 },
    easing: 'ease-in-out-quad'
  },
  logoEnterFromCenterToTop: {
    0: { top: height / 2 - 60 },
    0.5: { top: height / 2 - 60 },
    1: { top: 100 },
    easing: 'ease-in-out-quad'
  },
  logoEnterFromTop: {
    from: { top: -300 },
    to: { top: 100 },
    easing: 'ease-in-out-quad'
  },
  logoLeaveToTop: {
    from: { top: 100 },
    to: { top: -300 },
    easing: 'ease-in-out-quad'
  }
});

class SharedElement extends Component {
  static defaultProps = {
    duration: 400,
    screenRef: () => {}
  }

  static propTypes = {

  }

  onAnimationStart = () => {

  }

  render () {
    const { screenRef, containerStyle, children, hiddenByDefault, ...rest } = this.props;
    return (
      <Animatable.View
        ref={screenRef}
        style={[ { opacity: hiddenByDefault ? 0 : 1 }, containerStyle ]}
        {...rest}>
        {children}
      </Animatable.View>
    );
  }
}

export default SharedElement;
