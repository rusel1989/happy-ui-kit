
import { StackNavigator } from 'react-navigation';

import ActionSheet from 'happy-ui-kit/lib/components/ActionSheet/Demo';
import Button from 'happy-ui-kit/lib/components/Button/Demo';
import Card from 'happy-ui-kit/lib/components/Card/Demo';
import Checkbox from 'happy-ui-kit/lib/components/Checkbox/Demo';
import Chip from 'happy-ui-kit/lib/components/Chip/Demo';
import ChipGroup from 'happy-ui-kit/lib/components/ChipGroup/Demo';
import CircleChart from 'happy-ui-kit/lib/components/CircleChart/Demo';
import CircleSlider from 'happy-ui-kit/lib/components/CircleSlider/Demo';
import Col from 'happy-ui-kit/lib/components/Col/Demo';
import Dropdown from 'happy-ui-kit/lib/components/Dropdown/Demo';
import HeaderButton from 'happy-ui-kit/lib/components/HeaderButton/Demo';
import Icon from 'happy-ui-kit/lib/components/Icon/Demo';
import IconButton from 'happy-ui-kit/lib/components/IconButton/Demo';
import ListItem from 'happy-ui-kit/lib/components/ListItem/Demo';
import Notification from 'happy-ui-kit/lib/components/Notification/Demo';
import Overlay from 'happy-ui-kit/lib/components/Overlay/Demo';
import ParallaxView from 'happy-ui-kit/lib/components/ParallaxView/Demo';
import ProgressBar from 'happy-ui-kit/lib/components/ProgressBar/Demo';
import PullToRefreshView from 'happy-ui-kit/lib/components/PullToRefreshView/Demo';
import Row from 'happy-ui-kit/lib/components/Row/Demo';
import Section from 'happy-ui-kit/lib/components/Section/Demo';
import SectionHeader from 'happy-ui-kit/lib/components/SectionHeader/Demo';
import SectionList from 'happy-ui-kit/lib/components/SectionList/Demo';
import SegmentedControl from 'happy-ui-kit/lib/components/SegmentedControl/Demo';
import Separator from 'happy-ui-kit/lib/components/Separator/Demo';
import Text from 'happy-ui-kit/lib/components/Text/Demo';
import TextField from 'happy-ui-kit/lib/components/TextField/Demo';
import Toast from 'happy-ui-kit/lib/components/Toast/Demo';
import Touchable from 'happy-ui-kit/lib/components/Touchable/Demo';
import WheelPicker from 'happy-ui-kit/lib/components/WheelPicker/Demo';

import { createDemoScreen } from '../utils';
import Home from '../components/Home';
import options from './config';

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
