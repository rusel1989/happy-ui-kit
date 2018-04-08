export { default as createDemoScreen } from './createDemoScreen';
export { default as parseDemoConfig } from './parseDemoConfig';
export { default as withDocs } from './withDocs';

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
