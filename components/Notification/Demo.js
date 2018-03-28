
import Notification from './index';

const demo = {
  containerHeight: 80,
  containerType: 'column',
  components: [{
    Component: Notification,
    items: [{
      label: 'Default',
      props: {
        message: 'Notification with message'
      }
    }]
  }, {
    Component: Notification.Success,
    items: [{
      label: 'Default',
      props: {
        message: 'Notification with success message'
      }
    }]
  }, {
    Component: Notification.Danger,
    items: [{
      label: 'Default',
      props: {
        message: 'Notification with error message'
      }
    }]
  }]
};

export default demo;
