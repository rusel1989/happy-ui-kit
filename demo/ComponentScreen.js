import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import color from 'color';
import keys from 'lodash/keys';
import map from 'lodash/map';

import parsePropTypes from 'parse-prop-types';

import Col from '../components/Col';
import Row from '../components/Row';
import Button from '../components/Button';
import Text from '../components/Text';
import { colors } from '../components/theme';
import isPlainObject from 'lodash/isPlainObject';

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
    return colors.APP_SUCCESS;
  } else if (value === 'false') {
    return colors.APP_DANGER;
  } else if (/^#[a-fA-F0-9]{6}$/.test(value)) {
    return value.toUpperCase();
  } else {
    return colors.APP_DARK_GREY;
  }
};

const getBackgroundForColor = (hex) => {
  return color(hex).luminosity() < 0.7 ? colors.WHITE : colors.DARK_GREY;
};

const MonospaceText = ({ children, italic, backgroundColor = colors.WHITE, color = colors.APP_PRIMARY, fontWeight = '300' }) => {
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

  const parsedProps = parsePropTypes(Element);

  class ComponentScreen extends Component {

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

    render () {
      const demoProps = Element.demoProps || {};
      const subComponents = Element.subComponents || [];
      return (
        <View style={{ flex: 1, backgroundColor: '#EEE' }}>
          <View style={{ margin: 10, flex: 0.4 }}>
            {Array.isArray(demoProps) ? (
              <Row justifyContent='flex-start'>
                {demoProps.map((p, i) => {
                  return (
                    <View key={i} style={{ marginRight: 10 }}>
                      <Element {...p} />
                    </View>
                  );
                })}
              </Row>
            ) : (
              !Element.renderLast && <Element ref={this.setElRef} {...demoProps} />
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

          <ScrollView style={{ flex: 0.6 }}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 10, backgroundColor: 'white', margin: 10, elevation: 2 }}>
              <Col style={{ flex: 1 }} alignItems='stretch' justifyContent='flex-start'>
                <Row style={{ height: 30, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.APP_LIGHT_GREY }}>
                  <Col style={{ flex: 1 }} alignItems='flex-start'>
                    <Text.Regular color={colors.APP_DARK_GREY}>Prop name</Text.Regular>
                  </Col>
                  <Col style={{ flex: 1 }} alignItems='flex-start'>
                    <Text.Regular color={colors.APP_DARK_GREY}>Prop type</Text.Regular>
                  </Col>
                  <Col style={{ flex: 1 }} alignItems='flex-start'>
                    <Text.Regular color={colors.APP_DARK_GREY}>Default value</Text.Regular>
                  </Col>
                </Row>

                {map(parsedProps, (item, key) => {
                  const value = item.defaultValue ? parseDefaultValue(item.defaultValue.value) : 'none';
                  const textColor = getColor(value);
                  const backgroundColor = getBackgroundForColor(textColor);
                  return (
                    <Row key={key} style={{ height: 30 }}>
                      <Col style={{ flex: 1 }} alignItems='flex-start'>
                        <Text.Light numberOfLines={1}>
                          {key}
                        </Text.Light>
                      </Col>
                      <Col style={{ flex: 1 }} alignItems='flex-start'>
                        <MonospaceText italic>
                          {item.type && item.type.name}
                        </MonospaceText>
                      </Col>
                      <Col style={{ flex: 1 }} alignItems='flex-start'>
                        <MonospaceText color={textColor} backgroundColor={backgroundColor}>
                          {value}
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
                  <Row style={{ height: 30, borderBottomWidth: 1, borderBottomColor: colors.APP_LIGHT_GREY, marginHorizontal: 16 }}>
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
