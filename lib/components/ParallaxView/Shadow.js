import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { getImage } from '../../images';

export default () => {
  return (
    <Image
      source={getImage('shadow')}
      style={styles.shadow} />
  );
};

const styles = StyleSheet.create({

  shadow: {
    height: 14,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});
