import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { spacingX, spacingY } from '@/constants/theme';
import { scale } from 'react-native-size-matters'; 
import { colors } from '@/constants/theme';
import ScreenWrapper from '@/components/ScreenWrapper';
import BackButton from '@/components/BackButton'; // ✅ default import
import { getProfileImage } from '@/services/imageService'; // ✅ default import

import Header from '@/components/Header';
import ModalWrapper from '@/components/ModalWrapper'; 
import { verticalScale } from 'react-native-size-matters';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native';
import * as Icons from 'phosphor-react-native'
import Typo from '@/components/Typo';
import Input from '@/components/Input'; // ✅ default import
import { UserDataType } from '@/type'; // ✅ default import
import Button from '@/components/Button'; // ✅ default import
import { useEffect } from 'react';
import { useAuth } from '@/contexts/authContext';
import { updateUser } from '@/services/userService'; // ✅ default import
import { useRouter } from 'expo-router'; // ✅ default import
import * as ImagePicker from 'expo-image-picker';

const ProfileModal = () => {
    const { user,updateUserData } = useAuth();
    const [userData, setUserData] = useState<UserDataType>({
        name: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setUserData({
            name: user?.name || "",
            image: user?.image || null,
        });
    }, [user]);

    const onPickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            //allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
          });

          if (!result.canceled) {
            setUserData({...userData,image:result.assets[0]});
          }
        };
    const onSubmit = async () => {
         let {name , image} = userData;
         if(!name.trim()) {
            alert("Please fill the name");
            return;
         }
         setLoading(true);
         const res = await updateUser(user?.uid as string , userData)
         setLoading(false);
            if(res.success) {
         // Update the user data in context
            updateUserData(user?.uid as string );
            // Navigate to the home screen
            router.back();
                alert("Profile updated successfully");
            }
            else {
                alert(res.msg);
            }
    };
      
    return (
      <ModalWrapper>
        <View style={styles.container}>
          <Header 
          title="Update Profile" 
          leftIcon={<BackButton />}
          style={{marginBottom: spacingY._10}}
          />

          {/* Avatar and Edit Icon */}
          <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={getProfileImage(null)}
              contentFit="cover"
              transition={100}
            />
            
            <TouchableOpacity onPress={onPickImage}style={styles.editIcon}>
              <Icons.Pencil
                size={verticalScale(20)}
                color={colors.neutral800}
                />
            </TouchableOpacity>
          </View>

              {/* Input Section */}
      <View style={styles.inputContainer}>
        <Typo color={colors.neutral200}>Name</Typo>
        <Input
          placeholder="Enter your name"
          value={userData.name}
          onChangeText={(value) =>
            setUserData({...userData, name: value })
          }
        />
         </View>
        </ScrollView>
       </View>
    

        {/* Footer Section */}

        <View style={styles.footer}>
        <Button onPress={onSubmit} loading={loading}style={{flex :1,height: 55}}>
            <Typo color={colors.black} fontWeight={"700"}> Update </Typo>
           </Button>
          </View>
      </ModalWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    borderTopWidth: 1,
    marginBottom: spacingY._5,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._20,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingX._5,
    backgroundColor: colors.neutral100,
    borderRadius: 100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
