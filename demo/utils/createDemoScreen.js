import React from 'react';
import { LayoutAnimation } from 'react-native';
import { HeaderButton } from 'happy-ui-kit';

import { CustomLayoutSpring } from './animations';
import { saveComponent, propsSorter, parseDemoConfig, withDocs } from './index';
import Demo from '../components/DemoScreen';

const createDemoScreen = (rawDemoConfig) => {
  class DemoScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      const isEditing = navigation.getParam('isEditing');
      return isEditing ? {
        headerLeft: <HeaderButton.Close onPress={navigation.getParam('onClosePress')} />,
        headerRight: <HeaderButton.Save onPress={navigation.getParam('onSavePress')} />
      } : {};
    }

    constructor (props) {
      super(props);
      const demoConfig = parseDemoConfig(rawDemoConfig, props.docs);
      this.state = {
        selectedIndex: 0,
        routes: demoConfig.routes,
        sortBy: 'name',
        customProps: {},
        editingOptions: [],
        demoConfig
      };
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
      this.setState({ customProps: this.getDefaultProps() });
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
          componentInfo={this.state.demoConfig.components[this.state.selectedIndex]}
          containerHeight={this.state.demoConfig.containerHeight}
          containerType={this.state.demoConfig.containerType}
          sceneConfig={this.state.demoConfig.sceneConfig}
          hasMultipleComponents={this.state.demoConfig.components.length > 1}
          componentContainerStyle={this.state.demoConfig.componentContainerStyle}
          layout={this.state.demoConfig.headerLayout}
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
      this.animateLayout();
      this.setComponentEditorHeader();
      this.setComponentEditorParams();
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
      const selectedComponent = this.state.demoConfig.components[this.state.selectedIndex];
      this.state.demoConfig.components[this.state.selectedIndex].parsedProps = selectedComponent.parsedProps.sort(propsSorter(sortBy));
      this.animateLayout();
      this.setState({ sortBy });
    }

    getComponentInfo = (prop) => {
      const info = this.state.demoConfig.components[this.state.selectedIndex];
      if (prop) {
        return info[prop];
      }
      return info;
    }

    getComponent = () => {
      return this.getComponentInfo('Component');
    }

    getParsedProps = () => {
      return this.getComponentInfo('parsedProps');
    }

    getDefaultProps = () => {
      return this.getComponentInfo('Component').defaultProps || {};
    }

    getDefaultValue = (propName) => {
      return this.getDefaultProps()[propName];
    }

    animateLayout = () => {
      LayoutAnimation.configureNext(CustomLayoutSpring);
    }

    getSelectedPropParams = () => {
      return this.state.editingOptions.find((o) => o.name === this.state.selectedProp);
    }

    getComponentMeta = () => {
      const editingOptions = this.getEditingOptions();
      const componentMeta = {
        baseComponentName: this.getComponent().displayName,
        propTypes: editingOptions,
        defaultProps: { ...this.state.customProps }
      };
      return componentMeta;
    }

    getEditingOptions = () => {
      return this.getParsedProps()
        .map(({ name, type }) =>
          ({ name, type, defaultValue: this.getDefaultValue(name) })
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

    setComponentEditorParams = () => {
      const editingOptions = this.getEditingOptions();
      this.setState({
        isEditing: true,
        selectedProp: editingOptions[0].name,
        customProps: this.getDefaultProps(),
        editingOptions
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

  return withDocs()(DemoScreen);
};

export default createDemoScreen;
