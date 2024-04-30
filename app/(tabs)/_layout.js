import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Feather, AntDesign } from "@expo/vector-icons";

const _layout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="feed"
          options={{
            tabBarIcon: () => <Feather name="list" size={24} color="black" />,
            tabBarLabel: "Feed",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
            tabBarLabel: "USERS",
          }}
        />
      </Tabs>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
