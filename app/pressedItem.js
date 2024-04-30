import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase'; // Import your Firestore instance

export default function PressedItem() {
  const { name } = useLocalSearchParams();
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        // const usersRef = collection(db, "Products");
        // const q = query(usersRef, where("name", "==", name));
        // const querySnapshot = await getDocs(q);
        //or
        const querySnapshot = await getDocs(query(collection(db, "Products"),where("name", "==", name)));

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setItemData(data);
        } else {
          console.log('Item not found');
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchItemData();
  }, [name]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {itemData ? (
          <>
            <Text style={styles.name}>{itemData.name}</Text>
            <Text style={styles.price}>${itemData.price}</Text>
            {/* Render other fields here */}
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      {itemData && (
        <Image source={{ uri: itemData.image }} style={styles.image} />
      )}
    </View>
  );  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    textContainer: {
      marginTop: '10%',
    },
    name: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 18,
      color: '#888',
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 10,
      marginLeft: 'auto',
      marginBottom: 'auto',
    },
  });
  