import React from 'react';
import { View } from 'react-native';
import color from 'color';
import map from 'lodash/map';
import parsePropTypes from 'parse-prop-types';
import isPlainObject from 'lodash/isPlainObject';

import Col from '../components/Col';
import Row from '../components/Row';
import Button from '../components/Button';
import Text from '../components/Text';
import ParallaxView from '../components/ParallaxView';
import BaseTheme from '../theme/base';
import { saveDemoProps } from '../utils';

import * as componentProps from '../demo/props';

const parseDefaultValue = (value) => {
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
const getTonedColor = (hex, amount = 0.7) => {
  return color(hex).isDark() ? color(hex).lighten(amount) : color(hex).darken(amount);
};

const getTextColors = (value) => {
  if (value === 'true') {
    return [ BaseTheme.palette.APP_SUCCESS, getTonedColor(BaseTheme.palette.APP_SUCCESS) ];
  } else if (value === 'false' || value === 'n/a') {
    return [ BaseTheme.palette.APP_DANGER, getTonedColor(BaseTheme.palette.APP_DANGER, 0.5) ];
  } else if (/^#[a-fA-F0-9]{6}$/.test(value)) {
    return [getTonedColor(value), value.toUpperCase()];
  } else if (/^\d+$/.test(value)) {
    return [BaseTheme.palette.WHITE, getTonedColor(BaseTheme.palette.WHITE)];
  } else if (value === '() => {}') {
    return [BaseTheme.palette.APP_ACCENT, getTonedColor(BaseTheme.palette.APP_ACCENT, -0.7)];
  } else {
    return [BaseTheme.palette.APP_PRIMARY_TEXT, getTonedColor(BaseTheme.palette.APP_PRIMARY_TEXT, 4)];
  }
};

const MonospaceText = ({ children, width, textAlign, backgroundColor = BaseTheme.palette.APP_BLACK,
  color = BaseTheme.palette.APP_PRIMARY, fontWeight = '300' }) => {
  return (
    <Text.Monospace
      numberOfLines={1}
      color={color}
      fontWeight={fontWeight}
      style={{ backgroundColor, paddingHorizontal: 8, borderRadius: 4, paddingVertical: 2, fontSize: 12, width, textAlign }}>
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

const createDemoScreen = (demoConfig) => {
  demoConfig.components.forEach((demoItem, i) => {
    if (__DEV__) {
      demoItem.parsedProps = map(parsePropTypes(demoItem.Component), (item, key) => {
        item.def = item.defaultValue ? parseDefaultValue(item.defaultValue.value) : 'n/a';
        item.key = key;
        item.typeName = (item.type && item.type.name) || 'unknown';
        return item;
      }).sort(propsSorter('typeName'));
      saveDemoProps(demoItem.Component.displayName, demoItem.parsedProps);
    } else {
      demoItem.parsedProps = componentProps[demoItem.Component.displayName.replace('.', '') + 'Props'] || [];
    }
  });

  if (!demoConfig.componentContainerStyle) {
    demoConfig.componentContainerStyle = {};
  }

  class DemoScreen extends React.Component {
    state = {
      selectedIndex: 0,
      sortBy: 'key',
      customProps: {
      }
    }

    setElRef = (v) => {
      this.el = v;
    }

    invokeMethodWithArgs = (method, args = []) => {
      if (this.el && typeof this.el[method] === 'function') {
        this.el[method](...args);
      }
    }

    sortProps = (key) => {
      const selectedComponent = demoConfig.components[this.state.selectedIndex];
      demoConfig.components[this.state.selectedIndex].parsedProps = selectedComponent.parsedProps.sort(propsSorter(key));
      this.forceUpdate();
    }

    renderHeader = () => {
      const { Component, items, methods, renderAtBottom } = demoConfig.components[this.state.selectedIndex];

      return (
        <View style={{ margin: 10, height: demoConfig.containerHeight, flexDirection: demoConfig.containerType }}>
          {!renderAtBottom && items.map((item, index) => {
            const { props } = item;
            return (
              <View style={{ margin: 10, ...demoConfig.componentContainerStyle }}>
                <Component ref={this.setElRef} {...props} />
              </View>
            );
          })}
          {methods && methods.map((item, i) => {
            return (
              <Button
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

    render () {
      const { parsedProps, Component, items, renderAtBottom } = demoConfig.components[this.state.selectedIndex];
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
                  <Col style={{ width: 70 }} alignItems='flex-start'>
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
                    <Row key={item.key} style={{ height: 30 }}>
                      <Col style={{ width: 70 }} alignItems='flex-start'>
                        <MonospaceText textAlign='center' fontWeight='900' width={70} color={BaseTheme.palette.APP_ACCENT}>
                          {item.typeName}
                        </MonospaceText>
                      </Col>
                      <Col style={{ flex: 1.35 }} alignItems='flex-start'>
                        <Text.Regular style={{ paddingLeft: 8 }} numberOfLines={1}>
                          {item.key}
                        </Text.Regular>
                      </Col>
                      <Col style={{ flex: 1 }} alignItems='flex-end'>
                        <MonospaceText color={textColor} backgroundColor={backgroundColor} fontWeight='900'>
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
            return (
              <Component key={index} ref={this.setElRef} {...props} />
            );
          })}
        </View>
      );
    }
  }

  return DemoScreen;
};

export default createDemoScreen;
