import BaseTheme from 'happy-ui-kit/lib/theme/base';

export default {
  navigationOptions: {
    gesturesEnabled: false,
    headerStyle: {
      backgroundColor: BaseTheme.palette.APP_PRIMARY,
      borderBottomColor: BaseTheme.palette.APP_PRIMARY,
      elevation: 0
    },
    headerTintColor: BaseTheme.palette.WHITE,
    headerTitleStyle: {
      fontWeight: 'bold',
      color: BaseTheme.palette.WHITE,
      fontSize: 18
    }
  },
  mode: 'modal',
  cardStyle: {
    backgroundColor: 'transparent'
  }
};
