import keys from 'lodash/keys';
import merge from 'lodash/merge';
import map from 'lodash/map';

const defaultRowLayout = { justifyContent: 'flex-start', alignItems: 'center' };
const defaultColumnLayout = { alignItems: 'stretch', justifyContent: 'center' };
const defaultLayouts = {
  row: defaultRowLayout,
  column: defaultColumnLayout
};

const parseDemoConfig = (demoConfig, docs) => {
  const defaultLayout = defaultLayouts[demoConfig.containerType];

  demoConfig.headerLayout = merge({}, defaultLayout, demoConfig.containerAlignment);
  demoConfig.sceneConfig = {};

  if (!demoConfig.componentContainerStyle) {
    demoConfig.componentContainerStyle = {};
  }

  demoConfig.components.forEach((item, i) => {
    const { Component } = item;
    const componentDoc = docs.find((c) => c.displayName === Component.displayName);

    demoConfig.sceneConfig[Component.displayName] = item;
    item.parsedProps = [];

    if (Component.defaultProps) {
      Component.defaultProps.label = 'Label';
    }

    if (componentDoc) {
      const parsedProps = map(componentDoc.props, (info, name) => {
        // console.log(info, name);
        let type = info.type && info.type.name;
        if (type === 'custom') {
          type = info.type.raw.replace('ExtraPropTypes.', '');
        }
        console.log(info)
        return {
          name,
          type,
          description: info.description,
          required: info.required,
          defaultValue: info.defaultValue ? info.defaultValue.value : 'n/a'
        };
      });
      // console.log(parsedProps);
      item.parsedProps = parsedProps;
    }
    item.doc = componentDoc;
  });

  demoConfig.routes = keys(demoConfig.sceneConfig).map(key => ({ key }));

  return demoConfig;
};

export default parseDemoConfig;
