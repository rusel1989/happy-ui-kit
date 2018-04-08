import React, { Component } from 'react';
import { View } from 'react-native';
import { Col, Row, Separator, IconButton, Text } from 'happy-ui-kit';
import padEnd from 'lodash/padEnd';

import { getTextColors } from '../utils/colors';
import palette from '../palette';

export default class PropsList extends Component {
  render () {
    const { parsedProps, onSortRequest, onEditPress } = this.props;
    return (
      <View>
        <Row>
          <Text.Light size='xlarge'>Props</Text.Light>
          <IconButton
            size={30}
            name='category'
            color={palette.APP_DARK_GREY}
            onPress={onEditPress} />
        </Row>
        <Row style={{ height: 35 }}>
          <Row>
            <Col style={{ width: 60 }} alignItems='flex-start'>
              <Text.Medium onPress={() => onSortRequest('typeName')}>
                Type
              </Text.Medium>
            </Col>
            <Text.Medium onPress={() => onSortRequest('key')}>
              Name
            </Text.Medium>
          </Row>
          <Text.Medium stle={{ alignSelf: 'flex-end' }} onPress={() => onSortRequest('def')}>
            Default value
          </Text.Medium>
        </Row>
        <Separator style={{ marginBottom: 10 }} />
        {parsedProps.map((item, index) => {
          const [ textColor, backgroundColor ] = getTextColors(item.def);
          return (
            <Row key={item.key} style={{ height: 35 }} alignItems='stretch'>
              <Row>
                <Col
                  alignItems='center'
                  style={{ width: 50, borderRadius: 2, marginVertical: 4, marginRight: 10 }}
                  backgroundColor={palette.APP_PRIMARY_DARKER}>
                  <Text.Monospace color={palette.WHITE} fontSize={12}>
                    {padEnd(item.typeName, 6, ' ')}
                  </Text.Monospace >
                </Col>
                <Text.Regular>
                  {item.key}
                </Text.Regular>
              </Row>
              <Col
                style={{ borderRadius: 2, marginVertical: 4 }}
                backgroundColor={backgroundColor}>
                <Text.Monospace color={textColor} fontSize={12} >
                  {item.def}
                </Text.Monospace>
              </Col>
            </Row>
          );
        })}
      </View>);
  }
}
