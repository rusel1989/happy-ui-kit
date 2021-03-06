import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import componentList from '../component-list.json';

const styles = StyleSheet.create({
  row: {
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD'
  }
});

const Button = ({ label, onPress }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <TouchableHighlight
        style={styles.row} onPress={onPress} underlayColor='#EEE'>
        <Text>{label}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default class App extends Component {
  onItemPress = (name) => {
    this.props.navigation.navigate(name);
  }

  renderItem = ({ item }) => {
    return (
      <Button
        label={item}
        onPress={() => this.onItemPress(item)} />
    );
  }

  render () {
    return (
      <FlatList
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={this.renderItem}
        data={componentList} />
    );
  }
}
