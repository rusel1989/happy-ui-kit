import React from 'react';
import { StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';
import SectionHeader from '../SectionHeader';
import Separator from '../Separator';
import { renderRefreshControl } from '../RefreshControl';

const createAnimatedComponent = (Component) => ({
  duration = 200,
  animation = 'fadeInUp',
  easing = 'ease-in-out',
  delay = 0,
  ...rest
}) => {
  return (
    <Animatable.View
      animation={animation}
      duration={duration}
      delay={delay}
      easing={easing}
      useNativeDriver>
      <Component {...rest} />
    </Animatable.View>
  );
};

const AnimatedSectionHeader = createAnimatedComponent(SectionHeader);
const AnimatedSeparator = createAnimatedComponent(Separator);

const ListSectionHeader = ({ title, animated, ...rest }) => {
  return animated ? <AnimatedSectionHeader title={title} /> : <SectionHeader title={title} />;
};

const ListItemSeparator = ({ animated, ...rest }) => {
  return animated ? <AnimatedSeparator {...rest} /> : <Separator />;
};

const ListFooterComponent = ({ loading }) => {
  return loading && (
    <ActivityIndicator
      color={colors.PINK}
      animating={loading}
      style={{ paddingVertical: 30 }} />
  );
};

const CustomSectionList = ({
  extraData,
  sections = [],
  onRefresh = () => {},
  refreshing = false,
  loading = false,
  animated = false,
  getRef = () => {},
  ...rest
}) => {
  return (
    <SectionList
      ref={getRef}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      refreshControl={renderRefreshControl({ onRefresh, refreshing })}
      ListFooterComponent={() => <ListFooterComponent loading={loading} />}
      ItemSeparatorComponent={({ leadingItem }) => <ListItemSeparator delay={leadingItem.totalIndex * 200} />}
      renderSectionHeader={({ section }) => <ListSectionHeader title={section.title} delay={section.totalIndex * 200} />}
      style={styles.container}
      extraData={extraData}
      sections={sections}
      {...rest} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  }
});

CustomSectionList.propTypes = {

};


export default CustomSectionList;
