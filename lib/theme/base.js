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

export const getComponentsTheme = (_colors = {}, _spacings = {}) => {
  const spacings = merge({}, spacing, _spacings);
  const colors = merge({}, palette, _colors);
  const components = {
    ActionSheet: {
      itemHeight: 60,
      itemBorderRadius: 12,
      selectedBackgroundColor: colors.APP_LIGHT_GREY,
      selectedIconColor: colors.APP_PRIMARY,
      selectedLabelColor: colors.APP_PRIMARY,
      itemBackgroundColor: colors.WHITE,
      labelColor: colors.APP_DARK_GREY,
      iconColor: colors.APP_DARK_GREY
    },
    Button: {
      backgroundColor: colors.APP_PRIMARY,
      labelColor: colors.WHITE,
      labelFont: 'System',
      labelFontWeight: '400',
      uppercaseLabel: true,
      labelSize: 16,
      borderRadius: 0,
      height: 50,
      spacingHorizontal: spacings.medium,
      raised: false
    },
    Card: {
      backgroundColor: colors.WHITE,
      spacingVertical: spacings.medium,
      spacingHorizontal: spacings.medium,
      borderRadius: 0,
      shadow: true
    },
    Checkbox: {
      tintColor: colors.APP_SECONDARY_TEXT,
      selectedTintColor: colors.APP_PRIMARY_TEXT,
      iconSize: 22,
      animation: 'fadeIn',
      selectedIcon: 'radio-active',
      icon: 'radio-deafult'
    },
    Chip: {
      activeTintColor: colors.APP_BLACK,
      tintColor: colors.APP_DARK_GREY,
      backgroundColor: colors.WHITE,
      height: 36,
      borderRadius: 20,
      borderWidth: 2,
      textSize: spacings.medium,
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
      backgroundColor: colors.APP_LIGHT_GREY,
      tintColor: colors.APP_PRIMARY,
      showText: true,
      textSize: 20,
      textColor: colors.APP_DARK_GREY
    },
    CircleSlider: {
      width: 120,
      height: 120,
      btnRadius: 15,
      btnFill: colors.APP_LIGHT_GREY,
      btnStroke: 'transparent',
      btnStrokeWidth: 0,
      railWidth: 10,
      railColor: colors.APP_LIGHT_GREY,
      meterWidth: 10,
      meterColors: [colors.APP_PRIMARY, colors.APP_PRIMARY_DARKER],
      textColor: colors.APP_PRIMARY_TEXT,
      textSize: 30
    },
    HeaderButton: {
      iconColor: colors.WHITE,
      backgroundColor: 'transparent',
      width: 44,
      height: 44
    },
    ListItem: {
      labelSize: spacings.medium,
      labelColor: colors.APP_DARK_GREY,
      iconColor: colors.APP_DARK_GREY,
      showSeparator: true,
      height: 60,
      spacingHorizontal: spacings.medium,
      backgroundColor: colors.WHITE,
      activeBackgroundColor: colors.APP_LIGHT_GREY,
      selectedBackgroundColor: colors.WHITE
    },
    Notification: {
      tintColor: colors.APP_BLACK,
      backgroundColor: colors.WHITE,
      spacingVertical: 8,
      spacingHorizontal: spacings.medium,
      textSize: spacings.medium,
      textAlign: 'center'
    },
    Overlay: {
      backgroundColor: colors.APP_OVERLAY,
      animation: 'fadeIn',
      duration: 500
    },
    ProgressBar: {
      height: 40,
      barColor: colors.APP_PRIMARY,
      backgroundColor: colors.APP_LIGHT_GREY,
      textColor: colors.APP_DARK_GREY,
      borderRadius: 2,
      showText: true
    },
    PullToRefreshView: {
      tintColor: colors.APP_PRIMARY
    },
    Section: {
      headerUppercase: true,
      headerTextSize: 12,
      headerHeight: 28,
      headerTextColor: colors.APP_DARK_GREY,
      headerBackgroundColor: colors.APP_LIGHT_GREY,
      contentSpacingVertical: 8,
      contentSpacingHorizontal: spacings.medium,
      contentBackgroundColor: colors.WHITE
    },
    SectionHeader: {
      backgroundColor: colors.APP_LIGHT_GREY,
      textColor: colors.APP_DARK_GREY,
      textSize: 12,
      spacingHorizontal: spacings.medium,
      height: 28,
      uppercase: true
    },
    SegmentedControl: {
      tintColor: colors.APP_PRIMARY,
      textSize: 14,
      backgroundColor: colors.WHITE,
      spacingVertical: 10,
      spacingHorizontal: spacings.medium
    },
    Separator: {
      width: 1,
      color: colors.APP_SEPARATOR,
      spacingHorizontal: 0,
      spacingVertical: 0
    },
    Text: {
      color: colors.APP_PRIMARY_TEXT,
      size: 14,
      fontFamily: 'System',
      fontWeight: '400',
      textAlign: 'left'
    },
    TextField: {
      textColor: colors.APP_BLACK,
      textSize: spacings.medium,
      backgroundColor: colors.WHITE,
      font: 'System',
      borderRadius: 0,
      borderColor: 'transparent',
      borderWidth: 0,
      spacingVertical: 4,
      spacingHorizontal: spacings.medium
    },
    Toast: {
      backgroundColor: colors.APP_BLACK,
      textColor: colors.WHITE,
      textSize: 14,
      font: 'System',
      borderRadius: 5,
      spacingVertical: 4,
      spacingHorizontal: spacings.medium
    },
    WheelPicker: {
      height: 240,
      backgroundColor: colors.WHITE,
      wheelWidth: 50,
      itemHeight: 50,
      spacingHorizontal: 0,
      wheelSpacing: 36,
      selectedTextColor: colors.APP_BLACK,
      selectedTextSize: 22,
      textColor: colors.APP_LIGHT_GREY,
      textSize: 20,
      selectedItemBorderColor: colors.APP_BLACK,
      selectedItemBorderWidth: 2,
      selectedItemBorderRadius: 5
    }
  };

  components.ParallaxView = {
    backgroundColor: colors.WHITE,
    showIndicator: false,
    spinnerColor: colors.APP_PRIMARY,
    headerBackgroundColor: colors.WHITE,
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
    spinnerColor: colors.APP_PRIMARY,
    footerSpacingVertical: 30,
    showSeparator: true,
    separatorColor: colors.APP_SEPARATOR,
    separatorWidth: 1,
    animation: 'fadeInUp',
    duration: 200
  };

  components.SelectableListItem = {
    ...components.ListItem,
    selectedBackgroundColor: colors.APP_LIGHT_GREY,
    selectedIconColor: colors.APP_PRIMARY,
    selectedLabelColor: colors.APP_PRIMARY
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

  return components;
};

export const createTheme = (theme = {}) => {
  const t = merge({}, { palette, spacing, ...getComponentsTheme(theme.palette, theme.spacing) }, theme);
  return t;
};

export default {
  ...getComponentsTheme(palette, spacing),
  palette
};
