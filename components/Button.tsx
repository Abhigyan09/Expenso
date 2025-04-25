import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ViewStyle } from 'react-native';
import React from 'react';
import { CustomButtonProps } from '@/type';
import { colors } from '@/constants/theme';
import Loading from "./loading"; 

const Button = ({
  style,
  onPress,
  loading = false,
  children,
}: CustomButtonProps) => {
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: 'transparent' }]}>
       <Loading />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
    button : {
        backgroundColor: colors.primary,
        borderRadius: 17,
        borderCurve:"continuous",
        //height:"center",
        justifyContent:"center",
        alignItems:"center",
    },
});
