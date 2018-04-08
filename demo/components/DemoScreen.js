import React from 'react';
import { View } from 'react-native';
import { ParallaxView } from 'happy-ui-kit';

import palette from '../palette';
import ComponentEditor from '../components/ComponentEditor';
import ComponentDemo from '../components/ComponentDemo';
import PropList from '../components/PropList';

class DemoScreen extends React.Component {
  renderComponentDemo = (componentInfo) => {
    return (
      <ComponentDemo
        isEditing={this.props.isEditing}
        routes={this.props.routes}
        selectedIndex={this.props.selectedIndex}
        customProps={this.props.customProps}
        onComponentTabChange={this.props.onComponentTabChange}
        componentInfo={this.props.componentInfo}
        containerHeight={this.props.containerHeight}
        containerType={this.props.containerType}
        sceneConfig={this.props.sceneConfig}
        hasMultipleComponents={this.props.hasMultipleComponents}
        componentContainerStyle={this.props.componentContainerStyle}
        layout={this.props.layout} />);
  }

  renderPropsList = ({ parsedProps }) => {
    return (
      <PropList
        parsedProps={this.props.componentInfo.parsedProps}
        onSortRequest={this.props.onSortRequest}
        onEditPress={this.props.onEditPress} />);
  }

  renderPropsEditor = () => {
    return (
      <ComponentEditor
        selectedPropParams={this.props.selectedPropParams}
        onPropSelect={this.props.onPropSelect}
        onSelectedPropChange={this.props.onSelectedPropChange}
        onResetAllPress={this.props.onResetAllPress}
        onComponentNameChange={this.props.onComponentNameChange}
        onSavePress={this.props.onSavePress}
        onCancelPress={this.props.onCancelPress}
        componentName={this.props.componentName}
        error={this.props.error}
        editingOptions={this.props.editingOptions}
        selectedProp={this.props.selectedProp}
        selectedPropValue={this.props.selectedPropValue} />);
  }

  render () {
    return (
      <View style={{ flex: 1 }} >
        <ParallaxView
          teaserHeight={this.props.containerHeight}
          backgroundColor={palette.APP_SEPARATOR}
          headerBackgroundColor='rgba(0,0,0,0)'
          cardStyle={{ marginHorizontal: 8, marginBottom: 80, elevation: 5 }}
          cardSpacingVertical={10}
          cardSpacingHorizontal={16}
          cardBorderRadius={5}
          scrollEnabled={!this.props.isEditing}
          header={this.renderComponentDemo(this.props.componentInfo)}>
          {this.props.isEditing
            ? this.renderPropsEditor()
            : this.renderPropsList(this.props.componentInfo)}
        </ParallaxView>
        {this.props.componentInfo.modal && this.renderComponentDemo(this.props.componentInfo)}
      </View>);
  }
}

export default DemoScreen;
