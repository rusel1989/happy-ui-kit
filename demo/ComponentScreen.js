import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import color from 'color';
import keys from 'lodash/keys';
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
}

const getBackgroundForColor = (hex) => {
  console.log(color(hex).luminosity());
  return color(hex).luminosity() < 0.7 ? colors.WHITE : colors.DARK_GREY;
}

const MonospaceText = ({ children, italic, backgroundColor = colors.WHITE, color = colors.APP_PRIMARY, fontWeight = '300' }) => {
  return (
    <Text.Monospace
      numberOfLines={1}
      color={color}
      size='small'
      fontWeight={fontWeight}
      style={{ fontStyle: italic && 'italic', backgroundColor, alignSelf: 'flex-start' }}>
      {children}
    </Text.Monospace>
  );
}

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
        <View style={{ flex: 1 }}>

          <ScrollView style={{ backgroundColor: '#EEE' }}>
            <View style={{ margin: 10, elevation: 2, backgroundColor: colors.WHITE }}>

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
                <Button key={i} label={item.label} onPress={() => this.invokeMethodWithArgs(item.name, item.args)} />
              )
            })}

            <View style={{ paddingHorizontal: 16, paddingVertical: 10, backgroundColor: 'white', margin: 10, elevation: 2 }}>
              <Row style={{ marginHorizontal: -8 }} alignItems='flex-start'>
                <Col style={{ flex: 1, paddingHorizontal: 8 }} alignItems='stretch' justifyContent='flex-start'>
                <Text.Bold style={{ marginBottom: 10 }}>Prop name</Text.Bold>

                  {keys(parsedProps).map((key, i) => {
                    return (
                      <View key={i} style={{ padding: 2 }}>

                      <Text.Medium numberOfLines={1} size={12} >{key}</Text.Medium>
                      </View>

                    );
                  })}
                </Col>
                <Col style={{ flex: 1, paddingHorizontal: 8, borderLeftWidth: 1, borderRightWidth: 1 }} alignItems='stretch' justifyContent='flex-start'>
                <Text.Bold style={{ marginBottom: 10 }}>Prop type</Text.Bold>

                {keys(parsedProps).map((key, i) => {
                    return (
                      <View key={i} style={{ padding: 2 }}>
                        <MonospaceText italic>{parsedProps[key].type && parsedProps[key].type.name}</MonospaceText>
                      </View>

                    );
                  })}
                </Col>
                <Col style={{ flex: 1, paddingHorizontal: 8 }} alignItems='stretch' justifyContent='flex-start'>
                <Text.Bold style={{ marginBottom: 10 }}>Default value</Text.Bold>

                {keys(parsedProps).map((key, i) => {

                    const value = parsedProps[key].defaultValue && parseDefaultValue(parsedProps[key].defaultValue.value);
                    const textColor = getColor(value)
                    const backgroundColor = getBackgroundForColor(textColor);
                    return (
                      <View key={i} style={{ padding: 2 }}>

                        <MonospaceText
                          color={textColor}
                          fontWeight='500'
                          backgroundColor={backgroundColor}>
                          {value}
                        </MonospaceText>


                      </View>
                    );
                  })}
                </Col>

              </Row>

            </View>

                      {subComponents.map((SubComponent, i) => {
                  const subComponentProps = SubComponent.demoProps ? SubComponent.demoProps : demoProps.length ? demoProps[0] : demoProps;
                  return (
                    <Col key={i} justifyContent='flex-start' alignItems='stretch' style={{ backgroundColor: 'white', marginHorizontal: 10,  paddingVertical: 4, elevation: 2, marginBottom: 10 }}>
                      <Text.Semibold style={{ paddingLeft: 8, borderBottomWidth: 1, borderBottomColor: colors.SEPARATOR }}  size={12} >{`<${SubComponent.displayName} />`}</Text.Semibold >
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
