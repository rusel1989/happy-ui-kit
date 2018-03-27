
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StatusBar, Platform, AsyncStorage, Image } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';

import { getImagesArray } from './images';
import * as fonts from './fonts';
import RootNavigator from './navigation'

console.disableYellowBox = true;
StatusBar.setBarStyle('light-content');

const cacheImages = (images) => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const cacheFonts = (fonts) => {
  return Font.loadAsync(fonts);
};

export default class App extends React.Component {
  state = {
    ready: false
  }

  getFontAssets () {
    return cacheFonts(fonts[Platform.OS]);
  }

  getImageAssets () {
    return cacheImages(getImagesArray());
  }

  startApp = () => {
    return Promise.all([ ...this.getImageAssets(), this.getFontAssets() ]);
  }

  onFinish = () => {
    this.setState({ ready: true });
  }

  render () {
    if (!this.state.ready) {
      return (
        <AppLoading
          startAsync={this.startApp}
          onFinish={this.onFinish}
          onError={console.warn} />
      );
    }
    return (
      <RootNavigator />
    );
  }
}

