import React from 'react';
import { View, LayoutAnimation } from 'react-native';
import { TabViewAnimated } from 'react-native-tab-view';
import keys from 'lodash/keys';
import padEnd from 'lodash/padEnd';
import color from 'color';
import merge from 'lodash/merge';

import Col from '../components/Col';
import Row from '../components/Row';
import Separator from '../components/Separator';
import Button from '../components/Button';
import WheelPicker from '../components/WheelPicker';
import IconButton from '../components/IconButton';
import Text from '../components/Text';
import ParallaxView from '../components/ParallaxView';
import BaseTheme from '../theme/base';
import * as componentProps from '../demo/props';
import PropEditor from './PropEditor'
import { saveDemoProps } from '../utils'; // eslint-disable-line

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

    editComponent = () => {
      const { Component, parsedProps } = demoConfig.components[this.state.selectedIndex];
      LayoutAnimation.configureNext(CustomLayoutSpring);
      this.setState({
        isEditing: true,
        customProps: Component.defaultProps,
        editingOptions: this.getEditingOptions(Component, parsedProps)
      });
    }

    toggleComponentEditor = () => {
      if (this.state.isEditing) {
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.setState({ isEditing: false, editingOptions: [], customProps: {} });
      } else {
        this.editComponent();
      }
    }

    renderComponentDemo = (config = {}) => {
      const { Component, items, methods, renderAtBottom } = config;
      if (this.state.isEditing) {
        return (
          <View style={{ margin: 10, justifyContent: 'center', alignItems: 'stretch', flexDirection: 'column', flex: 1 }}>
            <Component {...this.state.customProps} />
          </View>
        );
      }

      return (
        <View style={{ flex: 1, flexDirection: demoConfig.containerType, ...headerAlignment }}>
          {!renderAtBottom && items.map((item, index) => {
            const { props } = item;
            const ref = methods ? { ref: this.setElRef } : {};
            return (
              <View key={index} style={{ margin: 10, ...demoConfig.componentContainerStyle }}>
                <Component {...props} {...ref} />
              </View>
            );
          })}
          {methods && methods.map((item, i) => {
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
          })}
        </View>
      );
    }

    renderScene = ({ route }) => {
      return this.renderComponentDemo(sceneConfig[route.key]);
    }

    renderHeader = () => {
      return (
        <View style={{ paddingHorizontal: 2, height: demoConfig.containerHeight, flexDirection: demoConfig.containerType }}>
          {!this.state.isEditing && demoConfig.components.length > 1
            ? <TabViewAnimated
              navigationState={{ index: this.state.selectedIndex, routes: this.state.routes }}
              renderScene={this.renderScene}
              onIndexChange={this.onIndexChange} />
            : this.renderComponentDemo(demoConfig.components[this.state.selectedIndex])}
        </View>
      );
    }

    renderPropsList = () => {
      const { parsedProps } = demoConfig.components[this.state.selectedIndex];
      return (
        <View>
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

    getSelectedPropParams = () => {
      return this.state.editingOptions.find((o) => o.name === this.state.selectedProp);
    }

    onSelectedPropChange = (val) => {
      const customProps = { ...this.state.customProps, [this.state.selectedProp]: val };
      LayoutAnimation.configureNext(CustomLayoutSpring);
      this.setState({ customProps });
    }

    renderSelectedPropertyEditor = () => {
      const selectedPropParams = this.getSelectedPropParams();
      return (
        <PropEditor
          {...selectedPropParams}
          onChange={this.onSelectedPropChange}
          value={this.state.customProps[this.state.selectedProp]} />
      );
    }

    renderPropsEditor = () => {
      const wheelValues = this.state.editingOptions.map(({ name }) => name);
      return (
        <View>
          {this.renderSelectedPropertyEditor()}
          <WheelPicker
            height={120}
            wheelWidth={180}
            onChange={(val) => this.setState(val)}
            value={{ selectedProp: wheelValues[0] }}
            wheels={[{ id: 'selectedProp', values: wheelValues }]} />
        </View>
      );
    }

    render () {
      const { Component, items, renderAtBottom, methods } = demoConfig.components[this.state.selectedIndex];
      const toggleEditIcon = this.state.isEditing ? 'remove' : 'category';
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
            header={this.renderHeader()}>
            <Row>
              <Text.Light size='xlarge'>{this.state.isEditing ? 'Editor' : 'Props'}</Text.Light>
              <IconButton
                size={30}
                name={toggleEditIcon}
                color={BaseTheme.palette.APP_DARK_GREY}
                onPress={this.toggleComponentEditor} />
            </Row>
            {this.state.isEditing
              ? this.renderPropsEditor()
              : this.renderPropsList()}
          </ParallaxView>
          {renderAtBottom && items.map((item, index) => {
            const { props } = item;
            const ref = methods ? { ref: this.setElRef } : {};
            return <Component key={index} {...props} {...ref} />;
          })}
        </View>
      );
    }
  }

  return DemoScreen;
};

export default createDemoScreen;
