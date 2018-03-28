import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

import BaseTheme from '../../theme/base';
import { renderRefreshControl } from '../../utils';
import Card from '../Card';

class ParallaxView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  render () {
    const { onRefresh, refreshing, teaserHeight, scrollViewRef, scrollEnabled, children, header, style, cardStyle, ...rest } = this.props;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [ 0, teaserHeight ],
      outputRange: [ teaserHeight, 0 ],
      extrapolate: 'clamp'
    });
    const headerZIndex = refreshing ? -1 : 1;
    const { backgroundColor, showIndicator, spinnerColor, headerBackgroundColor, cardBackgroundColor, cardSpacingVertical, cardSpacingHorizontal,
      cardBorderRadius, cardShadow } = this.context.mergeStyle('ParallaxView', rest);

    return (
      <View style={[ { backgroundColor, flex: 1 }, style ]}>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          innerRef={scrollViewRef}
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={showIndicator}
          scrollEnabled={scrollEnabled}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
          refreshControl={renderRefreshControl({ onRefresh, refreshing, spinnerColor })}>
          <View style={{ marginTop: teaserHeight }}>
            <Card
              backgroundColor={cardBackgroundColor}
              spacingVertical={cardSpacingVertical}
              spacingHorizontal={cardSpacingHorizontal}
              borderRadius={cardBorderRadius}
              shadow={cardShadow}
              style={cardStyle}>
              {children}
            </Card>
          </View>
        </KeyboardAwareScrollView>
        <Animated.View style={[ styles.header, { backgroundColor: headerBackgroundColor, height: headerHeight, zIndex: headerZIndex } ]}>
          {header}
        </Animated.View>
      </View>
    );
  }
}

ParallaxView.defaultProps = {
  refreshing: false,
  onRefresh: () => {},
  scrollViewRef: () => {},
  scrollEnabled: true,
  teaserHeight: 200,
  header: <View />,
  ...BaseTheme.ParallaxView
};

ParallaxView.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

ParallaxView.propTypes = {
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  scrollViewRef: PropTypes.func,
  scrollEnabled: PropTypes.bool,
  teaserHeight: PropTypes.number,
  header: PropTypes.node,
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  headerBackgroundColor: PropTypes.string,
  spinnerColor: PropTypes.string,
  cardBackgroundColor: PropTypes.string,
  showIndicator: PropTypes.bool,
  cardShadow: PropTypes.bool,
  cardSpacingHorizontal: PropTypes.number,
  cardSpacingVertical: PropTypes.number,
  cardBorderRadius: PropTypes.number
};

ParallaxView.demoFlexDirection = 'row';

ParallaxView.demoProps = {
  style: { height: 200 },
  teaserHeight: 100,
  backgroundColor: BaseTheme.palette.APP_PRIMARY,
  headerBackgroundColor: BaseTheme.palette.APP_PRIMARY,
  cardStyle: { marginHorizontal: 10 },
  cardShadow: true,
  header: <View style={{ height: 100 }}><Text>header</Text></View>,
  children: <View style={{ height: 200 }}><Text>content</Text></View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: 'transparent',
    flex: 1
  },
  header: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});

export default ParallaxView;
