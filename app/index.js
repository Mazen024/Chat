import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Login from "./login";

const index = () => {
  return (
    <View style={styles.container}>
      {/* <About />
      <Link style={styles.button} href={"/(tabs)/feed"} asChild>
        <Pressable>
          <Text style={styles.link}>Go To Tabs</Text>
        </Pressable>
      </Link> */}
      <Login />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    fontSize: 32,
  },
  link: {
    fontSize: 22,
    color: "white",
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "black",
    marginVertical: 10,
  },
});
