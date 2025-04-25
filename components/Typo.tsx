import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import React from 'react';
import { verticalScale } from 'react-native-size-matters';
import { colors } from '@/constants/theme';
import { TypoProps } from '@/type';

const Typo = ({
  size,
  color = colors.text,
  fontWeight = '400',
  children,
  textProps = {},
}: TypoProps) => {
  const textStyle: TextStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color,
    fontWeight,
  };

  return (
    <Text style={[textStyle, textProps?.style]} {...textProps}>
      {children}
    </Text>
  );
};

export default Typo;

const styles = StyleSheet.create({});
