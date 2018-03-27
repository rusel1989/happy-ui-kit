import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types'
import keys from 'lodash/keys';
import Col from '../components/Col';
import Row from '../components/Row';
import Text from '../components/Text';
import { colors } from '../components/theme';

import isPlainObject from 'lodash/isPlainObject';


import parsePropTypes from 'parse-prop-types';

const parseDefaultValue = (value) => {
  if (typeof value === 'string') {
    return value.length ? value : `' '`;
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

const createComponentScreen = (Element) => {

  const parsedProps = parsePropTypes(Element);

  class ComponentScreen extends Component {
    render () {
      const demoProps = Element.demoProps || {};
      const subComponents = Element.subComponents || [];
      return (
        <ScrollView style={{ backgroundColor: '#EEE' }}>
          <View style={{ padding: 16 }}>
            {Array.isArray(demoProps) ? (
              <Row justifyContent='flex-start'>
                {demoProps.map((p, i) => {
                  return (
                    <View style={{ marginRight: 10 }}>
                      <Element key={i} {...p} />
                    </View>
                  );
                })}
              </Row>
            ) : (
              <Element {...demoProps} />

            )}
          </View>

          <View style={{ paddingHorizontal: 16, paddingVertical: 10, backgroundColor: 'white', margin: 10, elevation: 2 }}>
            <Row style={{ marginHorizontal: -8 }} alignItems='flex-start'>
              <Col style={{ flex: 1, paddingHorizontal: 8 }} alignItems='stretch' justifyContent='flex-start'>
              <Text.Bold style={{ marginBottom: 10 }}>Prop name</Text.Bold>

                {keys(parsedProps).map((key, i) => {
                  return (
                    <View style={{ height: 14 }}>

                    <Text.Light size={12} key={i}>{key}</Text.Light>
                    </View>

                  );
                })}
              </Col>
              <Col style={{ flex: 1, paddingHorizontal: 8, borderLeftWidth: 1, borderRightWidth: 1 }} alignItems='stretch' justifyContent='flex-start'>
              <Text.Bold style={{ marginBottom: 10 }}>Prop type</Text.Bold>

              {keys(parsedProps).map((key, i) => {
                  return (
                    <View style={{ height: 14 }}>

                    <Text.Light size={12} key={i}>{parsedProps[key].type && parsedProps[key].type.name}</Text.Light>
                    </View>

                  );
                })}
              </Col>
              <Col style={{ flex: 1, paddingHorizontal: 8 }} alignItems='stretch' justifyContent='flex-start'>
              <Text.Bold style={{ marginBottom: 10 }}>Default value</Text.Bold>

              {keys(parsedProps).map((key, i) => {
                  return (
                    <View style={{ height: 14 }}>
                                          <Text.Light size={12} key={i}>{parsedProps[key].defaultValue && parseDefaultValue(parsedProps[key].defaultValue.value)}</Text.Light>

                    </View>
                  );
                })}
              </Col>

            </Row>

          </View>

                     {subComponents.map((SubComponent, i) => {
                const subComponentProps = SubComponent.demoProps ? SubComponent.demoProps : demoProps.length ? demoProps[0] : demoProps;
                return (
                  <Col key={i} justifyContent='flex-start' alignItems='stretch' style={{ backgroundColor: 'white',  paddingVertical: 4, elevation: 2, marginBottom: 10 }}>
                    <Text.Semibold style={{ paddingLeft: 8 }}  size={12} >{`<${SubComponent.displayName} />`}</Text.Semibold >
                    <SubComponent key={i} {...subComponentProps} />
                  </Col>
                );
              })}


        </ScrollView>
      );
    }
  }

  return ComponentScreen;
};

export default createComponentScreen;
