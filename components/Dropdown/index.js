import React from 'react';
import color from 'color';
import PropTypes from 'prop-types';

import Row from '@happy/components/Row';
import Col from '@happy/components/Col';
import Icon from '@happy/components/Icon';
import Text from '@happy/components/Text';
import Touchable from '@happy/components/Touchable';
import ListItem from '@happy/components/ListItem';

import { colors } from '@happy/components/theme';
import { to24hTime } from '@happy/utils/date';

const locationBackground = color(colors.APP_PRIMARY).alpha(0.1);

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
    const { options = [] } = this.props;
    return (
      <ListItem.Collapsible
        style={this.props.style}
        getRef={this.setCollapsibleRef}
        icon='category'
        labelColor={colors.APP_BLACK}
        iconColor={colors.APP_BLACK}
        label={this.getLabel()}
        height={50}
        contentHeight={options.length * 50}
        rightButton={<Icon name='arrow-down' />}>
        {options.map(({ value, label }, i) => {
          return (
            <Touchable key={i} onPress={() => this.onSelect({ value, label })}>
              <ListItem labelColor={colors.APP_BLACK} label={label} height={50} />
            </Touchable>
          );
        })}
      </ListItem.Collapsible>
    );
  }
}

Dropdown.defaultProps = {
  label: 'Select',
  options: [],
  onSelect: () => {}
}

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })),
  onSelect: PropTypes.func
}

Dropdown.demoProps = {
  label: 'Select anything',
  options: [{ value: 'any', label: 'Anything'}, { value: 'some', label: 'Something' }],
  onSelect: (v) => console.log(v)
}

export default Dropdown
