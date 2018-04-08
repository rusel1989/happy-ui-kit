import React from 'react';
import { View } from 'react-native';
import { TabViewAnimated } from 'react-native-tab-view';
import { Button } from 'happy-ui-kit';

class ComponentDemo extends React.Component {
  setElRef = (v) => {
    this.el = v;
  }

  invokeMethodWithArgs = (method, args = []) => {
    if (this.el && typeof this.el[method] === 'function') {
      this.el[method](...args);
    }
  }

  renderComponentDemo = (config = {}) => {
    const { Component, items, modal } = config;
    const ref = modal && this.setElRef;
    const containerStyle = modal
      ? {}
      : { flex: 1, margin: 10, flexDirection: this.props.containerType, ...this.props.layout };
    return (
      <View style={containerStyle}>
        {this.props.isEditing
          ? <Component ref={ref} {...this.props.customProps} />
          : items.map((item, index) => (
            <View key={index} style={{ margin: 10, ...this.props.componentContainerStyle }}>
              <Component ref={ref} {...item.props} />
            </View>
          ))}
      </View>);
  }

  renderScene = ({ route }) => {
    return this.renderComponentDemo(this.props.sceneConfig[route.key]);
  }

  renderComponentDemoTabs = () => {
    return (
      <TabViewAnimated
        navigationState={{ index: this.props.selectedIndex, routes: this.props.routes }}
        renderScene={this.renderScene}
        onIndexChange={this.props.onComponentTabChange} />);
  }

  renderComponentMethodTrigger = (methods) => {
    if (!methods || !methods.length) {
      return null;
    }
    return methods.map(({ name, label, args }, i) =>
      <Button
        key={i}
        labelSize={16}
        fullWidth={false}
        uppercaseLabel={false}
        label={label}
        borderRadius={10}
        height={40}
        raised
        onPress={() => this.invokeMethodWithArgs(name, args)} />);
  }

  render () {
    const { containerHeight, containerType, componentInfo, isEditing, hasMultipleComponents } = this.props;
    const style = {
      paddingHorizontal: 2,
      height: containerHeight,
      flexDirection: containerType,
      justifyContent: componentInfo.modal && 'center'
    };
    return (
      <View style={style}>
        {componentInfo.modal
          ? this.renderComponentMethodTrigger(componentInfo.methods)
          : !isEditing && hasMultipleComponents
            ? this.renderComponentDemoTabs()
            : this.renderComponentDemo(componentInfo)}
      </View>);
  }
}

export default ComponentDemo;
