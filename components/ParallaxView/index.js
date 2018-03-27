import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';
import { renderRefreshControl } from '../RefreshControl';
import Card from '../Card';
import Shadow from './Shadow';

class ParallaxView extends Component {
  static defaultProps = {
    refreshing: false,
    onRefresh: () => {},
    scrollViewRef: () => {},
    scrollEnabled: true,
    teaserHeight: 200,
    header: <View />
  }

  static propTypes = {

  }

  constructor (props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  render () {
    const { onRefresh, refreshing, teaserHeight, scrollViewRef, scrollEnabled, children, header } = this.props;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [ 0, teaserHeight ],
      outputRange: [ teaserHeight, 0 ],
      extrapolate: 'clamp'
    });
    const headerZIndex = refreshing ? -1 : 1;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          innerRef={scrollViewRef}
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
          refreshControl={renderRefreshControl({ onRefresh, refreshing })}>
          <View style={{ marginTop: teaserHeight }}>
            <Card>
              {children}
            </Card>
          </View>
        </KeyboardAwareScrollView>
        <Animated.View style={[ styles.header, { height: headerHeight, zIndex: headerZIndex } ]}>
          {header}
          <Shadow />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1
  },
  scrollView: {
    backgroundColor: 'transparent',
    flex: 1
  },
  header: {
    backgroundColor: colors.WHITE,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});

export default ParallaxView;
