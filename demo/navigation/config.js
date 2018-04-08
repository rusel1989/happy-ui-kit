import palette from '../palette';

export default {
  navigationOptions: {
    gesturesEnabled: false,
    headerStyle: {
      backgroundColor: palette.APP_PRIMARY,
      borderBottomColor: palette.APP_PRIMARY,
      elevation: 0
    },
    headerTintColor: palette.WHITE,
    headerTitleStyle: {
      fontWeight: 'bold',
      color: palette.WHITE,
      fontSize: 18
    }
  },
  mode: 'modal',
  cardStyle: {
    backgroundColor: 'transparent'
  }
};
