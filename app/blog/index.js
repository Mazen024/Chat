import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const blog = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Blog Page</Text>
      <Pressable style={styles.button} onPress={() => router.push("/blog/1")}>
        <Text style={styles.link}>Go To Blog 1</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/blog/2?author=mazen")}
      >
        <Text style={styles.link}>Go To Blog 2</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.link}>Go Back</Text>
      </Pressable>
    </View>
  );
};

export default blog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
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
    backgroundColor: "midnightblue",
    marginVertical: 10,
  },
});
