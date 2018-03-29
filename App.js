
import React from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { Platform, Image, UIManager } from 'react-native';

import { getImagesArray } from './images';
import * as fonts from './fonts';
import RootNavigator from './navigation';
import ThemeProvider from './theme/Provider';

export default class App extends React.Component {
  state = {
    ready: false
  }

  cacheImages = (images = []) => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  cacheFonts = (fonts = {}) => {
    return Font.loadAsync(fonts);
  }

  getFontAssets () {
    return this.cacheFonts(fonts[Platform.OS]);
  }

  getImageAssets () {
    return this.cacheImages(getImagesArray());
  }

  startApp = () => {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
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
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    );
  }
}
