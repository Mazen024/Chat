import { StyleSheet, Text, View } from "react-native";
import React from "react";

const feed = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feed Page</Text>
    </View>
    
  );
};

export default feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  text: {
    fontSize: 28,
  },
});
