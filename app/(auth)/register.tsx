import React, { useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from 'react-native-size-matters'
import Typo from '@/components/Typo'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import Button from '@/components/Button'
import * as Icons from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/contexts/authContext'; 

const Register = () => {
  const nameRef = useRef<string>("")
  const emailRef = useRef<string>("")
  const passwordRef = useRef<string>("")

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null)

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
// route : 
  const router = useRouter()
  const {register: registerUser} = useAuth();

  const getPasswordStrength = (password: string) => {
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return 'strong'
    } else if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return 'medium'
    } else {
      return 'weak'
    }
  }

  const validateForm = () => {
    let isValid = true
    setNameError('')
    setEmailError('')
    setPasswordError('')

    if (!nameRef.current) {
      setNameError('Name is required')
      isValid = false
    }

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
    }

    return isValid
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true);
      const res = await registerUser(
        emailRef.current, 
        passwordRef.current, 
        nameRef.current);
        setIsLoading(false);
       console.log("Registration result:", res);
      if (!res.success) {
        Alert.alert('Sign up', res.msg);
      }
    };
  

  return (
    <ScreenWrapper>
      <View style={styles.container}>

        {/* Back Button */}
        <BackButton iconSize={24} />

        {/* Header Text */}
        <View style={{ marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={'800'}>Let's</Typo>
          <Typo size={30} fontWeight={'800'}>Get Started</Typo>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Typo size={15} color={colors.textLighter} fontWeight={'500'}>
            Create your account to track your expenses!
          </Typo>

          {/* Name Input */}
          <Input 
            placeholder="Enter your full name" 
            onChangeText={(value) => (nameRef.current = value)}
            icon={<Icons.User size={verticalScale(26)} color={colors.neutral300} weight="fill" />}
          />
          {nameError ? (
            <Typo size={12} color="red" style={styles.errorText}>{nameError}</Typo>
          ) : null}

          {/* Email Input */}
          <Input 
            placeholder="Enter your email" 
            onChangeText={(value) => (emailRef.current = value)}
            icon={<Icons.At size={verticalScale(26)} color={colors.neutral300} weight="fill" />}
          />
          {emailError ? (
            <Typo size={12} color="red" style={styles.errorText}>{emailError}</Typo>
          ) : null}

          {/* Password Input with Eye Toggle */}
          <Input 
            placeholder="Enter your password" 
            secureTextEntry={!showPassword}
            onChangeText={(value) => {
              passwordRef.current = value
              setPasswordStrength(getPasswordStrength(value))
            }}
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
          {passwordError ? (
            <Typo size={12} color="red" style={styles.errorText}>{passwordError}</Typo>
          ) : null}

          {passwordRef.current ? (
            <View style={styles.strengthBarContainer}>
              <View
                style={[
                  styles.strengthBar,
                  passwordStrength === 'weak' && { backgroundColor: 'red', width: '33%' },
                  passwordStrength === 'medium' && { backgroundColor: 'orange', width: '66%' },
                  passwordStrength === 'strong' && { backgroundColor: 'green', width: '100%' },
                ]}
              />
              <Typo size={12} color={colors.textLighter}>
                {passwordStrength === 'weak' && 'Weak'}
                {passwordStrength === 'medium' && 'Medium'}
                {passwordStrength === 'strong' && 'Strong'}
              </Typo>
            </View>
          ) : null}
        </View>

        {/* Footer */}
        <View style={{ gap: spacingY._30 }}>
          <Button loading={isLoading} onPress={handleSubmit} style={styles.loginButton}>
            <Typo size={22} color={colors.neutral900} fontWeight={"500"}> 
              Register 
            </Typo>
          </Button>

          <View style={styles.signupContainer}>
            <Typo size={14} color={colors.text} fontWeight={'500'}>
              Already have an account?{' '}
            </Typo>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Typo size={14} color={colors.primary} fontWeight={'500'}>
                Login
              </Typo>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Register

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
  loginButton: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  strengthBarContainer: {
    marginTop: 4,
    marginLeft: 5,
    gap: 4,
  },
  strengthBar: {
    height: 6,
    borderRadius: 4,
    backgroundColor: colors.neutral300,
  },
})
