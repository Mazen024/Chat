import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { router } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUserId(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const fetchedUsers = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.userId !== loggedInUserId) {
            fetchedUsers.push(userData);
          }
        });
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [loggedInUserId]);

  const handleUserPress = (userId) => {
    router.push(`PressedUser?userId=${userId}`);
  };

  const handleUserSettingsPress = (userId) => {
    router.push(`UserProfile?userId=${userId}`);
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleUserPress(item.userId)} style={styles.user}>
      <Text style={styles.userName}>{item.name}</Text>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>WhatsApp</Text>
        <Pressable onPress={() => handleUserSettingsPress(loggedInUserId)}>
          <MaterialCommunityIcons name="cog" size={24} color="white" style={styles.settingsIcon} />
        </Pressable>
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId}
        style={styles.userList}
      />
    </View>
  );
};

export default UsersPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    backgroundColor: "#075e54",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  userList: {
    flex: 1,
  },
  user: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
