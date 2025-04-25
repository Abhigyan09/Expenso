import React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { useRouter } from 'expo-router'
import { CaretLeft } from 'phosphor-react-native'
import { verticalScale } from 'react-native-size-matters'
import { BackButtonProps } from '@/type' // Make sure this exists
import { colors,radius } from '@/constants/theme' // Assuming theme includes spacing, colors, radius, scale

const BackButton = ({
  style,
  iconSize = 26,
}: BackButtonProps) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      style={[style, styles.button]}
      onPress={() => router.back()}
    >
    <CaretLeft
        size={verticalScale(iconSize)}
        color={colors.white}
        weight="bold"
      />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    padding: 5,
    borderRadius: radius._12,
    borderCurve: 'continuous',
    alignSelf: 'flex-start',
  },
})
