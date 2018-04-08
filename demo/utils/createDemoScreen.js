import React from 'react';
import { LayoutAnimation } from 'react-native';
import { HeaderButton } from 'happy-ui-kit';

import { CustomLayoutSpring } from './animations';
import { saveComponent, propsSorter, parseDemoConfig } from './index';
import Demo from '../components/DemoScreen';

const createDemoScreen = (rawDemoConfig) => {
  const demoConfig = parseDemoConfig(rawDemoConfig);

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
      routes: demoConfig.routes,
      sortBy: 'name',
      customProps: {},
      editingOptions: []
    }

    onSortPropsRequest = (sortBy) => {
      this.sortProps(sortBy);
    }

    onComponentTabChange = (selectedIndex) => {
      this.setState({ selectedIndex });
    }

    onOpenEditorPress = () => {
      this.showComponentEditor();
    }

    onEditorClosePress = () => {
      this.hideComponentEditor();
    }

    onEditorSavePress = () => {
      this.showSaveConfirmation();
    }

    onPropSelect = (selectedProp) => {
      this.animateLayout();
      this.setState({ selectedProp });
    }

    onSelectedPropChange = (val) => {
      this.animateLayout();
      this.setState({ customProps: { ...this.state.customProps, [this.state.selectedProp]: val } });
    }

    onResetAllPress = () => {
      const { Component } = demoConfig.components[this.state.selectedIndex];
      this.setState({ customProps: Component.defaultProps });
    }

    onComponentNameChange = (newComponentName) => {
      this.setState({ newComponentName });
    }

    onSaveCancelPress = () => {
      this.hideSaveConfimation();
    }

    onSaveConfirmPress = () => {
      this.saveComponent();
    }

    render () {
      return (
        <Demo
          isEditing={this.state.isEditing}
          routes={this.state.routes}
          selectedIndex={this.state.selectedIndex}
          customProps={this.state.customProps}
          onComponentTabChange={this.onComponentTabChange}
          componentInfo={demoConfig.components[this.state.selectedIndex]}
          containerHeight={demoConfig.containerHeight}
          containerType={demoConfig.containerType}
          sceneConfig={demoConfig.sceneConfig}
          hasMultipleComponents={demoConfig.components.length > 1}
          componentContainerStyle={demoConfig.componentContainerStyle}
          layout={demoConfig.headerLayout}
          onSortRequest={this.onSortPropsRequest}
          onEditPress={this.onOpenEditorPress}
          selectedPropParams={this.getSelectedPropParams()}
          onPropSelect={this.onPropSelect}
          onSelectedPropChange={this.onSelectedPropChange}
          onResetAllPress={this.onResetAllPress}
          onComponentNameChange={this.onComponentNameChange}
          onSavePress={this.onSaveConfirmPress}
          onCancelPress={this.onSaveCancelPress}
          componentName={this.state.newComponentName}
          error={this.state.saveError}
          editingOptions={this.getEditingOptions()}
          selectedProp={this.state.selectedProp}
          selectedPropValue={this.state.customProps[this.state.selectedProp]} />);
    }

    showComponentEditor = () => {
      const { Component, parsedProps } = demoConfig.components[this.state.selectedIndex];
      this.animateLayout();
      this.setComponentEditorHeader();
      this.setComponentEditorParams(Component, parsedProps);
    }

    hideComponentEditor = () => {
      this.animateLayout();
      this.setComponentDemoHeader();
      this.setComponentDemoParams();
    }

    showSaveConfirmation = () => {
      this.setState({ showSaveConfirmation: true, newComponentName: '' });
    }

    hideSaveConfimation = () => {
      this.setState({ showSaveConfirmation: false });
    }

    saveComponent = () => {
      if (!this.state.newComponentName) {
        this.setState({ saveError: 'You must enter component name' });
        return;
      }
      const componentMeta = this.getComponentMeta();
      saveComponent(this.state.newComponentName, componentMeta);
      this.hideComponentEditor();
    }

    sortProps = (sortBy) => {
      const selectedComponent = demoConfig.components[this.state.selectedIndex];
      demoConfig.components[this.state.selectedIndex].parsedProps = selectedComponent.parsedProps.sort(propsSorter(sortBy));
      this.animateLayout();
      this.setState({ sortBy });
    }

    animateLayout = () => {
      LayoutAnimation.configureNext(CustomLayoutSpring);
    }

    getSelectedPropParams = () => {
      return this.state.editingOptions.find((o) => o.name === this.state.selectedProp);
    }

    getComponentMeta = () => {
      const { Component, parsedProps } = demoConfig.components[this.state.selectedIndex];
      const editableProps = this.getEditingOptions(Component, parsedProps);
      const componentMeta = {
        baseComponentName: Component.displayName,
        propTypes: editableProps,
        defaultProps: { ...this.state.customProps }
      };
      return componentMeta;
    }

    getEditingOptions = () => {
      const { Component, parsedProps } = demoConfig.components[this.state.selectedIndex];
      return parsedProps
        .map(({ name, type }) =>
          ({ name, type, defaultValue: Component.defaultProps[name] })
        ).filter((item) => item.type !== 'func');
    }

    setComponentEditorHeader = () => {
      this.props.navigation.setParams({
        isEditing: true,
        onSavePress: this.onEditorSavePress,
        onClosePress: this.onEditorClosePress
      });
    }

    setComponentDemoHeader = () => {
      this.props.navigation.setParams({
        isEditing: false,
        showSaveConfirmation: false,
        newComponentName: '',
        saveError: ''
      });
    }

    setComponentEditorParams = (Component, parsedProps) => {
      const editableProps = this.getEditingOptions(Component, parsedProps);
      this.setState({
        isEditing: true,
        selectedProp: editableProps[0].name,
        customProps: Component.defaultProps,
        editingOptions: editableProps
      });
    }

    setComponentDemoParams = () => {
      this.setState({
        isEditing: false,
        editingOptions: [],
        customProps: {}
      });
    }

    setElRef = (v) => {
      this.el = v;
    }
  }

  return DemoScreen;
};

export default createDemoScreen;
