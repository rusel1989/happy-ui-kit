import React from 'react';
import { StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import BaseTheme from '../../theme/base';
import SectionHeader from '../SectionHeader';
import ListItem from '../ListItem';

import Separator from '../Separator';
import { renderRefreshControl } from '../../utils';

const createAnimatedComponent = (Component) => ({
  duration = 200,
  animation = 'fadeInUp',
  easing = 'ease-in-out-quad',
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

const ListSectionHeader = ({
  animated,
  duration,
  totalIndex,
  sectionHeaderTextColor,
  sectionHeaderTextSize,
  sectionHeaderBackgroundColor,
  sectionHeaderHeight,
  sectionHeaderSpacingHorizontal,
  ...rest
}) => {
  const headerProps = {
    textSize: sectionHeaderTextSize,
    textColor: sectionHeaderTextColor,
    backgroundColor: sectionHeaderBackgroundColor,
    height: sectionHeaderHeight,
    spacingHorizontal: sectionHeaderSpacingHorizontal,
    delay: duration * totalIndex,
    duration,
    ...rest
  };
  return animated
    ? <AnimatedSectionHeader {...headerProps} />
    : <SectionHeader {...headerProps} />;
};

const ListItemSeparator = ({ animated, duration, totalIndex, separatorColor, separatorWidth, ...rest }) => {
  const separatorProps = {
    width: separatorWidth,
    color: separatorColor,
    delay: duration * totalIndex,
    duration,
    ...rest
  };
  return animated ? <AnimatedSeparator {...separatorProps} /> : <Separator {...separatorProps} />;
};

const ListFooterComponent = ({ loading, spacingVertical, spinnerColor }) => {
  return loading && (
    <ActivityIndicator
      color={spinnerColor}
      animating={loading}
      style={{ paddingVertical: spacingVertical }} />
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
  renderItem,
  ...rest
}, context) => {
  const { showFooter, spinnerColor, footerSpacingVertical, showSeparator, ...restProps } = context.mergeStyle('SectionList', rest);
  return (
    <SectionList
      ref={getRef}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      refreshControl={renderRefreshControl({ onRefresh, refreshing, spinnerColor })}
      renderSectionHeader={({ section }) => <ListSectionHeader animated={animated} {...restProps} {...section} />}
      ListFooterComponent={() => showFooter && <ListFooterComponent loading={loading} spinnerColor={spinnerColor} spacingVertical={footerSpacingVertical} />}
      ItemSeparatorComponent={({ leadingItem }) => showSeparator && <ListItemSeparator animated={animated} {...restProps} {...leadingItem} />}
      style={[ styles.container, style ]}
      renderItem={({ item }) => renderItem({ item, delay: item.totalIndex * restProps.duration, ...restProps })}
      extraData={extraData}
      sections={sections}
      {...rest} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseTheme.palette.WHITE
  }
});

CustomSectionList.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

CustomSectionList.propTypes = {
  ...SectionList.propTypes,
  extraData: PropTypes.any,
  sections: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, data: PropTypes.array })),
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  loading: PropTypes.bool,
  animated: PropTypes.bool,
  getRef: PropTypes.func,

  sectionHeaderTextColor: PropTypes.string,
  sectionHeaderBackgroundColor: PropTypes.string,
  separatorColor: PropTypes.string,
  spinnerColor: PropTypes.string,
  animation: PropTypes.string,
  showSeparator: PropTypes.bool,
  showFooter: PropTypes.bool,

  sectionHeaderHeight: PropTypes.number,
  sectionHeaderTextSize: PropTypes.number,
  sectionHeaderSpacingHorizontal: PropTypes.number,
  footerSpacingVertical: PropTypes.number,
  separatorWidth: PropTypes.number,
  duration: PropTypes.number
};

CustomSectionList.defaultProps = {
  ...SectionList.propTypes,
  sections: [],
  onRefresh: () => {},
  refreshing: false,
  loading: false,
  animated: false,
  getRef: () => {},
  ...BaseTheme.SectionList
};

const AnimatedListItem = createAnimatedComponent(ListItem);

CustomSectionList.demoFlexDirection = 'row';

CustomSectionList.demoProps = {
  style: { height: 200 },
  animated: true,
  duration: 150,
  sections: [{
    title: 'Section 1',
    totalIndex: 0,
    data: [{ name: 'item 1', key: 'item-1', totalIndex: 1 }, { name: 'item 2', key: 'item-2', totalIndex: 2 }]
  }, {
    title: 'Section 2',
    totalIndex: 3,
    data: [{ name: 'item 3', key: 'item-3', totalIndex: 4 }, { name: 'item 4', key: 'item-4', totalIndex: 5 }]
  }],
  renderItem: ({ item, ...rest }) => <AnimatedListItem showSeparator={false} label={item.name} height={50} {...rest} />
};

export default CustomSectionList;
