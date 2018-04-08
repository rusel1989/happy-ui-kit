// eslint-disable-next-line
import color from 'color';
import merge from 'lodash/merge';

export const palette = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  APP_BACKGROUND: '#BBDEFB',
  APP_PRIMARY_TEXT: '#212121',
  APP_SECONDARY_TEXT: '#757575',
  APP_PRIMARY: '#2196F3',
  APP_PRIMARY_DARKER: '#1976D2',
  APP_PRIMARY_LIGHT: '#BBDEFB',
  APP_ACCENT: '#FF9800',
  APP_LIGHT_GREY: '#E0E0E0',
  APP_DARK_GREY: '#686868',
  APP_BLACK: '#424242',
  APP_INFO: '#00BCD4',
  APP_SUCCESS: '#00C853',
  APP_DANGER: '#F44336',
  APP_SEPARATOR: '#BDBDBD',
  APP_OVERLAY: 'rgba(38,50,56,0.4)'
};

export const spacing = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 20,
  xlarge: 32
};

export const components = {
  ActionSheet: {
    itemHeight: 60,
    itemBorderRadius: 12,
    selectedBackgroundColor: palette.APP_LIGHT_GREY,
    selectedIconColor: palette.APP_PRIMARY,
    selectedLabelColor: palette.APP_PRIMARY,
    itemBackgroundColor: palette.WHITE,
    labelColor: palette.APP_DARK_GREY,
    iconColor: palette.APP_DARK_GREY
  },
  Button: {
    backgroundColor: palette.APP_PRIMARY,
    labelColor: palette.WHITE,
    labelFont: 'System',
    labelFontWeight: '400',
    uppercaseLabel: true,
    labelSize: 16,
    borderRadius: 0,
    height: 50,
    spacingHorizontal: spacing.medium,
    raised: false
  },
  Card: {
    backgroundColor: palette.WHITE,
    spacingVertical: spacing.medium,
    spacingHorizontal: spacing.medium,
    borderRadius: 0,
    shadow: true
  },
  Checkbox: {
    tintColor: palette.APP_SECONDARY_TEXT,
    selectedTintColor: palette.APP_PRIMARY_TEXT,
    iconSize: 22,
    animation: 'fadeIn',
    selectedIcon: 'radio-active',
    icon: 'radio-deafult'
  },
  Chip: {
    activeTintColor: palette.APP_BLACK,
    tintColor: palette.APP_DARK_GREY,
    backgroundColor: palette.WHITE,
    height: 36,
    borderRadius: 20,
    borderWidth: 2,
    textSize: spacing.medium,
    overflow: 'hidden',
    spacingHorizontal: 0
  },
  ChipGroup: {
    animated: false,
    spacingHorizontal: 5
  },
  CircleChart: {
    size: 120,
    lineWidth: 10,
    linecap: 'round',
    rotation: 0,
    backgroundColor: palette.APP_LIGHT_GREY,
    tintColor: palette.APP_PRIMARY,
    showText: true,
    textSize: 20,
    textColor: palette.APP_DARK_GREY
  },
  CircleSlider: {
    width: 120,
    height: 120,
    btnRadius: 15,
    btnFill: palette.APP_LIGHT_GREY,
    btnStroke: 'transparent',
    btnStrokeWidth: 0,
    railWidth: 10,
    railColor: palette.APP_LIGHT_GREY,
    meterWidth: 10,
    meterColors: [palette.APP_PRIMARY, palette.APP_PRIMARY_DARKER],
    textColor: palette.APP_PRIMARY_TEXT,
    textSize: 30
  },
  HeaderButton: {
    iconColor: palette.WHITE,
    backgroundColor: 'transparent',
    width: 44,
    height: 44
  },
  ListItem: {
    labelSize: spacing.medium,
    labelColor: palette.APP_DARK_GREY,
    iconColor: palette.APP_DARK_GREY,
    showSeparator: true,
    height: 60,
    spacingHorizontal: spacing.medium,
    backgroundColor: palette.WHITE,
    activeBackgroundColor: palette.APP_LIGHT_GREY,
    selectedBackgroundColor: palette.WHITE
  },
  Notification: {
    tintColor: palette.APP_BLACK,
    backgroundColor: palette.WHITE,
    spacingVertical: 8,
    spacingHorizontal: spacing.medium,
    textSize: spacing.medium,
    textAlign: 'center'
  },
  Overlay: {
    backgroundColor: palette.APP_OVERLAY,
    animation: 'fadeIn',
    duration: 500
  },
  ProgressBar: {
    height: 40,
    barColor: palette.APP_PRIMARY,
    backgroundColor: palette.APP_LIGHT_GREY,
    textColor: palette.APP_DARK_GREY,
    borderRadius: 2,
    showText: true
  },
  PullToRefreshView: {
    tintColor: palette.APP_PRIMARY
  },
  Section: {
    headerUppercase: true,
    headerTextSize: 12,
    headerHeight: 28,
    headerTextColor: palette.APP_DARK_GREY,
    headerBackgroundColor: palette.APP_LIGHT_GREY,
    contentSpacingVertical: 8,
    contentSpacingHorizontal: spacing.medium,
    contentBackgroundColor: palette.WHITE
  },
  SectionHeader: {
    backgroundColor: palette.APP_LIGHT_GREY,
    textColor: palette.APP_DARK_GREY,
    textSize: 12,
    spacingHorizontal: spacing.medium,
    height: 28,
    uppercase: true
  },
  SegmentedControl: {
    tintColor: palette.APP_PRIMARY,
    textSize: 14,
    backgroundColor: palette.WHITE,
    spacingVertical: 10,
    spacingHorizontal: spacing.medium
  },
  Separator: {
    width: 1,
    color: palette.APP_SEPARATOR,
    spacingHorizontal: 0,
    spacingVertical: 0
  },
  Text: {
    color: palette.APP_PRIMARY_TEXT,
    size: 14,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'left'
  },
  TextField: {
    textColor: palette.APP_BLACK,
    textSize: spacing.medium,
    backgroundColor: palette.WHITE,
    font: 'System',
    borderRadius: 0,
    borderColor: 'transparent',
    borderWidth: 0,
    spacingVertical: 4,
    spacingHorizontal: spacing.medium
  },
  Toast: {
    backgroundColor: palette.APP_BLACK,
    textColor: palette.WHITE,
    textSize: 14,
    font: 'System',
    borderRadius: 5,
    spacingVertical: 4,
    spacingHorizontal: spacing.medium
  },
  WheelPicker: {
    height: 240,
    backgroundColor: palette.WHITE,
    wheelWidth: 50,
    itemHeight: 50,
    spacingHorizontal: 0,
    wheelSpacing: 36,
    selectedTextColor: palette.APP_BLACK,
    selectedTextSize: 22,
    textColor: palette.APP_LIGHT_GREY,
    textSize: 20,
    selectedItemBorderColor: palette.APP_BLACK,
    selectedItemBorderWidth: 2,
    selectedItemBorderRadius: 5
  }
};

