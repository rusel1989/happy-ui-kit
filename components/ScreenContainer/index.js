import React, { Component } from 'react';
import { View } from 'react-native';
import merge from 'lodash/merge';

import { showConfirmDialog } from '@happy/utils';
import Toast from '../Toast';

const screenContainer = function (ScreenComponent) {
  return class Screen extends Component {
    static navigationOptions = ScreenComponent.navigationOptions
    static displayName = `ScreeenContainer-${ScreenComponent.displayName}`

    constructor (props) {
      super(props);
      console.log('SCREEN_CONTAINER', props.screenProps, props.navigation.state);
      this.state = {
        transitioning: false,
        transitionFinished: false
      };
    }

    transitionElementsRefs = {}

    setToastRef = v => {
      this.toastRef = v;
    }

    setElementRef = (name, v) => {
      this.transitionElementsRefs[name] = v;
    }

    getSharedElementRef = (name) => {
      return (v) => this.setElementRef(name, v);
    }

    setTransitionerRef = (v) => {
      this.transitioner = v;
    }

    showToast = (message = '', callback) => {
      if (this.toastRef) {
        this.toastRef.show({
          position: 0,
          children: message,
          animationEnd: () => this.hideToast(callback)
        });
      }
    }

    hideToast = (callback) => {
      setTimeout(() => {
        callback && callback();
        this.toastRef && this.toastRef.hide();
      }, 2000);
    }

    showConfirmDialog = (title, message, onConfirm) => {
      showConfirmDialog({
        title,
        message,
        onOkPress: onConfirm
      });
    }

    onBackPress = (hasUnsavedChanges, callback) => {
      if (hasUnsavedChanges) {
        this.showConfirmDialog(
          'Unsaved changes',
          'You have unsaved changes, do you really want to leave ?', () => {
            callback && callback();
            this.props.navigation.goBack();
          });
      } else {
        this.props.navigation.goBack();
      }
    }

    configureScreenTransitions = (config = {}) => {
      this.transitionConfig = merge({}, this.transitionConfig, config);
    }

    delay = (time = 0) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    getAnimationForElement = (type, name) => {
      const elem = this.transitionElementsRefs[name];
      const config = merge({}, this.transitionConfig[type], this.transitionConfig[type][name]);
      if (!elem) {
        return Promise.resolve();
      }

      if (Array.isArray(config.animation)) {
        let promise = Promise.resolve();
        config.animation.forEach(a => {
          promise = promise.then(() => elem[a]());
        });
        return promise;
      }

      if (config.delay) {
        return this.delay(config.delay)
          .then(() => elem[config.animation](config.duration));
      }

      return elem[config.animation](config.duration);
    }

    startEnterTransition = () => {
      return this.startTransition('enter');
    }

    startLeaveTransition = () => {
      return this.startTransition('leave');
    }

    startRevisitTransition = () => {
      return this.startTransition('revisit');
    }

    startTransition = (type = 'enter', duration = 1000) => {
      const animations = [];
      this.setState({ transitioning: true });
      Object
        .keys(this.transitionElementsRefs)
        .forEach((name, i) => {
          const animation = this.getAnimationForElement(type, name);
          animations.push(animation);
        });
      return Promise.all(animations)
        .then(() => {
          this.setState({ transitioning: false });
          return true;
        });
    }

    render () {
      return (
        <View style={{ flex: 1 }}>
          <ScreenComponent
            {...this.props}
            showToast={this.showToast}
            showConfirmDialog={this.showConfirmDialog}
            getSharedElementRef={this.getSharedElementRef}
            transitioning={this.state.transitioning}
            configureScreenTransitions={this.configureScreenTransitions}
            startTransition={this.startTransition}
            startEnterTransition={this.startEnterTransition}
            startLeaveTransition={this.startLeaveTransition}
            startRevisitTransition={this.startRevisitTransition}
            onBackPress={this.onBackPress} />
          <Toast
            ref={this.setToastRef}
            marginTop={64}
            duration={500}
            position={0} />
        </View>
      );
    }
  };
};

export default screenContainer;
