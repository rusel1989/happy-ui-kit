import React from 'react';
import { Asset, Font } from 'expo';
import { Image, Alert, RefreshControl } from 'react-native';
import isPlainObject from 'lodash/isPlainObject';

import BaseTheme from '../theme/base';

export const cacheImages = (images) => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export const cacheFonts = (fonts) => {
  return Font.loadAsync(fonts);
};

export const square = (size = 0) => ({ width: size, height: size });

export const rect = (w = 0, h = 0) => ({ width: w, height: h });

export const circ = (radius = 0) => ({ width: radius * 2, height: radius * 2, borderRadius: radius });

export const isEqual = (a, b) => a === b;

export const toTitleCase = (str = '') =>
  str.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substr(1));

export const showConfirmDialog = ({
  title = '',
  message = '',
  onCancelPress = () => {},
  onOkPress = () => {}
}) => {
  Alert.alert(
    title,
    message,
    [
      { text: 'Cancel', onPress: onCancelPress, style: 'cancel' },
      { text: 'OK', onPress: onOkPress }
    ],
    { cancelable: false }
  );
};

export const renderRefreshControl = ({ refreshing, onRefresh }) => {
  return (
    <RefreshControl
      colors={[BaseTheme.palette.APP_PRIMARY]}
      tintColor={BaseTheme.palette.APP_PRIMARY}
      refreshing={refreshing}
      onRefresh={onRefresh} />
  );
};

export const saveDemoProps = (name, props) => {
  return fetch(`http://192.168.1.103:59590/save-parsed-props/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(props)
  }).then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveComponent = (name, config) => {
  return fetch(`http://192.168.1.103:59590/save-component/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(config)
  }).then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const formatPropValue = (value) => {
  if (typeof value === 'string') {
    return /^#[a-fA-F0-9]{6}$/.test(value) ? value.toUpperCase() : value.length ? `'${value}'` : `' '`;
  } else if (typeof value === 'undefined') {
    return 'n/a';
  } else if (typeof value === 'number') {
    return `${value}`;
  } else if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  } else if (typeof value === 'function') {
    return '() => {}';
  } else if (Array.isArray(value)) {
    return value.length ? `[${value.join(', ')}]` : '[]';
  } else if (isPlainObject(value)) {
    return JSON.stringify(value);
  } else {
    return '?';
  }
};
