'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Platform,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

const deviceWidth = Dimensions.get('window').width;

class ScrollPicker extends Component {
  constructor (props) {
    super(props);
    this.itemHeight = this.props.itemHeight || 30;
    this.wrapperHeight = this.props.wrapperHeight || (this.props.style ? this.props.style.height : 0) || this.itemHeight * 5;
    this.state = {
      selectedIndex: this.props.selectedIndex || 0
    };
  }

  componentDidMount () {
    if (this.props.selectedIndex) {
      setTimeout(() => {
        this.scrollToIndex(this.props.selectedIndex);
      }, 0);
    }
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer);
  }

  render () {
    let {header, footer} = this._renderPlaceHolder();
    const { highlightColor, highlightBorderRadius, highlightBorderWidth } = this.props;
    let highlightWidth = (this.props.style ? this.props.style.width : 0) || deviceWidth;
    let wrapperStyle = {
      height: this.wrapperHeight,
      flex: 1,
      overflow: 'hidden'
    };

    let highlightStyle = {
      position: 'absolute',
      top: (this.wrapperHeight - this.itemHeight) / 2,
      height: this.itemHeight,
      width: highlightWidth,
      borderColor: highlightColor,
      borderWidth: highlightBorderWidth,
      borderRadius: highlightBorderRadius
    };

    return (
      <View style={wrapperStyle}>
        <View style={highlightStyle} />
        <ScrollView
          ref={(sview) => { this.sview = sview; }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onMomentumScrollBegin={this._onMomentumScrollBegin.bind(this)}
          onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
          onScrollBeginDrag={this._onScrollBeginDrag.bind(this)}
          onScrollEndDrag={this._onScrollEndDrag.bind(this)}>
          {header}
          {this.props.dataSource.map(this._renderItem.bind(this))}
          {footer}
        </ScrollView>
      </View>
    );
  }

  _renderPlaceHolder () {
    let h = (this.wrapperHeight - this.itemHeight) / 2;
    let header = <View style={{height: h, flex: 1}} />;
    let footer = <View style={{height: h, flex: 1}} />;
    return {header, footer};
  }

  _renderItem (data, index) {
    let isSelected = index === this.state.selectedIndex;
    let item = <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>{data}</Text>;

    if (this.props.renderItem) {
      item = this.props.renderItem(data, index, isSelected);
    }

    return (
      <View style={[styles.itemWrapper, {height: this.itemHeight}]} key={index}>
        {item}
      </View>
    );
  }
  _scrollFix (e) {
    let y = 0;
    let h = this.itemHeight;
    if (e.nativeEvent.contentOffset) {
      y = e.nativeEvent.contentOffset.y;
    }
    let selectedIndex = Math.round(y / h);
    let _y = selectedIndex * h;
    if (_y !== y) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (Platform.OS === 'ios') {
        this.isScrollTo = true;
      }
      this.sview.scrollTo({y: _y});
    }
    if (this.state.selectedIndex === selectedIndex) {
      return;
    }
    // onValueChange
    if (this.props.onValueChange) {
      let selectedValue = this.props.dataSource[selectedIndex];
      this.setState({
        selectedIndex: selectedIndex
      });
      this.props.onValueChange(selectedValue, selectedIndex);
    }
  }
  _onScrollBeginDrag () {
    this.dragStarted = true;
    if (Platform.OS === 'ios') {
      this.isScrollTo = false;
    }
    this.timer && clearTimeout(this.timer);
  }
  _onScrollEndDrag (e) {
    this.dragStarted = false;
    // if not used, event will be garbaged
    let _e = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y
        }
      }
    };
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(
      () => {
        if (!this.momentumStarted && !this.dragStarted) {
          this._scrollFix(_e, 'timeout');
        }
      },
      10
    );
  }
  _onMomentumScrollBegin (e) {
    this.momentumStarted = true;
    this.timer && clearTimeout(this.timer);
  }
  _onMomentumScrollEnd (e) {
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this._scrollFix(e);
    }
  }

  scrollToIndex (ind) {
    this.setState({
      selectedIndex: ind
    });
    let y = this.itemHeight * ind;
    if (this.sview) {
      this.sview.scrollTo({y: y});
    }
  }

  getSelected () {
    let selectedIndex = this.state.selectedIndex;
    let selectedValue = this.props.dataSource[selectedIndex];
    return selectedValue;
  }
}

ScrollPicker.propTypes = {
  style: ViewPropTypes.style,
  dataSource: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  onValueChange: PropTypes.func,
  renderItem: PropTypes.func,
  highlightColor: ExtraPropTypes.color,
  itemHeight: PropTypes.number,
  wrapperHeight: PropTypes.number
};

let styles = StyleSheet.create({
  itemWrapper: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    color: '#999'
  },
  itemTextSelected: {
    color: '#333'
  }
});

export default ScrollPicker;
