
import map from 'lodash/map';

export const getImagesMap = () => ({
  'Allergan_Logo_Tm': require('./assets/images/Allergan_Logo_Tm.png'),
  'icon-arrow': require('./assets/images/icon-arrow.png'),
  'icon-arrow-down': require('./assets/images/icon-arrow-down.png'),
  'icon-arrow-right': require('./assets/images/icon-arrow-right.png'),
  'icon-calendar': require('./assets/images/icon-calendar.png'),
  'icon-category': require('./assets/images/icon-category.png'),
  'icon-error': require('./assets/images/icon-error.png'),
  'icon-files': require('./assets/images/icon-files.png'),
  'icon-meeting-rooms': require('./assets/images/icon-meeting-rooms.png'),
  'icon-menu': require('./assets/images/icon-menu.png'),
  'icon-message': require('./assets/images/icon-message.png'),
  'icon-more': require('./assets/images/icon-more.png'),
  'icon-news': require('./assets/images/icon-news.png'),
  'icon-notification': require('./assets/images/icon-notification.png'),
  'icon-personal-message': require('./assets/images/icon-personal-message.png'),
  'icon-photos': require('./assets/images/icon-photos.png'),
  'icon-poster': require('./assets/images/icon-poster.png'),
  'icon-program': require('./assets/images/icon-program.png'),
  'icon-pulls': require('./assets/images/icon-pulls.png'),
  'icon-qr-code': require('./assets/images/icon-qr-code.png'),
  'icon-question': require('./assets/images/icon-question.png'),
  'icon-radio-active': require('./assets/images/icon-radio-active.png'),
  'icon-radio-deafult': require('./assets/images/icon-radio-deafult.png'),
  'icon-time': require('./assets/images/icon-time.png'),
  'icon-wordcloud': require('./assets/images/icon-wordcloud.png')
});

export const getImagesArray = () => map(getImagesMap());

export const getImage = (name) => getImagesMap()[name];
