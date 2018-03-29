import React from 'react';
import { View } from 'react-native';
import { TabViewAnimated } from 'react-native-tab-view';
import keys from 'lodash/keys';
import padEnd from 'lodash/padEnd';
import color from 'color';

import Col from '../components/Col';
import Row from '../components/Row';
import Button from '../components/Button';
import Text from '../components/Text';
import ParallaxView from '../components/ParallaxView';
import BaseTheme from '../theme/base';
import * as componentProps from '../demo/props';
import { saveDemoProps } from '../utils'; // eslint-disable-line

const getTonedColor = (hex, amount = 0.7) => {
  return color(hex).isDark() ? color(hex).lighten(amount).hex() : color(hex).darken(amount).hex();
};

const getTextColors = (value) => {
  if (value === 'true') {
    return [ BaseTheme.palette.APP_SUCCESS, getTonedColor(BaseTheme.palette.APP_SUCCESS) ];
  } else if (value === 'false' || value === 'n/a') {
    return [ BaseTheme.palette.APP_DANGER, getTonedColor(BaseTheme.palette.APP_DANGER, 0.5) ];
  } else if (/^#[a-fA-F0-9]{6}$/.test(value)) {
    return [ getTonedColor(value), value.toUpperCase() ];
  } else if (/^\d+$/.test(value)) {
    return [ BaseTheme.palette.WHITE, getTonedColor(BaseTheme.palette.WHITE) ];
  } else if (value === '() => {}') {
    return [ BaseTheme.palette.APP_ACCENT, getTonedColor(BaseTheme.palette.APP_ACCENT, -0.7) ];
  } else {
    return [ BaseTheme.palette.APP_PRIMARY_TEXT, getTonedColor(BaseTheme.palette.APP_PRIMARY_TEXT, 4) ];
  }
};

const MonospaceText = ({ children, textAlign, backgroundColor, color, fontWeight = '900', fontSize }) => {
  return (
    <Text.Monospace
      numberOfLines={1}
      color={color}
      fontWeight={fontWeight}
      adjustsFontSizeToFit
      size={fontSize}
      style={{ backgroundColor, paddingHorizontal: 4, paddingVertical: 2, textAlign }}>
      {children}
    </Text.Monospace>
  );
};

