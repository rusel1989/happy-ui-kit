import React from 'react';
import map from 'lodash/map';
import docs from '../docs.json';

const docsArray = map(docs);

const withDocs = () => Component => {
  class WithDocs extends React.Component {
    render () {
      return <Component docs={docsArray} {...this.props} />;
    }
  }

  return WithDocs;
};

export default withDocs;
