import { StyleSheet, View } from 'react-native'
import React from 'react'
import Typo from './Typo'
import { HeaderProps } from '@/type'
import { colors } from '@/constants/theme'

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {leftIcon && (
        <View style={styles.leftIcon}>
          {leftIcon}
        </View>
      )}
      {title && (
        <Typo
          size={22}
          fontWeight="500"
          style={{
            textAlign: 'center',
            width: leftIcon ? '82%' : '100%',
            flex: 1,
          }}
        >
          {title}
        </Typo>
      )}
    </View>
  )
}

 
 export default Header
 
 const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: 'center',
        flexDirection: "row",
    },
    leftIcon: {
        alignSelf: "flex-start",
        paddingRight: 20,
    },
 })