import React from 'react';
import { View, LayoutAnimation, Platform, Picker } from 'react-native';
import { TabViewAnimated } from 'react-native-tab-view';
import { Col, Row, Separator, Button, WheelPicker, IconButton, Text, TextField, ParallaxView, HeaderButton } from 'happy-ui-kit';
import keys from 'lodash/keys';
import padEnd from 'lodash/padEnd';
import merge from 'lodash/merge';

import { saveDemoProps, saveComponent, propsSorter, getDisplayName, getPropsObjectName } from './index'; // eslint-disable-line
import { CustomLayoutSpring } from './animations';
import { getTextColors } from './colors';
import ComponentEditor from '../components/ComponentEditor';
import PropList from '../components/PropList';

import * as componentProps from '../props';
import palette from '../palette';



const createDemoScreen = (demoConfig) => {
  const sceneConfig = {};
  const defaultAlignment = demoConfig.containerType === 'row'
    ? { justifyContent: 'flex-start', alignItems: 'center' }
    : { alignItems: 'stretch', justifyContent: 'center' };
  const headerAlignment = merge({}, defaultAlignment, demoConfig.containerAlignment);

  demoConfig.components.forEach((demoComp, i) => {
    const { Component } = demoComp;
    const displayName = getDisplayName(Component);
    const propsDocName = getPropsObjectName(displayName);
    if (Component.defaultProps) {
      Component.defaultProps.label = 'Label';
    }
    sceneConfig[displayName] = demoComp;
    demoComp.parsedProps = [];

    if (componentProps && componentProps[propsDocName]) {
      demoComp.parsedProps = componentProps[propsDocName];
    }
  });

  const compRoutes = keys(sceneConfig).map(key => ({ key }));

  if (!demoConfig.componentContainerStyle) {
    demoConfig.componentContainerStyle = {};
  }

  class DemoScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      const isEditing = navigation.getParam('isEditing');
      return isEditing ? {
        headerLeft: <HeaderButton.Close onPress={navigation.getParam('onClosePress')} />,
        headerRight: <HeaderButton.Save onPress={navigation.getParam('onSavePress')} />
      } : {};
    }

    state = {
      selectedIndex: 0,
      routes: compRoutes,
      sortBy: 'key',
      customProps: {}
    }

    setElRef = (v) => {
      this.el = v;
    }

    sortProps = (key) => {
      const selectedComponent = demoConfig.components[this.state.selectedIndex];
      demoConfig.components[this.state.selectedIndex].parsedProps = selectedComponent.parsedProps.sort(propsSorter(key));
      LayoutAnimation.configureNext(CustomLayoutSpring);
      this.setState({ sortBy: key });
    }

    invokeMethodWithArgs = (method, args = []) => {
      if (this.el && typeof this.el[method] === 'function') {
        this.el[method](...args);
      }
    }

    onIndexChange = (selectedIndex) => {
      LayoutAnimation.configureNext(CustomLayoutSpring);
      this.setState({ selectedIndex });
    }

    getEditingOptions = (Component, parsedProps) => {
      return parsedProps
        .map(({ key, typeName }) =>
          ({ name: key, type: typeName, defaultValue: Component.defaultProps[key] })
        ).filter((item) => item.type !== 'func');
    }

    showComponentEditor = () => {
      const { Component, parsedProps } = demoConfig.components[this.state.selectedIndex];
      const editableProps = this.getEditingOptions(Component, parsedProps);
      LayoutAnimation.configureNext(CustomLayoutSpring);
      this.props.navigation.setParams({
        isEditing: true,
        onSavePress: this.showSaveConfirmation,
        onClosePress: this.hideComponentEditor
      });
      this.setState({
        isEditing: true,
        selectedProp: editableProps[0].name,
        customProps: Component.defaultProps,
        editingOptions: editableProps
      });
    }

    showSaveConfirmation = () => {
      if (__DEV__) {
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.setState({ showSaveConfirmation: true, newComponentName: '' });
      } else {
        this.hideComponentEditor();
      }
    }

    saveComponent = () => {
      if (!this.state.newComponentName) {
        this.setState({ saveError: 'You must enter component name' });
        return;
      }
      const { Component, parsedProps } = demoConfig.components[this.state.selectedIndex];
      const editableProps = this.getEditingOptions(Component, parsedProps);
      const conf = {
        baseComponentName: Component.displayName,
        propTypes: editableProps,
        defaultProps: { ...this.state.customProps }
      };
      saveComponent(this.state.newComponentName, conf);
      this.hideComponentEditor();
    }

    hideComponentEditor = () => {
      this.props.navigation.setParams({
        isEditing: false,
        showSaveConfirmation: false,
        newComponentName: '',
        saveError: ''
      });
      LayoutAnimation.configureNext(CustomLayoutSpring);
      this.setState({ isEditing: false, editingOptions: [], customProps: {} });
    }

    resetCustomProps = () => {
      const { Component } = demoConfig.components[this.state.selectedIndex];
      this.setState({ customProps: Component.defaultProps });
    }

    toggleComponentEditor = () => {
      if (this.state.isEditing) {
        this.hideComponentEditor();
      } else {
        this.showComponentEditor();
      }
    }

    getSelectedPropParams = () => {
      return this.state.editingOptions.find((o) => o.name === this.state.selectedProp);
    }

    onSelectedPropChange = (val) => {
      const customProps = { ...this.state.customProps, [this.state.selectedProp]: val };
      // console.log(customProps);
      LayoutAnimation.configureNext(CustomLayoutSpring);
      this.setState({ customProps });
    }

    updateSelectedProp = (selectedProp) => {
      LayoutAnimation.configureNext(CustomLayoutSpring);
      this.setState({ selectedProp });
    }

    renderComponentMethodTrigger = (methods) => {
      if (!methods || !methods.length) {
        return null;
      }
      return methods.map((item, i) => {
        return (
          <Button
            key={i}
            labelSize={16}
            fullWidth={false}
            uppercaseLabel={false}
            label={item.label}
            borderRadius={10}
            height={40}
            raised
            onPress={() => this.invokeMethodWithArgs(item.name, item.args)} />
        );
      });
    }

    renderComponentDemo = (config = {}) => {
      const { Component, items, modal } = config;
      const ref = modal && this.setElRef;
      const containerStyle = modal
        ? {}
        : { flex: 1, margin: 10, flexDirection: demoConfig.containerType, ...headerAlignment };
      return (
        <View style={containerStyle}>
          {this.state.isEditing
            ? <Component ref={ref} {...this.state.customProps} />
            : items.map((item, index) => (
              <View key={index} style={{ margin: 10, ...demoConfig.componentContainerStyle }}>
                <Component ref={ref} {...item.props} />
              </View>
            ))}
        </View>);
    }

    renderScene = ({ route }) => {
      return this.renderComponentDemo(sceneConfig[route.key]);
    }

    renderComponentDemoTabs = () => {
      return (
        <TabViewAnimated
          navigationState={{ index: this.state.selectedIndex, routes: this.state.routes }}
          renderScene={this.renderScene}
          onIndexChange={this.onIndexChange} />);
    }

    renderHeader = (compConfig) => {
      const { containerHeight, containerType } = demoConfig;
      const style = {
        paddingHorizontal: 2,
        height: containerHeight,
        flexDirection: containerType,
        justifyContent: compConfig.modal && 'center'
      };
      return (
        <View style={style}>
          {compConfig.modal
            ? this.renderComponentMethodTrigger(compConfig.methods)
            : !this.state.isEditing && demoConfig.components.length > 1
              ? this.renderComponentDemoTabs()
              : this.renderComponentDemo(compConfig)}
        </View>);
    }

    renderPropsList = ({ parsedProps }) => {
      return (
        <PropList
          parsedProps={parsedProps}
          onSortRequest={this.sortProps}
          onEditPress={this.showComponentEditor} />
      );
    }

    renderSelectedPropertyEditor = () => {
      // console.log('test', selectedPropParams);
      return (
        <PropEditor
          {...selectedPropParams}
          onClosePress={this.toggleComponentEditor}
          onChange={this.onSelectedPropChange}
          onResetPress={this.resetCustomProps}
          value={this.state.customProps[this.state.selectedProp]} />
      );
    }

    renderPropsEditor = () => {
      const selectedPropParams = this.getSelectedPropParams();

      return (
        <ComponentEditor
          onComponentNameChange={(val) => this.setState({ newComponentName: val })}
          componentName={this.state.newComponentName}
          error={this.state.saveError}
          onSavePress={this.saveComponent}
          onCancelPress={() => this.setState({ showSaveConfirmation: false })}
          editingOptions={this.state.editingOptions}
          selectedPropParams={selectedPropParams}
          onClosePress={this.toggleComponentEditor}
          onSelectedPropChange={this.onSelectedPropChange}
          selectedProp={this.state.selectedProp}
          selectedPropValue={this.state.customProps[this.state.selectedProp]}
          onPropSelect={this.updateSelectedProp}
          onResetAllPress={this.resetCustomProps} />
      )
    }

    render () {
      const compConfig = demoConfig.components[this.state.selectedIndex];
      return (
        <View style={{ flex: 1 }} >
          <ParallaxView
            teaserHeight={demoConfig.containerHeight}
            backgroundColor={palette.APP_SEPARATOR}
            headerBackgroundColor='rgba(0,0,0,0)'
            cardStyle={{ marginHorizontal: 8, marginBottom: 80, elevation: 5 }}
            cardSpacingVertical={10}
            cardSpacingHorizontal={16}
            cardBorderRadius={5}
            scrollEnabled={!this.state.isEditing}
            header={this.renderHeader(compConfig)}>
            {this.state.isEditing
              ? this.renderPropsEditor()
              : this.renderPropsList(compConfig)}
          </ParallaxView>
          {compConfig.modal && this.renderComponentDemo(compConfig)}
        </View>
      );
    }
  }

  return DemoScreen;
};

export default createDemoScreen;
