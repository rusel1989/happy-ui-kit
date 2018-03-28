import React from 'react';
import { View, Text } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import PropTypes from 'prop-types';

const CustomSwipeRow = ({ leftOpenValue, rightOpenValue, disableSwipe, children, onRowOpen, onRowClose, rowRef, setScrollEnabled }) => (
  <SwipeRow
    ref={rowRef}
    leftOpenValue={leftOpenValue}
    stopLeftSwipe={leftOpenValue}
    rightOpenValue={rightOpenValue}
    stopRightSwipe={rightOpenValue}
    disableLeftSwipe={disableSwipe}
    disableRightSwipe={disableSwipe}
    onRowOpen={onRowOpen}
    setScrollEnabled={setScrollEnabled}
    closeOnRowBeginSwipe>
    {children}
  </SwipeRow>);

CustomSwipeRow.contextTypes = {
  theme: PropTypes.object
};

CustomSwipeRow.propTypes = {
  leftOpenValue: PropTypes.number,
  rightOpenValue: PropTypes.number,
  disableSwipe: PropTypes.bool,
  children: PropTypes.node,
  onRowOpen: PropTypes.func,
  onRowClose: PropTypes.func,
  rowRef: PropTypes.func,
  setScrollEnabled: PropTypes.func
};

CustomSwipeRow.defaultProps = {
  leftOpenValue: 80,
  rightOpenValue: 80,
  disableSwipe: false,
  onRowOpen: () => {},
  onRowClose: () => {},
  rowRef: () => {},
  setScrollEnabled: () => {}
};

CustomSwipeRow.demoProps = {
  children: [<View key='1' style={{ height: 40, backgroundColor: 'red', flex: 1 }}><Text>Row hidden</Text></View>, <View key='2' style={{ height: 40, backgroundColor: 'blue', flex: 1 }}><Text>Row top</Text></View>]
};

export default CustomSwipeRow;
