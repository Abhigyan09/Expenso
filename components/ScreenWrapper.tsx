import { Dimensions, Platform, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { ScreenWrapperProps } from '@/type';
import { colors } from '@/constants/theme'; // Make sure this path is correct

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  const paddingTop = Platform.OS === 'ios' ? height * 0.06 : 50;

  return (
    <View style={[styles.container, { paddingTop }]}>
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
});
