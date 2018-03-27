import React from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from '@happy/components/theme';
import { isEqual, rect } from '@happy/utils';
import { getImage } from '../../images';

import TabBarButton from '../TabBarButton';
import SegmentedControl from '../SegmentedControl';

const TabBarBottom = ({ navigation: { navigate, state } }) => {
  const activeRoute = state.routes[state.index].routeName;
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TabBarButton
          icon='profile'
          isActive={isEqual(activeRoute, 'Profile')}
          onPress={() => navigate('Profile')}
          title='Profile' />
      </View>
      <View style={styles.buttonContainer}>
        <TabBarButton
          image={getImage('main-button')}
          imageStyle={{ ...rect(60, 40) }}
          onPress={() => navigate('Measure')} />
      </View>
      <View style={styles.buttonContainer}>
        <TabBarButton
          icon='settings'
          isActive={isEqual(activeRoute, 'Settings')}
          onPress={() => navigate('Settings')}
          title='Settings' />
      </View>
    </View>
  );
};

export const TabBarTop = ({ navigation, getLabel, jumpToIndex }) => {
  return (
    <SegmentedControl
      onChange={i => jumpToIndex(i)}
      selectedIndex={navigation.state.index}
      options={navigation.state.routes.map(route => getLabel({ route, navigation }))} />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5'
  },
  buttonContainer: {
    justifyContent: 'center',
    flex: 1
  }
});

TabBarBottom.propTypes = {

};

export default TabBarBottom;
