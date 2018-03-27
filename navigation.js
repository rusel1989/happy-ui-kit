
import { StackNavigator } from 'react-navigation';
import createComponentScreen from './demo/ComponentScreen';
import Home from './demo/Home';
import options from './demo/navOptions';

import ActionSheet from './components/ActionSheet';
import Button from './components/Button';
import Calendar from './components/Calendar';
import Card from './components/Card';
import Checkbox from './components/Checkbox';
import Chip from './components/Chip';
import ChipGroup from './components/ChipGroup';
import CircleChart from './components/CircleChart';
import CircleSlider from './components/CircleSlider';
import Col from './components/Col';
import Drawer from './components/Drawer';
import Dropdown from './components/Dropdown';
import FooterButton from './components/FooterButton';
import HeaderButton from './components/HeaderButton';
import Icon from './components/Icon';
import IconButton from './components/IconButton';
import ListItem from './components/ListItem';
import ListScreen from './components/ListScreen';
import Notification from './components/Notification';
import Overlay from './components/Overlay';
import ParallaxView from './components/ParallaxView';
import ProgressBar from './components/ProgressBar';
import PullToRefreshView from './components/PullToRefreshView';
import RefreshControl from './components/RefreshControl';
import Row from './components/Row';
import Screen from './components/Screen';
import ScreenContainer from './components/ScreenContainer';
import Section from './components/Section';
import SectionHeader from './components/SectionHeader';
import SectionList from './components/SectionList';
import SegmentedControl from './components/SegmentedControl';
import Separator from './components/Separator';
import SharedElement from './components/SharedElement';
import SwipeRow from './components/SwipeRow';
import TabBar from './components/TabBar';
import TabBarButton from './components/TabBarButton';
import Text from './components/Text';
import TextField from './components/TextField';
import Toast from './components/Toast';
import Touchable from './components/Touchable';
import WheelPicker from './components/WheelPicker';

const RootNavigator = StackNavigator({
  Index: {
    screen: Home,
    navigationOptions: {
      title: 'Happy UI kit'
    }
  },
  ActionSheet: {
    screen: createComponentScreen(ActionSheet),
    navigationOptions: {
      title: 'Action Sheet'
    }
  },
  Button: {
    screen: createComponentScreen(Button),
    navigationOptions: {
      title: 'Button'
    }
  },
  Calendar: {
    screen: createComponentScreen(Calendar),
    navigationOptions: {
      title: 'Calendar'
    }
  },
  Card: {
    screen: createComponentScreen(Card),
    navigationOptions: {
      title: 'Card'
    }
  },
  Checkbox: {
    screen: createComponentScreen(Checkbox),
    navigationOptions: {
      title: 'Checkbox'
    }
  },
  Chip: {
    screen: createComponentScreen(Chip),
    navigationOptions: {
      title: 'Chip'
    }
  },
  ChipGroup: {
    screen: createComponentScreen(ChipGroup),
    navigationOptions: {
      title: 'Chip Group'
    }
  },
  CircleChart: {
    screen: createComponentScreen(CircleChart),
    navigationOptions: {
      title: 'Circle Chart'
    }
  },
  CircleSlider: {
    screen: createComponentScreen(CircleSlider),
    navigationOptions: {
      title: 'Circle Slider'
    }
  },
  Col: {
    screen: createComponentScreen(Col),
    navigationOptions: {
      title: 'Col'
    }
  },
  Drawer: {
    screen: createComponentScreen(Drawer),
    navigationOptions: {
      title: 'Drawer'
    }
  },
  Dropdown: {
    screen: createComponentScreen(Dropdown),
    navigationOptions: {
      title: 'Dropdown'
    }
  },
  FooterButton: {
    screen: createComponentScreen(FooterButton),
    navigationOptions: {
      title: 'Footer Button'
    }
  },
  HeaderButton: {
    screen: createComponentScreen(HeaderButton),
    navigationOptions: {
      title: 'Header Button'
    }
  },
  Icon: {
    screen: createComponentScreen(Icon),
    navigationOptions: {
      title: 'Icon'
    }
  },
  IconButton: {
    screen: createComponentScreen(IconButton),
    navigationOptions: {
      title: 'Icon Button'
    }
  },
  ListItem: {
    screen: createComponentScreen(ListItem),
    navigationOptions: {
      title: 'List Item'
    }
  },
  ListScreen: {
    screen: createComponentScreen(ListScreen),
    navigationOptions: {
      title: 'List Screen'
    }
  },
  Notification: {
    screen: createComponentScreen(Notification),
    navigationOptions: {
      title: 'Notification'
    }
  },
  Overlay: {
    screen: createComponentScreen(Overlay),
    navigationOptions: {
      title: 'Overlay'
    }
  },
  ParallaxView: {
    screen: createComponentScreen(ParallaxView),
    navigationOptions: {
      title: 'Parallax View'
    }
  },
  ProgressBar: {
    screen: createComponentScreen(ProgressBar),
    navigationOptions: {
      title: 'Progress Bar'
    }
  },
  PullToRefreshView: {
    screen: createComponentScreen(PullToRefreshView),
    navigationOptions: {
      title: 'Pull To Refresh View'
    }
  },
  RefreshControl: {
    screen: createComponentScreen(RefreshControl),
    navigationOptions: {
      title: 'Refresh Control'
    }
  },
  Row: {
    screen: createComponentScreen(Row),
    navigationOptions: {
      title: 'Row'
    }
  },
  Screen: {
    screen: createComponentScreen(Screen),
    navigationOptions: {
      title: 'Screen'
    }
  },
  ScreenContainer: {
    screen: createComponentScreen(ScreenContainer),
    navigationOptions: {
      title: 'Screen Container'
    }
  },
  Section: {
    screen: createComponentScreen(Section),
    navigationOptions: {
      title: 'Section'
    }
  },
  SectionHeader: {
    screen: createComponentScreen(SectionHeader),
    navigationOptions: {
      title: 'Section Header'
    }
  },
  SectionList: {
    screen: createComponentScreen(SectionList),
    navigationOptions: {
      title: 'Section List'
    }
  },
  SegmentedControl: {
    screen: createComponentScreen(SegmentedControl),
    navigationOptions: {
      title: 'Segmented Control'
    }
  },
  Separator: {
    screen: createComponentScreen(Separator),
    navigationOptions: {
      title: 'Separator'
    }
  },
  SharedElement: {
    screen: createComponentScreen(SharedElement),
    navigationOptions: {
      title: 'Shared Element'
    }
  },
  SwipeRow: {
    screen: createComponentScreen(SwipeRow),
    navigationOptions: {
      title: 'Swipe Row'
    }
  },
  TabBar: {
    screen: createComponentScreen(TabBar),
    navigationOptions: {
      title: 'Tab Bar'
    }
  },
  TabBarButton: {
    screen: createComponentScreen(TabBarButton),
    navigationOptions: {
      title: 'Tab Bar Button'
    }
  },
  Text: {
    screen: createComponentScreen(Text),
    navigationOptions: {
      title: 'Text'
    }
  },
  TextField: {
    screen: createComponentScreen(TextField),
    navigationOptions: {
      title: 'Text Field'
    }
  },
  Toast: {
    screen: createComponentScreen(Toast),
    navigationOptions: {
      title: 'Toast'
    }
  },
  Touchable: {
    screen: createComponentScreen(Touchable),
    navigationOptions: {
      title: 'Touchable'
    }
  },
  WheelPicker: {
    screen: createComponentScreen(WheelPicker),
    navigationOptions: {
      title: 'Wheel Picker'
    }
  }
}, options);

export default RootNavigator;
