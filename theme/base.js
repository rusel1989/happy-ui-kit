export const palette = {
  PINK: '#F50057',
  WHITE: '#ffffff',
  GREY: '#505c61',
  LIGHT_GREY: '#CFD8DC',
  MEDIUM_GREY: '#B0BEC5',
  DARK_GREY: '#455A64',
  EXTRA_LIGHT_GREY: '#F7F9F9',
  TAB_BAR_BUTTON: '#78909C',
  TAB_BAR_BUTTON_ACTIVE: '#455A64',

  APP_PRIMARY: '#9B51E0',
  APP_BACKGROUND: '#EEEEEE',
  APP_BLACK: '#424242',
  APP_INFO: '#00BCD4',
  APP_DARK_GREY: '#686868',
  APP_LIGHT_GREY: '#E0E0E0',
  APP_SUCCESS: '#00C853',
  APP_DANGER: '#F44336',
  APP_SEPARATOR: '#ECEFF1',
  APP_OVERLAY: 'rgba(38,50,56,0.4)'
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
    color: palette.WHITE,
    uppercaseLabel: true,
    labelSize: 20,
    borderRadius: 0,
    height: 60
  },
  Card: {
    backgroundColor: palette.WHITE,
    spacingVertical: 16,
    spacingHorizontal: 16,
    borderRadius: 0,
    shadow: true
  },
  Checkbox: {
    tintColor: palette.APP_DARK_GREY,
    selectedTintColor: palette.APP_PRIMARY,
    size: 22,
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
    textSize: 16,
    overflow: 'hidden',
    spacingHorizontal: 0
  },
  ChipGroup: {
    animated: false,
    spacingHorizontal: 5
  },
  CircleChart: {
    size: 100,
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
    meterColor: palette.APP_DANGER,
    meterColors: [palette.APP_DANGER, palette.APP_SUCCESS],
    textColor: palette.APP_DARK_GREY,
    textSize: 58
  },
  HeaderButton: {
    iconColor: palette.WHITE,
    backgroundColor: 'transparent',
    width: 44,
    height: 44
  },
  ListItem: {
    labelSize: 16,
    labelColor: palette.APP_DARK_GREY,
    iconColor: palette.APP_DARK_GREY,
    showSeparator: true,
    height: 60,
    spacingHorizontal: 16,
    backgroundColor: palette.WHITE,
    activeBackgroundColor: palette.EXTRA_LIGHT_GREY,
    selectedBackgroundColor: palette.WHITE
  },
  Notification: {
    tintColor: palette.APP_BLACK,
    backgroundColor: palette.WHITE,
    spacingVertical: 8,
    spacingHorizontal: 16,
    textSize: 16,
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
    backgroundColor: palette.LIGHT_GREY,
    textColor: palette.APP_DARK_GREY,
    borderRadius: 2,
    showText: true
  },
  PullToRefreshView: {
    tintColor: palette.APP_PRIMARY
  },
  RoundButton: {
    backgroundColor: palette.LIGHT_GREY,
    textColor: palette.DARK_GREY
  },
  Section: {
    headerUppercase: true,
    headerTextSize: 12,
    headerHeight: 28,
    headerTextColor: palette.APP_DARK_GREY,
    headerBackgroundColor: palette.APP_LIGHT_GREY,
    contentSpacingVertical: 8,
    contentSpacingHorizontal: 16,
    contentBackgroundColor: palette.WHITE
  },
  SectionHeader: {
    backgroundColor: palette.LIGHT_GREY,
    textColor: palette.DARK_GREY,
    textSize: 12,
    spacingHorizontal: 16,
    height: 28,
    uppercase: true
  },

  SegmentedControl: {
    tintColor: palette.APP_PRIMARY,
    textSize: 14,
    backgroundColor: palette.WHITE,
    spacingVertical: 10,
    spacingHorizontal: 16
  },
  Separator: {
    width: 1,
    color: palette.APP_SEPARATOR,
    spacingHorizontal: 0,
    spacingVertical: 0
  },
  Text: {
    color: palette.APP_DARK_GREY,
    size: 14,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'left'
  },
  TextField: {
    textColor: palette.APP_BLACK,
    textSize: 16,
    backgroundColor: palette.WHITE,
    font: 'System',
    borderRadius: 0,
    borderColor: 'transparent',
    borderWidth: 0,
    spacingVertical: 4,
    spacingHorizontal: 16
  },
  Toast: {
    backgroundColor: palette.APP_BLACK,
    textColor: palette.WHITE,
    textSize: 14,
    font: 'System',
    borderRadius: 5,
    spacingVertical: 4,
    spacingHorizontal: 16
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
    textColor: palette.LIGHT_GREY,
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

export default {
  ...components,
  palette
};
