import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import Typo from '@/components/Typo';
import Button from '@/components/Button';

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Login button & Image */}
        <View>
           <TouchableOpacity onPress={()=> router.push('/login')}style={styles.loginButton}>
            <Typo fontWeight={"500"}> Sign in </Typo>
           </TouchableOpacity>
        
         {/* Image */}
           <Image
          source={require('../../assets/images/welcome.png')}
          style={styles.welcomeImage}
          resizeMode="contain"
        />
        </View>
        {/* footer */}
        <View style={styles.footer}>
            <View style={{alignItems: 'center'}}>
                <Typo size={25} fontWeight={"800"}> Always Take Control
                </Typo>
            <Typo size={25} fontWeight={"800"}>
                Of Your Finances
            </Typo>
            </View>
            
            <View style={{alignItems:'center',gap:2}}>
            <Typo size={12} color={colors.textLight}>
                Finances Must Be Arranged To Set Better
                </Typo>
            <Typo size={12}color={colors.textLight}>
                Lifestyle In Future
            </Typo>
         </View>
         <View style={styles.buttoncontainer}>
            {/* Button */}

          <View style={styles.buttoncontainer}>
          <Button onPress={()=> router.push('/register')}style={{ height: 50}}>
              <Typo size={25} color={colors.neutral900} fontWeight={"500"}> Get Started </Typo>
            </Button>

          </View>
         </View>
        </View>
        </View>
     
     </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacingY._7,
    backgroundColor: colors.neutral900,
  },
  welcomeImage: {
    width: '100%',
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: 'flex-end',
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: 'center',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(50),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: -20 },
    shadowOpacity: 0.15,
    shadowRadius: 35,
    elevation: 40,
  },
  buttoncontainer: {
    width: '100%',
    paddingHorizontal: spacingX._20,
  },
});