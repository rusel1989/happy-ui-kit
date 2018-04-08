import React from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';
import merge from 'lodash/merge';
import keys from 'lodash/keys';
import pick from 'lodash/pick';

import BaseTheme from './base';

class ThemeProvider extends React.Component {
  getChildContext () {
    return {
      theme: this.props.theme,
      mergeStyle: this.mergeStyle
    };
  }

  mergeStyle = (componentName, props) => {
    const styleProps = pick(props, keys(this.props.theme[componentName]));
    // console.log(componentName, this.props.theme[componentName])
    const style = merge({}, this.props.theme[componentName], styleProps);
    return style;
  }

  render () {
    return (
      this.props.children
    );
  }
}

ThemeProvider.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

ThemeProvider.childContextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

ThemeProvider.propTypes = {
  theme: PropTypes.object
};

ThemeProvider.defaultProps = {
  theme: BaseTheme
};

export default ThemeProvider;
