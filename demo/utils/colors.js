import color from 'color';

import palette from '../palette';

export const getTonedColor = (hex, amount = 0.7) => {
  const base = color(hex);
  const toned = base.isDark() ? base.lighten(amount) : base.darken(amount);
  return toned.hex();
};

export const getTextColors = (value) => {
  if (value === 'true') {
    return [ palette.APP_SUCCESS, getTonedColor(palette.APP_SUCCESS) ];
  } else if (value === 'false' || value === 'n/a') {
    return [ palette.APP_DANGER, getTonedColor(palette.APP_DANGER, 0.5) ];
  } else if (/^#[a-fA-F0-9]{6}$/.test(value)) {
    return [ getTonedColor(value), value.toUpperCase() ];
  } else if (/^\d+$/.test(value)) {
    return [ palette.WHITE, getTonedColor(palette.WHITE) ];
  } else if (value === '() => {}') {
    return [ palette.APP_ACCENT, getTonedColor(palette.APP_ACCENT, -0.7) ];
  } else {
    return [ palette.APP_PRIMARY_TEXT, getTonedColor(palette.APP_PRIMARY_TEXT, 4) ];
  }
};
