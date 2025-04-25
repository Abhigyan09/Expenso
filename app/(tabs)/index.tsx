import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Typo from '@/components/Typo';
import { colors } from '@/constants/theme';
import Button from '@/components/Button'; // using your custom Button component
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuth } from '@/contexts/authContext'; // Assuming you have a context for auth
import ScreenWrapper from '@/components/ScreenWrapper'; // Assuming you have a ScreenWrapper component

const Home = () => {
  const {user} = useAuth();
//   console.log("user:", user);
//   // Logout function
// const handleLogout = async () => {
//     await signOut(auth);
//   };

  return (
   <ScreenWrapper>
      <Typo>Home</Typo>
      {/* <Button onPress={handleLogout}>
        <Typo color={colors.black}>Logout</Typo>
  </Button> */}
  </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
