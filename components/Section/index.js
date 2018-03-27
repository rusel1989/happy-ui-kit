import React from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import SectionHeader from '../SectionHeader';

const Section = ({ title, onHeaderPress, children }) => (
  <View>
    <SectionHeader
      onPress={onHeaderPress}
      title={title} />
    {children}
  </View>
);

Section.Animated = ({ title, onHeaderPress, children, getRef, style, contentEnterDelay = 500 }) => {
  return (
    <Animatable.View
      ref={getRef}
      style={style}
      easing='ease-in-out-quad'
      useNativeDriver>
      <Section title={title} onHeaderPress={onHeaderPress}>
        <Animatable.View
          useNativeDriver
          delay={contentEnterDelay}
          duration={250}
          animation='pulse'>
          {children}
        </Animatable.View>
      </Section>
    </Animatable.View>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  onHeaderPress: PropTypes.func,
  children: PropTypes.node
};

Section.defaultProps = {
  title: '',
  onHeaderPress: () => {}
};

Section.demoProps = {
  title: 'Section title',
  onHeaderPress: () => console.log('pressed header'),
  children: <View style={{ backgroundColor: 'white' }}><Text>Section content</Text></View>
};

export default Section;
