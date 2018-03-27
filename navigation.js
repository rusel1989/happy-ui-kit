
import { StackNavigator } from 'react-navigation';
import createComponentScreen from './demo/ComponentScreen';
import Home from './demo/Home';
import options from './demo/navOptions';

import ActionSheet from './components/ActionSheet';
import Button from './components/Button';
import Card from './components/Card';
import Checkbox from './components/Checkbox';
import Chip from './components/Chip';
import ChipGroup from './components/ChipGroup';
import CircleChart from './components/CircleChart';
import CircleSlider from './components/CircleSlider';
import Col from './components/Col';
import Dropdown from './components/Dropdown';
import HeaderButton from './components/HeaderButton';
import Icon from './components/Icon';
import IconButton from './components/IconButton';
import ListItem from './components/ListItem';
import Notification from './components/Notification';
import Overlay from './components/Overlay';
import ParallaxView from './components/ParallaxView';
import ProgressBar from './components/ProgressBar';
import PullToRefreshView from './components/PullToRefreshView';
import RoundButton from './components/RoundButton';
import Row from './components/Row';
import Section from './components/Section';
import SectionHeader from './components/SectionHeader';
import SectionList from './components/SectionList';
import SegmentedControl from './components/SegmentedControl';
import Separator from './components/Separator';
import SwipeRow from './components/SwipeRow';
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
  Dropdown: {
    screen: createComponentScreen(Dropdown),
    navigationOptions: {
      title: 'Dropdown'
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
  RoundButton: {
    screen: createComponentScreen(RoundButton),
    navigationOptions: {
      title: 'Round Button'
    }
  },
  Row: {
    screen: createComponentScreen(Row),
    navigationOptions: {
      title: 'Row'
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
  SwipeRow: {
    screen: createComponentScreen(SwipeRow),
    navigationOptions: {
      title: 'Swipe Row'
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
