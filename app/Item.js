import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable} from 'react-native';
import { router } from "expo-router";

export default function Item({ name, price, image }) {
  return (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <Pressable onPress={() => router.push(`/pressedItem?name=${name}&price=${price}&image=${image}`)}>
        <Image source={{ uri: image }} style={styles.image} />
      </Pressable>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth - 20,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    // flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
});
