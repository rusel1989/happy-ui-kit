import React from 'react';
import { View, LayoutAnimation, Platform, Picker } from 'react-native';
import { TabViewAnimated } from 'react-native-tab-view';
import color from 'color';
import keys from 'lodash/keys';
import padEnd from 'lodash/padEnd';
import merge from 'lodash/merge';

import Col from '../../lib/components/Col';
import Row from '../../lib/components/Row';
import Separator from '../../lib/components/Separator';
import Button from '../../lib/components/Button';
import WheelPicker from '../../lib/components/WheelPicker';
import IconButton from '../../lib/components/IconButton';
import Text from '../../lib/components/Text';
import TextField from '../../lib/components/TextField';
import ParallaxView from '../../lib/components/ParallaxView';
import HeaderButton from '../../lib/components/HeaderButton';
import BaseTheme from '../../lib/theme/base';

import PropEditor from '../components/PropEditor';
import * as componentProps from '../props';
import { saveDemoProps, saveComponent } from './index'; // eslint-disable-line

const CustomLayoutSpring = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.7
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7
  }
};

// Linear with easing
// eslint-disable-next-line
const CustomLayoutLinear = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.curveEaseInEaseOut
  }
};

const getTonedColor = (hex, amount = 0.7) => {
  return color(hex).isDark() ? color(hex).lighten(amount).hex() : color(hex).darken(amount).hex();
};

const getTextColors = (value) => {
  if (value === 'true') {
    return [ BaseTheme.palette.APP_SUCCESS, getTonedColor(BaseTheme.palette.APP_SUCCESS) ];
  } else if (value === 'false' || value === 'n/a') {
    return [ BaseTheme.palette.APP_DANGER, getTonedColor(BaseTheme.palette.APP_DANGER, 0.5) ];
  } else if (/^#[a-fA-F0-9]{6}$/.test(value)) {
    return [ getTonedColor(value), value.toUpperCase() ];
  } else if (/^\d+$/.test(value)) {
    return [ BaseTheme.palette.WHITE, getTonedColor(BaseTheme.palette.WHITE) ];
  } else if (value === '() => {}') {
    return [ BaseTheme.palette.APP_ACCENT, getTonedColor(BaseTheme.palette.APP_ACCENT, -0.7) ];
  } else {
    return [ BaseTheme.palette.APP_PRIMARY_TEXT, getTonedColor(BaseTheme.palette.APP_PRIMARY_TEXT, 4) ];
  }
};

const MonospaceText = ({ children, textAlign, backgroundColor, color, fontWeight = '900', fontSize }) => {
  return (
    <Text.Monospace
      numberOfLines={1}
      color={color}
      fontWeight={fontWeight}
      size={fontSize}
      style={{ backgroundColor, paddingHorizontal: 4, paddingVertical: 2, textAlign }}>
      {children}
    </Text.Monospace>
  );
};

const propsSorter = (key) => (a, b) => {
  if (b.def === 'n/a') return -1;
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

const getDisplayName = (c) => {
  const displayName = c && c.displayName && c.displayName.replace('.', '');
  return displayName;
};

const getPropsObjectName = (displayName) => {
  if (!displayName) {
    return null;
  }
  return displayName + 'Props';
};

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
        <View>
          <Row>
            <Text.Light size='xlarge'>Props</Text.Light>
            <IconButton
              size={30}
              name='category'
              color={BaseTheme.palette.APP_DARK_GREY}
              onPress={this.toggleComponentEditor} />
          </Row>
          <Row style={{ height: 35 }}>
            <Row>
              <Col style={{ width: 60 }} alignItems='flex-start'>
                <Text.Medium onPress={() => this.sortProps('typeName')}>
                  Type
                </Text.Medium>
              </Col>
              <Text.Medium onPress={() => this.sortProps('key')}>
                Name
              </Text.Medium>
            </Row>
            <Text.Medium stle={{ alignSelf: 'flex-end' }} onPress={() => this.sortProps('def')}>
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
                    backgroundColor={BaseTheme.palette.APP_PRIMARY_DARKER}>
                    <MonospaceText color={BaseTheme.palette.WHITE} fontSize={12}>
                      {padEnd(item.typeName, 6, ' ')}
                    </MonospaceText>
                  </Col>
                  <Text.Regular>
                    {item.key}
                  </Text.Regular>
                </Row>
                <Col style={{ borderRadius: 2, marginVertical: 4 }} backgroundColor={backgroundColor}>
                  <MonospaceText color={textColor} fontSize={12} >
                    {item.def}
                  </MonospaceText>
                </Col>
              </Row>
            );
          })}
        </View>);
    }

    renderSelectedPropertyEditor = () => {
      const selectedPropParams = this.getSelectedPropParams();
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

    renderSaveConfirmation = () => {
      return (
        <View>
          <Row style={{ height: 50 }}>
            <Text.Light size='large'>Enter new component name</Text.Light>
          </Row>
          <TextField
            style={{ flex: 1, borderRadius: 4, height: 40 }}
            backgroundColor={BaseTheme.palette.APP_LIGHT_GREY}
            onChangeText={(val) => this.setState({ newComponentName: val })}
            value={this.state.newComponentName} />
          <Row>
            <Button
              labelColor={BaseTheme.palette.APP_DANGER}
              uppercaseLabel={false}
              backgroundColor='white'
              labelSize={20}
              label='Cancel'
              onPress={() => this.setState({ showSaveConfirmation: false })} />
            <Button
              uppercaseLabel={false}
              backgroundColor='white'
              labelSize={20}
              label='Save'
              labelColor={BaseTheme.palette.APP_PRIMARY_DARKER}
              onPress={this.saveComponent} />
          </Row>
          {this.state.saveError && <Text.Light textAlign='center' color={BaseTheme.palette.APP_DANGER}>{this.state.saveError}</Text.Light>}
        </View>
      );
    }

    renderPropsEditor = () => {
      if (this.state.showSaveConfirmation) {
        return this.renderSaveConfirmation();
      }
      const wheelValues = this.state.editingOptions.map(({ name }) => name);
      return (
        <View>
          {this.renderSelectedPropertyEditor()}
          <Row style={{ height: 140, zIndex: -1 }} justifyContent='center'>
            {Platform.OS === 'ios' ? (
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.state.selectedProp}
                onValueChange={this.updateSelectedProp}>
                {wheelValues.map((prop, i) => {
                  return (
                    <Picker.Item label={prop} value={prop} key={i} />
                  );
                })}
              </Picker>
            ) : (
              <WheelPicker
                height={120}
                wheelWidth={180}
                onChange={({ selectedProp }) => this.updateSelectedProp(selectedProp)}
                value={{ selectedProp: wheelValues[0] }}
                wheels={[{ id: 'selectedProp', values: wheelValues }]} />
            )}
          </Row>
          <Button
            label='Restore default props'
            uppercaseLabel={false}
            backgroundColor='white'
            labelSize={20}
            labelColor={BaseTheme.palette.APP_PRIMARY_DARKER}
            onPress={this.resetCustomProps} />
        </View>
      );
    }

    render () {
      const compConfig = demoConfig.components[this.state.selectedIndex];
      return (
        <View style={{ flex: 1 }} >
          <ParallaxView
            teaserHeight={demoConfig.containerHeight}
            backgroundColor={BaseTheme.palette.APP_SEPARATOR}
            headerBackgroundColor={'transparent'}
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
