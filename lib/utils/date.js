import dateformat from 'dateformat';

dateformat.i18n = {
  dayNames: [
    'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa',
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ],
  monthNames: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ],
  timeNames: [
    'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
  ]
};

export const toIsoDate = date => dateformat(date, 'yyyy-mm-dd');
export const toDay = date => dateformat(date, 'dddd');
export const toShortDay = date => dateformat(date, 'ddd');
export const toTime = date => dateformat(date, 'h:MM TT');
export const to24hTime = date => dateformat(date, 'hh:MM');
export const fullDate = date => dateformat(date, 'dd.mm.yyyy HH:MM');
export const dayMonthYear = date => dateformat(date, 'dd.mm.yyyy');
export const dayMonth = date => dateformat(date, 'dd.mm');
export const toFullMonth = date => dateformat(date, 'mmmm');
export const toFullMonthAndYear = date => dateformat(date, 'mmmm yyyy');
