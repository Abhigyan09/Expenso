import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Alert, Switch } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from 'react-native-size-matters'
import Typo from '@/components/Typo'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import Button from '@/components/Button'
import * as Icons from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/contexts/authContext' // Assuming you have an auth context

const Login = () => {
  const emailRef = useRef<string>("")
  const passwordRef = useRef<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const router = useRouter()
  const {login: loginUser} = useAuth() // Assuming you have a useAuth hook to handle login

  const validateForm = () => {
    let isValid = true
    setEmailError('')
    setPasswordError('')

    if (!emailRef.current) {
      setEmailError('Email is required')
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(emailRef.current)) {
      setEmailError('Please enter a valid email')
      isValid = false
    }

    if (!passwordRef.current) {
      setPasswordError('Password is required')
      isValid = false
    } else if (passwordRef.current.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      isValid = false
    } else if (!/[A-Z]/.test(passwordRef.current) || !/[0-9]/.test(passwordRef.current)) {
      setPasswordError('Password must contain a number and an uppercase letter')
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    const res = await loginUser(emailRef.current, passwordRef.current)
    setIsLoading(false)
    if(!res.success) {
      Alert.alert("Login", res.msg);
    }
  };

  // Biometric Authentication
  const handleBiometricLogin = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    const enrolled = await LocalAuthentication.isEnrolledAsync()

    if (!compatible || !enrolled) {
      Alert.alert("Error", "Biometric authentication not available")
      return
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      fallbackLabel: 'Enter Password',
    })

    if (result.success) {
      // Mock success, replace with your auth logic
      Alert.alert("Success", "Logged in with biometrics")
      // router.push('/home')
    } else {
      Alert.alert("Failed", "Biometric authentication failed")
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>

        {/* Back Button */}
        <BackButton iconSize={24} />

        {/* Welcome Text */}
        <View style={{ marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={'800'}>Hey,</Typo>
          <Typo size={30} fontWeight={'800'}>Welcome Back</Typo>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Typo size={15} color={colors.textLighter} fontWeight={'500'}>
            Login Now To Track All Your Expenses!
          </Typo>

          {/* Email Input */}
          <Input 
            placeholder="Enter your email" 
            onChangeText={(value) => (emailRef.current = value)}
            icon={<Icons.At size={verticalScale(26)} color={colors.neutral300} weight="fill" />}
          />
          {emailError && <Typo size={12} color="red" style={styles.errorText}>{emailError}</Typo>}

          {/* Password Input with Eye Toggle */}
          <Input 
            placeholder="Enter your password" 
            secureTextEntry={!showPassword}
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                {showPassword ? (
                  <Icons.EyeSlash size={verticalScale(26)} color={colors.neutral300} />
                ) : (
                  <Icons.Eye size={verticalScale(26)} color={colors.neutral300} />
                )}
              </TouchableOpacity>
            }
          />
          {passwordError && <Typo size={12} color="red" style={styles.errorText}>{passwordError}</Typo>}
        </View>

        {/* Footer */}
        <View style={{ gap: spacingY._30 }}>
          <TouchableOpacity>
            <Typo size={14} fontWeight={'500'} style={styles.forgetPassword}>
              Forget Password?
            </Typo>
          </TouchableOpacity>
           
          <Button loading={isLoading} onPress={handleSubmit} style={styles.loginButton}>
            <Typo size={22} color={colors.neutral900} fontWeight={"500"}> 
              Login 
            </Typo>
          </Button>

          {/* Biometric Login */}
          <Button onPress={handleBiometricLogin} style={styles.biometricButton}>
            <Icons.Fingerprint size={24} color={colors.neutral900} />
            <Typo size={16} fontWeight="500" style={styles.biometricText}>
              Login with Fingerprint
            </Typo>
          </Button>

          {/* Sign Up Prompt */}
          <View style={styles.signupContainer}>
            <Typo size={14} color={colors.text} fontWeight={'500'}>
              Don't have an account?{' '}
            </Typo>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Typo size={14} color={colors.primary} fontWeight={'500'}>
                Sign Up
              </Typo>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  form: {
    gap: spacingY._20,
  },
  errorText: {
    marginTop: -10,
    marginLeft: 5,
  },
  forgetPassword: {
    textAlign: 'right',
    fontWeight: '500',
    color: colors.text,
    alignSelf: 'flex-end',
  },
  loginButton: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  biometricButton: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary, // Set the background color to a visible color
    borderRadius: 10,
  },
  biometricText: {
    marginLeft: 20,  // Adjust the gap between the icon and the text
    color: colors.neutral900,
  },
  signupContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
