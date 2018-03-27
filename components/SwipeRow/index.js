import React from 'react';
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

CustomSwipeRow.propTypes = {

};

export default CustomSwipeRow;