const propsSorter = (key) => (a, b) => {
  if (b.def === 'n/a') return -1;
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

const getDisplayName = (c) => {
  const displayName = c && c.displayName && c.displayName.replace('.', '');
  return displayName;
};

const getPropsObjectName = (displayName) => {
  if (!displayName) {
    return null;
  }
  return displayName + 'Props';
};

const createDemoScreen = (demoConfig) => {
  const sceneConfig = {};
  demoConfig.components.forEach((demoComp, i) => {
    const { Component } = demoComp;
    const displayName = getDisplayName(Component);
    const propsDocName = getPropsObjectName(displayName);

    sceneConfig[displayName] = demoComp;
    demoComp.parsedProps = [];

    if (componentProps && componentProps[propsDocName]) {
      demoComp.parsedProps = componentProps[propsDocName];
    }
  });

  const compRoutes = keys(sceneConfig).map(key => ({ key }));

  if (!demoConfig.componentContainerStyle) {
    demoConfig.componentContainerStyle = {};
  }

  class DemoScreen extends React.Component {
    state = {
      selectedIndex: 0,
      routes: compRoutes,
      sortBy: 'key',
      customProps: {}
    }

    setElRef = (v) => {
      this.el = v;
    }

    sortProps = (key) => {
      const selectedComponent = demoConfig.components[this.state.selectedIndex];
      demoConfig.components[this.state.selectedIndex].parsedProps = selectedComponent.parsedProps.sort(propsSorter(key));
      this.forceUpdate();
    }

    invokeMethodWithArgs = (method, args = []) => {
      if (this.el && typeof this.el[method] === 'function') {
        this.el[method](...args);
      }
    }

    renderComponentDemo = (config = {}) => {
      const { Component, items, methods, renderAtBottom } = config;
      return (
        <View style={{ flex: 1, flexDirection: demoConfig.containerType }}>
          {!renderAtBottom && items.map((item, index) => {
            const { props } = item;
            const ref = methods ? { ref: this.setElRef } : {};
            return (
              <View key={index} style={{ margin: 10, ...demoConfig.componentContainerStyle }}>
                <Component {...props} {...ref} />
              </View>
            );
          })}
          {methods && methods.map((item, i) => {
            return (
              <Button
                style={{ marginTop: 10 }}
                key={i}
                labelSize={16}
                fullWidth={false}
                uppercaseLabel={false}
                label={item.label}
                borderRadius={10}
                height={40}
                onPress={() => this.invokeMethodWithArgs(item.name, item.args)} />
            );
          })}
        </View>
      );
    }

    renderScene = ({ route }) => {
      return this.renderComponentDemo(sceneConfig[route.key]);
    }

    renderHeader = () => {
      return (
        <View style={{ height: demoConfig.containerHeight, flexDirection: demoConfig.containerType }}>
          {demoConfig.components.length > 1
            ? <TabViewAnimated
              navigationState={{ index: this.state.selectedIndex, routes: this.state.routes }}
              renderScene={this.renderScene}
              onIndexChange={(selectedIndex) => this.setState({ selectedIndex })} />
            : this.renderComponentDemo(demoConfig.components[this.state.selectedIndex])}
        </View>
      );
    }

    render () {
      const { parsedProps, Component, items, renderAtBottom, methods } = demoConfig.components[this.state.selectedIndex];
      return (
        <View style={{ flex: 1, backgroundColor: BaseTheme.palette.APP_SEPARATOR }}>
          <ParallaxView
            teaserHeight={demoConfig.containerHeight}
            backgroundColor={BaseTheme.palette.APP_SEPARATOR}
            headerBackgroundColor={BaseTheme.palette.APP_SEPARATOR}
            cardStyle={{ marginHorizontal: 8, marginBottom: 80 }}
            cardSpacingVertical={0}
            cardSpacingHorizontal={0}
            cardBorderRadius={5}
            header={this.renderHeader()}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 5, backgroundColor: BaseTheme.palette.WHITE, elevation: 2, borderTopWidth: 1, borderTopColor: '#CCC' }}>
              <Text.Light size='xlarge'>Props</Text.Light>

              <Col style={{ flex: 1, marginTop: 10 }} alignItems='stretch' justifyContent='center'>

                <Row style={{ height: 30, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: BaseTheme.palette.APP_SEPARATOR }}>
                  <Col style={{ width: 55 }}alignItems='flex-start'>
                    <Text.Medium onPress={() => this.sortProps('typeName')}>Type</Text.Medium>
                  </Col>
                  <Col style={{ flex: 1.35 }} alignItems='flex-start'>
                    <Text.Medium onPress={() => this.sortProps('key')}>Name</Text.Medium>
                  </Col>
                  <Col style={{ flex: 1 }} alignItems='flex-end'>
                    <Text.Medium onPress={() => this.sortProps('def')}>Default value</Text.Medium>
                  </Col>
                </Row>

                {parsedProps.map((item, index) => {
                  const [ textColor, backgroundColor ] = getTextColors(item.def);
                  return (
                    <Row key={item.key} style={{ height: 30, flexShrink: 2 }} justifyContent='space-around'>
                      <Col alignItems='center' style={{ borderRadius: 2 }} backgroundColor={BaseTheme.palette.APP_PRIMARY_DARKER}>
                        <MonospaceText fontSize={10} fontWeight='300' color={BaseTheme.palette.WHITE}>
                          {padEnd(item.typeName, 6, ' ')}
                        </MonospaceText>
                      </Col>
                      <Col style={{ flex: 1 }} alignItems='baseline'>
                        <Text.Regular style={{ paddingLeft: 8 }} >
                          {item.key}
                        </Text.Regular>
                      </Col>
                      <Col style={{ borderRadius: 2 }} backgroundColor={backgroundColor} alignItems='flex-end'>
                        <MonospaceText color={textColor} fontSize={12} >
                          {item.def}
                        </MonospaceText>
                      </Col>
                    </Row>
                  );
                })}
              </Col>

            </View>
          </ParallaxView>
          {renderAtBottom && items.map((item, index) => {
            const { props } = item;
            const ref = methods ? { ref: this.setElRef } : {};
            return <Component key={index} {...props} {...ref} />;
          })}
        </View>
      );
    }
  }

  return DemoScreen;
};

export default createDemoScreen;
