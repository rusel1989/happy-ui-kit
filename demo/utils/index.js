export { default as createDemoScreen } from './createDemoScreen';

export const saveDemoProps = (name, props) => {
  return fetch(`http://192.168.1.103:59590/save-parsed-props/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(props)
  }).then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveComponent = (name, config) => {
  return fetch(`http://192.168.1.103:59590/save-component/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(config)
  }).then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const propsSorter = (key) => (a, b) => {
  if (b.def === 'n/a') return -1;
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

export const getDisplayName = (c) => {
  const displayName = c && c.displayName && c.displayName.replace('.', '');
  return displayName;
};

export const getPropsObjectName = (displayName) => {
  if (!displayName) {
    return null;
  }
  return displayName + 'Props';
};
