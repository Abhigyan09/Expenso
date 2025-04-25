import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {colors, spacingY,radius, spacingX} from '@/constants/theme';
import { verticalScale } from 'react-native-size-matters';
import Typo from "@/components/Typo";

const wallet = () => {
  const getTotalBalance = () => {
  return 2344;
  };
  return (
    <ScreenWrapper style={{ backgroundColor: colors.black }}>
    <View style={styles.container}>
      {/* balance view */}
      <View style={styles.balanceView}>
        <View style={{ alignItems: 'center' }}>
          <Typo size={20} fontWeight={"500"}>
            ${getTotalBalance()?.toFixed(2)}
          </Typo>
        </View>
      </View>
    </View>
  </ScreenWrapper>
  )
}

export default wallet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingY._20,
    paddingTop: spacingY._25,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacingY._10,
  },
});
