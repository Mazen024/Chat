import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Pressable, Alert } from "react-native";
import { doc, getDocs, updateDoc, query, collection, where } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { db } from "../firebase";
import { useLocalSearchParams } from "expo-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';



const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { userId } = useLocalSearchParams;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      if (authenticatedUser) {
        const userId = authenticatedUser.uid;
        try {
          const usersRef = collection(db, 'users');
          const userQuery = query(usersRef, where('userId', '==', userId));
          const querySnapshot = await getDocs(userQuery);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUser(userData);
            // Set the profile image if it exists in the user data
            if (userData.image) {
              setProfileImage(userData.image);
            }
          } else {
            console.log('User not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        setProfileImage(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!imageResult.canceled && imageResult.assets[0].uri) {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'users'), where('name', '==', user.name))
        );
        if (querySnapshot.empty) {
          alert('User not found.');
          return;
        }

        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
          image: imageResult.assets[0].uri,
        });

        setProfileImage(imageResult.assets[0].uri);
      } catch (error) {
        console.error('Error updating user document:', error);
      }
    } else {
      console.log('Image selection canceled or URI not present:', imageResult);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.userImage} />
            ) : (
              <Text>No profile image</Text>
            )}
            <Pressable onPress={handleImageUpload} style={styles.uploadButton}>
              <Ionicons name="camera" size={24} color="white" />
            </Pressable>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 20,
    right: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserProfile;
