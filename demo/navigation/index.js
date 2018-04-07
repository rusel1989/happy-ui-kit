
import { StackNavigator } from 'react-navigation';

import ActionSheet from '../../lib/components/ActionSheet/Demo';
import Button from '../../lib/components/Button/Demo';
import Card from '../../lib/components/Card/Demo';
import Checkbox from '../../lib/components/Checkbox/Demo';
import Chip from '../../lib/components/Chip/Demo';
import ChipGroup from '../../lib/components/ChipGroup/Demo';
import CircleChart from '../../lib/components/CircleChart/Demo';
import CircleSlider from '../../lib/components/CircleSlider/Demo';
import Col from '../../lib/components/Col/Demo';
import Dropdown from '../../lib/components/Dropdown/Demo';
import HeaderButton from '../../lib/components/HeaderButton/Demo';
import Icon from '../../lib/components/Icon/Demo';
import IconButton from '../../lib/components/IconButton/Demo';
import ListItem from '../../lib/components/ListItem/Demo';
import Notification from '../../lib/components/Notification/Demo';
import Overlay from '../../lib/components/Overlay/Demo';
import ParallaxView from '../../lib/components/ParallaxView/Demo';
import ProgressBar from '../../lib/components/ProgressBar/Demo';
import PullToRefreshView from '../../lib/components/PullToRefreshView/Demo';
import Row from '../../lib/components/Row/Demo';
import Section from '../../lib/components/Section/Demo';
import SectionHeader from '../../lib/components/SectionHeader/Demo';
import SectionList from '../../lib/components/SectionList/Demo';
import SegmentedControl from '../../lib/components/SegmentedControl/Demo';
import Separator from '../../lib/components/Separator/Demo';
import Text from '../../lib/components/Text/Demo';
import TextField from '../../lib/components/TextField/Demo';
import Toast from '../../lib/components/Toast/Demo';
import Touchable from '../../lib/components/Touchable/Demo';
import WheelPicker from '../../lib/components/WheelPicker/Demo';

import Home from '../components/Home';
import { createDemoScreen } from '../utils';
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