components.ParallaxView = {
  backgroundColor: palette.WHITE,
  showIndicator: false,
  spinnerColor: palette.APP_PRIMARY,
  headerBackgroundColor: palette.WHITE,
  cardBackgroundColor: components.Card.backgroundColor,
  cardSpacingVertical: components.Card.spacingVertical,
  cardSpacingHorizontal: components.Card.spacingHorizontal,
  cardBorderRadius: components.Card.borderRadius,
  cardShadow: components.Card.shadow
};

components.SectionList = {
  sectionHeaderTextColor: components.SectionHeader.textColor,
  sectionHeaderTextSize: components.SectionHeader.textSize,
  sectionHeaderBackgroundColor: components.SectionHeader.backgroundColor,
  sectionHeaderHeight: components.SectionHeader.sectionHeaderHeight,
  sectionHeaderSpacingHorizontal: components.SectionHeader.spacingHorizontal,
  showFooter: true,
  spinnerColor: palette.APP_PRIMARY,
  footerSpacingVertical: 30,
  showSeparator: true,
  separatorColor: palette.APP_SEPARATOR,
  separatorWidth: 1,
  animation: 'fadeInUp',
  duration: 200
};

components.SelectableListItem = {
  ...components.ListItem,
  selectedBackgroundColor: palette.APP_LIGHT_GREY,
  selectedIconColor: palette.APP_PRIMARY,
  selectedLabelColor: palette.APP_PRIMARY
};

components.Dropdown = {
  ...components.ListItem,
  rightIcon: 'arrow-down',
  icon: 'save',
  itemHeight: 50
};

components.DropdownItem = {
  ...components.ListItem
};

export const createTheme = (theme = {}) => {
  const t = merge({}, { palette, spacing, ...components }, theme);
  return t;
};

export default {
  ...components,
  palette
};
