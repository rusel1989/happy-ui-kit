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
              <Text.Medium onPress={() => onSortRequest('type')}>
                Type
              </Text.Medium>
            </Col>
            <Text.Medium onPress={() => onSortRequest('name')}>
              Name
            </Text.Medium>
          </Row>
          <Text.Medium stle={{ alignSelf: 'flex-end' }} onPress={() => onSortRequest('defaultValue')}>
            Default value
          </Text.Medium>
        </Row>
        <Separator style={{ marginBottom: 10 }} />
        {parsedProps.map((item, index) => {
          const [ textColor, backgroundColor ] = getTextColors(item.def);
          return (
            <Row key={index} style={{ height: 35 }} alignItems='stretch'>
              <Row>
                <Col
                  alignItems='center'
                  style={{ width: 50, borderRadius: 2, marginVertical: 4, marginRight: 10 }}
                  backgroundColor={palette.APP_PRIMARY_DARKER}>
                  <Text.Monospace numberOfLines={1} color={palette.WHITE} fontSize={12}>
                    {padEnd(item.type, 6, ' ')}
                  </Text.Monospace>
                </Col>
                <Text.Regular>
                  {item.name}
                </Text.Regular>
              </Row>
              <Col
                style={{ borderRadius: 2, marginVertical: 4 }}
                backgroundColor={backgroundColor}>
                <Text.Monospace numberOfLines={1} color={textColor} fontSize={12} >
                  {item.defaultValue}
                </Text.Monospace>
              </Col>
            </Row>
          );
        })}
      </View>);
  }
}
