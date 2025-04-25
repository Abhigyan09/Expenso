import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { colors, spacingX, radius } from '@/constants/theme'
import { InputProps } from '@/type'
import { verticalScale } from 'react-native-size-matters'


const Input = (props: InputProps) => {
  const { containerStyle, inputStyle, inputRef, icon, ...rest } = props

  return (
    <View style={[styles.container, containerStyle]}>
      {icon && icon}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={colors.neutral400}
        ref={inputRef}
        {...rest}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: verticalScale(54),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: 'continuous',
    paddingHorizontal: spacingX._15,
    gap: spacingX._10,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: verticalScale(14),
  },
})
