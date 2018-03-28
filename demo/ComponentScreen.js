import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import color from 'color';
import map from 'lodash/map';

import parsePropTypes from 'parse-prop-types';

import Col from '../components/Col';
import Row from '../components/Row';
import Button from '../components/Button';
import Text from '../components/Text';
import isPlainObject from 'lodash/isPlainObject';

import BaseTheme from '../theme/base';

const parseDefaultValue = (value) => {
  if (typeof value === 'string') {
    return /^#[a-fA-F0-9]{6}$/.test(value) ? value.toUpperCase() : value.length ? value : `' '`;
  } else if (typeof value === 'undefined') {
    return 'none';
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

const getColor = (value) => {
  if (value === 'true') {
    return BaseTheme.palette.APP_SUCCESS;
  } else if (value === 'false') {
    return BaseTheme.palette.APP_DANGER;
  } else if (/^#[a-fA-F0-9]{6}$/.test(value)) {
    return value.toUpperCase();
  } else {
    return BaseTheme.palette.APP_DARK_GREY;
  }
};

const getBackgroundForColor = (hex) => {
  return color(hex).luminosity() < 0.7 ? BaseTheme.palette.WHITE : BaseTheme.palette.DARK_GREY;
};

const MonospaceText = ({ children, italic, backgroundColor = BaseTheme.palette.WHITE, color = BaseTheme.palette.APP_PRIMARY, fontWeight = '300' }) => {
  return (
    <Text.Monospace
      numberOfLines={1}
      color={color}
      fontWeight={fontWeight}
      style={{ fontStyle: italic && 'italic', backgroundColor }}>
      {children}
    </Text.Monospace>
  );
};

const createComponentScreen = (Element) => {
  const parsedProps = map(parsePropTypes(Element), (item, key) => {
    item.def = item.defaultValue ? parseDefaultValue(item.defaultValue.value) : 'none';
    item.key = key;
    item.typeName = (item.type && item.type.name) || 'unknown';
    return item;
  });

  class ComponentScreen extends Component {
    state = {
      parsedProps,
      sortBy: 'key'
    }

    componentDidMount () {
      this.sortProps();
    }

    setElRef = (v) => {
      if (!Element.noRef) {
        this.el = v;
      }
    }

    invokeMethodWithArgs = (method, args = []) => {
      if (this.el && typeof this.el[method] === 'function') {
        this.el[method](...args);
      }
    }

    sortProps = () => {
      return this.setState({ parsedProps: parsedProps.sort(this.propsSorter) });
    }

    setSortBy = (key) => {
      this.setState({ sortBy: key }, () => {
        this.sortProps();
      });
    }

    propsSorter = (a, b) => {
      if (a[this.state.sortBy] < b[this.state.sortBy]) return -1;
      if (a[this.state.sortBy] > b[this.state.sortBy]) return 1;
      return 0;
    }

    render () {
      const demoProps = Element.demoProps || {};
      const subComponents = Element.subComponents || [];
      const flexDirection = Element.demoFlexDirection || 'column';
      return (
        <View style={{ flex: 1, backgroundColor: '#EEE' }}>

          <View style={{ marginVertical: 10, maxHeight: 200, justifyContent: 'center', flexDirection }}>
            {Array.isArray(demoProps) ? (
              demoProps.map((p, i) => (
                <View key={i} style={{ margin: 10 }}>
                  <Element {...p} />
                </View>
              ))
            ) : (
              !Element.renderLast && (
                <Element ref={this.setElRef} {...demoProps} />
              )
            )}
          </View>

          {Element.demoMethods && Element.demoMethods.map((item, i) => {
            return (
              <Button
                key={i}
                label={item.label}
                onPress={() => this.invokeMethodWithArgs(item.name, item.args)} />
            );
          })}

          <ScrollView>
            <View style={{ paddingHorizontal: 16, paddingVertical: 10, backgroundColor: 'white', margin: 10, elevation: 2 }}>
              <Col style={{ flex: 1 }} alignItems='stretch' justifyContent='flex-start'>
                <Row style={{ height: 30, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: BaseTheme.palette.APP_LIGHT_GREY }}>
                  <Col style={{ flex: 1 }} alignItems='flex-start'>
                    <Text.Regular onPress={() => this.setSortBy('key')} color={BaseTheme.palette.APP_DARK_GREY}>Prop name</Text.Regular>
                  </Col>
                  <Col style={{ flex: 1 }} alignItems='flex-start'>
                    <Text.Regular onPress={() => this.setSortBy('typeName')} color={BaseTheme.palette.APP_DARK_GREY}>Prop type</Text.Regular>
                  </Col>
                  <Col style={{ flex: 1 }} alignItems='flex-start'>
                    <Text.Regular onPress={() => this.setSortBy('def')} color={BaseTheme.palette.APP_DARK_GREY}>Default value</Text.Regular>
                  </Col>
                </Row>

                {this.state.parsedProps.map((item, index) => {
                  const textColor = getColor(item.def);
                  const backgroundColor = getBackgroundForColor(textColor);
                  return (
                    <Row key={item.key} style={{ height: 30 }}>
                      <Col style={{ flex: 1 }} alignItems='flex-start'>
                        <Text.Light numberOfLines={1}>
                          {item.key}
                        </Text.Light>
                      </Col>
                      <Col style={{ flex: 1 }} alignItems='flex-start'>
                        <MonospaceText italic>
                          {item.typeName}
                        </MonospaceText>
                      </Col>
                      <Col style={{ flex: 1 }} alignItems='flex-start'>
                        <MonospaceText color={textColor} backgroundColor={backgroundColor}>
                          {item.def}
                        </MonospaceText>
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </View>

            {subComponents.map((SubComponent, i) => {
              const subComponentProps = SubComponent.demoProps ? SubComponent.demoProps : demoProps.length ? demoProps[0] : demoProps;
              return (
                <Col key={i} justifyContent='flex-start' alignItems='stretch' style={{ backgroundColor: 'white', margin: 10, elevation: 2 }}>
                  <Row style={{ height: 30, borderBottomWidth: 1, borderBottomColor: BaseTheme.palette.APP_LIGHT_GREY, marginHorizontal: 16 }}>
                    <Text.Regular>{`<${SubComponent.displayName} />`}</Text.Regular>
                  </Row>
                  <SubComponent key={i} {...subComponentProps} />
                </Col>
              );
            })}
          </ScrollView>
          {Element.renderLast && <Element ref={this.setElRef} {...demoProps} />}
        </View>
      );
    }
  }

  return ComponentScreen;
};

export default createComponentScreen;
