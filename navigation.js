
import { StackNavigator } from 'react-navigation';
import createDemoScreen from './demo/createDemoScreen';
import Home from './demo/Home';
import options from './demo/navOptions';

import ActionSheet from './components/ActionSheet/Demo';
import Button from './components/Button/Demo';
import Card from './components/Card/Demo';
import Checkbox from './components/Checkbox/Demo';
import Chip from './components/Chip/Demo';
import ChipGroup from './components/ChipGroup/Demo';
import CircleChart from './components/CircleChart/Demo';
import CircleSlider from './components/CircleSlider/Demo';
import Col from './components/Col/Demo';
import Dropdown from './components/Dropdown/Demo';
import HeaderButton from './components/HeaderButton/Demo';
import Icon from './components/Icon/Demo';
import IconButton from './components/IconButton/Demo';
import ListItem from './components/ListItem/Demo';
import Notification from './components/Notification/Demo';
import Overlay from './components/Overlay/Demo';
import ParallaxView from './components/ParallaxView/Demo';
import ProgressBar from './components/ProgressBar/Demo';
import PullToRefreshView from './components/PullToRefreshView/Demo';
import Row from './components/Row/Demo';
import Section from './components/Section/Demo';
import SectionHeader from './components/SectionHeader/Demo';
import SectionList from './components/SectionList/Demo';
import SegmentedControl from './components/SegmentedControl/Demo';
import Separator from './components/Separator/Demo';
import Text from './components/Text/Demo';
import TextField from './components/TextField/Demo';
import Toast from './components/Toast/Demo';
import Touchable from './components/Touchable/Demo';
import WheelPicker from './components/WheelPicker/Demo';

const RootNavigator = StackNavigator({
  Index: {
    screen: Home,
    navigationOptions: {
      title: 'Happy UI kit'
    }
  },
  ActionSheet: {
    screen: createDemoScreen(ActionSheet),
    navigationOptions: {
      title: 'Action Sheet'
    }
  },
  Button: {
    screen: createDemoScreen(Button),
    navigationOptions: {
      title: 'Button'
    }
  },
  Card: {
    screen: createDemoScreen(Card),
    navigationOptions: {
      title: 'Card'
    }
  },
  Checkbox: {
    screen: createDemoScreen(Checkbox),
    navigationOptions: {
      title: 'Checkbox'
    }
  },
  Chip: {
    screen: createDemoScreen(Chip),
    navigationOptions: {
      title: 'Chip'
    }
  },
  ChipGroup: {
    screen: createDemoScreen(ChipGroup),
    navigationOptions: {
      title: 'Chip Group'
    }
  },
  CircleChart: {
    screen: createDemoScreen(CircleChart),
    navigationOptions: {
      title: 'Circle Chart'
    }
  },
  CircleSlider: {
    screen: createDemoScreen(CircleSlider),
    navigationOptions: {
      title: 'Circle Slider'
    }
  },
  Col: {
    screen: createDemoScreen(Col),
    navigationOptions: {
      title: 'Col'
    }
  },
  Dropdown: {
    screen: createDemoScreen(Dropdown),
    navigationOptions: {
      title: 'Dropdown'
    }
  },
  HeaderButton: {
    screen: createDemoScreen(HeaderButton),
    navigationOptions: {
      title: 'Header Button'
    }
  },
  Icon: {
    screen: createDemoScreen(Icon),
    navigationOptions: {
      title: 'Icon'
    }
  },
  IconButton: {
    screen: createDemoScreen(IconButton),
    navigationOptions: {
      title: 'Icon Button'
    }
  },
  ListItem: {
    screen: createDemoScreen(ListItem),
    navigationOptions: {
      title: 'List Item'
    }
  },
  Notification: {
    screen: createDemoScreen(Notification),
    navigationOptions: {
      title: 'Notification'
    }
  },
  Overlay: {
    screen: createDemoScreen(Overlay),
    navigationOptions: {
      title: 'Overlay'
    }
  },
  ParallaxView: {
    screen: createDemoScreen(ParallaxView),
    navigationOptions: {
      title: 'Parallax View'
    }
  },
  ProgressBar: {
    screen: createDemoScreen(ProgressBar),
    navigationOptions: {
      title: 'Progress Bar'
    }
  },
  PullToRefreshView: {
    screen: createDemoScreen(PullToRefreshView),
    navigationOptions: {
      title: 'Pull To Refresh View'
    }
  },
  Row: {
    screen: createDemoScreen(Row),
    navigationOptions: {
      title: 'Row'
    }
  },
  Section: {
    screen: createDemoScreen(Section),
    navigationOptions: {
      title: 'Section'
    }
  },
  SectionHeader: {
    screen: createDemoScreen(SectionHeader),
    navigationOptions: {
      title: 'Section Header'
    }
  },
  SectionList: {
    screen: createDemoScreen(SectionList),
    navigationOptions: {
      title: 'Section List'
    }
  },
  SegmentedControl: {
    screen: createDemoScreen(SegmentedControl),
    navigationOptions: {
      title: 'Segmented Control'
    }
  },
  Separator: {
    screen: createDemoScreen(Separator),
    navigationOptions: {
      title: 'Separator'
    }
  },
  Text: {
    screen: createDemoScreen(Text),
    navigationOptions: {
      title: 'Text'
    }
  },
  TextField: {
    screen: createDemoScreen(TextField),
    navigationOptions: {
      title: 'Text Field'
    }
  },
  Toast: {
    screen: createDemoScreen(Toast),
    navigationOptions: {
      title: 'Toast'
    }
  },
  Touchable: {
    screen: createDemoScreen(Touchable),
    navigationOptions: {
      title: 'Touchable'
    }
  },
  WheelPicker: {
    screen: createDemoScreen(WheelPicker),
    navigationOptions: {
      title: 'Wheel Picker'
    }
  }
}, options);

export default RootNavigator;
