import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import BaseTheme from '../../theme/base';
import { renderRefreshControl } from '../../utils';

class ListScreen extends Component {
  static defaultProps = {
    onRefresh: () => {},
    data: [],
    refreshing: false,
    scrollEnabled: true,
    getRef: () => {},
    header: null,
    footer: null,
    renderItem: () => <View />
  }

  static propTypes = {

  }

  render () {
    const { onRefresh, refreshing, data, scrollEnabled, getRef, renderItem, header, footer, extraData } = this.props;
    return (
      <View style={styles.container}>
        {header}
        <FlatList
          data={data}
          extraData={extraData}
          refreshControl={renderRefreshControl({ onRefresh, refreshing })}
          renderItem={renderItem}
          style={styles.container}
          keyExtractor={(item, index) => item.id}
          removeClippedSubviews={false}
          scrollEnabled={scrollEnabled}
          ref={getRef} />
        {footer}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseTheme.palette.APP_BACKGROUND
  }
});

export default ListScreen;
