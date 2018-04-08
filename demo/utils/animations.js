import { LayoutAnimation } from 'react-native';

export const CustomLayoutSpring = {
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

export const CustomLayoutLinear = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.curveEaseInEaseOut
  }
};
