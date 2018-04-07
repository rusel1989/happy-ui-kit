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
