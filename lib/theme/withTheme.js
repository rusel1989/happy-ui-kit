import React from 'react';
import PropTypes from 'prop-types';

const withTheme = () => Component => {
  class WithTheme extends React.Component {
    render () {
      return <Component theme={this.context.theme} {...this.props} />;
    }
  }

  WithTheme.contextTypes = {
    theme: PropTypes.object,
    mergeStyle: PropTypes.func
  };

  return WithTheme;
};

export default withTheme;
