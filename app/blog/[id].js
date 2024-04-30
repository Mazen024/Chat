import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";

const page = () => {
  const { id, author } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerTitle: `Article ${id}` }} />
      <View style={styles.container}>
        <Text style={styles.text}>Blog Post Details {id}</Text>
        <Text style={styles.text}>Written By {author}</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.link}>Go Back</Text>
        </Pressable>
      </View>
    </>
  );
};

export default page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  text: {
    fontSize: 24,
  },
  link: {
    fontSize: 20,
    color: "gray",
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "midnightblue",
    marginVertical: 10,
  },
});
