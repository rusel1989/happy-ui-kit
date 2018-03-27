import React from 'react';
import { StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';
import SectionHeader from '../SectionHeader';
import ListItem from '../ListItem';

import Separator from '../Separator';
import { renderRefreshControl } from '../../utils';

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
  sections,
  onRefresh,
  refreshing,
  loading,
  animated,
  getRef,
  style,
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
      style={[ styles.container, style ]}
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
  ...SectionList.propTypes,
  extraData: PropTypes.any,
  sections: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, data: PropTypes.array })),
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  loading: PropTypes.bool,
  animated: PropTypes.bool,
  getRef: PropTypes.func
};

CustomSectionList.defaultProps = {
  ...SectionList.propTypes,
  sections: [],
  onRefresh: () => {},
  refreshing: false,
  loading: false,
  animated: false,
  getRef: () => {}
};

CustomSectionList.demoProps = {
  style: { height: 200 },
  sections: [{
    title: 'Section 1',
    data: [{ name: 'item 1', key: 'item-1' }, { name: 'item 2', key: 'item-2' }]
  }, {
    title: 'Section 2',
    data: [{ name: 'item 3', key: 'item-3' }, { name: 'item 4', key: 'item-4' }]
  }],
  renderItem: ({ item }) => <ListItem showSeparator={false} label={item.name} />
};

export default CustomSectionList;
