import { colors } from '../components/theme';

export default {
  navigationOptions: {
    gesturesEnabled: false,
    headerStyle: {
      backgroundColor: colors.APP_PRIMARY,
      borderBottomColor: colors.APP_PRIMARY,
      elevation: 0
    },
    headerTintColor: colors.WHITE,
    headerTitleStyle: {
      fontWeight: 'bold',
      color: colors.WHITE,
      fontSize: 18
    }
  },
  mode: 'modal',
  cardStyle: {
    backgroundColor: 'transparent'
  }
};
