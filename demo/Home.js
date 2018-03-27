import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View,Text } from 'react-native'
import componentList from '../component-list.json';

const Button = ({ label, onPress }) => {
  return (
    <TouchableHighlight style={{ height: 50, paddingHorizontal: 16, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#DDD' }} onPress={onPress} underlayColor='#EEE'>
      <Text>{label}</Text>
    </TouchableHighlight>
  )
}

export default class componentName extends Component {
  onItemPress = (name) => {
    this.props.navigation.navigate(name);
  }

  renderItem = ({ item }) => {
    return (
      <Button label={item} onPress={() => this.onItemPress(item)} />
    )
  }

  render() {
    return (
      <FlatList
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={this.renderItem}
        data={componentList} />
    )
  }
}
