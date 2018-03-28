import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import ListItem from '../ListItem';
import BaseTheme from '../../theme/base';

class Dropdown extends React.Component {
  state = {
    selectedOption: null
  }

  onSelect = (option) => {
    this.setState({ selectedOption: option });
    this.props.onSelect(option.value);
    this.collapsible && this.collapsible.close();
  }

  setCollapsibleRef = (v) => {
    this.collapsible = v;
  }

  getLabel = () => {
    return this.state.selectedOption ? this.state.selectedOption.label : this.props.label;
  }

  render () {
    const { options, ...rest } = this.props;
    const { rightIcon, itemHeight, ...dropdownStyle } = this.context.mergeStyle('Dropdown', rest);
    const dropdownItemStyle = this.context.mergeStyle('DropdownItem', rest);

    return (
      <ListItem.Collapsible
        getRef={this.setCollapsibleRef}
        label={this.getLabel()}
        height={itemHeight}
        contentHeight={options.length * itemHeight}
        rightButton={<Icon name={rightIcon} />}
        {...dropdownStyle}>
        {options.map(({ value, label }, i) => {
          return (
            <ListItem
              key={i}
              label={label}
              onPress={() => this.onSelect({ value, label })}
              {...dropdownItemStyle}
              height={itemHeight} />
          );
        })}
      </ListItem.Collapsible>
    );
  }
}
Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  label: 'Select',
  options: [],
  onSelect: () => {},
  ...BaseTheme.Dropdown
};

Dropdown.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })),
  onSelect: PropTypes.func,
  rightIcon: PropTypes.string,
  icon: PropTypes.string,
  itemHeight: PropTypes.number
};

export default Dropdown;
